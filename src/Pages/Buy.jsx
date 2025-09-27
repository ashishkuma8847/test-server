import { useTheme } from "../components/Themetoggel/ThemeProvider"; 
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"; // (not used here but imported, maybe for future animation)
import AOS from "aos"; // ✅ Scroll animation library
import "aos/dist/aos.css";
import DropdownButton from "../components/Cards/DropdownButton"; // ✅ Custom dropdown
import PaymentMethods from "../components/Cards/PaymentMethods"; // ✅ Different payment options
import { Link } from "react-router-dom"; // (not used here currently)
import PaymentForm from "../components/PaymentForm"; // ✅ User submits payment proof/details

const Buy = () => {
  // ✅ Global theme state (light/dark)
  const { theme } = useTheme();

  // ✅ Card content & style states
  const [message, setMessage] = useState("Hello! Check this out 👋");
  const [bgColor, setBgColor] = useState("#12BBB6"); // Default background color
  const [fontSize, setFontSize] = useState(18);      // Default font size
  const [radius, setRadius] = useState(16);          // Default corner radius
  const [imageSrc, setImageSrc] = useState(null);    // Uploaded image
  const [savedName, setSavedName] = useState("");    // Style name for saving
  const fileInputRef = useRef(null);                 // Reference for file input

  // ✅ Initialize AOS animations once on mount
  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  // ✅ Save current design/style in localStorage
  function saveStyle(name) {
    if (!name) {
      alert("Please enter a name to save the style.");
      return;
    }
    const payload = { message, bgColor, fontSize, radius, imageSrc };
    localStorage.setItem(`sharecard_style_${name}`, JSON.stringify(payload));
    alert(`Style saved as "${name}"`);
    setSavedName("");
  }

  // ✅ Handle image upload (convert to Base64 string for preview/storage)
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  // ✅ Share text directly to WhatsApp
  function shareToWhatsApp() {
    const text = `${message}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  // ✅ Dropdown selected value (payment method)
  const [SelectedValue, setSelectedValue] = useState();
  // ✅ Selected payment confirmation value (from PaymentMethods)
  const [selectedpaid, setSelectedpaid] = useState();
  console.log(selectedpaid);

  return (
    <section className={`${theme ? "text-black" : "text-white"}`}>
      <div className="container">
        <div className="pt-[70px] font-poppins flex flex-col sm:flex-row sm:justify-between sm:items-center gap-10 sm:pt-[100px] pb-[90px]">
          
          {/* ============================
              PAYMENT METHOD SELECTION
          ============================ */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="font-semibold text-2xl sm:text-4xl">
                Choose Paym
                <span className="text-customTeal">ent Method</span>
              </h1>

              {/* ✅ Dropdown for selecting method */}
              <DropdownButton
                options={[
                  "Binance Pay",
                  "Bank Transfer",
                  "JazzCash",
                  "Easypaisa",
                  "UPI",
                  "Fampay"
                ]}
                onChange={(val) => setSelectedValue(val)}
              />
            </div>

            {/* ✅ Show payment details section only when method selected */}
            {SelectedValue && (
              <>
                <PaymentMethods
                  value={SelectedValue}
                  Paid={(paid) => setSelectedpaid(paid)} // ✅ Get user payment status
                />
                <p className="text-sm mx-auto text-customTeal">
                  After Payment Please Submit your Details
                </p>
              </>
            )}
          </div>

          {/* ✅ Final payment form (for user to submit transaction ID, proof, etc.) */}
          <PaymentForm selectedpaid={selectedpaid} />
        </div>
      </div>
    </section>
  );
};

export default Buy;
