// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 text-xs rounded-full border border-slate-300 dark:border-slate-600"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
