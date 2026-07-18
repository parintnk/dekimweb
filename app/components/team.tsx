import Image from "next/image";
import { getTeam } from "../lib/content";

export default async function Team() {
  const team = await getTeam();
  return (
    <section className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
          <span className="h-px w-8 bg-gold" aria-hidden />
          ทีมงานของเรา
        </p>
        <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Meet the Team
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-body">
          เราเชื่อว่ากุญแจสำคัญสู่ผลลัพธ์ความงามที่ยั่งยืน
          คือทีมงานมืออาชีพที่พร้อมดูแลคุณในทุกมิติ —
          ตั้งแต่การบริหารจัดการที่มีมาตรฐาน การรักษาที่แม่นยำ
          ไปจนถึงการต้อนรับที่อบอุ่นใส่ใจ
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li
              key={m.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            >
              {/* ponytail: the portraits share one navy studio backdrop — no tint needed in dark mode */}
              <div className="relative aspect-3/4 bg-navy">
                <Image
                  src={m.image}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-medium text-ink">{m.name}</p>
                <p className="mt-0.5 text-xs text-accent">{m.role}</p>
                <p className="mt-3 text-sm leading-6 text-ink-body">
                  “{m.quote}”
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
