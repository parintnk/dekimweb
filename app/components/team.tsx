import Image from "next/image";

// ponytail: roster, quotes and photos come from the clinic's own Google Site staff page
// (sites.google.com/view/dr-kim-clinic-cnx → บุคลากร, fetched 2026-07-17). Quotes are verbatim.
const team = [
  {
    image: "/team/doctor-pongpun.jpg",
    name: "นพ.พงศ์พันธ์ ศิรินภาพันธ์",
    role: "แพทย์ประจำคลินิก (ว.49913)",
    quote:
      "เราดูแลรักษาคงสภาพความอ่อนเยาว์แบบองค์รวม ด้วยเทคนิค ผลิตภัณฑ์ และเครื่องมือที่ได้มาตรฐานสากล",
  },
  {
    image: "/team/ceo-nonthanat.jpg",
    name: "นนธนัท ปินไชย",
    role: "Chief Executive Officer (CEO)",
    quote: "Good Manage, Great Service, Best Result",
  },
  {
    image: "/team/cfo-piyanuch.jpg",
    name: "ปิยะนุช อิ่มเจริญ",
    role: "Chief Financial Officer (CFO)",
    quote: "เพราะความมั่นใจของคุณ คือความสุขของเรา",
  },
  {
    image: "/team/assistant-thanakon.jpg",
    name: "ธนกร ขาวป้อ",
    role: "ผู้ช่วยแพทย์ (Clinical Assistant)",
    quote:
      "ไม่ได้มีเวทมนต์ แต่มีมือหมอและทีมผู้ช่วยที่พร้อมเนรมิตความปังให้คุณ",
  },
  {
    image: "/team/reception-naphatchakorn.jpg",
    name: "นพัชกร ยารังษี",
    role: "Beauty Consultant & Receptionist",
    quote:
      "ความสุขของเราคือการได้เห็นคุณลูกค้ายิ้มหลังส่องกระจก และมีสุขภาพที่ดีแบบองค์รวมค่ะ",
  },
  {
    image: "/team/reception-kamonrad.jpg",
    name: "กมลรัตน์ สมฟอง",
    role: "Beauty Consultant & Receptionist",
    quote: "ยืนหนึ่งเรื่องต้อนรับ ลูกค้าเดินเข้าคลินิกเมื่อไหร่ ทักทายได้ค่ะ",
  },
  {
    image: "/team/marketing-veravut.jpg",
    name: "วีรวุฒิ ปาลี",
    role: "Marketing & Graphic Design",
    quote: "If you can dream it, you can do it",
  },
  {
    image: "/team/housekeeping-pee.jpg",
    name: "ปี คำเฮือง",
    role: "Housekeeping Team",
    quote: "จับไม้กวาดแบบมือโปร ความสะอาดใส่ใจไม่แพ้ใครแน่นอนค่ะ",
  },
];

export default function Team() {
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
