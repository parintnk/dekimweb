import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import ThemeToggle from "./theme-toggle";

const links = [
  { label: "หน้าแรก", href: "#", current: true },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "บริการของเรา", href: "#services" },
  { label: "โปรโมชั่น", href: "#promotion" },
  { label: "รีวิว", href: "#reviews" },
  { label: "บทความ", href: "#blog" },
  { label: "ติดต่อเรา", href: "#contact" },
];

function Logo() {
  return (
    <Link
      href="#"
      className="block leading-none"
      aria-label="Dr. KIM Clinic หน้าแรก"
    >
      <span className="font-display text-2xl tracking-wide text-ink">
        Dr. <span className="font-bold">KIM</span>
      </span>
      <span className="mt-1 flex items-center gap-2 text-[0.6rem] tracking-[0.35em] text-accent">
        <span className="h-px flex-1 bg-gold" />
        CLINIC
        <span className="h-px flex-1 bg-gold" />
      </span>
    </Link>
  );
}

export default function Navbar() {
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
          {links.map((l) => (
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
          <ThemeToggle />

          <Link
            href="#booking"
            className="hidden rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.98] sm:block"
          >
            จองคิวออนไลน์
          </Link>

          {/* ponytail: native <details> mobile menu — no client JS, no state. Swap for a client component if it needs animation. */}
          <details className="relative lg:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
              <HiOutlineMenu size={24} aria-hidden />
              <span className="sr-only">เปิดเมนู</span>
            </summary>
            <ul className="absolute right-0 mt-3 w-56 rounded-2xl border border-line bg-surface py-2 shadow-xl">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    aria-current={l.current ? "page" : undefined}
                    className={`block px-5 py-3 text-sm transition-colors duration-200 hover:bg-surface-2 hover:text-ink ${
                      l.current ? "font-medium text-ink" : "text-ink-body"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="px-5 pb-1 pt-2 sm:hidden">
                <Link
                  href="#booking"
                  className="block rounded-full bg-brand px-4 py-3 text-center text-sm font-medium text-on-brand"
                >
                  จองคิวออนไลน์
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
