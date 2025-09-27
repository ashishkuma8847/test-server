import { createContext, useContext, useState } from "react";

// ✅ Context create karte hain jisme theme related data store hoga
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // theme state: false = dark, true = light
  const [theme, setTheme] = useState(false);

  return (
    // ✅ ThemeContext.Provider ke through value sab components me available ho jaati hai
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children} {/* ✅ Sare child components ThemeContext ka access kar sakte hain */}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook jo ThemeContext consume karta hai
// isse directly useTheme() karke theme aur setTheme use kar sakte ho
export const useTheme = () => useContext(ThemeContext);
