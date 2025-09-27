import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // animation ke liye
import { FiChevronDown } from "react-icons/fi"; // dropdown arrow icon

export default function DropdownButton({
  options = ["Option A", "Option B", "Option C"], // default options agar props na mile
  onChange, // parent se callback function aayega
}) {
  const ACCENT = "#12BBB6"; // accent color define
  const [open, setOpen] = useState(false); // dropdown open/close state
  const [selected, setSelected] = useState(null); // selected option
  const ref = useRef(null); // ref for outside click handling

  // -------- Close Dropdown on Outside Click --------
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); // agar click dropdown ke bahar hua to band ho jaye
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // -------- Select Option Handler --------
  function handleSelect(opt) {
    setSelected(opt); // selected option set karna
    setOpen(false);   // select karne ke baad dropdown close
    if (onChange) onChange(opt); // parent ko callback fire karna
  }

  return (
    <div className="relative inline-block font-poppins" ref={ref}>
      {/* -------- Main Button -------- */}
      <button
        onClick={() => setOpen((s) => !s)} // toggle dropdown
        className={`${
          selected ? "text-customTeal" : "text-white"
        } px-6 py-3 rounded-xl font-semibold shadow-lg backdrop-blur-md border transition-all flex items-center gap-2`}
        style={{
          background: "rgba(18, 187, 182, 0.15)", // transparent teal background
          borderColor: ACCENT,
        }}
      >
        {/* Agar select hua hai to wahi dikhayega, warna default "Select an option" */}
        {selected || "Select an option"}
        
        {/* Dropdown Arrow (rotate on open/close) */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }} // open hone par rotate
          transition={{ duration: 0.25 }}
        >
          <FiChevronDown />
        </motion.span>
      </button>

      {/* -------- Dropdown Menu -------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }} // starting animation
            animate={{ opacity: 1, y: 6, scale: 1 }} // open hone ka animation
            exit={{ opacity: 0, y: -10, scale: 0.95 }} // close hone ka animation
            transition={{ duration: 0.25 }}
            className="absolute mt-2 w-56 rounded-xl shadow-xl backdrop-blur-lg border overflow-hidden z-50"
            style={{
              borderColor: ACCENT,
            }}
          >
            {/* Options list render karna */}
            {options.map((opt, i) => {
              const isActive = selected === opt; // check selected hai ya nahi
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-5 py-3 text-white text-[16px] font-semibold transition-all"
                  style={{
                    background: isActive
                      ? "rgba(18,187,182,0.12)" // active option ka background
                      : "transparent",
                    color: isActive ? ACCENT : "", // active option ka text color
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
