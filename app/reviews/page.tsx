import type { Metadata } from "next";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiCheck, FiExternalLink } from "react-icons/fi";
import Results from "../components/results";
import Reviews from "../components/reviews";
import { GOOGLE_REVIEWS_URL, LINE_URL, externalLink } from "../contact";

export const metadata: Metadata = {
  title: "รีวิวจากลูกค้า",
  description:
    "รีวิวจริงจากผู้ใช้บริการ Dr. KIM Clinic เชียงใหม่ — คะแนน 5.0 จาก 68 รีวิวบน Google",
};

// ponytail: themes pulled from the actual Google reviews on this site — not marketing copy.
const highlights = [
  "หมอมือเบา อธิบายละเอียด",
  "เปิดกล่องผลิตภัณฑ์แท้ให้ดูต่อหน้า",
  "มีการติดตามผลต่อเนื่อง",
  "พนักงานดูแลดี เป็นกันเอง",
  "คลินิกสะอาด",
  "ให้ข้อมูลครบก่อนตัดสินใจ",
];

const trustPoints = [
  "รีวิวทั้งหมดมาจาก Google Maps ซึ่งคลินิกแก้ไขหรือลบเองไม่ได้",
  "ทุกรีวิวมาจากผู้ที่เดินทางมาใช้บริการจริงที่คลินิก",
  "ข้อมูลอัปเดตล่าสุด กรกฎาคม 2026 — อ่านรีวิวสดได้ที่ Google",
];

export default function ReviewsPage() {
  return (
    <>
      <Reviews />

      {/* ponytail: same marquee as the home page — one source of truth for the plates */}
      <div className="border-t border-line">
        <Results />
      </div>

      <section className="border-t border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
              <span className="h-px w-8 bg-gold" aria-hidden />
              จากรีวิวจริง
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              สิ่งที่ลูกค้าพูดถึงบ่อย
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink"
                >
                  <FiCheck size={14} className="text-accent" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">
              ทำไมรีวิวของเราเชื่อถือได้
            </h2>
            <ul className="mt-6 space-y-4">
              {trustPoints.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-accent">
                    <FiCheck size={12} aria-hidden />
                  </span>
                  <span className="text-sm leading-7 text-ink-body">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={GOOGLE_REVIEWS_URL}
                {...externalLink}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent"
              >
                อ่านรีวิวสดบน Google
                <FiExternalLink size={14} aria-hidden />
              </Link>
              <Link
                href={LINE_URL}
                {...externalLink}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-on-brand transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <FaLine size={16} aria-hidden />
                จองคิวผ่านไลน์
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
