export default async function handler(req, res) {
  const webhookURL = "https://yashufo.app.n8n.cloud/webhook/report-nbn";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({ error: "Failed to connect to backend" });
  }
}