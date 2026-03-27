/**
 * FaqNoticeMasterGridLogic.ts
 * ---------------------------------------------
 * よくある質問と回答・お知らせマスタ入力画面の
 * DataGridPro 専用ロジック（列定義 / 値変換 / 編集ハンドリング）
 *
 * ・UI（View）には一切依存しない
 * ・Controller が提供するハンドラ(callback) を内部で呼び出す
 * ・DataGridPro を扱うためのロジックのみ担当する
 */

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { FaqItem, NoticeItem } from "./MasterModels";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/* ============================================================
 * FAQ 列定義
 * ============================================================ */
export function createFaqColumns(
  onChange: (id: any, field: keyof FaqItem, value: any) => void
): GridColDef<FaqItem>[] {
  return [
    {
      field: "deleteFlag",
      headerName: "削除",
      width: 70,
      type: "boolean",
      editable: true,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "category",
      headerName: "カテゴリ",
      flex: 1,
      editable: true
    },
    {
      field: "question",
      headerName: "質問",
      flex: 1.3,
      editable: true
    },
    {
      field: "answer",
      headerName: "回答",
      flex: 1.3,
      editable: true
    },
    {
      field: "startDate",
      headerName: "有効期限開始日",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams<FaqItem, string | null>) => (
        <DatePicker
          value={params.value ? dayjs(params.value) : null}
          onChange={(d) => {
            onChange(params.id, "startDate", d ? d.format("YYYY-MM-DD") : null);
          }}
          slotProps={{ textField: { size: "small" } }}
        />
      ),
    },
    {
      field: "endDate",
      headerName: "有効期限終了日",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams<FaqItem, string | null>) => (
        <DatePicker
          value={params.value ? dayjs(params.value) : null}
          onChange={(d) => {
            onChange(params.id, "endDate", d ? d.format("YYYY-MM-DD") : null);
          }}
          slotProps={{ textField: { size: "small" } }}
        />
      ),
    },
  ];
}

/* ============================================================
 * お知らせ 列定義
 * ============================================================ */
export function createNoticeColumns(
  onChange: (id: any, field: keyof NoticeItem, value: any) => void
): GridColDef<NoticeItem>[] {
  return [
    {
      field: "deleteFlag",
      headerName: "削除",
      width: 70,
      type: "boolean",
      editable: true,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "message",
      headerName: "メッセージ内容",
      flex: 1.8,
      editable: true
    },
    {
      field: "startDate",
      headerName: "有効期限開始日",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams<NoticeItem, string | null>) => (
        <DatePicker
          value={params.value ? dayjs(params.value) : null}
          onChange={(d) => {
            onChange(params.id, "startDate", d ? d.format("YYYY-MM-DD") : null);
          }}
          slotProps={{ textField: { size: "small" } }}
        />
      ),
    },
    {
      field: "endDate",
      headerName: "有効期限終了日",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams<NoticeItem, string | null>) => (
        <DatePicker
          value={params.value ? dayjs(params.value) : null}
          onChange={(d) => {
            onChange(params.id, "endDate", d ? d.format("YYYY-MM-DD") : null);
          }}
          slotProps={{ textField: { size: "small" } }}
        />
      ),
    },
  ];
}

/* ============================================================
 * 補助関数群
 * ============================================================ */

/** NEW_ 形式かどうか判定 */
export function isNewRow(id: any): boolean {
  return String(id).startsWith("NEW_");
}

/** 日付を YYYY-MM-DD に正規化 */
export function normalizeDate(d: any): string | null {
  if (!d) return null;
  return dayjs(d).format("YYYY-MM-DD");
}
