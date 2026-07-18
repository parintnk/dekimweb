import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// ponytail: mobile-only hero. Shares nothing with the desktop hero on purpose —
// different crop, different composition. The sticky LINE bar moved to layout (mobile-cta-bar).
export default function HeroMobile() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end overflow-hidden bg-surface-2 md:hidden">
      <Image
        src="/hero-portrait.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />

      {/* ponytail: two stops — lifts the card off the photo, keeps her face untouched */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-surface-2 via-surface-2/40 to-transparent" />

      <div className="enter relative mx-4 mb-24 rounded-[1.75rem] border border-line bg-surface-2/80 p-6 shadow-2xl shadow-navy/10 backdrop-blur-xl">
        <p className="flex items-center gap-2.5 text-xs font-medium tracking-wide text-accent">
          <span className="h-px w-6 bg-gold" aria-hidden />
          เพราะความสวยคือความมั่นใจ
        </p>

        <h1 className="mt-3 font-display text-[2rem] leading-[1.2] tracking-tight text-ink">
          เผยผิวสวย
          <br />
          มั่นใจในแบบคุณ
        </h1>

        <p className="mt-3 text-sm leading-7 text-ink-body">
          ดูแลโดยแพทย์ผู้เชี่ยวชาญ ด้วยเทคโนโลยีที่ทันสมัย
          ได้ผลลัพธ์ที่เป็นธรรมชาติ
        </p>

        <Link
          href="#promotion"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          ดูโปรโมชั่นประจำเดือน
          <FiArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
