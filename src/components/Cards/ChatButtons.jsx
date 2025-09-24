import React from "react";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";

const ChatButtons = () => {
  const openDiscord = () => {
    window.open("https://discord.com/users/erenxiters", "_blank");
  };

  const openWhatsapp = () => {
    window.open("https://wa.me/923313705252", "_blank");
  };

  return (
    <div className="flex gap-4 mt-8">
      {/* Discord Button */}
      <button
        onClick={openDiscord}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
      >
        <FaDiscord size={24} />
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={openWhatsapp}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1DA851] text-white transition-colors"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default ChatButtons;
