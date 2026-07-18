import type { Metadata } from "next";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiCalendar, FiMessageCircle, FiSearch } from "react-icons/fi";
import Promotions from "../components/promotions";
import { getPromotions } from "../lib/content";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINE_ID,
  TIKTOK_URL,
  externalLink,
} from "../contact";

export const metadata: Metadata = {
  title: "โปรโมชั่นประจำเดือน",
  description:
    "โปรโมชั่นประจำเดือนของ Dr. KIM Clinic เชียงใหม่ อัปเดตทุกเดือน สอบถามรายการล่าสุดทางไลน์ @doctorkimcnx",
};

const steps = [
  {
    icon: FiSearch,
    title: "เลือกโปรที่สนใจ",
    detail: "กดดูภาพโปรโมชั่นขนาดใหญ่ เช็กราคาและเงื่อนไข",
  },
  {
    icon: FiMessageCircle,
    title: "ทักไลน์แจ้งรายการ",
    detail: `ส่งชื่อโปรที่ต้องการมาที่ LINE ${LINE_ID}`,
  },
  {
    icon: FiCalendar,
    title: "นัดวันเข้ารับบริการ",
    detail: "ทีมงานยืนยันสิทธิ์และจองคิวให้ทันที",
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: FACEBOOK_URL },
  { icon: FaInstagram, label: "Instagram", href: INSTAGRAM_URL },
  { icon: FaTiktok, label: "TikTok", href: TIKTOK_URL },
];

export const revalidate = 60;

export default async function PromotionsPage() {
  const promos = await getPromotions();
  return (
    <>
      <Promotions items={promos} />

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            รับสิทธิ์ง่าย ๆ
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            วิธีรับโปรโมชั่น
          </h2>

          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, detail }, i) => (
              <li
                key={title}
                className="relative rounded-2xl border border-line bg-surface-2 p-6"
              >
                <span className="absolute right-5 top-4 font-display text-4xl text-gold/40">
                  {i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full bg-surface text-accent">
                  <Icon size={20} aria-hidden />
                </span>
                <p className="mt-4 font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm leading-6 text-ink-body">{detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-navy p-6 md:p-8">
            <div>
              <p className="font-display text-xl text-white">
                โปรใหม่มาทุกเดือน
              </p>
              <p className="mt-1 text-sm leading-6 text-white/70">
                กดติดตามโซเชียลของคลินิก จะได้ไม่พลาดโปรเดือนถัดไป
              </p>
            </div>
            <ul className="flex gap-2">
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
        </div>
      </section>
    </>
  );
}
