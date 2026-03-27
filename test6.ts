/**
 * InputInfomationFaqsConfirm.spec.ts
 * ------------------------------------------------------------------
 * よくある質問と回答・お知らせマスタ【確認画面】の統合テスト。
 *
 * 対象コンポーネント：
 *  - ConfirmCountsSummaryPage.tsx
 *
 * テスト内容：
 *  1. 件数（FAQ / お知らせ）が表示される
 *  2. 戻るボタンが動作する
 *  3. OK ボタンで executeAllUpdates が呼ばれる
 *  4. 更新成功後 Snackbar が表示される
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ConfirmCountsSummaryPage from "@/pages/ConfirmCountsSummaryPage";
import { executeAllUpdates } from "@/pages/ConfirmUpdateOrchestrator";

import {
  ConfirmPayload,
  Counts,
} from "@/pages/ConfirmDomainModels";

/* ============================================================
 *  更新処理（executeAllUpdates）をモック化
 * ============================================================ */
vi.mock("@/pages/ConfirmUpdateOrchestrator", () => ({
  executeAllUpdates: vi.fn(() => Promise.resolve()),
}));

/* ============================================================
 * テスト用ダミーデータ（要件準拠）
 * ============================================================ */
const countsFaq: Counts = { create: 1, update: 2, delete: 1 };
const countsNotice: Counts = { create: 0, update: 1, delete: 0 };

const dummyPayload: ConfirmPayload = {
  faq: {
    create: [{ id: "NEW_1", category: "A", question: "Q1", answer: "A1", startDate: "2026-01-01", endDate: "2026-12-31" }],
    update: [],
    remove: [],
  },
  notice: {
    create: [],
    update: [{ id: 2, message: "変更", startDate: "2026-01-01", endDate: "2026-12-31" }],
    remove: [],
  },
  faqCounts: countsFaq,
  noticeCounts: countsNotice,
};

/* ============================================================
 * テスト本体
 * ============================================================ */
describe("InputInfomationFaqsConfirm（確認画面）", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------
   * 1. 件数が表示される
   * ------------------------------------------------------------ */
  it("FAQ/お知らせの件数が画面に表示される", async () => {
    render(
      <ConfirmCountsSummaryPage
        payload={dummyPayload}
        onBack={() => {}}
        onCompleted={() => {}}
      />
    );

    expect(screen.getByText("新規 1")).toBeInTheDocument();
    expect(screen.getByText("更新 2")).toBeInTheDocument();
    expect(screen.getByText("削除 1")).toBeInTheDocument();

    expect(screen.getByText("新規 0")).toBeInTheDocument();
    expect(screen.getByText("更新 1")).toBeInTheDocument();
    expect(screen.getByText("削除 0")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * 2. 戻るボタンが押されたとき onBack が呼ばれる
   * ------------------------------------------------------------ */
  it("戻るボタンで onBack が呼ばれる", async () => {
    const backHandler = vi.fn();

    render(
      <ConfirmCountsSummaryPage
        payload={dummyPayload}
        onBack={backHandler}
        onCompleted={() => {}}
      />
    );

    fireEvent.click(screen.getByText("戻る"));

    expect(backHandler).toHaveBeenCalled();
  });

  /* ------------------------------------------------------------
   * 3. OK ボタンで executeAllUpdates が呼ばれる
   * ------------------------------------------------------------ */
  it("OKクリックで executeAllUpdates が呼ばれる", async () => {
    render(
      <ConfirmCountsSummaryPage
        payload={dummyPayload}
        onBack={() => {}}
        onCompleted={() => {}}
      />
    );

    fireEvent.click(screen.getByText("OK"));

    await waitFor(() => {
      expect(executeAllUpdates).toHaveBeenCalled();
    });
  });

  /* ------------------------------------------------------------
   * 4. 更新処理が成功すると Snackbar が表示される
   * ------------------------------------------------------------ */
  it("更新成功後 Snackbar が表示される", async () => {
    const completedHandler = vi.fn();

    render(
      <ConfirmCountsSummaryPage
        payload={dummyPayload}
        onBack={() => {}}
        onCompleted={completedHandler}
      />
    );

    fireEvent.click(screen.getByText("OK"));

    await waitFor(() => {
      expect(completedHandler).toHaveBeenCalled();
    });
  });
});
