"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaLine } from "react-icons/fa";
import { FiMaximize2, FiX } from "react-icons/fi";
import { LINE_URL, externalLink } from "../contact";
import SectionBackdrop from "./section-backdrop";

// ponytail: the posters are the content — every price and condition is baked into the artwork.
const promotions = [
  {
    src: "/promotions/july.jpg",
    width: 1040,
    height: 1300,
    alt: "โปรโมชั่นประจำเดือนกรกฎาคม รวมราคาพิเศษ Botox Aestox 50 Unit 2,977 บาท, Botox Nabota 100 Unit 5,977 บาท, Neuramis Deep 1 CC 3,977 บาท, เลเซอร์กำจัดขน 877 บาท และรายการอื่น ๆ",
  },
  {
    src: "/promotions/neuramis.jpg",
    width: 1040,
    height: 1300,
    alt: "โปรโมชั่นฟิลเลอร์ Neuramis Black 2 ซีซี ราคา 5,990 บาท คมชัดขึ้นอย่างเป็นธรรมชาติ",
  },
  {
    src: "/promotions/laser-hair.jpg",
    width: 1040,
    height: 1040,
    alt: "โปรโมชั่นเลเซอร์กำจัดขน ราคา 690 บาท ผิวเรียบเนียน วงแขนดูสะอาด",
  },
  {
    src: "/promotions/liftera2.jpg",
    width: 1040,
    height: 1040,
    alt: "โปรโมชั่น LIFTERA 2 ยกกระชับปรับกรอบหน้า 1000 แถม 1000 SHOTS ราคา 4,990 บาท",
  },
];

export default function Promotions() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<(typeof promotions)[number] | null>(
    null,
  );

  function open(promo: (typeof promotions)[number]) {
    setActive(promo);
    dialogRef.current?.showModal();
  }

  return (
    <section
      id="promotion"
      className="relative isolate scroll-mt-20 overflow-hidden bg-surface-2"
    >
      <SectionBackdrop />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          โปรโมชั่นประจำเดือน
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Promotions
          </h2>
          <Link
            href={LINE_URL}
            {...externalLink}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <FaLine size={16} aria-hidden />
            ทักไลน์สอบถามโปรฯ
          </Link>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-body">
          ราคาพิเศษมีถึงสิ้นเดือนนี้เท่านั้น โปรโมชั่นปรับเปลี่ยนทุกเดือน
          สอบถามรายการล่าสุดได้ที่คลินิก
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promotions.map((p) => (
            <li key={p.src} className="reveal">
              <button
                type="button"
                onClick={() => open(p)}
                aria-label={`ดูรูปใหญ่: ${p.alt.slice(0, 40)}…`}
                // ponytail: object-contain on a navy plate — the posters are 1:1 and 4:5 mixed, and
                // cover would slice their prices off. The navy matches their own background.
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-navy transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/10"
              >
                <span className="relative block aspect-square">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </span>

                <span className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="flex size-11 items-center justify-center rounded-full bg-gold text-navy">
                    <FiMaximize2 size={18} aria-hidden />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs leading-6 text-ink-body">
          * เงื่อนไขเป็นไปตามที่คลินิกกำหนด · ใบอนุญาตโฆษณาเลขที่
          ขสพ.ชม.263/2568
        </p>
      </div>

      {/* ponytail: native <dialog> — free top-layer, backdrop and Esc-to-close. No modal library. */}
      <dialog
        ref={dialogRef}
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current?.close()
        }
        className="m-auto max-h-[92dvh] max-w-[92vw] bg-transparent backdrop:bg-slate-700/60 backdrop:backdrop-blur-md"
      >
        {active && (
          <div className="relative">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-h-[92dvh] w-auto rounded-2xl"
            />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="ปิด"
              className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-navy"
            >
              <FiX size={20} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
