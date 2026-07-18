import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// ponytail: mobile-only hero. Shares nothing with the desktop hero on purpose —
// different crop, different composition. The sticky LINE bar moved to layout (mobile-cta-bar).
// No card/box: text sits straight on the photo over an always-navy gradient, so it reads
// the same in both themes.
export default function HeroMobile() {
  return (
    <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end overflow-hidden bg-navy md:hidden">
      <Image
        src="/hero-portrait.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />

      {/* deep bottom wash — keeps her face clear, carries the type */}
      <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-navy via-navy/55 to-transparent" />

      <div className="relative px-6 pb-28">
        <p className="enter flex items-center gap-2.5 text-xs font-medium tracking-[0.15em] text-gold">
          <span className="h-px w-6 bg-gold" aria-hidden />
          เพราะความสวยคือความมั่นใจ
        </p>

        <h1 className="enter-2 mt-4 font-display text-[2.7rem] leading-[1.12] tracking-tight text-white">
          เผยผิวสวย
          <br />
          มั่นใจในแบบคุณ
        </h1>

        <p className="enter-3 mt-4 max-w-[18rem] text-sm leading-7 text-white/75">
          ดูแลโดยแพทย์ผู้เชี่ยวชาญ ด้วยเทคโนโลยีที่ทันสมัย
          ได้ผลลัพธ์ที่เป็นธรรมชาติ
        </p>

        <Link
          href="#promotion"
          className="enter-4 mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-sm font-medium text-gold"
        >
          ดูโปรโมชั่นประจำเดือน
          <FiArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
