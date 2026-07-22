import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/page-header";
import { LINE_URL, externalLink } from "../contact";
import { getServicePricing } from "../lib/content";

export const metadata: Metadata = {
  title: "บริการและราคา",
  description:
    "ราคาทุกบริการของ Dr. KIM Clinic เชียงใหม่ แยกตามยี่ห้อและขนาด — Botox, Filler, Biostimulator, Mesotherapy, IV Drip, เลเซอร์ และ Mounjaro ลดน้ำหนัก",
};

export default async function ServicesPage() {
  // ponytail: hidden rows already filtered out in getServicePricing → hiding a service in
  // admin drops it from this page too. Mounjaro is the weight-management row, rendered as the band.
  const services = await getServicePricing();
  const categories = services.filter((s) => s.slug !== "weight-management");
  const wm = services.find((s) => s.slug === "weight-management");
  const mounjaro = wm?.mounjaroRates ?? [];

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
                key={c.slug}
                id={c.slug}
                className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-4/3 overflow-hidden rounded-3xl border border-line bg-surface-2 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {c.image && (
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
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
                      {c.rates.map((r) => (
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

                  <Link
                    href={`/services/${c.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
                  >
                    อ่านข้อมูลเพิ่มเติมเกี่ยวกับ {c.title}
                    <FiArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* ponytail: Mounjaro keeps the navy band treatment — the brief flags it as the priority
              service. Band shows only when the weight-management row is visible (not hidden). */}
          {wm && (
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

            <Link
              href="/services/weight-management"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold transition-opacity duration-200 hover:opacity-80"
            >
              อ่านข้อมูลเพิ่มเติมเกี่ยวกับโปรแกรมลดน้ำหนัก
              <FiArrowRight size={16} aria-hidden />
            </Link>
          </div>
          )}

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
