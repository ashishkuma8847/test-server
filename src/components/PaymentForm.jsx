import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PaymentForm = ({ theme, selectedpaid }) => {
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const Plan = localStorage.getItem("title");
  const Price = localStorage.getItem("price");

  // Convert file → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !email) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const fileBase64 = await toBase64(file);

      const buffer = Uint8Array.from(atob(fileBase64), (c) => c.charCodeAt(0));
      const blob = new Blob([buffer], { type: file.type });

      const webhookUrl = "https://discord.com/api/webhooks/1419305076610175076/SOqNQ_cpDMqkWzc3odG-p6RMi7oz6C8Nn2IY6bxWNmuPwQMezSnMe66EH9fHfzK1CKkY";

      const payload = {
  username: "Payment Bot",
  embeds: [
    {
      title: "💸 New Payment Proof",
      color: 0x12bbb6,
      fields: [
        { 
          name: "📄 Filename", 
          value: `[${file.name}](attachment://${file.name})`, // 👈 clickable link
          inline: true 
        },
        { name: "💼 Plan", value: Plan || "N/A", inline: true },
        { name: "💰 Price", value: `$${Price || "N/A"}`, inline: true },
        { name: "📧 Email", value: email, inline: false },
        { name: "📱 WhatsApp", value: whatsapp || "Not provided", inline: false },
        { name: "🆔 Transaction ID", value: transactionId || "Not provided", inline: false },
      ],
      timestamp: new Date().toISOString(),
    },
  ],
};

      // FormData with file
      const form = new FormData();
      form.append("payload_json", JSON.stringify(payload));
      form.append("file", blob, file.name);

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        toast.success("✅ Payment Proof Uploaded Successfully!");
        setTransactionId("");
        setEmail("");
        setWhatsapp("");
        setFile(null);
      } else {
        toast.error("❌ Error sending to Discord");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Client error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[600px] w-full mx-auto gap-9 ${selectedpaid ? "block" : "hidden"
        }`}
    >
      <Toaster position="top-center" />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-transparent   border-[#12BBB6]/50"
        />

        <div>
          <label className="text-lg mb-2">Payment Proof</label>
          <input
            required
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full file:bg-customTeal file:border-none file:rounded-lg file:px-4 file:py-2 font-poppins file:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg  bg-[#12BBB6] text-white font-semibold"
        >
          {loading ? "Uploading..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
