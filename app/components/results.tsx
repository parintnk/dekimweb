import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { LINE_URL, externalLink } from "../contact";
import { getResults } from "../lib/content";
import SectionBackdrop from "./section-backdrop";

type Shot = { src: string; alt: string } | null;

function ResultCard({ shot, duplicate }: { shot: Shot; duplicate?: boolean }) {
  return (
    <li className="w-64 shrink-0 md:w-72" aria-hidden={duplicate}>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface-3">
        {shot && (
          <Image
            src={shot.src}
            alt={duplicate ? "" : shot.alt}
            fill
            sizes="18rem"
            className="object-cover"
          />
        )}
      </div>
    </li>
  );
}

export default async function Results() {
  // ponytail: empty table = the original blank plates, so the marquee never disappears
  const shots = await getResults();
  const plates: Shot[] = shots.length
    ? shots
    : Array.from({ length: 8 }, () => null);

  return (
    <section
      id="results"
      className="relative isolate scroll-mt-20 overflow-hidden bg-surface py-20 md:py-28"
    >
      <SectionBackdrop flip />
      <div className="reveal mx-auto max-w-7xl px-6">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          ผลลัพธ์จริงจากคนไข้ของเรา
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Real Patient Results
          </h2>
          <Link
            href={LINE_URL}
            {...externalLink}
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
      <div className="reveal relative mt-12">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {plates.map((shot, i) => (
            <ResultCard key={i} shot={shot} />
          ))}
          {/* second pass exists only to make the loop seamless, so screen readers skip it */}
          {plates.map((shot, i) => (
            <ResultCard key={`${i}-loop`} shot={shot} duplicate />
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
