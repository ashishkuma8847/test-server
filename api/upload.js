import fetch from "node-fetch";
import FormData from "form-data";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { filename, fileBase64, plan, price, email, whatsapp, transactionId } = req.body;

    if (!filename || !fileBase64 || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const buffer = Buffer.from(fileBase64, "base64");
    const webhookUrl = process.env.DISCORD_WEBHOOK;
    if (!webhookUrl) {
      return res.status(500).json({ error: "Discord webhook not configured" });
    }

    const payload = {
      username: "Payment Bot",
      embeds: [
        {
          title: "💸 New Payment Proof",
          color: 0x12bbb6,
          fields: [
            { name: "📄 Filename", value: filename, inline: true },
            { name: "💼 Plan", value: plan || "N/A", inline: true },
            { name: "💰 Price", value: `$${price || "N/A"}`, inline: true },
            { name: "📧 Email", value: email, inline: false },
            { name: "📱 WhatsApp", value: whatsapp || "Not provided", inline: false },
            { name: "🆔 Transaction ID", value: transactionId || "Not provided", inline: false },
          ],
          image: { url: `attachment://${filename}` },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const form = new FormData();
    form.append("payload_json", JSON.stringify(payload));
    form.append("file", buffer, filename);

    await fetch(webhookUrl, { method: "POST", body: form });

    return res.status(200).json({ message: "✅ Payment proof sent with image successfully!" });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
