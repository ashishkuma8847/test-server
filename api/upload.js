// api/upload.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { image, plan, price, email, whatsapp, transactionId } = body;

    if (!image || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const webhookUrl = "https://discord.com/api/webhooks/1419305076610175076/SOqNQ_cpDMqkWzc3odG-p6RMi7oz6C8Nn2IY6bxWNmuPwQMezSnMe66EH9fHfzK1CKkY";

    const payload = {
      username: "Payment Bot",
      embeds: [
        {
          title: "💸 New Payment Proof",
          color: 0x12bbb6,
          fields: [
            { name: "💼 Plan", value: plan || "N/A", inline: true },
            { name: "💰 Price", value: `$${price || "N/A"}`, inline: true },
            { name: "📧 Email", value: email, inline: false },
            { name: "📱 WhatsApp", value: whatsapp || "Not provided", inline: false },
            { name: "🆔 Transaction ID", value: transactionId || "Not provided", inline: false },
          ],
          image: { url: image },
          timestamp: new Date().toISOString(),
        },
      ],
    };
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      return res.status(502).json({ error: "Failed to send to Discord" });
    }

    return res.status(200).json({ message: "✅ Payment sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
