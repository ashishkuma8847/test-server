import React from "react";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";

// ChatButtons component banaya gaya hai jo 2 button (Discord & WhatsApp) dikhata hai
const ChatButtons = () => {
  // Discord button click hone par Discord profile open hoga
  const openDiscord = () => {
    window.open("https://discord.com/users/erenxiters", "_blank"); // "_blank" naya tab open karta hai
  };

  // WhatsApp button click hone par WhatsApp chat open hogi
  const openWhatsapp = () => {
    window.open("https://wa.me/923313705252", "_blank"); // WhatsApp API link
  };

  return (
    <div className="flex gap-4 mt-8">
      {/* Discord Button */}
      <button
        onClick={openDiscord} // button click hone par openDiscord function chalega
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
      >
        {/* Discord Icon */}
        <FaDiscord size={24} />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsapp} // button click hone par openWhatsapp function chalega
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1DA851] text-white transition-colors"
      >
        {/* WhatsApp Icon */}
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default ChatButtons; // component export kiya gaya hai
