# 最終合併包（Vercel 安全版）

已幫你完成：
- 將首頁 `public/index.html` 插入導覽按鈕 → 連到 `public/1141012學務處各組.html`
- 放入安全版 `1141012學務處各組.html`（前端改走 `/api/generate`，不外露金鑰）
- 加上後端 `api/generate.js`（Vercel Serverless Function）
- 加上 `vercel.json`（Node.js 20）

## 使用方式
1) 整個資料夾上傳到 GitHub。
2) 到 Vercel → Import 這個 repo。
3) 在 Project Settings → Environment Variables 新增：
   - `OPENAI_API_KEY` = 你的 OpenAI 金鑰
4) Deploy 後，打開首頁，點「前往學務處各組（AI）」即可進入 AI 頁面。

> 若你已經有既有的 public 內容，也可以把這裡的 public 檔案合併過去即可。
