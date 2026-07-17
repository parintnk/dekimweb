import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShield, FiUser, FiZap } from "react-icons/fi";
import HeroMobile from "./components/hero-mobile";
import Navbar from "./components/navbar";

const trust = [
  {
    icon: FiUser,
    title: "แพทย์ผู้เชี่ยวชาญ",
    detail: "ประสบการณ์มากกว่า 10 ปี",
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
    title: "ดูแลทุกเคสอย่างใส่ใจ",
    detail: "ผลลัพธ์สวยอย่างเป็นธรรมชาติ",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ponytail: pb clears the fixed mobile CTA bar */}
      <main id="main" className="flex-1 pb-20 md:pb-0">
        <HeroMobile />

        {/* ponytail: desktop first screen = hero + trust strip in one viewport. 4.5rem = navbar height. */}
        <div className="md:flex md:h-[calc(100svh-4.5rem)] md:flex-col">
          <section className="relative hidden overflow-hidden bg-cream md:flex md:min-h-0 md:flex-1">
            <Image
              src="/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/45 to-transparent" />

            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2">
              <div>
                <p className="mb-5 flex items-center gap-3 text-sm font-medium tracking-wide text-gold-ink">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  เพราะความสวยคือความมั่นใจ
                </p>
                <h1 className="font-display text-4xl leading-[1.15] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                  เผยผิวสวย
                  <br />
                  มั่นใจในแบบคุณ
                </h1>
                <p className="mt-6 max-w-md text-base leading-8 text-textgray">
                  ดูแลโดยแพทย์ผู้เชี่ยวชาญ ด้วยเทคโนโลยีที่ทันสมัย
                  ได้ผลลัพธ์ที่เป็นธรรมชาติ
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link
                    href="#booking"
                    className="rounded-lg bg-navy px-8 py-4 text-sm font-medium text-white shadow-lg shadow-navy/20 transition-all duration-200 hover:bg-navy/90 hover:shadow-xl hover:shadow-navy/25 active:scale-[0.98]"
                  >
                    จองคิวปรึกษา
                  </Link>
                  <Link
                    href="#promotion"
                    className="rounded-lg border border-gold bg-white/60 px-8 py-4 text-sm font-medium text-navy backdrop-blur-sm transition-all duration-200 hover:border-gold-ink hover:bg-white active:scale-[0.98]"
                  >
                    ดูโปรโมชั่น
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-label="จุดเด่นของคลินิก"
            className="border-b border-black/5 bg-white md:shrink-0"
          >
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-2 md:py-8 lg:grid-cols-4 lg:divide-x lg:divide-black/5">
              {trust.map(({ icon: Icon, title, detail }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold-ink">
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <p className="font-medium text-navy">{title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-textgray">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
