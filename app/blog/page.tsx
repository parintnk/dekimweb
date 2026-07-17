import type { Metadata } from "next";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import ImagePlaceholder from "../components/image-placeholder";
import PageHeader from "../components/page-header";
import { LINE_URL, externalLink } from "../contact";

export const metadata: Metadata = {
  title: "บทความ",
  description:
    "บทความและเกร็ดความรู้ด้านความงามจากทีมแพทย์ Dr. KIM Clinic เชียงใหม่",
};

// ponytail: no articles exist yet — these are planned topics shown as "เร็ว ๆ นี้" cards, not fake
// published posts. Mounjaro leads because the brief flags it as the SEO priority.
const topics = [
  {
    title: "Mounjaro ลดน้ำหนักภายใต้การดูแลแพทย์ ปลอดภัยแค่ไหน",
    excerpt:
      "ปากกาลดน้ำหนักทำงานอย่างไร ใครเหมาะ–ไม่เหมาะ และทำไมต้องมีแพทย์ติดตามผล",
    image: "แนะนำ: รูปปากกา Mounjaro หรือภาพปรึกษาแพทย์",
  },
  {
    title: "โบท็อกซ์แท้ดูอย่างไร เช็กให้ชัวร์ก่อนฉีดทุกครั้ง",
    excerpt:
      "จุดสังเกตผลิตภัณฑ์ของแท้ การเปิดกล่องต่อหน้า และคำถามที่ควรถามก่อนฉีด",
    image: "แนะนำ: รูปเปิดกล่องผลิตภัณฑ์แท้ต่อหน้าคนไข้",
  },
  {
    title: "HIFU ยกกระชับเหมาะกับใคร เตรียมตัวอย่างไร",
    excerpt: "หลักการยกกระชับด้วย HIFU ผลที่คาดหวังได้ และการดูแลก่อน–หลังทำ",
    image: "แนะนำ: รูปเครื่อง Liftera 2 ขณะทำทรีตเมนต์",
  },
  {
    title: "ฟิลเลอร์อยู่ได้นานแค่ไหน ดูแลอย่างไรให้สวยนาน",
    excerpt:
      "อายุของฟิลเลอร์แต่ละบริเวณ พฤติกรรมที่ทำให้สลายไว และวิธีดูแลหลังฉีด",
    image: "แนะนำ: รูปการปรึกษาก่อนฉีดฟิลเลอร์",
  },
  {
    title: "ฝ้า-จุดด่างดำ รักษาด้วยเมโสหน้าใสได้จริงไหม",
    excerpt:
      "สาเหตุของฝ้า ทางเลือกการรักษา และทำไมต้องประเมินสภาพผิวก่อนทุกครั้ง",
    image: "แนะนำ: รูปแอมพูลเมโส / ผิวหน้าใส",
  },
  {
    title: "IV Drip เลือกสูตรไหนให้ตรงกับร่างกายเรา",
    excerpt:
      "ความต่างของสูตร Healthy, Energy และ Aura Bright พร้อมวิธีเตรียมตัวก่อนดริป",
    image: "แนะนำ: รูปห้อง IV Drip ของคลินิก",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="บทความ"
        title="Blog & Tips"
        description="บทความและเกร็ดความรู้จากทีมแพทย์ กำลังทยอยจัดทำ — เร็ว ๆ นี้"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <li
                key={t.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <ImagePlaceholder
                  label={t.image}
                  className="aspect-video rounded-none border-0 border-b border-dashed border-ink-body/25"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="self-start rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-accent">
                    เร็ว ๆ นี้
                  </span>
                  <h2 className="mt-3 font-display text-lg leading-7 text-ink">
                    {t.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink-body">
                    {t.excerpt}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-2xl bg-navy p-8 text-center md:p-10">
            <h2 className="font-display text-2xl text-white">
              อยากให้หมอเขียนเรื่องไหนเป็นพิเศษ?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/70">
              ทักมาบอกได้เลย หรือสอบถามข้อสงสัยกับทีมงานได้โดยตรง
            </p>
            <Link
              href={LINE_URL}
              {...externalLink}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-navy transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <FaLine size={16} aria-hidden />
              ทักไลน์หาเรา
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
