"use client";

import { useState } from "react";
import { FaFacebookF, FaLine, FaXTwitter } from "react-icons/fa6";
import { FiCheck, FiLink } from "react-icons/fi";

// ponytail: URLs are built at click time from window.location — always correct on any
// domain, no SITE_URL plumbing needed
export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const popup = (u: string) =>
    window.open(u, "_blank", "noopener,noreferrer,width=600,height=640");

  const buttons = [
    {
      label: "แชร์ไป Facebook",
      className: "bg-[#1877F2] text-white",
      onClick: () =>
        popup(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        ),
      icon: <FaFacebookF size={14} aria-hidden />,
    },
    {
      label: "แชร์ไป LINE",
      className: "bg-[#06C755] text-white",
      onClick: () =>
        popup(
          `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`,
        ),
      icon: <FaLine size={16} aria-hidden />,
    },
    {
      label: "แชร์ไป X",
      className:
        "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
      onClick: () =>
        popup(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`,
        ),
      icon: <FaXTwitter size={14} aria-hidden />,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className="flex items-center gap-2">
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          aria-label={b.label}
          title={b.label}
          onClick={b.onClick}
          className={`flex size-10 cursor-pointer items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 ${b.className}`}
        >
          {b.icon}
        </button>
      ))}
      <button
        type="button"
        aria-label="คัดลอกลิงก์"
        title="คัดลอกลิงก์"
        onClick={copy}
        className={`flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-150 hover:scale-110 active:scale-95 ${
          copied
            ? "border-accent bg-gold/20 text-accent"
            : "border-line text-ink-body hover:text-ink"
        }`}
      >
        {copied ? (
          <FiCheck size={15} aria-hidden />
        ) : (
          <FiLink size={15} aria-hidden />
        )}
      </button>
      {copied && <span className="text-xs text-accent">คัดลอกแล้ว!</span>}
    </div>
  );
}
