/**
 * InputInfomationFaqs.spec.ts
 * ------------------------------------------------------------------
 * 入力画面（FaqNoticeMasterController + View + GridLogic）の結合テスト。
 * - 初期表示
 * - タブ切替
 * - 行追加（FAQ/お知らせ）
 * - 更新ボタン → 件数確認 → onRequestConfirm 実行
 * - バリデーション発火（最小限）
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FaqNoticeMasterController from "@/pages/FaqNoticeMasterController";

/* ============================================================
 * API モック
 * ============================================================ */
vi.mock("@/pages/MasterApiClient", () => ({
  fetchFaqs: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        category: "一般",
        question: "Q1",
        answer: "A1",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        deleteFlag: false,
      },
    ])
  ),
  fetchNotices: vi.fn(() =>
    Promise.resolve([
      {
        id: 11,
        message: "お知らせ1",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        deleteFlag: false,
      },
    ])
  ),
}));

describe("InputInfomationFaqs (入力画面) E2Eテスト", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  /* ------------------------------------------------------------
   * 初期表示
   * ------------------------------------------------------------ */
  it("初期表示でタイトルが表示される", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    expect(
      await screen.findByText("よくある質問と回答・お知らせマスタ 入力")
    ).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * タブ切替
   * ------------------------------------------------------------ */
  it("タブが切り替わる（FAQ → お知らせ）", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    // タブがある
    const faqTab = await screen.findByText("よくある質問と回答");
    const noticeTab = await screen.findByText("お知らせ");

    expect(faqTab).toBeInTheDocument();
    expect(noticeTab).toBeInTheDocument();

    // お知らせタブをクリック
    fireEvent.click(noticeTab);

    // DataGrid 内のお知らせ内容が見えるか軽くチェック
    expect(await screen.findByText("お知らせ1")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * FAQ 行追加
   * ------------------------------------------------------------ */
  it("FAQ行追加ボタンで新規行が1件増える", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    // 「行追加」ボタンを押す
    const addButton = await screen.findByText("行追加（新規）");
    fireEvent.click(addButton);

    // 新規行は削除チェックボックスを持つため、checkbox の数で判定
    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(1);
  });

  /* ------------------------------------------------------------
   * お知らせ 行追加
   * ------------------------------------------------------------ */
  it("お知らせタブで行追加が可能", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    // お知らせタブへ切替
    fireEvent.click(await screen.findByText("お知らせ"));

    // 追加ボタンクリック
    const addButton = await screen.findByText("行追加（新規）");
    fireEvent.click(addButton);

    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(1);
  });

  /* ------------------------------------------------------------
   * 更新 → 件数確認ダイアログ表示
   * ------------------------------------------------------------ */
  it("更新ボタンクリックで確認ダイアログが開く", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    // データが1件あるため、値を変更して更新対象を作る
    const cell = await screen.findByText("Q1");

    // セルクリック → 編集 → blur で更新として扱う
    fireEvent.click(cell);

    // 質問フィールド編集（最小限）
    const input = screen.getByDisplayValue("Q1");
    fireEvent.change(input, { target: { value: "Q1変更" } });
    fireEvent.blur(input);

    // 更新クリック
    fireEvent.click(await screen.findByText("更新"));

    // 確認ダイアログ表示
    expect(await screen.findByText("更新内容の確認")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * 更新 → onRequestConfirm にデータが渡される
   * ------------------------------------------------------------ */
  it("確認ダイアログ OK → onRequestConfirm が呼ばれる", async () => {
    const handler = vi.fn();

    render(<FaqNoticeMasterController onRequestConfirm={handler} />);

    // FAQ 編集（Q1 → Q1変更）
    const cell = await screen.findByText("Q1");
    fireEvent.click(cell);

    const input = screen.getByDisplayValue("Q1");
    fireEvent.change(input, { target: { value: "Q1変更" } });
    fireEvent.blur(input);

    // 更新ボタンクリック → 確認表示
    fireEvent.click(await screen.findByText("更新"));

    // OK 押す
    const okBtn = await screen.findByText("OK");
    fireEvent.click(okBtn);

    // handler が呼ばれた確認
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
    });
  });

  /* ------------------------------------------------------------
   * バリデーション
   * ------------------------------------------------------------ */
  it("必須項目エラーが表示される（FAQカテゴリ）", async () => {
    render(<FaqNoticeMasterController onRequestConfirm={() => {}} />);

    const cell = await screen.findByText("一般");

    fireEvent.click(cell);

    const input = screen.getByDisplayValue("一般");
    fireEvent.change(input, { target: { value: "" } }); // 空欄にする
    fireEvent.blur(input);

    expect(await screen.findByText(/カテゴリは必須です/)).toBeInTheDocument();
  });
});
