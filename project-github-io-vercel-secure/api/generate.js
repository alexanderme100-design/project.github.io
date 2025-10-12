// api/generate.js - Vercel Serverless Function
// 設定 OPENAI_API_KEY 於 Vercel 專案的 Environment Variables
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENAI_API_KEY in environment." });
    return;
  }
  try {
    const { prompt = "" } = req.body || {};
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: String(prompt) }],
        max_tokens: 512
      })
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}
