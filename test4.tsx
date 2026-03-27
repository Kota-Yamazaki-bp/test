/**
 * MasterModels.ts (Input Screen)
 * ---------------------------------------------
 * よくある質問と回答・お知らせマスタ「入力画面」用のモデル定義。
 *
 * 設計書：
 *  - 【SCKB】基本設計書_4.6.1_画面定義書（入力画面）[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
 *  - 【SCKB】詳細設計書_4.8.1_処理設計（入力画面）[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
 */

export type ID = string | number;

/* ============================================================
 * FAQ（よくある質問と回答）入力行データ
 * ============================================================ */
export interface FaqItem {
  id: ID;                    // FAQ管理番号（設計書：hidden項目）[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
  category: string;          // カテゴリ（文字列項目）[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  question: string;          // 質問[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  answer: string;            // 回答[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  startDate: string | null;  // 有効期限開始日 (YYYY-MM-DD)[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  endDate: string | null;    // 有効期限終了日 (YYYY-MM-DD)[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  deleteFlag?: boolean;      // 削除フラグ（0/1 ⇒ boolean）[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
}

/* ============================================================
 * お知らせ入力行データ
 * ============================================================ */
export interface NoticeItem {
  id: ID;                    // お知らせID（FAQ管理番号と同型）[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
  message: string;           // メッセージ内容（画面項目）[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  startDate: string | null;  // 有効期限開始日[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  endDate: string | null;    // 有効期限終了日[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
  deleteFlag?: boolean;      // 削除フラグ[1](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7B10A1F3A4-3E0B-4441-AA96-71BEE681018F%7D&file=%E3%80%90SCKB%E3%80%91%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88%E6%9B%B8_4.8.1_%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E5%87%A6%E7%90%86%E8%A8%AD%E8%A8%88%E6%9B%B8_%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94_%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2.xlsx&action=default&mobileredirect=true)
}

/* ============================================================
 * 更新件数（確認画面・ダイアログに渡す）
 * ============================================================ */
export interface Counts {
  create: number;            // 新規件数[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
  update: number;            // 更新件数[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
  delete: number;            // 削除件数[2](https://nttdatajpprod-my.sharepoint.com/personal/kota14_yamazaki_bp_jp_nttdata_com/_layouts/15/Doc.aspx?sourcedoc=%7BFCD33588-DD1F-40A8-AD81-2A48DA42925B%7D&file=%E3%80%90SCKB%E3%80%91%E5%9F%BA%E6%9C%AC%E8%A8%AD%E8%A8%88%E6%9B%B8_4.6.1._%E3%83%A6%E3%83%BC%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E8%A8%AD%E8%A8%88_%E7%94%BB%E9%9D%A2%E5%AE%9A%E7%BE%A9%E6%9B%B8%EF%BC%88%E3%82%88%E3%81%8F%E3%81%82%E3%82%8B%E8%B3%AA%E5%95%8F%E3%81%A8%E5%9B%9E%E7%AD%94%E3%83%BB%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E3%83%9E%E3%82%B9%E3%82%BF%E5%85%A5%E5%8A%9B%E7%94%BB%E9%9D%A2%EF%BC%89.xlsx&action=default&mobileredirect=true)
}

/* ============================================================
 * 差分セット（確認画面への入力）
 * ============================================================ */
export interface FaqChangeSet {
  create: FaqItem[];
  update: FaqItem[];
  remove: FaqItem[];
}

export interface NoticeChangeSet {
  create: NoticeItem[];
  update: NoticeItem[];
  remove: NoticeItem[];
}

/* ============================================================
 * 確認画面へ渡す Payload
 * ============================================================ */
export interface ConfirmPayload {
  faq: FaqChangeSet;
  notice: NoticeChangeSet;
  faqCounts: Counts;
  noticeCounts: Counts;
}
