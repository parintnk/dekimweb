"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINE_URL, externalLink } from "../contact";
import LanguageSwitcher from "./language-switcher";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "./theme-toggle";

const links = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "บริการของเรา", href: "/services" },
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "รีวิว", href: "/reviews" },
  { label: "บทความ", href: "/blog" },
  { label: "ติดต่อเรา", href: "/contact" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="block"
      aria-label="Dr. KIM Clinic หน้าแรก"
    >
      <Image
        src="/star.png"
        alt="Dr. KIM Clinic"
        width={512}
        height={512}
        priority
        className="h-16 w-16 sm:h-20 sm:w-20"
      />
    </Link>
  );
}

export default function Navbar() {
  // ponytail: client component only for this line — the active state follows the route
  const pathname = usePathname();
  const nav = links.map((l) => ({ ...l, current: l.href === pathname }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-on-brand"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={`relative block px-3 py-3 text-sm transition-colors duration-200 hover:text-ink after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                  l.current
                    ? "font-medium text-ink after:scale-x-100"
                    : "text-ink-body"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          <Link
            href={LINE_URL}
            {...externalLink}
            className="hidden rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.98] sm:block"
          >
            จองคิวผ่านไลน์
          </Link>

          <MobileMenu links={nav} />
        </div>
      </nav>
    </header>
  );
}
