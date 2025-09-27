import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

// Common classes for toggle buttons
const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3  md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const Theme = () => {
  // local state to track selected option (light/dark)
  const [selected, setSelected] = useState("dark");
 
  return (
    // Pass state to child component
    <SliderToggle selected={selected} setSelected={setSelected} />
  );
};

const SliderToggle = ({ selected, setSelected }) => {
  // ThemeProvider se theme aur setTheme aata hai
  // theme: true = light, false = dark
  const { theme, setTheme } = useTheme();

  // Directly body background set ho rahi hai (light/dark ke hisaab se)
  if (theme === true) {
    document.body.style.background = "#dfdfdf"; // light background
  } else {
    document.body.style.background = "black"; // dark background
  }

  return (
    // Main toggle container
    <div
      className={`${
        theme ? "bg-[#ffffff2d]" : "bg-white/10"
      } relative backdrop-blur-md h-[37px] md:h-[42px] shadow-lg justify-between flex w-[100px] md:w-fit items-center rounded-full`}
    >
      {/* Light button */}
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light"); // local state update
          setTheme(true); // ThemeProvider me light mode set
        }}
      >
        <FiSun className="relative z-10  text-lg md:text-sm" />
        <span className="relative md:block hidden z-10">Light</span>
      </button>

      {/* Dark button */}
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark"); // local state update
          setTheme(false); // ThemeProvider me dark mode set
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative md:block hidden z-10">Dark</span>
      </button>

      {/* Slider indicator (animated with framer-motion) */}
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full z-0 bg-customTeal"
        />
      </div>
    </div>
  );
};

export default Theme;
