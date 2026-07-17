import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLine, FaTiktok } from "react-icons/fa";
import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINE_ID,
  LINE_URL,
  PHONE,
  PHONE_TEL,
  TIKTOK_URL,
  externalLink,
} from "../contact";

// ponytail: every channel is real now — LINE/phone off the promo artwork, socials from the clinic.
const socials = [
  { icon: FaLine, label: `LINE ${LINE_ID}`, href: LINE_URL },
  { icon: FaFacebookF, label: "Facebook", href: FACEBOOK_URL },
  { icon: FaInstagram, label: "Instagram", href: INSTAGRAM_URL },
  { icon: FaTiktok, label: "TikTok", href: TIKTOK_URL },
];

const menu = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "บริการของเรา", href: "/services" },
  { label: "ผลลัพธ์จริง", href: "/#results" },
  { label: "โปรโมชั่น", href: "/promotions" },
  { label: "รีวิว", href: "/reviews" },
  { label: "บทความ", href: "/blog" },
  { label: "ติดต่อเรา", href: "/contact" },
];

const services = [
  { label: "Botox", href: "/services#botox" },
  { label: "Filler", href: "/services#filler" },
  { label: "Biostimulator", href: "/services#biostimulator" },
  { label: "Mesotherapy", href: "/services#mesotherapy" },
  { label: "IV Drip", href: "/services#iv-drip" },
  { label: "Energy-Based Device", href: "/services#energy-device" },
  { label: "Mounjaro ลดน้ำหนัก", href: "/services#mounjaro" },
];

// ponytail: the footer is always navy — it is the brand block, so it does not follow the theme.
export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-wide text-white">
              Dr. <span className="font-bold">KIM</span>
            </p>
            <p className="mt-1 flex items-center gap-2 text-[0.6rem] tracking-[0.35em] text-gold">
              <span className="h-px w-6 bg-gold" aria-hidden />
              CLINIC
            </p>

            <p className="mt-5 max-w-xs text-sm leading-7">
              คลินิกเวชกรรมด้านความงาม ดูแลโดยแพทย์ผู้เชี่ยวชาญ
              ด้วยผลิตภัณฑ์ของแท้และเทคโนโลยีที่ได้มาตรฐาน
            </p>

            <ul className="mt-6 flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    {...externalLink}
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-gold hover:text-navy"
                  >
                    <Icon size={16} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white">เมนู</h3>
            <ul className="mt-5 space-y-3">
              {menu.map((m) => (
                <li key={m.label}>
                  <Link
                    href={m.href}
                    className="text-sm transition-colors duration-200 hover:text-gold"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white">บริการของเรา</h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm transition-colors duration-200 hover:text-gold"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white">ติดต่อเรา</h3>
            <ul className="mt-5 space-y-4 text-sm leading-6">
              <li className="flex gap-3">
                <FiMapPin
                  className="mt-0.5 shrink-0 text-gold"
                  size={16}
                  aria-hidden
                />
                <span>
                  หมอคิมคลินิกเวชกรรม เชียงใหม่
                  <br />
                  <span className="text-white/50">
                    72/1 ถ.รัตนโกสินทร์ ต.วัดเกต อ.เมืองเชียงใหม่ จ.เชียงใหม่
                    50000
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <FiClock
                  className="mt-0.5 shrink-0 text-gold"
                  size={16}
                  aria-hidden
                />
                <span>
                  เปิดทุกวัน 11.00 – 20.00 น.
                  <br />
                  <span className="text-white/50">
                    (รับเคสสุดท้าย 19.30 น.)
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <FiPhone
                  className="mt-0.5 shrink-0 text-gold"
                  size={16}
                  aria-hidden
                />
                <Link
                  href={PHONE_TEL}
                  className="tabular-nums transition-colors duration-200 hover:text-gold"
                >
                  {PHONE}
                </Link>
              </li>
            </ul>

            <Link
              href={LINE_URL}
              {...externalLink}
              className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-medium text-navy transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              จองคิวผ่านไลน์
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-3 text-xs leading-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              เลขที่ใบอนุญาตสถานพยาบาล{" "}
              <span className="tabular-nums text-white">50101009062</span>
              <span className="mx-2 text-gold" aria-hidden>
                ·
              </span>
              ผู้ดำเนินการ นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์ (ว.49913)
              <span className="mx-2 text-gold" aria-hidden>
                ·
              </span>
              ใบอนุญาตโฆษณา ขสพ.ชม.263/2568
            </p>
            <p className="text-white/50">
              © 2026 Dr. KIM Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
