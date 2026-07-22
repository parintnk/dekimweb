"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLine, FaTiktok } from "react-icons/fa";
import { FiMessageCircle, FiPhone, FiX } from "react-icons/fi";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINE_ID,
  LINE_URL,
  PHONE,
  PHONE_TEL,
  TIKTOK_URL,
} from "../contact";

// ponytail: LINE + phone are real (off the clinic's promo artwork). FB/IG still need real URLs —
// the posters show the icons but never print the handles.
const channels = [
  {
    icon: FaLine,
    label: "LINE",
    detail: LINE_ID,
    href: LINE_URL,
    className: "bg-[#06C755] text-white",
  },
  {
    icon: FiPhone,
    label: "โทร",
    detail: PHONE,
    href: PHONE_TEL,
    className: "bg-brand text-on-brand",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    detail: "Dr.Kim Clinic",
    href: FACEBOOK_URL,
    className: "bg-[#1877F2] text-white",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    detail: "doctorkimcnx",
    href: INSTAGRAM_URL,
    className: "bg-[#C13584] text-white",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    detail: "doctorkimcnx",
    href: TIKTOK_URL,
    className: "bg-black text-white",
  },
];

export default function ContactFab() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // ponytail: bottom-24 on mobile clears the fixed booking bar; the drawer/dialog sit at z-50, so this stays under them.
    // pointer-events-none so the tall invisible strip (space reserved for the closed channel links) doesn't eat
    // taps on buttons behind it — the button + open links opt back in with pointer-events-auto.
    <div className="pointer-events-none fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {channels.map((c, i) => (
        <Link
          key={c.label}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          // ponytail: stagger from the bottom up so they unfold out of the button
          style={{
            transitionDelay: open
              ? `${(channels.length - 1 - i) * 40}ms`
              : "0ms",
          }}
          className={`flex items-center gap-3 transition-all duration-200 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-lg">
            {c.detail}
          </span>
          <span
            className={`flex size-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-105 ${c.className}`}
          >
            <c.icon size={20} aria-hidden />
            <span className="sr-only">{c.label}</span>
          </span>
        </Link>
      ))}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "ปิดช่องทางติดต่อ" : "ติดต่อเรา"}
        className="pointer-events-auto flex size-14 cursor-pointer items-center justify-center rounded-full bg-gold text-navy shadow-xl shadow-navy/25 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {open ? (
          <FiX size={24} aria-hidden />
        ) : (
          <FiMessageCircle size={24} aria-hidden />
        )}
      </button>
    </div>
  );
}
