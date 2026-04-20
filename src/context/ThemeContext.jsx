import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

const STORAGE_KEY = "queueflow-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    let initial = "dark";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? saved : initial;
    } catch {
      console.error("Failed to load theme from local storage");
    }
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      console.error("Failed to save theme to local storage");
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
