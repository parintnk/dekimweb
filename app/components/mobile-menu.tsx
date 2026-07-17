"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { LINE_URL, externalLink } from "../contact";

type MenuLink = { label: string; href: string; current?: boolean };

export default function MobileMenu({ links }: { links: MenuLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    // ponytail: without the scroll lock the page scrolls behind the drawer on iOS
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ponytail: the navbar's backdrop-blur makes it a containing block for position:fixed, which
  // pins the drawer inside the 64px header. Portalling to <body> is the fix — don't inline it back.
  const drawer = (
    <>
      {/* ponytail: kept mounted and toggled with classes — unmounting would kill the exit transition */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="เมนูหลัก"
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85%] flex-col border-l border-line bg-surface shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="leading-none">
            <span className="font-display text-xl tracking-wide text-ink">
              Dr. <span className="font-bold">KIM</span>
            </span>
            <span className="mt-1 flex items-center gap-2 text-[0.55rem] tracking-[0.35em] text-accent">
              <span className="h-px w-4 bg-gold" aria-hidden />
              CLINIC
            </span>
          </span>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="ปิดเมนู"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2"
          >
            <FiX size={22} aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul>
            {links.map((l, i) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={l.current ? "page" : undefined}
                  // ponytail: stagger only on the way in — delays on exit make closing feel laggy
                  style={{
                    transitionDelay: open ? `${100 + i * 40}ms` : "0ms",
                  }}
                  className={`block rounded-xl px-4 py-3.5 text-[0.95rem] transition-all duration-300 hover:bg-surface-2 hover:text-ink ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  } ${l.current ? "bg-surface-2 font-medium text-ink" : "text-ink-body"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <Link
            href={LINE_URL}
            {...externalLink}
            onClick={() => setOpen(false)}
            className="flex h-13 items-center justify-center rounded-full bg-brand text-sm font-medium text-on-brand transition-transform duration-200 active:scale-[0.98]"
          >
            จองคิวผ่านไลน์
          </Link>
          <p className="mt-4 text-center text-xs leading-6 text-ink-body">
            เปิดทุกวัน 11.00 – 20.00 น.
          </p>
        </div>
      </aside>
    </>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="เปิดเมนู"
        aria-expanded={open}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2"
      >
        <HiOutlineMenu size={24} aria-hidden />
      </button>

      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
