import { useTheme } from "../components/Themetoggel/ThemeProvider";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import DropdownButton from "../components/Cards/DropdownButton";
import PaymentMethods from "../components/Cards/PaymentMethods";
import { Link } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

const Buy = () => {
  const { theme } = useTheme();

  // Content state
  const [message, setMessage] = useState("Hello! Check this out 👋");
  const [bgColor, setBgColor] = useState("#12BBB6"); // default as requested
  const [fontSize, setFontSize] = useState(18);
  const [radius, setRadius] = useState(16);
  const [imageSrc, setImageSrc] = useState(null);
  const [savedName, setSavedName] = useState("");
  const fileInputRef = useRef(null);

  // Load AOS on mount
  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  // Save style
  function saveStyle(name) {
    if (!name) {
      alert("Please enter a name to save the style.");
      return;
    }
    const payload = { message, bgColor, fontSize, radius, imageSrc };
    localStorage.setItem(`sharecard_style_${name}`, JSON.stringify(payload));
    alert(`Style saved as \"${name}\"`);
    setSavedName("");
  }



  // Upload image
  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target.result);
    reader.readAsDataURL(file);
  }

  // Share to WhatsApp
  function shareToWhatsApp() {
    const text = `${message}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }
  const [SelectedValue, setSelectedValue] = useState()
  const [selectedpaid, setSelectedpaid] = useState()
  console.log(selectedpaid)
  return (
    <section className={`${theme ? "text-black" : "text-white"}`}>
      <div className="container">
        <div className="pt-[70px] font-poppins flex flex-col gap-10 sm:pt-[100px] pb-[90px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="font-semibold text-2xl sm:text-4xl">Choose Paym<span className="text-customTeal">ent Method</span></h1>
              <DropdownButton
                options={["Binance Pay", "Bank Transfer", "JazzCash", "Easypaisa", "UPI", "Fampay"]}
                onChange={(val) => setSelectedValue(val)}
              />
            </div>
            {
              SelectedValue &&
              <>
                <PaymentMethods value={SelectedValue} Paid={(paid) => setSelectedpaid(paid)} />
                <p className="text-sm mx-auto text-customTeal">After Payment Please Submit your Details</p>
              </>
            }
          </div>

          <PaymentForm selectedpaid={selectedpaid}/>
        </div>
      </div>
    </section>
  );
};

export default Buy;
