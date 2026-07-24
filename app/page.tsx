import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShield, FiUser, FiZap } from "react-icons/fi";
import Doctor from "./components/doctor";
import HeroMobile from "./components/hero-mobile";
import Promotions from "./components/promotions";
import Results from "./components/results";
import Reviews from "./components/reviews";
import Services from "./components/services";
import { LINE_URL, externalLink } from "./contact";
import { getPromotions } from "./lib/content";

// content comes from Supabase (admin-editable) — refresh at most once a minute
export const revalidate = 60;

const trust = [
  {
    icon: FiUser,
    title: "แพทย์ดูแลทุกเคส",
    detail: "ตรวจและทำหัตถการโดยแพทย์ (ว.49913)",
  },
  {
    icon: FiShield,
    title: "มาตรฐานระดับสากล",
    detail: "ปลอดภัย ได้รับการรับรอง",
  },
  {
    icon: FiZap,
    title: "เทคโนโลยีทันสมัย",
    detail: "เครื่องมือผ่านมาตรฐาน",
  },
  {
    icon: FiHeart,
    title: "ติดตามผลต่อเนื่อง",
    detail: "นัดติดตามอาการหลังทำทุกเคส",
  },
];

export default async function Home() {
  const promos = await getPromotions();
  return (
    <>
      <HeroMobile />

      {/* ponytail: desktop hero fills the first viewport. 4.5rem = navbar height. Trust strip
          moved down under the Google reviews. */}
      <div className="md:flex md:h-[calc(100svh-4.5rem)] md:flex-col">
        <section className="relative hidden overflow-hidden bg-surface-2 md:flex md:min-h-0 md:flex-1">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          {/* ponytail: photos have baked-in cream backgrounds — on a dark page they glare.
                A multiply tint pulls them toward the surface without killing her skin. */}
          <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-2 via-surface-2/45 to-transparent" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2">
            <div>
              <p className="enter mb-5 flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
                <span className="h-px w-8 bg-gold" aria-hidden />
                ที่ Dr. KIM CLINIC
              </p>
              <h1 className="enter-2 font-display text-4xl leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                <span className="text-gold">“</span>Your beauty
                <br />
                is our duty<span className="text-gold">”</span>
              </h1>
              <p className="enter-3 mt-6 max-w-md text-base leading-8 text-ink-body">
                เพราะความสวย ความดูดี คือหน้าที่ของเรา
              </p>
              <div className="enter-4 mt-9 flex flex-wrap gap-4">
                <Link
                  href={LINE_URL}
                  {...externalLink}
                  className="rounded-lg bg-brand px-8 py-4 text-sm font-medium text-on-brand shadow-lg shadow-navy/20 transition-all duration-200 hover:opacity-90 hover:shadow-xl hover:shadow-navy/25 active:scale-[0.98]"
                >
                  จองคิวผ่านไลน์
                </Link>
                <Link
                  href="#promotion"
                  className="rounded-lg border border-gold bg-surface/60 px-8 py-4 text-sm font-medium text-ink backdrop-blur-sm transition-all duration-200 hover:border-accent hover:bg-surface active:scale-[0.98]"
                >
                  ดูโปรโมชั่น
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Promotions items={promos} />
      <Services />
      <Results />
      <Doctor />

      {/* ponytail: full-bleed clinic-ambience band — real lobby photo under a navy wash.
          Theme-independent on purpose, same as the other navy bands. */}
      <section className="relative overflow-hidden">
        <Image
          src="/clinic/lobby.jpg"
          alt=""
          fill
          sizes="100vw"
          data-parallax
          className="scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />

        <div className="reveal relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden />
            สถานที่ของเรา
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl tracking-tight text-white sm:text-4xl">
            บรรยากาศที่ออกแบบมา
            <br />
            ให้ทุกการมาเยือนรู้สึกผ่อนคลาย
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
            ตั้งแต่โถงต้อนรับพร้อมเปียโน ไปจนถึงห้องทรีตเมนต์
            และเครื่องมือที่ได้มาตรฐาน สะอาด เป็นส่วนตัว ใจกลางเชียงใหม่
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-gold hover:text-navy"
          >
            ชมบรรยากาศคลินิก
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <Reviews />

      <section
        aria-label="จุดเด่นของคลินิก"
        className="border-t border-line bg-surface"
      >
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {trust.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="reveal flex items-start gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                <Icon size={22} aria-hidden />
              </span>
              <div>
                <p className="font-medium text-ink">{title}</p>
                <p className="mt-0.5 text-sm leading-6 text-ink-body">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
