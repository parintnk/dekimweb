"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";

const langs = [
  { code: "th", label: "ไทย", short: "TH" },
  { code: "en", label: "English", short: "EN" },
  { code: "zh-CN", label: "中文", short: "中文" },
] as const;

type Code = (typeof langs)[number]["code"];

function currentLang(): Code {
  if (typeof document === "undefined") return "th";
  for (const c of document.cookie.split(";")) {
    const [key, val = ""] = c.trim().split("=");
    if (key === "googtrans") {
      const v = decodeURIComponent(val);
      if (v.includes("/zh-CN")) return "zh-CN";
      if (v.includes("/en")) return "en";
    }
  }
  return "th";
}

// switching = write the googtrans cookie and reload — the hidden Google Translate
// widget (google-translate.tsx) picks it up and translates the whole page
function apply(code: Code) {
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  if (code === "th") {
    document.cookie = `googtrans=; ${expire}`;
    document.cookie = `googtrans=; ${expire}; domain=${location.hostname}`;
    document.cookie = `googtrans=; ${expire}; domain=.${location.hostname}`;
  } else {
    document.cookie = `googtrans=/th/${code}; path=/`;
  }
  window.location.reload();
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Code>("th");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(currentLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as globalThis.Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const active = langs.find((l) => l.code === lang) ?? langs[0];

  return (
    <div ref={ref} className="notranslate relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="เปลี่ยนภาษา / Change language"
        aria-expanded={open}
        className="flex h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-body transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
      >
        <FiGlobe size={16} aria-hidden />
        {active.short}
        <FiChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-xl shadow-navy/10">
          {langs.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => apply(l.code)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                l.code === lang
                  ? "bg-surface-2 font-medium text-ink"
                  : "text-ink-body hover:bg-surface-2 hover:text-ink"
              }`}
            >
              {l.label}
              {l.code === lang && (
                <FiCheck size={14} className="text-accent" aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
