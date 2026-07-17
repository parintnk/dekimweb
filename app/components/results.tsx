import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// ponytail: photos only — no captions. Swap the plate for <Image fill /> per item when they arrive.
const results = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

function ResultCard({ duplicate }: { duplicate?: boolean }) {
  return (
    <li className="w-64 shrink-0 md:w-72" aria-hidden={duplicate}>
      <div className="aspect-square overflow-hidden rounded-2xl border border-line bg-surface-3" />
    </li>
  );
}

export default function Results() {
  return (
    <section
      id="results"
      className="scroll-mt-20 overflow-hidden bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          ผลลัพธ์จริงจากคนไข้ของเรา
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Real Patient Results
          </h2>
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            ปรึกษาแพทย์เพื่อดูเคสของคุณ
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-body">
          ทุกเคสดูแลโดยแพทย์ผู้เชี่ยวชาญ วางแผนการรักษาเฉพาะบุคคล
          และติดตามผลอย่างต่อเนื่อง ภาพทั้งหมดเผยแพร่โดยได้รับความยินยอมจากคนไข้
        </p>
      </div>

      {/* ponytail: full-bleed on purpose — the row should run off both edges, not stop at the container */}
      <div className="relative mt-12">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {results.map((r) => (
            <ResultCard key={r.id} />
          ))}
          {/* second pass exists only to make the loop seamless, so screen readers skip it */}
          {results.map((r) => (
            <ResultCard key={`${r.id}-loop`} duplicate />
          ))}
        </ul>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent md:w-32" />
      </div>

      <p className="mx-auto mt-10 max-w-2xl px-6 text-center text-xs leading-6 text-ink-body">
        * ผลลัพธ์ขึ้นอยู่กับสภาพผิวและร่างกายของแต่ละบุคคล
        ภาพที่แสดงเป็นผลลัพธ์เฉพาะรายที่อาจแตกต่างกันไป
        กรุณาปรึกษาแพทย์เพื่อประเมินก่อนเข้ารับบริการ
      </p>
    </section>
  );
}
