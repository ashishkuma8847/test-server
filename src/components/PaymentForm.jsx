import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const PaymentForm = ({ theme, selectedpaid }) => {
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const Plan = typeof window !== "undefined" ? localStorage.getItem("title") : null;
  const Price = typeof window !== "undefined" ? localStorage.getItem("price") : null;
  console.log(151, images);

  // Convert file → Base64 (only the data portion, no mime prefix)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result || "";
        const parts = result.split(",");
        resolve(parts[1] || "");
      };
      reader.onerror = (error) => reject(error);
    });

  const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images || !email) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }
    setLoading(true);

    try {

      // POST to your serverless function (server holds webhook)
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // filename: file.name,
          image: images[0],
          plan: Plan,
          price: Price,
          email,
          whatsapp,
          transactionId,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        toast.success("Payment Proof Uploaded Successfully!");
        setTransactionId("");
        setEmail("");
        setWhatsapp("");
        setFile(null);
      } else {
        toast.error(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Client error:", error);
      toast.error("❌ Client error");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setLoading(true);
    setError(null);

    try {
      const newImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const API_KEY = '8fde1ea6a0bc5fb0cde18eb19bd3673f';
        const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;

        const data = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (data.data.success) {
          newImages.push(data.data.data.url);
        } else {
          setError('Image upload failed!');
        }
      }
      setImages((prevImages) => [...prevImages, ...newImages]);

    } catch (err) {
      setError('An error occurred during the upload.');
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
          className="w-full px-4 py-3 rounded-lg border bg-transparent border-[#12BBB6]/50"
        />

        <div>
          <label className="text-lg mb-2">Payment Proof</label>
          <input
            required
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full file:bg-customTeal file:border-none file:rounded-lg file:px-4 file:py-2 font-poppins file:text-white"
          />
          <p className="text-sm text-gray-500 mt-2">Max file size: 4 MB</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-[#12BBB6] text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
