import { useState, useEffect } from "react";
import Theme from "../Themetoggel/Themebutton";
import Fontui from "../ui/Fontui";
import { Link } from "react-router-dom";

function Header() {
  // Scroll state -> true when user scrolls more than 39px
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 39); // scroll hone par bg active ho jaye
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* ✅ Full section blur background */}
      <div
        className={`absolute inset-0 transition-all duration-300 rounded-b-3xl
          ${scrolled ? "bg-white/3 backdrop-blur-2xl" : "bg-transparent"}`}
      ></div>

      {/* ✅ Limited width container */}
      <div className="relative container font-inter py-[16px] flex items-center justify-between">
        {/* 🔹 Logo (Custom Font Component) */}
        <Link to={"/"}>
        <Fontui
          words={["devloper", "Shop"]} // logo ka text
          className="text-lg md:text-3xl"
          inspan="s." // span ke andar text
          outofspan="ErenXite" // span ke bahar text
          />
          </Link>

        {/* 🔹 Theme Toggle Button */}
        <Theme />
      </div>
    </header>
  );
}

export default Header;
