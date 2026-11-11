import { blocksToHtml } from "../admin/blocks-doc";
import type { Block } from "../blog/articles";
import { reviews } from "../components/reviews";
import {
  FACEBOOK_URL,
  GOOGLE_REVIEWS_URL,
  INSTAGRAM_URL,
  LINE_ID,
  LINE_URL,
  PHONE,
  SITE_URL,
  TIKTOK_URL,
} from "../contact";
import type { MounjaroRate, RateRow } from "../services/rates";
import {
  getArticles,
  getPromotions,
  getServiceCards,
  getServiceDetails,
  getServicePricing,
  getTeam,
} from "./content";
import { htmlToMd } from "./html-to-md";

// ponytail: llms.txt (llmstxt.org) + a Markdown twin of every public page, built from the same
// Supabase getters the pages use, so admin edits reach AI agents within the same 60s cache.
// Static copy below mirrors about/page.tsx, contact/page.tsx, reviews/page.tsx and the footer —
// page.tsx files can't export extra consts, so if you change wording there, change it here too.

const origin = SITE_URL.replace(/\/$/, "");
export const htmlUrl = (path: string) => origin + encodeURI(path || "/");
export const mdUrl = (path: string) => origin + encodeURI(`${path || "/index"}.md`);

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("หมอคิมคลินิกเวชกรรม เชียงใหม่ DR.KIM CLINIC")}`;

const FACTS = [
  "- ชื่อคลินิก: Dr. KIM Clinic — หมอคิมคลินิกเวชกรรม เชียงใหม่ (Dr. KIM Clinic, Chiang Mai)",
  "- ประเภท: คลินิกเวชกรรมด้านความงาม (aesthetic medical clinic) — ดูแลและทำหัตถการโดยแพทย์ทุกเคส",
  `- ที่อยู่: 72/1 ถ.รัตนโกสินทร์ ต.วัดเกต อ.เมืองเชียงใหม่ จ.เชียงใหม่ 50000 — [Google Maps](${MAP_URL})`,
  "- เวลาทำการ: เปิดทุกวัน 11.00–20.00 น. รับเคสสุดท้าย 19.30 น. (open daily 11:00–20:00, last case 19:30)",
  `- จองคิว / สอบถาม: LINE ${LINE_ID} — ${LINE_URL}`,
  `- โทรศัพท์: ${PHONE} (+66 84 609 2027)`,
  "- แพทย์ผู้ดำเนินการ: นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์ (Pongpun Sirinapapun, M.D.) ใบประกอบวิชาชีพเวชกรรม ว.49913",
  "- ใบอนุญาตสถานพยาบาลเลขที่ 50101009062 · ใบอนุญาตโฆษณา ขสพ.ชม.263/2568",
  `- รีวิว: คะแนน 5.0 จาก 79 รีวิวบน Google — ${GOOGLE_REVIEWS_URL}`,
  `- โซเชียล: Facebook ${FACEBOOK_URL} · Instagram ${INSTAGRAM_URL} · TikTok ${TIKTOK_URL}`,
].join("\n");

const PRICE_NOTE =
  "ราคาเป็นเงินบาท (THB) เป็นราคามาตรฐานของคลินิก อาจเปลี่ยนแปลงตามโปรโมชั่นประจำเดือน — สอบถามราคาล่าสุดก่อนเข้ารับบริการทาง LINE " +
  LINE_ID;

const MOUNJARO_NOTE =
  "ราคาต่อครั้งมีค่าฉีดเพิ่ม 100 บาท · แพ็กเกจ 4 ครั้งและเหมาด้ามฟรีค่าฉีด · ประเมินและปรับขนาดยาโดยแพทย์ พร้อมติดตามผลรายบุคคลตลอดโปรแกรม";

const oneLine = (s = "") => s.replace(/\s+/g, " ").trim();
const ymd = (d?: string) =>
  d && !Number.isNaN(Date.parse(d)) ? new Date(d).toISOString().slice(0, 10) : undefined;

const body = (html: string | undefined, blocks: Block[] = []) =>
  htmlToMd(html?.trim() || blocksToHtml(blocks), origin);

function doc(path: string, title: string, summary: string, ...parts: (string | false | undefined)[]) {
  return [`# ${title}`, `> ${oneLine(summary)}`, `หน้าเว็บ: ${htmlUrl(path)}`, ...parts]
    .filter(Boolean)
    .join("\n\n");
}

function rateTable(rows: RateRow[] = []) {
  if (!rows.length) return "";
  return [
    "| รายการ | ขนาด / หน่วย | ราคา (บาท) |",
    "| --- | --- | --- |",
    ...rows.map((r) => `| ${r.name}${r.note ? ` (${r.note})` : ""} | ${r.unit} | ${r.price} |`),
  ].join("\n");
}

function mounjaroTable(rows: MounjaroRate[] = []) {
  if (!rows.length) return "";
  return [
    "| ขนาดยา | 1 ครั้ง (บาท) | แพ็กเกจ 4 ครั้ง (บาท) | เหมา 1 ด้าม / 4 ครั้ง (บาท) |",
    "| --- | --- | --- | --- |",
    ...rows.map((m) => `| ${m.dose} | ${m.once} | ${m.four} | ${m.pen} |`),
    "",
    MOUNJARO_NOTE,
  ].join("\n");
}

async function homeMd() {
  const [cards, details, articles] = await Promise.all([
    getServiceCards(),
    getServiceDetails(),
    getArticles(),
  ]);
  const priced = new Set(cards.map((c) => c.slug));
  return doc(
    "",
    "Dr. KIM Clinic — คลินิกความงาม เชียงใหม่ ดูแลโดยแพทย์",
    "คลินิกเวชกรรมความงามในเชียงใหม่ ดูแลโดยแพทย์ทุกเคส — Botox, Filler, Biostimulator, Mesotherapy, IV Drip, เลเซอร์/HIFU และโปรแกรมลดน้ำหนัก Mounjaro เปิดทุกวัน 11.00–20.00 น. จองคิวทางไลน์ " +
      LINE_ID,
    "## ข้อมูลคลินิก\n\n" + FACTS,
    "## จุดเด่นของคลินิก\n\n" +
      [
        "- แพทย์ดูแลทุกเคส — ตรวจและทำหัตถการโดยแพทย์ (ว.49913)",
        "- ของแท้ เปิดกล่องให้ดู — เปิดผลิตภัณฑ์ใหม่ต่อหน้า ตรวจวันหมดอายุได้ทุกครั้ง",
        "- มาตรฐานระดับสากล — สถานพยาบาลได้รับอนุญาต เครื่องมือผ่านการรับรอง",
        "- ติดตามผลต่อเนื่อง — นัดติดตามอาการหลังทำทุกเคส",
        "- ราคาชัดเจน — แจ้งราคาก่อนทำทุกครั้ง ไม่มีบวกเพิ่มหน้างาน",
      ].join("\n"),
    "## บริการและราคาเริ่มต้น\n\n" +
      [
        ...cards.map(
          (c) =>
            `- [${c.title} (${c.subtitle})](${mdUrl(`/services/${c.slug}`)}): ${oneLine(c.detail)} — เริ่ม ${c.from} บาท ${c.unit}${c.brands.length ? ` · ยี่ห้อ ${c.brands.join(", ")}` : ""}`,
        ),
        ...details
          .filter((d) => !priced.has(d.slug))
          .map((d) => `- [${d.title} (${d.subtitle})](${mdUrl(`/services/${d.slug}`)}): ${oneLine(d.tagline)}`),
      ].join("\n") +
      `\n\nตารางราคาเต็มทุกยี่ห้อ: [บริการและราคา](${mdUrl("/services")}) · ${PRICE_NOTE}`,
    "## บทความล่าสุด\n\n" +
      articles
        .slice(0, 3)
        .map((a) => `- [${a.title}](${mdUrl(`/blog/${a.slug}`)}): ${oneLine(a.excerpt)}`)
        .join("\n"),
    "## หน้าอื่น ๆ\n\n" +
      [
        `- [เกี่ยวกับเรา](${mdUrl("/about")})`,
        `- [โปรโมชั่นประจำเดือน](${mdUrl("/promotions")})`,
        `- [รีวิวจากลูกค้า](${mdUrl("/reviews")})`,
        `- [บทความทั้งหมด](${mdUrl("/blog")})`,
        `- [ติดต่อและแผนที่](${mdUrl("/contact")})`,
      ].join("\n"),
  );
}

async function aboutMd() {
  const team = await getTeam();
  return doc(
    "/about",
    "เกี่ยวกับ Dr. KIM Clinic",
    "คลินิกเวชกรรมด้านความงามในจังหวัดเชียงใหม่ ดูแลทุกเคสโดยแพทย์ เลือกใช้ผลิตภัณฑ์ของแท้และเครื่องมือที่ได้มาตรฐาน เปิดให้บริการทุกวัน 11.00 – 20.00 น.",
    "## ตัวเลขที่ตรวจสอบได้\n\n- คะแนนรีวิวบน Google: 5.0\n- รีวิวจากผู้ใช้บริการจริง: 79+\n- เปิดทุกวัน 11.00 – 20.00 น. (รับเคสสุดท้าย 19.30 น.)",
    [
      "## แพทย์ผู้ดูแล",
      "**นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์** (PONGPUN SIRINAPAPUN, M.D.)",
      "> “เราดูแลรักษาคงสภาพความอ่อนเยาว์แบบองค์รวม ตอบโจทย์ปัญหาของคนไข้ด้วยเทคนิค ผลิตภัณฑ์ และเครื่องมือที่ได้มาตรฐานสากล ปลอดภัย ให้คนไข้ได้ผลพึงพอใจสูงสุด”",
      [
        "- แพทย์ใบประกอบวิชาชีพเวชกรรม ว.49913 · ผู้ดำเนินการสถานพยาบาล",
        "- เชี่ยวชาญด้าน Botox · Filler · Biostimulator และการปรับรูปหน้า",
        "- ดูแลเคสลดน้ำหนักด้วย Mounjaro โดยประเมินและติดตามผลรายบุคคล",
        "- วางแผนการรักษาเฉพาะบุคคล เน้นผลลัพธ์ที่เป็นธรรมชาติ",
      ].join("\n"),
    ].join("\n\n"),
    "## ทำไมต้อง Dr. KIM Clinic\n\n" +
      [
        "- **แพทย์ดูแลทุกเคส** — ตรวจ ประเมิน และทำหัตถการโดยแพทย์ (ว.49913)",
        "- **ของแท้ เปิดกล่องให้ดู** — เปิดผลิตภัณฑ์ใหม่ต่อหน้า ตรวจวันหมดอายุได้ทุกครั้ง",
        "- **สถานพยาบาลได้รับอนุญาต** — เลขที่ใบอนุญาต 50101009062",
        "- **เครื่องมือผ่านมาตรฐาน** — เลเซอร์และเครื่องมือทุกตัวได้รับการรับรอง",
        "- **ติดตามผลต่อเนื่อง** — นัดติดตามอาการหลังทำ ไม่จบแค่หน้าเคาน์เตอร์",
        "- **ราคาชัดเจน** — แจ้งราคาก่อนทำทุกครั้ง ไม่มีบวกเพิ่มหน้างาน",
      ].join("\n"),
    "## ขั้นตอนการรับบริการ\n\n" +
      [
        `1. **ทักไลน์จองคิว** (${LINE_ID}) — เลือกวันเวลาที่สะดวก ทีมงานยืนยันคิวให้`,
        "2. **ปรึกษาและประเมินโดยแพทย์** — พูดคุยปัญหาและความต้องการก่อนตัดสินใจ",
        "3. **ทำหัตถการ** — ดูแลโดยแพทย์ ด้วยผลิตภัณฑ์ของแท้",
        "4. **ติดตามผล** — นัดดูอาการและให้คำแนะนำการดูแลต่อเนื่อง",
      ].join("\n"),
    "## ทีมงาน\n\n" +
      team.map((t) => `- **${t.name}** — ${t.role}${t.quote ? `: “${oneLine(t.quote)}”` : ""}`).join("\n"),
    "## ใบอนุญาต\n\n- เลขที่ใบอนุญาตสถานพยาบาล 50101009062\n- ผู้ดำเนินการ นายแพทย์พงศ์พันธ์ ศิรินภาพันธ์ (ว.49913)\n- ใบอนุญาตโฆษณา ขสพ.ชม.263/2568",
  );
}

async function servicesMd() {
  const services = await getServicePricing();
  const wm = services.find((s) => s.slug === "weight-management");
  return doc(
    "/services",
    "บริการและราคา — Dr. KIM Clinic เชียงใหม่ (Services & Prices)",
    "ราคามาตรฐานของทุกบริการ แยกตามยี่ห้อและขนาด ทุกหัตถการดูแลโดยแพทย์ และเลือกใช้ผลิตภัณฑ์ของแท้ที่ผ่านการรับรอง",
    PRICE_NOTE,
    ...services
      .filter((s) => s.slug !== "weight-management")
      .map((s) =>
        [
          `## ${s.title} (${s.subtitle})`,
          oneLine(s.blurb),
          s.fit && `**เหมาะสำหรับ:** ${oneLine(s.fit)}`,
          rateTable(s.rates),
          `รายละเอียด: [${s.title}](${mdUrl(`/services/${s.slug}`)})`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
    wm &&
      [
        "## Mounjaro ลดน้ำหนัก (Weight Management)",
        wm.fit && `**เหมาะสำหรับ:** ${oneLine(wm.fit)}`,
        mounjaroTable(wm.mounjaroRates) || rateTable(wm.rates),
        `รายละเอียด: [โปรแกรมลดน้ำหนัก](${mdUrl("/services/weight-management")})`,
      ]
        .filter(Boolean)
        .join("\n\n"),
  );
}

async function serviceMd(slug: string) {
  const s = (await getServiceDetails()).find((x) => x.slug === slug);
  if (!s) return null;
  const prices =
    slug === "weight-management" && s.mounjaroRates?.length
      ? mounjaroTable(s.mounjaroRates)
      : rateTable(s.rates);
  return doc(
    `/services/${slug}`,
    `${s.title} (${s.subtitle}) — Dr. KIM Clinic เชียงใหม่`,
    s.tagline || s.excerpt,
    s.tagline && oneLine(s.excerpt),
    s.fit && `**เหมาะสำหรับ:** ${oneLine(s.fit)}`,
    prices && `## ราคา\n\n${prices}\n\n${PRICE_NOTE}`,
    body(s.html, s.blocks),
    s.related &&
      `อ่านต่อ: [${s.related.label}](${s.related.href.startsWith("/") ? mdUrl(s.related.href.split("#")[0]) : s.related.href})`,
    `## จองคิว / ปรึกษาแพทย์\n\nทักไลน์ ${LINE_ID} (${LINE_URL}) หรือโทร ${PHONE} — ทุกเคสประเมินโดยแพทย์ก่อนทำหัตถการ`,
  );
}

async function blogMd() {
  const articles = await getArticles();
  return doc(
    "/blog",
    "บทความ — Dr. KIM Clinic (Blog & Tips)",
    "บทความและเกร็ดความรู้จากทีมแพทย์ Dr. KIM Clinic อ่านก่อนตัดสินใจ เข้าใจก่อนทำ",
    articles
      .map((a) => `- [${a.title}](${mdUrl(`/blog/${a.slug}`)}): ${a.category} — ${oneLine(a.excerpt)}`)
      .join("\n"),
  );
}

async function articleMd(slug: string) {
  const a = (await getArticles()).find((x) => x.slug === slug);
  if (!a) return null;
  const date = ymd(a.updatedAt);
  return doc(
    `/blog/${slug}`,
    a.title,
    a.excerpt,
    [
      `- หมวดหมู่: ${a.category}`,
      "- ผู้เขียน: นพ.พงศ์พันธ์ ศิรินภาพันธ์ แพทย์ผู้ดำเนินการ Dr. KIM Clinic (ว.49913)",
      date && `- อัปเดตล่าสุด: ${date}`,
    ]
      .filter(Boolean)
      .join("\n"),
    body(a.html, a.blocks),
    `---\n\nข้อมูลในบทความเป็นความรู้ทั่วไป ไม่ใช่คำวินิจฉัยเฉพาะบุคคล — ปรึกษาแพทย์ได้ทางไลน์ ${LINE_ID} (${LINE_URL})`,
  );
}

async function contactMd() {
  return doc(
    "/contact",
    "ติดต่อ Dr. KIM Clinic เชียงใหม่",
    "สอบถามบริการ ราคา หรือจองคิว ทักไลน์หรือโทรหาเราได้ในเวลาทำการ เปิดทุกวัน 11.00 – 20.00 น.",
    "## ช่องทางติดต่อ\n\n" + FACTS,
    "## การเดินทาง\n\nมองหาตึกที่มีป้าย Dr. KIM CLINIC ริมถนนรัตนโกสินทร์ ต.วัดเกต อ.เมืองเชียงใหม่ — " +
      `[เปิดใน Google Maps](${MAP_URL})`,
    "## การจองคิว\n\nรับจองคิวผ่าน LINE เป็นหลัก แจ้งบริการที่สนใจและวันเวลาที่สะดวก ทีมงานจะยืนยันคิวให้ โทรได้ในเวลาทำการ",
  );
}

async function promotionsMd() {
  const promos = await getPromotions();
  return doc(
    "/promotions",
    "โปรโมชั่นประจำเดือน — Dr. KIM Clinic เชียงใหม่",
    `โปรโมชั่นประจำเดือนของ Dr. KIM Clinic เชียงใหม่ อัปเดตทุกเดือน สอบถามรายการล่าสุดทางไลน์ ${LINE_ID}`,
    "## โปรโมชั่นที่แสดงบนเว็บไซต์\n\n" +
      promos.map((p) => `- ${oneLine(p.alt)} — [ภาพโปรโมชั่น](${p.src.startsWith("/") ? origin + p.src : p.src})`).join("\n") +
      "\n\nโปรโมชั่นเปลี่ยนทุกเดือน รายละเอียดและเงื่อนไขอยู่ในภาพ — ยืนยันสิทธิ์ล่าสุดทาง LINE ก่อนเข้ารับบริการ",
    "## วิธีรับโปรโมชั่น\n\n" +
      [
        "1. **เลือกโปรที่สนใจ** — ดูภาพโปรโมชั่น เช็กราคาและเงื่อนไข",
        `2. **ทักไลน์แจ้งรายการ** — ส่งชื่อโปรที่ต้องการมาที่ LINE ${LINE_ID} (${LINE_URL})`,
        "3. **นัดวันเข้ารับบริการ** — ทีมงานยืนยันสิทธิ์และจองคิวให้ทันที",
      ].join("\n"),
  );
}

async function reviewsMd() {
  return doc(
    "/reviews",
    "รีวิวจากลูกค้า — Dr. KIM Clinic เชียงใหม่",
    "รีวิวจริงจากผู้ใช้บริการ Dr. KIM Clinic เชียงใหม่ — คะแนน 5.0 จาก 79 รีวิวบน Google",
    `## สรุป\n\n- คะแนน 5.0 จาก 79 รีวิวบน Google (ข้อมูล ณ พฤศจิกายน 2026) — [อ่านรีวิวสดบน Google](${GOOGLE_REVIEWS_URL})\n- รีวิวทั้งหมดมาจาก Google Maps ซึ่งคลินิกแก้ไขหรือลบเองไม่ได้ และมาจากผู้ที่มาใช้บริการจริง`,
    "## สิ่งที่ลูกค้าพูดถึงบ่อย\n\n" +
      [
        "หมอมือเบา อธิบายละเอียด",
        "เปิดกล่องผลิตภัณฑ์แท้ให้ดูต่อหน้า",
        "มีการติดตามผลต่อเนื่อง",
        "พนักงานดูแลดี เป็นกันเอง",
        "คลินิกสะอาด",
        "ให้ข้อมูลครบก่อนตัดสินใจ",
      ]
        .map((h) => `- ${h}`)
        .join("\n"),
    "## ตัวอย่างรีวิว (คัดจาก Google, ตัดให้สั้นลง)\n\n" +
      reviews
        .map((r) => `- **${r.name}** (${r.tag} · ${r.date}): “${oneLine(r.text)}”`)
        .join("\n"),
  );
}

export const MD_FOOTER = `\n\n---\n\nDr. KIM Clinic เชียงใหม่ · จองคิว LINE ${LINE_ID} (${LINE_URL}) · โทร ${PHONE} · สารบัญทั้งเว็บไซต์: ${origin}/llms.txt\n`;

const PAGES = new Map<string, () => Promise<string>>([
  ["index", homeMd],
  ["about", aboutMd],
  ["services", servicesMd],
  ["blog", blogMd],
  ["contact", contactMd],
  ["promotions", promotionsMd],
  ["reviews", reviewsMd],
]);

// "about" | "services/botox" | "blog/<slug>" → Markdown, or null for anything we don't publish
export async function pageMarkdown(path: string): Promise<string | null> {
  // llmstxt.org: a URL without a file name maps to …/index.md
  const [section, slug, ...rest] = path.replace(/\/index$/, "").split("/");
  if (rest.length) return null;
  if (slug === undefined) return (await PAGES.get(section)?.()) ?? null;
  if (section === "services") return serviceMd(slug);
  if (section === "blog") return articleMd(slug);
  return null;
}

export async function llmsTxt() {
  const [cards, details, articles] = await Promise.all([
    getServiceCards(),
    getServiceDetails(),
    getArticles(),
  ]);
  const from = new Map(cards.map((c) => [c.slug, `เริ่ม ${c.from} บาท ${c.unit}`]));
  return [
    "# Dr. KIM Clinic",
    "> Dr. KIM Clinic (หมอคิมคลินิกเวชกรรม) คือคลินิกเวชกรรมด้านความงามในตัวเมืองเชียงใหม่ ดูแลและทำหัตถการโดยแพทย์ทุกเคส ให้บริการ Botox, Filler, Biostimulator, Mesotherapy, IV Drip, เลเซอร์/HIFU และโปรแกรมลดน้ำหนัก Mounjaro เปิดทุกวัน 11.00–20.00 น. จองคิวทาง LINE " +
      `${LINE_ID}. A licensed, doctor-led aesthetic medical clinic in Chiang Mai, Thailand — the site is in Thai and prices are in Thai baht (THB).`,
    "ข้อมูลสำคัญ (key facts):\n\n" + FACTS,
    [
      "หมายเหตุสำหรับ AI (notes for AI assistants):",
      "",
      `- ${PRICE_NOTE}`,
      "- หัตถการทุกชนิดต้องผ่านการประเมินโดยแพทย์ก่อน ผลลัพธ์แตกต่างกันในแต่ละบุคคล บทความเป็นความรู้ทั่วไป ไม่ใช่คำวินิจฉัยเฉพาะบุคคล",
      "- Mounjaro (Tirzepatide) เป็นยาที่ต้องสั่งจ่ายและติดตามผลโดยแพทย์เท่านั้น ไม่ได้ขายยาให้ใช้เองโดยไม่ผ่านการประเมิน",
      `- ทุกลิงก์ด้านล่างเป็นเวอร์ชัน Markdown ของหน้าเว็บ (ตัด .md ออกจะได้หน้า HTML) — เนื้อหาทุกหน้าในไฟล์เดียว: ${origin}/llms-full.txt`,
    ].join("\n"),
    "## บริการ (Services)\n\n" +
      details
        .map(
          (d) =>
            `- [${d.title} (${d.subtitle})](${mdUrl(`/services/${d.slug}`)}): ${oneLine(d.tagline || d.excerpt)}${from.has(d.slug) ? ` — ${from.get(d.slug)}` : ""}`,
        )
        .join("\n"),
    "## ข้อมูลคลินิก (Clinic)\n\n" +
      [
        `- [บริการและราคาทั้งหมด](${mdUrl("/services")}): ตารางราคามาตรฐานทุกบริการ แยกตามยี่ห้อและขนาด รวมแพ็กเกจ Mounjaro`,
        `- [เกี่ยวกับเรา](${mdUrl("/about")}): แพทย์ผู้ดูแล ทีมงาน ใบอนุญาต และขั้นตอนการรับบริการ`,
        `- [ติดต่อและแผนที่](${mdUrl("/contact")}): ที่อยู่ เวลาทำการ LINE เบอร์โทร การเดินทาง`,
        `- [โปรโมชั่นประจำเดือน](${mdUrl("/promotions")}): ราคาพิเศษเดือนนี้และวิธีรับสิทธิ์`,
        `- [รีวิวจากลูกค้า](${mdUrl("/reviews")}): คะแนน 5.0 จาก 79 รีวิวบน Google พร้อมตัวอย่างรีวิว`,
        `- [หน้าแรก](${mdUrl("")}): ภาพรวมคลินิก บริการ และราคาเริ่มต้น`,
      ].join("\n"),
    "## บทความ (Articles)\n\n" +
      articles
        .map((a) => `- [${a.title}](${mdUrl(`/blog/${a.slug}`)}): ${oneLine(a.excerpt)}`)
        .join("\n"),
    "## Optional\n\n" +
      [
        `- [เนื้อหาทั้งเว็บไซต์ในไฟล์เดียว](${origin}/llms-full.txt): ทุกหน้าด้านบนรวมกันเป็น Markdown ไฟล์เดียว`,
        `- [รายการบทความทั้งหมด](${mdUrl("/blog")})`,
        `- [รีวิวบน Google](${GOOGLE_REVIEWS_URL})`,
        `- [Facebook](${FACEBOOK_URL})`,
        `- [Instagram](${INSTAGRAM_URL})`,
        `- [TikTok](${TIKTOK_URL})`,
        `- [Sitemap](${origin}/sitemap.xml)`,
      ].join("\n"),
  ].join("\n\n");
}

export async function llmsFullTxt() {
  const [details, articles] = await Promise.all([getServiceDetails(), getArticles()]);
  const paths = [
    "index",
    "services",
    ...details.map((d) => `services/${d.slug}`),
    "about",
    "contact",
    "promotions",
    "reviews",
    "blog",
    ...articles.map((a) => `blog/${a.slug}`),
  ];
  const pages = await Promise.all(paths.map(pageMarkdown));
  return [
    `# Dr. KIM Clinic — เนื้อหาทั้งเว็บไซต์ (full site content)`,
    `> เนื้อหาทุกหน้าของ ${origin} รวมเป็น Markdown ไฟล์เดียวสำหรับ AI — สารบัญแบบย่ออยู่ที่ ${origin}/llms.txt`,
    "ข้อมูลสำคัญ (key facts):\n\n" + FACTS,
    ...pages.filter(Boolean),
  ].join("\n\n---\n\n");
}
