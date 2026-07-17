import Link from "next/link";
import { FiArrowRight, FiAward, FiCheck } from "react-icons/fi";

// ponytail: straight from the client brief — license and ว. number are the trust anchor, not decoration.
const credentials = [
  "แพทยศาสตรบัณฑิต และแพทย์ผู้มีประสบการณ์ด้านความงามกว่า 10 ปี",
  "เชี่ยวชาญด้าน Botox · Filler · Biostimulator และการปรับรูปหน้า",
  "ดูแลเคสลดน้ำหนักด้วย Mounjaro โดยประเมินและติดตามผลรายบุคคล",
  "วางแผนการรักษาเฉพาะบุคคล เน้นผลลัพธ์ที่เป็นธรรมชาติ",
];

export default function Doctor() {
  return (
    <section id="about" className="scroll-mt-20 bg-surface-2">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        {/* ponytail: 4:5 portrait plate — one photo, swap for <Image fill /> when it lands */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="aspect-4/5 overflow-hidden rounded-3xl border border-line bg-surface-3" />

          {/* license card overlaps the photo — the number is the most load-bearing fact here */}
          <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-line bg-surface p-4 shadow-xl shadow-navy/10 sm:left-auto sm:right-6 sm:w-auto sm:translate-x-0">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                <FiAward size={20} aria-hidden />
              </span>
              <div>
                <p className="text-xs text-ink-body">
                  เลขที่ใบอนุญาตสถานพยาบาล
                </p>
                <p className="font-medium tabular-nums text-ink">50101009062</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            แพทย์ผู้ดูแล
          </p>

          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Meet the Doctor
          </h2>

          <p className="mt-6 font-display text-2xl text-ink">
            นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์
          </p>
          <p className="mt-1 text-sm tracking-wide text-ink-body">
            PONGPUN SIRINAPAPUN, M.D.
            <span className="mx-2 text-gold" aria-hidden>
              ·
            </span>
            <span className="tabular-nums">ว.49913</span>
          </p>

          <p className="mt-6 max-w-lg leading-8 text-ink-body">
            “ความสวยที่ดีที่สุดคือความสวยที่ยังเป็นตัวคุณ
            ผมจึงให้เวลากับการพูดคุยและประเมินก่อนเสมอ
            เพื่อวางแผนการรักษาที่พอดีกับโครงหน้าและไลฟ์สไตล์ของแต่ละคน”
          </p>

          <ul className="mt-8 space-y-3">
            {credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-accent">
                  <FiCheck size={12} aria-hidden />
                </span>
                <span className="text-sm leading-6 text-ink-body">{c}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#booking"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-4 text-sm font-medium text-on-brand shadow-lg shadow-navy/20 transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
          >
            ปรึกษาแพทย์
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
