/**
 * FaqNoticeMasterController.tsx
 * -----------------------------------------
 * よくある質問と回答・お知らせマスタ入力画面（A-803）
 * 設計書（基本設計 4.6.1 / 詳細設計 4.8.1）準拠のコントローラ層
 *
 * 役割：
 *  - 初期化処理（FAQ・お知らせ一覧取得）
 *  - state の保持（before/after）
 *  - DataGrid 編集結果の反映
 *  - 行追加（最大5行）
 *  - 入力チェック（単項目 / 相関）
 *  - 件数取得（新規 / 更新 / 削除）
 *  - 確認画面への遷移データ作成
 *  - View（FaqNoticeMasterView）へ props として渡す
 */

import * as React from "react";
import dayjs from "dayjs";

import {
  FaqItem,
  NoticeItem,
  FaqChangeSet,
  NoticeChangeSet,
  ConfirmPayload
} from "./MasterModels";

import {
  validateFaqRow,
  validateNoticeRow,
  MAX_NEW_ROWS
} from "./MasterValidationRules";

import {
  fetchFaqs,
  fetchNotices
} from "./MasterApiClient";

import {
  countDiffFaqs,
  countDiffNotices
} from "./MasterDiffCounter";

import FaqNoticeMasterView from "./FaqNoticeMasterView";

export default function FaqNoticeMasterController(props: {
  onRequestConfirm: (payload: ConfirmPayload) => void;
}) {
  const { onRequestConfirm } = props;

  /* ============================================================
   * state 定義（before / after）
   * ============================================================ */

  /** FAQ 初期表示（比較用） */
  const [faqBefore, setFaqBefore] = React.useState<FaqItem[]>([]);
  /** FAQ 編集後（画面の値） */
  const [faqAfter, setFaqAfter] = React.useState<FaqItem[]>([]);

  /** お知らせ 初期表示（比較用） */
  const [noticeBefore, setNoticeBefore] = React.useState<NoticeItem[]>([]);
  /** お知らせ 編集後（画面の値） */
  const [noticeAfter, setNoticeAfter] = React.useState<NoticeItem[]>([]);

  /** 選択タブ（0：FAQ、1：お知らせ） */
  const [tabValue, setTabValue] = React.useState(0);

  /** トースト（Snackbar） */
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
  });

  /** 件数確認ダイアログ */
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  /* ============================================================
   * 初期化：FAQ / お知らせ 一覧取得
   * ============================================================ */
  React.useEffect(() => {
    (async () => {
      try {
        const [faqs, notices] = await Promise.all([
          fetchFaqs(),
          fetchNotices()
        ]);

        // 更新前 state に保持
        setFaqBefore(faqs);
        setNoticeBefore(notices);

        // 編集用
        setFaqAfter(faqs.map(x => ({ ...x })));
        setNoticeAfter(notices.map(x => ({ ...x })));

      } catch (e) {
        setSnack({ open: true, message: "初期化に失敗しました。" });
      }
    })();
  }, []);

  /* ============================================================
   * タブ切替
   * ============================================================ */
  const handleTabChange = (_: any, v: number) => {
    setTabValue(v);
  };

  /* ============================================================
   * FAQ の編集（セル変更）
   * ============================================================ */
  const handleFaqChange = (id: any, field: keyof FaqItem, value: any) => {
    setFaqAfter(prev => {
      const rows = prev.map(r => (r.id === id ? { ...r, [field]: value } : r));
      const target = rows.find(r => r.id === id)!;

      // 単項目 + 相関チェック
      const errors = validateFaqRow(target);
      if (errors.length > 0) {
        setSnack({ open: true, message: `FAQ: ${errors[0].message}` });
      }
      return rows;
    });
  };

  /* ============================================================
   * お知らせ 編集
   * ============================================================ */
  const handleNoticeChange = (id: any, field: keyof NoticeItem, value: any) => {
    setNoticeAfter(prev => {
      const rows = prev.map(r => (r.id === id ? { ...r, [field]: value } : r));
      const target = rows.find(r => r.id === id)!;

      const errors = validateNoticeRow(target);
      if (errors.length > 0) {
        setSnack({ open: true, message: `お知らせ: ${errors[0].message}` });
      }
      return rows;
    });
  };

  /* ============================================================
   * FAQ 行追加（最大5行）
   * ============================================================ */
  const addNewFaqRow = () => {
    const newRows = faqAfter.filter(r => String(r.id).startsWith("NEW_"));
    if (newRows.length >= MAX_NEW_ROWS) {
      setSnack({ open: true, message: `新規は最大${MAX_NEW_ROWS}件までです。` });
      return;
    }
    const newRow: FaqItem = {
      id: `NEW_${Date.now()}`,
      category: "",
      question: "",
      answer: "",
      startDate: null,
      endDate: null,
      deleteFlag: false
    };
    setFaqAfter(prev => [newRow, ...prev]);
  };

  /* ============================================================
   * お知らせ 行追加（最大5行）
   * ============================================================ */
  const addNewNoticeRow = () => {
    const newRows = noticeAfter.filter(r => String(r.id).startsWith("NEW_"));
    if (newRows.length >= MAX_NEW_ROWS) {
      setSnack({ open: true, message: `新規は最大${MAX_NEW_ROWS}件までです。` });
      return;
    }
    const newRow: NoticeItem = {
      id: `NEW_${Date.now()}`,
      message: "",
      startDate: null,
      endDate: null,
      deleteFlag: false
    };
    setNoticeAfter(prev => [newRow, ...prev]);
  };

  /* ============================================================
   * 更新ボタンクリック → 件数集計 → 確認画面へ
   * ============================================================ */
  const handleClickUpdate = () => {
    const faqCounts = countDiffFaqs(faqBefore, faqAfter);
    const noticeCounts = countDiffNotices(noticeBefore, noticeAfter);

    // 変更がない場合
    if (
      faqCounts.create === 0 &&
      faqCounts.update === 0 &&
      faqCounts.delete === 0 &&
      noticeCounts.create === 0 &&
      noticeCounts.update === 0 &&
      noticeCounts.delete === 0
    ) {
      setSnack({ open: true, message: "更新対象がありません。" });
      return;
    }

    setConfirmOpen(true);
  };

  /* ============================================================
   * 確認ダイアログ OK → ConfirmPayload を作成して遷移
   * ============================================================ */
  const handleConfirmOk = () => {
    setConfirmOpen(false);

    const isNew = (id: any) => String(id).startsWith("NEW_");

    /** FAQ */
    const faqCreate = faqAfter.filter(r => isNew(r.id) && !r.deleteFlag);
    const faqRemove = faqAfter.filter(r => !isNew(r.id) && !!r.deleteFlag);
    const faqUpdate = faqAfter.filter(r => {
      if (isNew(r.id) || r.deleteFlag) return false;
      const bef = faqBefore.find(b => b.id === r.id);
      if (!bef) return false;
      return (
        bef.category !== r.category ||
        bef.question !== r.question ||
        bef.answer !== r.answer ||
        bef.startDate !== r.startDate ||
        bef.endDate !== r.endDate
      );
    });

    /** お知らせ */
    const noticeCreate = noticeAfter.filter(r => isNew(r.id) && !r.deleteFlag);
    const noticeRemove = noticeAfter.filter(r => !isNew(r.id) && !!r.deleteFlag);
    const noticeUpdate = noticeAfter.filter(r => {
      if (isNew(r.id) || r.deleteFlag) return false;
      const bef = noticeBefore.find(b => b.id === r.id);
      if (!bef) return false;
      return (
        bef.message !== r.message ||
        bef.startDate !== r.startDate ||
        bef.endDate !== r.endDate
      );
    });

    const payload: ConfirmPayload = {
      faq: {
        create: faqCreate,
        update: faqUpdate,
        remove: faqRemove
      },
      notice: {
        create: noticeCreate,
        update: noticeUpdate,
        remove: noticeRemove
      },
      faqCounts: countDiffFaqs(faqBefore, faqAfter),
      noticeCounts: countDiffNotices(noticeBefore, noticeAfter)
    };

    // 親へ渡す → 確認画面へ遷移
    onRequestConfirm(payload);
  };

  /* ============================================================
   * Snackbar 閉じる
   * ============================================================ */
  const handleSnackClose = () => {
    setSnack({ open: false, message: "" });
  };

  /* ============================================================
   * View にすべてを渡す
   * ============================================================ */
  return (
    <FaqNoticeMasterView
      tabValue={tabValue}
      onTabChange={handleTabChange}
      faqRows={faqAfter}
      noticeRows={noticeAfter}
      onFaqChange={handleFaqChange}
      onNoticeChange={handleNoticeChange}
      onAddFaq={addNewFaqRow}
      onAddNotice={addNewNoticeRow}
      onUpdateClick={handleClickUpdate}
      snack={snack}
      onSnackClose={handleSnackClose}
      confirmOpen={confirmOpen}
      onConfirmOk={handleConfirmOk}
      onConfirmClose={() => setConfirmOpen(false)}
      faqCounts={countDiffFaqs(faqBefore, faqAfter)}
      noticeCounts={countDiffNotices(noticeBefore, noticeAfter)}
    />
  );
}
