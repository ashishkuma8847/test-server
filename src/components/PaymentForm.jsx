import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PaymentForm = ({ theme, selectedpaid }) => {
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert file to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
const Plan=localStorage.getItem("title")
const Price=localStorage.getItem("price")
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !email) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const fileBase64 = await toBase64(file);

      // ✅ Netlify endpoint
      const response = await fetch("/.netlify/functions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          fileBase64,
          plan: Plan,   // static for now
          price: Price,            // static for now
          email,
          whatsapp,
          transactionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Payment Proof Uploaded Successfully!");
        setTransactionId("");
        setEmail("");
        setWhatsapp("");
        setFile(null);
      } else {
        toast.error(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[600px] w-full mx-auto gap-9 ${
        selectedpaid ? "block" : "hidden"
      }`}
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <Toaster position="top-center" />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className={`${
            theme && "placeholder-customBlack"
          } w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-transparent border border-[#12BBB6]/50 focus:outline-none focus:ring-2 focus:ring-[#12BBB6]`}
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${
            theme && "placeholder-customBlack"
          } w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-transparent border border-[#12BBB6]/50 focus:outline-none focus:ring-2 focus:ring-[#12BBB6]`}
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className={`${
            theme && "placeholder-customBlack"
          } w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-transparent border border-[#12BBB6]/50 focus:outline-none focus:ring-2 focus:ring-[#12BBB6]`}
        />

        <div className="flex flex-col gap-1">
          <label className="text-lg mb-2">Payment Proof</label>
          <input
            required
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full flex flex-col px-4 py-2 rounded-lg backdrop-blur-sm bg-transparent border border-[#12BBB6]/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#12BBB6] file:text-white hover:file:bg-[#0ea59d] cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#12BBB6] font-semibold text-lg transition-all duration-300 hover:bg-[#0ea59d] text-white hover:scale-[1.02] shadow-lg shadow-[#12BBB6]/40 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
