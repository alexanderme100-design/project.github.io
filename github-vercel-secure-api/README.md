# GitHub + Vercel 安全 API 範例（免安裝）

這個專案讓你把前端放在 GitHub、部署到 Vercel，並且**不會把 API Key 暴露在前端**。  
前端只呼叫 `/api/generate`（Serverless Function），金鑰放在 Vercel 的 **Environment Variables**。

## 一鍵部署（建議）
1. 先把此專案上傳到你的 GitHub。
2. 進到 Vercel，選擇「Import Git Repository」，選取此專案。
3. 在 Project Settings → Environment Variables 新增：

   | Name | Value |
   |------|-------|
   | `OPENAI_API_KEY` | 你的 OpenAI 金鑰 |

4. Deploy 後，開啟產生的網址即可使用。

> 你也可以用「Deploy with Vercel」按鈕：把下面的 `<YOUR_REPO_URL>` 換成你自己的 GitHub repo 網址，再打開此連結：  
> https://vercel.com/new/clone?repository-url=<YOUR_REPO_URL>&env=OPENAI_API_KEY

## 專案結構
```text
/public/index.html      # 靜態前端（無任何金鑰）
/api/generate.js        # Vercel Serverless Function，讀取 OPENAI_API_KEY，代呼 OpenAI
vercel.json             # 指定 Node.js 版本（可選）
```

## 本專案要點
- 前端不含金鑰，**永遠不要把金鑰放到 HTML / JS**。
- 後端（Serverless Function）從環境變數讀取金鑰，安全代呼第三方 API。
- 部署不需要在你的電腦安裝任何程式，全部在瀏覽器完成。

## 修改為其他 AI 供應商
- 編輯 `api/generate.js`，把 `fetch("https://api.openai.com/v1/chat/completions", ...)` 換成你的 API 即可。
- 原則相同：金鑰只在伺服器端（環境變數）使用。
```
