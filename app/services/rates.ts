// ponytail: the standing rate card, transcribed from the client's price sheet (July 2026
// brief). Shared by /services (full table) and /services/[slug] (sidebar price card).
export type RateRow = {
  name: string;
  note?: string;
  unit: string;
  price: string;
};

export type MounjaroRate = {
  dose: string;
  once: string;
  four: string;
  pen: string;
};

export const serviceRates: Record<string, { fit: string; rows: RateRow[] }> = {
  botox: {
    fit: "ริ้วรอยหน้าผาก คิ้วขมวด ตีนกา กรามใหญ่ เรียวหน้า",
    rows: [
      { name: "Aestox", unit: "50 unit", price: "3,590" },
      { name: "Nabota", unit: "100 unit", price: "5,990" },
      { name: "Allergan", unit: "50 unit", price: "9,990" },
    ],
  },
  filler: {
    fit: "ร่องแก้มลึก ใต้ตาคล้ำ ปากบาง คางสั้น",
    rows: [
      { name: "Neuramis Deep", unit: "1 CC", price: "3,990" },
      { name: "Neuramis Volume", unit: "1 CC", price: "4,990" },
      { name: "Elavie", unit: "1 CC", price: "6,990" },
      { name: "Berotero", unit: "1 CC", price: "12,900" },
      { name: "Restylane ทุกรุ่น", unit: "1 CC", price: "12,900" },
    ],
  },
  biostimulator: {
    fit: "ผิวหย่อนคล้อย ริ้วรอยเล็ก ๆ ทั่วหน้า อยากฟื้นฟูระยะยาว",
    rows: [
      { name: "Sculptra", unit: "1 ขวด", price: "19,900" },
      { name: "Aesthefill", unit: "1 ขวด", price: "17,900" },
      { name: "Olidia 120", unit: "1 ขวด", price: "16,900" },
    ],
  },
  mesotherapy: {
    fit: "ฝ้า จุดด่างดำ ผิวหมองคล้ำ แก้ม-เหนียง",
    rows: [
      { name: "Fat sisi face", unit: "10 ml. (1 ขวด)", price: "2,990" },
      { name: "Fat sisi body", unit: "30 ml. (1 ขวด)", price: "5,990" },
      { name: "Hayyan ลดฝ้า", unit: "10 ml. (1 ขวด)", price: "3,990" },
      { name: "Snow Bright หน้าใส", unit: "10 ml. (1 ขวด)", price: "3,990" },
    ],
  },
  "iv-drip": {
    fit: "อ่อนเพลีย พักผ่อนน้อย อยากให้ผิวดูสดใส",
    rows: [
      { name: "สูตร Healthy Booster", unit: "1 กระปุก", price: "790" },
      { name: "สูตร Energy Booster", unit: "1 กระปุก", price: "990" },
      { name: "สูตร Aura Bright Booster", unit: "1 กระปุก", price: "1,290" },
    ],
  },
  "energy-device": {
    fit: "กำจัดขน หลุมสิว ไฝ-ติ่งเนื้อ หน้าหย่อนคล้อย",
    rows: [
      {
        name: "IPL กำจัดขน",
        note: "รักแร้ · หนวด-เครา · หน้าใส",
        unit: "1 ครั้ง",
        price: "790",
      },
      { name: "CO2 Laser รักษาหลุมสิว", unit: "1 ครั้ง", price: "1,290" },
      {
        name: "CO2 Laser จี้ไฝ",
        note: "ไฝ · ขี้แมลงวัน · ติ่งเนื้อ",
        unit: "1 จุด",
        price: "790",
      },
      {
        name: "Coolfase (Monopolar RF)",
        note: "สลายไขมันใต้ชั้นผิวบนใบหน้า",
        unit: "200 shots",
        price: "9,990",
      },
      {
        name: "Liftera 2 ยกกระชับหน้า (HIFU)",
        unit: "1200 shots",
        price: "6,990",
      },
      {
        name: "Liftera 2 คอหงส์ (HIFU)",
        note: "แถม 1000 shots",
        unit: "1000 shots",
        price: "5,990",
      },
    ],
  },
  "weight-management": {
    fit: "น้ำหนักเกินเกณฑ์ คุมอาหารแล้วน้ำหนักนิ่ง อยากลดแบบมีแพทย์ดูแล",
    rows: [
      { name: "Mounjaro 2.5 mg.", unit: "ต่อครั้ง", price: "1,990" },
      { name: "Mounjaro 5.0 mg.", unit: "ต่อครั้ง", price: "3,590" },
      { name: "Mounjaro 7.5 mg.", unit: "ต่อครั้ง", price: "4,590" },
      { name: "Mounjaro 10.0 mg.", unit: "ต่อครั้ง", price: "5,590" },
    ],
  },
};

export const mounjaroRates: MounjaroRate[] = [
  { dose: "2.5 mg.", once: "1,990", four: "7,800", pen: "13,900" },
  { dose: "5.0 mg.", once: "3,590", four: "14,000", pen: "16,900" },
  { dose: "7.5 mg.", once: "4,590", four: "18,000", pen: "19,900" },
  { dose: "10.0 mg.", once: "5,590", four: "22,000", pen: "24,900" },
];
