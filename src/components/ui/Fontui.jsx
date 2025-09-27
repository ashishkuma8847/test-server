import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../Themetoggel/ThemeProvider";

function Fontui({
  words = ["Frontend Developer", "React Enthusiast", "UI/UX Designer"], // ✅ yeh words typing effect me rotate honge
  typingSpeed = 120,          // ✅ ek letter type hone ka speed
  deleteSpeed = 80,           // ✅ ek letter delete hone ka speed
  delayBetweenWords = 1500,   // ✅ ek word complete hone ke baad kitna delay rahe
  cursorBlinkSpeed = 0.4,     // ✅ cursor (|) blink speed
  className = "",
  outofspan = "I am ",        // ✅ static text jo colored span ke bahar dikhna hai
  inspan = "",                // ✅ prefix jo span ke andar dikhna hai
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // ✅ abhi kaunsa word show ho raha hai
  const [currentText, setCurrentText] = useState("");          // ✅ type ho raha current text
  const [isDeleting, setIsDeleting] = useState(false);         // ✅ typing ya deleting mode
  const controls = useAnimationControls();                     // ✅ framer-motion ke liye animation controls
  const { theme } = useTheme();                                // ✅ light/dark theme access

  // ✅ Typing / Deleting logic
  useEffect(() => {
    const word = words[currentWordIndex]; // ✅ abhi wala word
    let timer;

    if (isDeleting) {
      // Agar deleting mode me hai
      if (currentText === "") {
        // ✅ word delete ho gaya -> agla word start karo
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // ✅ ek letter delete karo
        timer = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length - 1));
        }, deleteSpeed);
      }
    } else {
      // ✅ Typing mode
      if (currentText === word) {
        // ✅ pura word type ho gaya -> delay ke baad delete start karo
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      } else {
        // ✅ ek letter type karo
        timer = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer); // ✅ cleanup for each effect run
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deleteSpeed, delayBetweenWords]);

  // ✅ Cursor blinking animation
  useEffect(() => {
    controls.start({
      opacity: [0.2, 1],
      transition: {
        duration: cursorBlinkSpeed,
        repeat: Infinity,
        repeatType: "reverse", // ✅ blink effect
      },
    });
  }, [controls, cursorBlinkSpeed]);

  return (
    <div className="flex items-center justify-start">
      <div className={`font-semibold italic font-inter ${className}`}>
        {/* ✅ Static text */}
        <span className={`${!theme ? "text-white" : "text-customBlack"}`}>
          {outofspan}
        </span>

        {/* ✅ Animated typing text */}
        <span className="text-customTeal">
          {inspan}
          {currentText}
        </span>

        {/* ✅ Blinking cursor */}
        <motion.span animate={controls} className="inline-block text-customTeal">
          |
        </motion.span>
      </div>
    </div>
  );
}

export default Fontui;
