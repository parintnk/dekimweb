import type { Metadata } from "next";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLine, FaTiktok } from "react-icons/fa";
import {
  FiArrowRight,
  FiClock,
  FiExternalLink,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import PageHeader from "../components/page-header";
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

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อ Dr. KIM Clinic เชียงใหม่ — 72/1 ต.วัดเกต อ.เมืองเชียงใหม่ เปิดทุกวัน 11.00 – 20.00 น. โทร 084-609-2027 หรือทักไลน์ @doctorkimcnx",
};

const MAP_QUERY = "หมอคิมคลินิกเวชกรรม เชียงใหม่ DR.KIM CLINIC";
// ponytail: keyless Google Maps embed — no API key, no library. Swap q= for place coords if it ever drifts.
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: FACEBOOK_URL },
  { icon: FaInstagram, label: "Instagram", href: INSTAGRAM_URL },
  { icon: FaTiktok, label: "TikTok", href: TIKTOK_URL },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="ติดต่อเรา"
        title="Contact Us"
        description="สอบถามบริการ ราคา หรือจองคิว ทักไลน์หรือโทรหาเราได้ในเวลาทำการ เปิดทุกวัน 11.00 – 20.00 น."
      />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <FiMapPin size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-ink">
                    หมอคิมคลินิกเวชกรรม เชียงใหม่
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-ink-body">
                    72/1 ต.วัดเกต อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50000
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <FiClock size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-medium text-ink">
                    เปิดทุกวัน 11.00 – 20.00 น.
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-ink-body">
                    รับเคสสุดท้าย 19.30 น.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <FiPhone size={20} aria-hidden />
                </span>
                <div>
                  <Link
                    href={PHONE_TEL}
                    className="font-medium tabular-nums text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {PHONE}
                  </Link>
                  <p className="mt-0.5 text-sm leading-6 text-ink-body">
                    โทรได้ในเวลาทำการ
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={LINE_URL}
                {...externalLink}
                className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-7 py-4 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <FaLine size={18} aria-hidden />
                ทักไลน์ {LINE_ID}
              </Link>
              <Link
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-medium tabular-nums text-ink transition-colors duration-200 hover:border-accent active:scale-[0.98]"
              >
                <FiPhone size={16} aria-hidden />
                โทร {PHONE}
              </Link>
            </div>

            <div className="mt-9">
              <p className="text-sm font-medium text-ink">ติดตามเรา</p>
              <ul className="mt-3 flex gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      {...externalLink}
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors duration-200 hover:bg-gold hover:text-navy"
                    >
                      <Icon size={16} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="แผนที่ หมอคิมคลินิกเวชกรรม เชียงใหม่"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full lg:h-full lg:min-h-96"
              />
            </div>
            <Link
              href={MAP_LINK}
              {...externalLink}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
            >
              เปิดใน Google Maps
              <FiExternalLink size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-2">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="font-display text-2xl text-ink">
            ยังไม่แน่ใจว่าจะเริ่มตรงไหน?
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "ดูบริการและราคา",
                detail: "ราคามาตรฐานทุกรายการ แยกตามยี่ห้อและขนาด",
                href: "/services",
              },
              {
                title: "โปรโมชั่นเดือนนี้",
                detail: "ราคาพิเศษ อัปเดตใหม่ทุกเดือน",
                href: "/promotions",
              },
              {
                title: "รีวิวจากลูกค้า",
                detail: "คะแนน 5.0 จาก 68 รีวิวบน Google",
                href: "/reviews",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-2xl border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
              >
                <p className="flex items-center justify-between font-medium text-ink">
                  {c.title}
                  <FiArrowRight
                    size={16}
                    className="text-accent transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </p>
                <p className="mt-1 text-sm leading-6 text-ink-body">
                  {c.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
