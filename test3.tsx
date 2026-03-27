/**
 * FaqNoticeMasterView.tsx
 * ---------------------------------------------
 * よくある質問と回答・お知らせマスタ入力画面（View）
 * 設計書（画面定義書・処理設計書）に準拠した UI レイヤ
 *
 * 役割：
 *  - Controller から受け取った props を元に UI を描画する
 *  - DataGridPro、タブ、ボタン、ダイアログ、Snackbar など
 */

import * as React from "react";
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Button,
  Typography,
  Snackbar,
  Alert,
  Divider
} from "@mui/material";

import {
  DataGridPro,
  jaJP
} from "@mui/x-data-grid-pro";

import TabPanelContainer from "./TabPanelContainer";
import ConfirmUpdateDialog from "./ConfirmUpdateDialog";
import { createFaqColumns, createNoticeColumns } from "./FaqNoticeMasterGridLogic";

import { FaqItem, NoticeItem, Counts } from "./MasterModels";

export interface FaqNoticeMasterViewProps {
  tabValue: number;
  onTabChange: (e: any, v: number) => void;

  faqRows: FaqItem[];
  noticeRows: NoticeItem[];

  onFaqChange: (id: any, field: keyof FaqItem, value: any) => void;
  onNoticeChange: (id: any, field: keyof NoticeItem, value: any) => void;

  onAddFaq: () => void;
  onAddNotice: () => void;

  onUpdateClick: () => void;

  snack: { open: boolean; message: string };
  onSnackClose: () => void;

  confirmOpen: boolean;
  onConfirmOk: () => void;
  onConfirmClose: () => void;

  faqCounts: Counts;
  noticeCounts: Counts;
}

export default function FaqNoticeMasterView(props: FaqNoticeMasterViewProps) {
  const {
    tabValue,
    onTabChange,

    faqRows,
    noticeRows,
    onFaqChange,
    onNoticeChange,

    onAddFaq,
    onAddNotice,

    onUpdateClick,

    snack,
    onSnackClose,

    confirmOpen,
    onConfirmOk,
    onConfirmClose,

    faqCounts,
    noticeCounts,
  } = props;

  /* ============================================
   * DataGridPro 列定義（Controller へ値更新を委譲）
   * ============================================ */
  const faqColumns = React.useMemo(
    () => createFaqColumns(onFaqChange),
    [onFaqChange]
  );

  const noticeColumns = React.useMemo(
    () => createNoticeColumns(onNoticeChange),
    [onNoticeChange]
  );

  /* ============================================
   * レンダリング
   * ============================================ */
  return (
    <Box sx={{ py: 2 }}>
      {/* 画面タイトル（設計書：画面項目より） */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        よくある質問と回答・お知らせマスタ 入力
      </Typography>

      {/* タブ */}
      <Tabs value={tabValue} onChange={onTabChange}>
        <Tab label="よくある質問と回答" />
        <Tab label="お知らせ" />
      </Tabs>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ タブ                                                            */}
      {/* ------------------------------------------------------------------ */}
      <TabPanelContainer value={tabValue} index={0}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <DataGridPro
            rows={faqRows}
            columns={faqColumns}
            autoHeight
            density="compact"
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            pinnedColumns={{ left: ["deleteFlag"] }}  // 左端固定（設計書）
            disableRowSelectionOnClick
            hideFooter                                      // 設計書仕様：フッター非表示
            rowHeight={50}                                  // 50px（設計書仕様）
            sx={{
              height: 50 * 5,                               // 5件表示（仕様）
            }}
          />

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onAddFaq}>
              行追加（新規）
            </Button>

            <Box flex={1} />

            <Button variant="contained" onClick={onUpdateClick}>
              更新
            </Button>

            <Button onClick={() => window.close()}>
              閉じる
            </Button>
          </Stack>
        </Stack>
      </TabPanelContainer>

      {/* ------------------------------------------------------------------ */}
      {/* お知らせタブ                                                       */}
      {/* ------------------------------------------------------------------ */}
      <TabPanelContainer value={tabValue} index={1}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <DataGridPro
            rows={noticeRows}
            columns={noticeColumns}
            autoHeight
            density="compact"
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            pinnedColumns={{ left: ["deleteFlag"] }}
            disableRowSelectionOnClick
            hideFooter
            rowHeight={50}
            sx={{
              height: 50 * 5,
            }}
          />

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onAddNotice}>
              行追加（新規）
            </Button>

            <Box flex={1} />

            <Button variant="contained" onClick={onUpdateClick}>
              更新
            </Button>

            <Button onClick={() => window.close()}>
              閉じる
            </Button>
          </Stack>
        </Stack>
      </TabPanelContainer>

      {/* ------------------------------------------------------------------ */}
      {/* ✅ 件数確認ダイアログ                                               */}
      {/* ------------------------------------------------------------------ */}
      <ConfirmUpdateDialog
        open={confirmOpen}
        faqCounts={faqCounts}
        noticeCounts={noticeCounts}
        onOk={onConfirmOk}
        onClose={onConfirmClose}
      />

      {/* ------------------------------------------------------------------ */}
      {/* ✅ Snackbar                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={onSnackClose}
      >
        <Alert severity="info" onClose={onSnackClose}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
