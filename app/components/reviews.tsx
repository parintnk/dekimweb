import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { GOOGLE_REVIEWS_URL, externalLink } from "../contact";
import SectionBackdrop from "./section-backdrop";

// ponytail: copied from Google on 2026-07-17 — excerpts trimmed, attributed, avatars saved to
// public/reviews (2 of them are Google's own letter avatars, not photos). This goes stale and new
// reviews never appear. Swap for Google Places API when someone is willing to run an API key.
const reviews = [
  {
    name: "Chanathimad Intarot",
    avatar: "/reviews/chanathimad.png",
    date: "1 เดือนที่แล้ว",
    tag: "ลดน้ำหนัก",
    text: "เคยลองมาหลายวิธีแต่ไม่ลง เลยลองมาปรึกษาคุณหมอคิมเรื่องปากกาลดน้ำหนัก ชอบที่นี่ตรงที่มีการติดตามผลอย่างต่อเนื่อง ใครอยากลดน้ำหนักแบบปลอดภัยภายใต้การดูแลของแพทย์แนะนำเลย",
  },
  {
    name: "Win Worrawit",
    avatar: "/reviews/win.png",
    date: "3 เดือนที่แล้ว",
    tag: "Botox",
    text: "ผมมาใช้บริการฉีดโบท็อก ก่อนจะฉีดก็เปิดกล่องใหม่ให้ดูต่อหน้า เห็นเลยว่าเป็นผลิตภัณฑ์แท้ ตรวจวันหมดอายุ เจ้าหน้าที่ทุกท่านช่วยเหลือและดูแลดีมากครับ",
  },
  {
    name: "Suphissara Sompong",
    avatar: "/reviews/suphissara.png",
    date: "1 เดือนที่แล้ว",
    tag: "หัตถการ",
    text: "หมอมือเบามาก ให้ข้อมูลผลิตภัณฑ์ดีมาก แรก ๆ เรากังวลกับหัตถการนี้ แต่พอได้ข้อมูลที่เพียงพอ ทำให้เราคลายกังวล เราจึงตัดสินใจทำที่นี่",
  },
  {
    name: "HeliCopter",
    avatar: "/reviews/helicopter.png",
    date: "3 เดือนที่แล้ว",
    tag: "บริการ",
    text: "บริการประทับใจมากครับ พี่ ๆ พนักงานในร้านดูแลดีมาก คุณหมอมือเบา ชวนคุยตลอดการรักษา คลินิกสะอาดมากครับ",
  },
  {
    name: "porrawisa pichai",
    avatar: "/reviews/porrawisa.png",
    date: "1 เดือนที่แล้ว",
    tag: "ลดน้ำหนัก",
    text: "ปากกาลดน้ำหนักของที่นี่เห็นผลจริง และที่สำคัญคือมีคุณหมอคอยติดตามอาการตลอด ทำให้ไม่กังวลเรื่องผลข้างเคียง พี่ ๆ พนักงานก็น่ารัก บริการเป็นกันเองสุด ๆ",
  },
];

function Stars({ label }: { label: string }) {
  return (
    <span className="flex gap-0.5 text-gold" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <FiStar key={i} size={14} fill="currentColor" aria-hidden />
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative isolate scroll-mt-20 overflow-hidden bg-surface"
    >
      <SectionBackdrop flip />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          รีวิวจากลูกค้าของเรา
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            What Our Patients Say
          </h2>
          <Link
            href={GOOGLE_REVIEWS_URL}
            {...externalLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            ดูรีวิวทั้งหมดบน Google
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* ponytail: the aggregate score is the strongest proof here, so it gets a card, not a caption */}
          <li className="reveal rounded-2xl bg-navy p-6 text-white/70">
            <p className="font-display text-5xl tabular-nums text-white">5.0</p>
            <div className="mt-3">
              <Stars label="5 จาก 5 ดาว" />
            </div>
            <p className="mt-4 text-sm leading-6">
              จาก <span className="tabular-nums text-white">68 รีวิว</span> บน
              Google
            </p>
            <p className="mt-1 text-xs leading-6 text-white/50">
              คะแนนเฉลี่ยจากผู้เข้ารับบริการจริง
            </p>
            <Link
              href={GOOGLE_REVIEWS_URL}
              {...externalLink}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium text-navy transition-opacity duration-200 hover:opacity-90"
            >
              อ่านรีวิวบน Google
              <FiArrowRight size={14} aria-hidden />
            </Link>
          </li>

          {reviews.map((r) => (
            <li
              key={r.name}
              className="reveal flex flex-col rounded-2xl border border-line bg-surface-2 p-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={r.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full bg-surface-3 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{r.name}</p>
                  <p className="text-xs text-ink-body">{r.date}</p>
                </div>
              </div>

              <div className="mt-4">
                <Stars label="5 จาก 5 ดาว" />
              </div>

              <p className="mt-3 text-sm leading-7 text-ink-body">{r.text}</p>

              <p className="mt-auto pt-4 text-xs text-accent">{r.tag}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
