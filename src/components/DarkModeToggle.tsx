"use client";
import React from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  return (
    <button
      className="fixed top-6 right-6 z-50 px-3 py-1 rounded-full bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 shadow hover:scale-105 transition-all"
      onClick={() => setIsDark(d => !d)}
      aria-label="Toggle dark mode"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default DarkModeToggle;
