import fetch from "node-fetch";
import FormData from "form-data";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { filename, fileBase64, plan, price, email, whatsapp, transactionId } = body;

    if (!filename || !fileBase64 || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Base64 → Buffer
    const buffer = Buffer.from(fileBase64, "base64");

    // Uguu upload
    const form = new FormData();
    form.append("files[]", buffer, filename);

    const uguuRes = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      body: form,
    });

    const uguuData = await uguuRes.json();
    if (!uguuData?.files?.[0]?.url) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to upload file to Uguu" }),
      };
    }

    const imageUrl = uguuData.files[0].url;

    // Discord webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK;
if (!webhookUrl) {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Discord webhook not configured" }),
  };
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
          image: { url: imageUrl },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Payment proof sent successfully!",
        imageUrl,
      }),
    };
  } catch (err) {
    console.error("Server Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
