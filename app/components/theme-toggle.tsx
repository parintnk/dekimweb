"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

// ponytail: no next-themes dependency — this is the whole feature in ~20 lines.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2"
    >
      {dark ? (
        <FiSun size={20} aria-hidden />
      ) : (
        <FiMoon size={20} aria-hidden />
      )}
    </button>
  );
}
