import type { Metadata } from "next";
import Image from "next/image";
import {
  FiAward,
  FiBox,
  FiCalendar,
  FiClipboard,
  FiEye,
  FiHeart,
  FiRepeat,
  FiShield,
  FiTag,
  FiUser,
} from "react-icons/fi";
import Doctor from "../components/doctor";
import GalleryLightbox from "../components/gallery-lightbox";
import Team from "../components/team";
import PageHeader from "../components/page-header";
import { getGallery } from "../lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "รู้จัก Dr. KIM Clinic คลินิกเวชกรรมด้านความงามในเชียงใหม่ ดูแลโดยนายแพทย์พงศ์พันธ์ ศิรินภาพันธ์ เปิดทุกวัน 11.00 – 20.00 น.",
};

// ponytail: only facts we can source — Google rating, review count, opening hours. No invented history.
const stats = [
  { value: "5.0", label: "คะแนนรีวิวบน Google" },
  { value: "68+", label: "รีวิวจากผู้ใช้บริการจริง" },
  { value: "ทุกวัน", label: "เปิด 11.00 – 20.00 น. (รับเคสสุดท้าย 19.30 น.)" },
];

// every point below is already claimed elsewhere on the site or in the reviews — nothing new invented
const values = [
  {
    icon: FiUser,
    title: "แพทย์ดูแลทุกเคส",
    detail: "ตรวจ ประเมิน และทำหัตถการโดยแพทย์ (ว.49913)",
  },
  {
    icon: FiBox,
    title: "ของแท้ เปิดกล่องให้ดู",
    detail: "เปิดผลิตภัณฑ์ใหม่ต่อหน้า ตรวจวันหมดอายุได้ทุกครั้ง",
  },
  {
    icon: FiShield,
    title: "สถานพยาบาลได้รับอนุญาต",
    detail: "เลขที่ใบอนุญาต 50101009062",
  },
  {
    icon: FiEye,
    title: "เครื่องมือผ่านมาตรฐาน",
    detail: "เลเซอร์และเครื่องมือทุกตัวได้รับการรับรอง",
  },
  {
    icon: FiRepeat,
    title: "ติดตามผลต่อเนื่อง",
    detail: "นัดติดตามอาการหลังทำ ไม่จบแค่หน้าเคาน์เตอร์",
  },
  {
    icon: FiTag,
    title: "ราคาชัดเจน",
    detail: "แจ้งราคาก่อนทำทุกครั้ง ไม่มีบวกเพิ่มหน้างาน",
  },
];

const steps = [
  {
    icon: FiCalendar,
    title: "ทักไลน์จองคิว",
    detail: "เลือกวันเวลาที่สะดวก ทีมงานยืนยันคิวให้",
  },
  {
    icon: FiClipboard,
    title: "ปรึกษาและประเมินโดยแพทย์",
    detail: "พูดคุยปัญหาและความต้องการก่อนตัดสินใจ",
  },
  {
    icon: FiHeart,
    title: "ทำหัตถการ",
    detail: "ดูแลโดยแพทย์ ด้วยผลิตภัณฑ์ของแท้",
  },
  {
    icon: FiRepeat,
    title: "ติดตามผล",
    detail: "นัดดูอาการและให้คำแนะนำการดูแลต่อเนื่อง",
  },
];

export default async function AboutPage() {
  const gallery = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="เกี่ยวกับเรา"
        title="About Dr. KIM Clinic"
        description="คลินิกเวชกรรมด้านความงามในจังหวัดเชียงใหม่ ดูแลทุกเคสโดยแพทย์ เลือกใช้ผลิตภัณฑ์ของแท้และเครื่องมือที่ได้มาตรฐาน เปิดให้บริการทุกวัน 11.00 – 20.00 น."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-6 md:py-8">
          <div className="relative aspect-16/9 overflow-hidden rounded-3xl border border-line shadow-xs">
            <Image
              src="/S__25640985.jpg_2K_202607241410.jpeg"
              alt="ทีมและบรรยากาศ Dr. KIM Clinic"
              fill
              priority
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 hidden bg-navy/20 mix-blend-multiply dark:block" />
          </div>
        </div>
      </section>

      <section
        aria-label="ตัวเลขของคลินิก"
        className="border-b border-line bg-surface"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl tabular-nums text-ink">
                {s.value}
              </p>
              <p className="mt-1 text-sm leading-6 text-ink-body">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            ทำไมต้องเลือกเรา
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            สิ่งที่เรายึดถือ
          </h2>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <Icon size={20} aria-hidden />
                </span>
                <p className="mt-4 font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm leading-6 text-ink-body">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Doctor />

      <Team />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            เข้ารับบริการครั้งแรก
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            ขั้นตอนง่าย ๆ 4 ขั้น
          </h2>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            สถานที่ของเรา
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            บรรยากาศคลินิก
          </h2>

          <GalleryLightbox photos={gallery} />

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-navy p-6 md:p-8">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
              <FiAward size={22} aria-hidden />
            </span>
            <p className="text-sm leading-7 text-white/70">
              เลขที่ใบอนุญาตสถานพยาบาล{" "}
              <span className="tabular-nums text-white">50101009062</span> ·
              ผู้ดำเนินการ นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์ (ว.49913) ·
              ใบอนุญาตโฆษณา ขสพ.ชม.263/2568
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
