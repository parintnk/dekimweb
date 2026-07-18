import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { LINE_URL, externalLink } from "../contact";
import SectionBackdrop from "./section-backdrop";

// ponytail: prices are the "เริ่มต้น" of each category from the client brief.
// Full per-brand tables live on the (not yet built) detail pages.
const services = [
  {
    image: "/services/botox.jpg",
    slug: "botox",
    title: "Botox",
    subtitle: "โบท็อกซ์",
    detail: "ลดริ้วรอย ยกกระชับ เรียวหน้า",
    brands: ["Aestox", "Nabota", "Allergan"],
    from: "3,590",
    unit: "ต่อ 50 unit",
  },
  {
    image: "/services/filler.jpg",
    slug: "filler",
    title: "Filler",
    subtitle: "ฟิลเลอร์",
    detail: "เติมร่องลึก เติมวอลลุ่ม ปรับรูปหน้า",
    brands: ["Neuramis", "Elavie", "Restylane"],
    from: "3,990",
    unit: "ต่อ 1 CC",
  },
  {
    image: "/services/biostimulator.jpg",
    slug: "biostimulator",
    title: "Biostimulator",
    subtitle: "ไบโอสติมูเลเตอร์",
    detail: "กระตุ้นคอลลาเจน ฟื้นผิวจากภายใน",
    brands: ["Sculptra", "Aesthefill", "Olidia"],
    from: "16,900",
    unit: "ต่อ 1 ขวด",
  },
  {
    image: "/services/mesotherapy.jpg",
    slug: "mesotherapy",
    title: "Mesotherapy",
    subtitle: "เมโสหน้าใส",
    detail: "ลดฝ้า ผิวกระจ่างใส ลดไขมันเฉพาะจุด",
    brands: ["Fat sisi", "Hayyan", "Snow Bright"],
    from: "2,990",
    unit: "ต่อ 1 ขวด",
  },
  {
    image: "/services/iv-drip.jpg",
    slug: "iv-drip",
    title: "IV Drip",
    subtitle: "วิตามินทางหลอดเลือด",
    detail: "ฟื้นฟูร่างกาย เพิ่มพลัง ผิวออร่า",
    brands: ["Healthy", "Energy", "Aura Bright"],
    from: "790",
    unit: "ต่อ 1 กระปุก",
  },
  {
    image: "/services/energy-device.jpg",
    slug: "energy-device",
    title: "Energy-Based Device",
    subtitle: "เลเซอร์และเครื่องมือ",
    detail: "IPL กำจัดขน · CO2 หลุมสิว · HIFU ยกกระชับ",
    brands: ["Liftera 2", "Coolfase", "CO2 Laser"],
    from: "790",
    unit: "ต่อครั้ง",
  },
];

export default function Services() {
  // ponytail: scroll-mt keeps the heading clear of the sticky navbar on #services jumps
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-20 overflow-hidden bg-surface-2"
    >
      <SectionBackdrop />
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          บริการของเรา
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Our Services
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            ดูบริการทั้งหมด
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(
            ({ image, slug, title, subtitle, detail, brands, from, unit }) => (
              <li key={title} className="reveal">
                <Link
                  href={`/services#${slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-surface-2">
                    <Image
                      src={image}
                      alt={`บริการ ${title} ${subtitle}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />
                    <p className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
                      {subtitle}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-body">
                      {detail}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {brands.map((b) => (
                        <li
                          key={b}
                          className="rounded-md bg-surface-2 px-2 py-1 text-xs text-accent"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* ponytail: price is the reason this card exists — biggest type in it */}
                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
                      <div>
                        <p className="text-xs text-ink-body">เริ่มต้น</p>
                        <p className="font-display text-2xl leading-tight tabular-nums text-ink">
                          {from}
                          <span className="ml-1 font-sans text-sm text-ink-body">
                            บาท
                          </span>
                        </p>
                        <p className="text-xs text-ink-body">{unit}</p>
                      </div>

                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors duration-200 group-hover:bg-brand group-hover:text-on-brand"
                        aria-hidden
                      >
                        <FiArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* ponytail: Mounjaro gets the navy band — the brief flags it as the priority service.
            The consult-room photo sits behind a navy gradient: text stays on solid navy, the room peeks out right. */}
        <div className="reveal relative mt-6 overflow-hidden rounded-2xl bg-navy p-8 md:p-10">
          <Image
            src="/clinic/consult-room.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            data-parallax
            className="scale-110 object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-gold">
                WEIGHT MANAGEMENT
              </p>
              <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">
                Mounjaro ลดน้ำหนัก
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                ดูแลโดยแพทย์ ปรับขนาดยาให้เหมาะกับแต่ละคน ตั้งแต่ 2.5 – 10 mg.
                แพ็กเกจ 4 ครั้ง ฟรีค่าฉีด
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <div>
                <p className="text-xs text-white/60">เริ่มต้น</p>
                <p className="font-display text-3xl tabular-nums text-gold">
                  1,990.-
                </p>
                <p className="text-xs text-white/60">ต่อครั้ง (2.5 mg.)</p>
              </div>
              <Link
                href={LINE_URL}
                {...externalLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-navy transition-all duration-200 hover:bg-gold active:scale-[0.98]"
              >
                ปรึกษาแพทย์
                <FiArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-ink-body">
          ราคาอาจเปลี่ยนแปลงตามโปรโมชั่นประจำเดือน สอบถามราคาล่าสุดได้ที่คลินิก
        </p>
      </div>
    </section>
  );
}
