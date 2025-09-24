import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
export default function DropdownButton({
  options = ["Option A", "Option B", "Option C"],
  onChange,
}) {
  const ACCENT = "#12BBB6";
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function handleSelect(opt) {
    setSelected(opt);
    setOpen(false);
    if (onChange) onChange(opt);
  }

  return (
    <div className="relative inline-block font-poppins" ref={ref}>
      {/* Main Button */}
      <button
        onClick={() => setOpen((s) => !s)}
        className={`${selected ? "text-customTeal" : "text-white"} px-6 py-3 rounded-xl font-semibold shadow-lg backdrop-blur-md border transition-all flex items-center gap-2`}
        style={{
          background: "rgba(18, 187, 182, 0.15)",
          borderColor: ACCENT,
          
        }}
      >
        {selected || "Select an option"}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <FiChevronDown/>
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute mt-2 w-56 rounded-xl shadow-xl backdrop-blur-lg border overflow-hidden z-50"
            style={{
             
              borderColor: ACCENT,
            }}
          >
            {options.map((opt, i) => {
              const isActive = selected === opt;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-5 py-3 text-white text-[16px] font-semibold transition-all"
                  style={{
                    background: isActive
                      ? "rgba(18,187,182,0.12)"
                      : "transparent",
                    color: isActive ? ACCENT : "",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
