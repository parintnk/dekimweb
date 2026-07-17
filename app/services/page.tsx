import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/page-header";
import { LINE_URL, externalLink } from "../contact";

export const metadata: Metadata = {
  title: "บริการและราคา",
  description:
    "ราคาทุกบริการของ Dr. KIM Clinic เชียงใหม่ แยกตามยี่ห้อและขนาด — Botox, Filler, Biostimulator, Mesotherapy, IV Drip, เลเซอร์ และ Mounjaro ลดน้ำหนัก",
};

// ponytail: every number below is transcribed from the client's price sheet (July 2026 brief).
// Promo prices live on the posters in /promotions — this page is the standing rate card.
type Row = { name: string; note?: string; unit: string; price: string };

const categories: {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  blurb: string;
  fit: string;
  rows: Row[];
}[] = [
  {
    id: "botox",
    fit: "ริ้วรอยหน้าผาก คิ้วขมวด ตีนกา กรามใหญ่ เรียวหน้า",
    image: "/services/botox.jpg",
    title: "Botox",
    subtitle: "โบท็อกซ์",
    blurb: "ลดริ้วรอย ยกกระชับ เรียวหน้า เปิดกล่องผลิตภัณฑ์แท้ให้ดูทุกครั้ง",
    rows: [
      { name: "Aestox", unit: "50 unit", price: "3,590" },
      { name: "Nabota", unit: "100 unit", price: "5,990" },
      { name: "Allergan", unit: "50 unit", price: "9,990" },
    ],
  },
  {
    id: "filler",
    fit: "ร่องแก้มลึก ใต้ตาคล้ำ ปากบาง คางสั้น",
    image: "/services/filler.jpg",
    title: "Filler",
    subtitle: "ฟิลเลอร์",
    blurb: "เติมร่องลึก เติมวอลลุ่ม ปรับรูปหน้าอย่างเป็นธรรมชาติ",
    rows: [
      { name: "Neuramis Deep", unit: "1 CC", price: "3,990" },
      { name: "Neuramis Volume", unit: "1 CC", price: "4,990" },
      { name: "Elavie", unit: "1 CC", price: "6,990" },
      { name: "Berotero", unit: "1 CC", price: "12,900" },
      { name: "Restylane ทุกรุ่น", unit: "1 CC", price: "12,900" },
    ],
  },
  {
    id: "biostimulator",
    fit: "ผิวหย่อนคล้อย ริ้วรอยเล็ก ๆ ทั่วหน้า อยากฟื้นฟูระยะยาว",
    image: "/services/biostimulator.jpg",
    title: "Biostimulator",
    subtitle: "ไบโอสติมูเลเตอร์",
    blurb: "กระตุ้นคอลลาเจน ฟื้นความแข็งแรงของผิวจากภายใน",
    rows: [
      { name: "Sculptra", unit: "1 ขวด", price: "19,900" },
      { name: "Aesthefill", unit: "1 ขวด", price: "17,900" },
      { name: "Olidia 120", unit: "1 ขวด", price: "16,900" },
    ],
  },
  {
    id: "mesotherapy",
    fit: "ฝ้า จุดด่างดำ ผิวหมองคล้ำ แก้ม-เหนียง",
    image: "/services/mesotherapy.jpg",
    title: "Mesotherapy",
    subtitle: "เมโสหน้าใส",
    blurb: "ลดฝ้า ผิวกระจ่างใส ลดไขมันเฉพาะจุด",
    rows: [
      { name: "Fat sisi face", unit: "10 ml. (1 ขวด)", price: "2,990" },
      { name: "Fat sisi body", unit: "30 ml. (1 ขวด)", price: "5,990" },
      { name: "Hayyan ลดฝ้า", unit: "10 ml. (1 ขวด)", price: "3,990" },
      { name: "Snow Bright หน้าใส", unit: "10 ml. (1 ขวด)", price: "3,990" },
    ],
  },
  {
    id: "iv-drip",
    fit: "อ่อนเพลีย พักผ่อนน้อย อยากให้ผิวดูสดใส",
    image: "/services/iv-drip.jpg",
    title: "IV Drip",
    subtitle: "วิตามินทางหลอดเลือด",
    blurb: "ฟื้นฟูร่างกาย เพิ่มพลัง ผิวออร่า",
    rows: [
      { name: "สูตร Healthy Booster", unit: "1 กระปุก", price: "790" },
      { name: "สูตร Energy Booster", unit: "1 กระปุก", price: "990" },
      { name: "สูตร Aura Bright Booster", unit: "1 กระปุก", price: "1,290" },
    ],
  },
  {
    id: "energy-device",
    fit: "กำจัดขน หลุมสิว ไฝ-ติ่งเนื้อ หน้าหย่อนคล้อย",
    image: "/services/energy-device.jpg",
    title: "Energy-Based Device",
    subtitle: "เลเซอร์และเครื่องมือ",
    blurb: "IPL · CO2 Laser · RF · HIFU ด้วยเครื่องมือที่ได้มาตรฐาน",
    rows: [
      {
        name: "IPL กำจัดขน",
        note: "รักแร้ · หนวด-เครา · หน้าใส",
        unit: "1 ครั้ง",
        price: "790",
      },
      { name: "CO2 Laser รักษาหลุมสิว", unit: "1 ครั้ง", price: "1,290" },
      {
        name: "CO2 Laser จี้ไฝ",
        note: "ไฝ · ขี้แมลงวัน · ติ่งเนื้อ",
        unit: "1 จุด",
        price: "790",
      },
      {
        name: "Coolfase (Monopolar RF)",
        note: "สลายไขมันใต้ชั้นผิวบนใบหน้า",
        unit: "200 shots",
        price: "9,990",
      },
      {
        name: "Liftera 2 ยกกระชับหน้า (HIFU)",
        unit: "1200 shots",
        price: "6,990",
      },
      {
        name: "Liftera 2 คอหงส์ (HIFU)",
        note: "แถม 1000 shots",
        unit: "1000 shots",
        price: "5,990",
      },
    ],
  },
];

const mounjaro = [
  { dose: "2.5 mg.", once: "1,990", four: "7,800", pen: "13,900" },
  { dose: "5.0 mg.", once: "3,590", four: "14,000", pen: "16,900" },
  { dose: "7.5 mg.", once: "4,590", four: "18,000", pen: "19,900" },
  { dose: "10.0 mg.", once: "5,590", four: "22,000", pen: "24,900" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="บริการของเรา"
        title="Services & Prices"
        description="ราคามาตรฐานของทุกบริการ แยกตามยี่ห้อและขนาด ทุกหัตถการดูแลโดยแพทย์ และเลือกใช้ผลิตภัณฑ์ของแท้ที่ผ่านการรับรอง"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          {/* ponytail: zigzag rows — image and details side by side, sides swap per category */}
          <div className="space-y-16 md:space-y-24">
            {categories.map((c, i) => (
              <article
                key={c.id}
                id={c.id}
                className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-4/3 overflow-hidden rounded-3xl border border-line ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
                    <span className="h-px w-8 bg-gold" aria-hidden />
                    {String(i + 1).padStart(2, "0")} · {c.subtitle}
                  </p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ink">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-ink-body">
                    {c.blurb}
                  </p>
                  <p className="mt-3 inline-block rounded-lg bg-surface-2 px-3 py-2 text-xs leading-5 text-accent">
                    เหมาะสำหรับ: {c.fit}
                  </p>

                  <table className="mt-5 w-full text-sm">
                    <tbody>
                      {c.rows.map((r) => (
                        <tr key={r.name} className="border-t border-line">
                          <td className="py-3 pr-3">
                            <span className="text-ink">{r.name}</span>
                            {r.note && (
                              <span className="block text-xs leading-5 text-ink-body">
                                {r.note}
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-3 text-right text-xs text-ink-body">
                            {r.unit}
                          </td>
                          <td className="whitespace-nowrap py-3 text-right font-medium tabular-nums text-ink">
                            {r.price}.-
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </div>

          {/* ponytail: Mounjaro keeps the navy band treatment — the brief flags it as the priority service */}
          <div
            id="mounjaro"
            className="mt-16 scroll-mt-24 overflow-hidden rounded-2xl bg-navy p-6 md:mt-24 md:p-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-gold">
                  WEIGHT MANAGEMENT
                </p>
                <h2 className="mt-3 font-display text-2xl text-white sm:text-3xl">
                  Mounjaro ลดน้ำหนัก
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-7 text-white/70">
                  ประเมินและปรับขนาดยาโดยแพทย์ พร้อมติดตามผลรายบุคคลตลอดโปรแกรม
                </p>
              </div>
              <Link
                href={LINE_URL}
                {...externalLink}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-navy transition-all duration-200 hover:bg-gold active:scale-[0.98]"
              >
                ปรึกษาแพทย์
                <FiArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-md text-sm text-white/80">
                <thead>
                  <tr className="text-xs tracking-wide text-white/50">
                    <th scope="col" className="py-2 pr-3 text-left font-medium">
                      ขนาดยา
                    </th>
                    <th
                      scope="col"
                      className="py-2 pr-3 text-right font-medium"
                    >
                      1 ครั้ง
                    </th>
                    <th
                      scope="col"
                      className="py-2 pr-3 text-right font-medium"
                    >
                      แพ็กเกจ 4 ครั้ง
                    </th>
                    <th scope="col" className="py-2 text-right font-medium">
                      เหมา 1 ด้าม (4 ครั้ง)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mounjaro.map((m) => (
                    <tr key={m.dose} className="border-t border-white/10">
                      <td className="py-3 pr-3 text-white">{m.dose}</td>
                      <td className="py-3 pr-3 text-right tabular-nums">
                        {m.once}.-
                      </td>
                      <td className="py-3 pr-3 text-right tabular-nums">
                        {m.four}.-
                      </td>
                      <td className="py-3 text-right font-medium tabular-nums text-gold">
                        {m.pen}.-
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/50">
              ราคาต่อครั้งมีค่าฉีดเพิ่ม 100.- · แพ็กเกจ 4 ครั้งและเหมาด้าม
              ฟรีค่าฉีด
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs leading-6 text-ink-body">
              ราคาอาจเปลี่ยนแปลงตามโปรโมชั่นประจำเดือน
              สอบถามราคาล่าสุดก่อนเข้ารับบริการได้ที่คลินิก
            </p>
            <Link
              href={LINE_URL}
              {...externalLink}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-medium text-on-brand transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <FaLine size={16} aria-hidden />
              สอบถามราคาล่าสุดทางไลน์
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
