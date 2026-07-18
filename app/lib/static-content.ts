// ponytail: the site's original hard-coded content, moved out of components so it can serve
// two jobs — render fallback while a Supabase table is still empty, and seed that table from
// the admin dashboard. Once the DB has rows, these arrays are dormant.

export type ServiceCard = {
  image: string;
  slug: string;
  title: string;
  subtitle: string;
  detail: string;
  brands: string[];
  from: string;
  unit: string;
};

export const serviceCards: ServiceCard[] = [
  {
    image: "/services/botox.jpg",
    slug: "botox",
    title: "Botox",
    subtitle: "โบท็อกซ์",
    detail: "ลดริ้วรอย ยกกระชับ เรียวหน้า",
    brands: ["Aestox", "Nabota", "Allergan"],
    from: "3,590",
    unit: "ต่อ 50 unit",
  },
  {
    image: "/services/filler.jpg",
    slug: "filler",
    title: "Filler",
    subtitle: "ฟิลเลอร์",
    detail: "เติมร่องลึก เติมวอลลุ่ม ปรับรูปหน้า",
    brands: ["Neuramis", "Elavie", "Restylane"],
    from: "3,990",
    unit: "ต่อ 1 CC",
  },
  {
    image: "/services/biostimulator.jpg",
    slug: "biostimulator",
    title: "Biostimulator",
    subtitle: "ไบโอสติมูเลเตอร์",
    detail: "กระตุ้นคอลลาเจน ฟื้นผิวจากภายใน",
    brands: ["Sculptra", "Aesthefill", "Olidia"],
    from: "16,900",
    unit: "ต่อ 1 ขวด",
  },
  {
    image: "/services/mesotherapy.jpg",
    slug: "mesotherapy",
    title: "Mesotherapy",
    subtitle: "เมโสหน้าใส",
    detail: "ลดฝ้า ผิวกระจ่างใส ลดไขมันเฉพาะจุด",
    brands: ["Fat sisi", "Hayyan", "Snow Bright"],
    from: "2,990",
    unit: "ต่อ 1 ขวด",
  },
  {
    image: "/services/iv-drip.jpg",
    slug: "iv-drip",
    title: "IV Drip",
    subtitle: "วิตามินทางหลอดเลือด",
    detail: "ฟื้นฟูร่างกาย เพิ่มพลัง ผิวออร่า",
    brands: ["Healthy", "Energy", "Aura Bright"],
    from: "790",
    unit: "ต่อ 1 กระปุก",
  },
  {
    image: "/services/energy-device.jpg",
    slug: "energy-device",
    title: "Energy-Based Device",
    subtitle: "เลเซอร์และเครื่องมือ",
    detail: "IPL กำจัดขน · CO2 หลุมสิว · HIFU ยกกระชับ",
    brands: ["Liftera 2", "Coolfase", "CO2 Laser"],
    from: "790",
    unit: "ต่อครั้ง",
  },
];

export type Promotion = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const promotions: Promotion[] = [
  {
    src: "/promotions/july.jpg",
    width: 1040,
    height: 1300,
    alt: "โปรโมชั่นประจำเดือนกรกฎาคม รวมราคาพิเศษ Botox Aestox 50 Unit 2,977 บาท, Botox Nabota 100 Unit 5,977 บาท, Neuramis Deep 1 CC 3,977 บาท, เลเซอร์กำจัดขน 877 บาท และรายการอื่น ๆ",
  },
  {
    src: "/promotions/neuramis.jpg",
    width: 1040,
    height: 1300,
    alt: "โปรโมชั่นฟิลเลอร์ Neuramis Black 2 ซีซี ราคา 5,990 บาท คมชัดขึ้นอย่างเป็นธรรมชาติ",
  },
  {
    src: "/promotions/laser-hair.jpg",
    width: 1040,
    height: 1040,
    alt: "โปรโมชั่นเลเซอร์กำจัดขน ราคา 690 บาท ผิวเรียบเนียน วงแขนดูสะอาด",
  },
  {
    src: "/promotions/liftera2.jpg",
    width: 1040,
    height: 1040,
    alt: "โปรโมชั่น LIFTERA 2 ยกกระชับปรับกรอบหน้า 1000 แถม 1000 SHOTS ราคา 4,990 บาท",
  },
];

export type TeamMember = {
  image: string;
  name: string;
  role: string;
  quote: string;
};

export const team: TeamMember[] = [
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

export type GalleryPhoto = {
  src: string;
  w: number;
  h: number;
  alt: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/clinic/storefront.jpg",
    w: 1536,
    h: 1024,
    alt: "หน้าร้าน Dr. KIM Clinic",
  },
  {
    src: "/clinic/lobby.jpg",
    w: 1570,
    h: 1001,
    alt: "โถงต้อนรับพร้อมเปียโนและโซฟากำมะหยี่น้ำเงิน",
  },
  {
    src: "/clinic/lounge.jpg",
    w: 1024,
    h: 1536,
    alt: "มุมนั่งรอโทนน้ำเงิน-ทอง",
  },
  {
    src: "/clinic/gallery-hall.jpg",
    w: 1537,
    h: 1023,
    alt: "ทางเดินภายในคลินิกและใบประกาศนียบัตร",
  },
  {
    src: "/clinic/treatment-room.jpg",
    w: 1564,
    h: 1006,
    alt: "ห้องทรีตเมนต์พร้อมเตียงของคลินิก",
  },
  {
    src: "/clinic/doctor-treatment.jpg",
    w: 1536,
    h: 1024,
    alt: "แพทย์ขณะทำหัตถการด้วยเครื่องยกกระชับ",
  },
  {
    src: "/clinic/devices.jpg",
    w: 1536,
    h: 1024,
    alt: "เครื่องเลเซอร์และเครื่องยกกระชับของคลินิก",
  },
  {
    src: "/clinic/consult-room.jpg",
    w: 1536,
    h: 1024,
    alt: "ห้องตรวจและให้คำปรึกษา",
  },
];
