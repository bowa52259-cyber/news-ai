export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 2000,
        messages: messages
      })
    });

    const data = await response.json();

    const text = data.content?.[0]?.text || "無回應";

    res.status(200).json({ result: text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
