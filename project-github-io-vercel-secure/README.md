# project.github.io（Vercel 安全部署合併版）

這個專案用來把你原本的 GitHub Pages 專案改成 **Vercel 安全版**：
- 前端（`/public`）不含 API Key
- 後端（`/api/generate.js`）代呼 OpenAI，金鑰放在 Vercel 的 Environment Variables

## 一鍵部署
👉 **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https://github.com/alexanderme100-design/project.github.io&env=OPENAI_API_KEY&project-name=project-github-io&repository-name=project-github-io)**

> 如果你之後改變 repo 位置或名稱，請把連結裡的 `repository-url` 改成新的 GitHub 位置。

---

## 放你的原本網站檔案
- 請把你目前 repo 的靜態檔（HTML/CSS/JS、圖片等）放到 **`/public`** 目錄。
- 若你已經有自己的 `index.html`，可以覆蓋這個範例檔。

## 環境變數
- 到 Vercel 專案 Settings → **Environment Variables** 新增：
  - `OPENAI_API_KEY` = 你的 OpenAI 金鑰

## 目錄結構
```text
/public/index.html      # 你的前端頁面（安全，呼叫 /api/generate）
/api/generate.js        # 後端 Serverless Function（Vercel）
vercel.json             # 指定 Node.js 版本
.gitignore
README.md
```

## 怎麼把你頁面接上 AI（不外露金鑰）
在你的任意 JS 檔或 `<script>` 裡，呼叫：
```js
async function askAI(prompt) {
  const r = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  const data = await r.json();
  return data?.choices?.[0]?.message?.content ?? JSON.stringify(data);
}
// 使用範例：
// const text = await askAI("幫我寫一段50字的鼓勵話");
```

## 注意事項
- **不要**在前端放任何 API Key。
- GitHub 只放前端靜態檔與 Serverless function 代碼，金鑰只放 Vercel 的 Environment Variables。
- 若要更多 API（例如 TTS、產檔），在 `/api` 目錄新增 `*.js` 即可，由後端代呼。

---

如果你要，我可以把你現有的 `index.html`/CSS/JS 直接替換到 `/public`，並幫你對接按鈕事件 → 交付一份最終版 ZIP。
