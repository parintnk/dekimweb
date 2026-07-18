// ponytail: one config drives every admin CRUD screen — add a field here, the form grows itself.
import type { IconType } from "react-icons";
import {
  FiCamera,
  FiFileText,
  FiImage,
  FiLayers,
  FiTag,
  FiUsers,
} from "react-icons/fi";

export type Field = {
  key: string;
  label: string;
  type:
    "text" | "textarea" | "image" | "number" | "blocks" | "tags" | "article";
  hint?: string;
};

export type Section = {
  title: string;
  note: string;
  icon: IconType;
  table: string;
  storeDims?: boolean; // table has width/height columns — filled automatically from the image
  labelKey: string; // field shown as the row title in the list
  imageKey?: string; // field shown as the row thumbnail
  fields: Field[];
};

const sort: Field = {
  key: "sort_order",
  label: "ลำดับ",
  type: "number",
  hint: "เลขน้อยแสดงก่อน",
};

export const sections: Record<string, Section> = {
  services: {
    title: "บริการ",
    icon: FiLayers,
    note: "การ์ดหน้าแรก + หน้ารายละเอียดบริการ (/services/slug)",
    table: "services",
    labelKey: "title",
    imageKey: "image_url",
    fields: [
      {
        key: "slug",
        label: "Slug (URL)",
        type: "text",
        hint: "เช่น botox — ห้ามซ้ำ",
      },
      { key: "title", label: "ชื่อบริการ (EN)", type: "text" },
      { key: "subtitle", label: "ชื่อบริการ (ไทย)", type: "text" },
      {
        key: "image_url",
        label: "รูปการ์ดหน้าแรก",
        type: "image",
        hint: "แนะนำ 1200×900 px (สัดส่วน 4:3)",
      },
      { key: "card_detail", label: "คำอธิบายสั้นบนการ์ด", type: "text" },
      { key: "brands", label: "แบรนด์ (คั่นด้วย ,)", type: "tags" },
      {
        key: "price_from",
        label: "ราคาเริ่มต้น",
        type: "text",
        hint: "เช่น 3,590 — เว้นว่าง = ไม่แสดงการ์ดหน้าแรก",
      },
      {
        key: "unit",
        label: "หน่วยราคา",
        type: "text",
        hint: "เช่น ต่อ 50 unit",
      },
      {
        key: "detail_image_url",
        label: "รูปหัวหน้ารายละเอียด",
        type: "image",
        hint: "แนะนำ 1600×900 px (สัดส่วน 16:9)",
      },
      { key: "tagline", label: "คำโปรยหน้ารายละเอียด", type: "text" },
      { key: "excerpt", label: "คำอธิบายสำหรับ SEO", type: "textarea" },
      { key: "blocks", label: "เนื้อหา", type: "blocks" },
      {
        key: "related_href",
        label: "บทความที่เกี่ยวข้อง",
        type: "article",
        hint: "แสดงเป็นการ์ดลิงก์ท้ายหน้ารายละเอียด",
      },
      sort,
    ],
  },
  results: {
    title: "ผลลัพธ์จากคนไข้",
    icon: FiImage,
    note: "รูป 1:1 ในแถบเลื่อนหน้าแรกและหน้ารีวิว — ต้องได้รับความยินยอมจากคนไข้ก่อนลง",
    table: "results",
    labelKey: "alt",
    imageKey: "image_url",
    fields: [
      {
        key: "image_url",
        label: "รูปผลลัพธ์",
        type: "image",
        hint: "แนะนำ 1080×1080 px (จัตุรัส 1:1)",
      },
      {
        key: "alt",
        label: "คำอธิบายรูป",
        type: "text",
        hint: "เช่น เคส Botox ลดกราม",
      },
      sort,
    ],
  },
  promotions: {
    title: "โปรโมชั่น",
    storeDims: true,
    icon: FiTag,
    note: "โปสเตอร์โปรประจำเดือน — กดดูรูปใหญ่ได้จากหน้าเว็บ",
    table: "promotions",
    labelKey: "alt",
    imageKey: "image_url",
    fields: [
      {
        key: "image_url",
        label: "โปสเตอร์",
        type: "image",
        hint: "แนะนำ 1040×1300 px (4:5) หรือ 1040×1040 px (1:1)",
      },
      { key: "alt", label: "คำอธิบายโปร (สำคัญต่อ SEO)", type: "textarea" },
      sort,
    ],
  },
  blog: {
    title: "บทความ",
    icon: FiFileText,
    note: "บทความในหน้า /blog",
    table: "articles",
    labelKey: "title",
    imageKey: "image_url",
    fields: [
      {
        key: "slug",
        label: "Slug (URL)",
        type: "text",
        hint: "เช่น mounjaro-tips — ห้ามซ้ำ",
      },
      { key: "title", label: "ชื่อบทความ", type: "text" },
      { key: "category", label: "หมวด", type: "text" },
      { key: "excerpt", label: "คำโปรย", type: "textarea" },
      {
        key: "image_url",
        label: "รูปปก",
        type: "image",
        hint: "แนะนำ 1280×720 px (สัดส่วน 16:9)",
      },
      { key: "blocks", label: "เนื้อหา", type: "blocks" },
      sort,
    ],
  },
  team: {
    title: "ทีมงาน",
    icon: FiUsers,
    note: "Meet the Team ในหน้าเกี่ยวกับเรา",
    table: "team",
    labelKey: "name",
    imageKey: "image_url",
    fields: [
      {
        key: "image_url",
        label: "รูปสมาชิก",
        type: "image",
        hint: "แนะนำ 800×1000 px (แนวตั้ง 4:5)",
      },
      { key: "name", label: "ชื่อ-นามสกุล", type: "text" },
      { key: "role", label: "ตำแหน่ง", type: "text" },
      { key: "quote", label: "คำพูดประจำตัว", type: "textarea" },
      sort,
    ],
  },
  gallery: {
    title: "บรรยากาศคลินิก",
    storeDims: true,
    icon: FiCamera,
    note: "แกลเลอรีในหน้าเกี่ยวกับเรา",
    table: "gallery",
    labelKey: "alt",
    imageKey: "image_url",
    fields: [
      {
        key: "image_url",
        label: "รูปบรรยากาศ",
        type: "image",
        hint: "กว้างอย่างน้อย 1200 px แนวนอน (3:2) หรือแนวตั้งก็ได้",
      },
      { key: "alt", label: "คำอธิบายรูป", type: "text" },
      sort,
    ],
  },
};
