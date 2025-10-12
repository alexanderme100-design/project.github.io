// Vercel Serverless Function (Node.js)
// Keep your API key secret in Vercel Project Settings → Environment Variables: OPENAI_API_KEY
module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const userPrompt = typeof body.prompt === "string" ? body.prompt : "";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing OPENAI_API_KEY. Set it in Vercel → Project → Settings → Environment Variables." });
      return;
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userPrompt }],
        max_tokens: 200
      })
    });

    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}
