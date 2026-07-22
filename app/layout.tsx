import type { Metadata } from "next";
import { Playfair_Display, Sarabun } from "next/font/google";
import "./globals.css";
import ContactFab from "./components/contact-fab";
import Footer from "./components/footer";
import GoogleTranslate from "./components/google-translate";
import GsapEffects from "./components/gsap-effects";
import HideOnAdmin from "./components/hide-on-admin";
import MobileCtaBar from "./components/mobile-cta-bar";
import Navbar from "./components/navbar";
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_URL, TIKTOK_URL } from "./contact";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. KIM Clinic เชียงใหม่ — Your beauty is our duty",
    template: "%s | Dr. KIM Clinic เชียงใหม่",
  },
  description:
    "คลินิกเวชกรรมความงามในเชียงใหม่ ดูแลโดยแพทย์ทุกเคส — Botox, Filler, Biostimulator, Mounjaro ลดน้ำหนัก, เลเซอร์ เปิดทุกวัน 11.00–20.00 น. จองคิวทางไลน์ @doctorkimcnx",
  // ponytail: "./" resolves per-route against metadataBase — one line, every page canonical
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Dr. KIM Clinic",
    title: "Dr. KIM Clinic เชียงใหม่ — Your beauty is our duty",
    description:
      "คลินิกเวชกรรมความงามในเชียงใหม่ ดูแลโดยแพทย์ทุกเคส เปิดทุกวัน 11.00–20.00 น.",
    images: [{ url: "/clinic/storefront.jpg", width: 1536, height: 1024 }],
  },
  twitter: { card: "summary_large_image" },
};

// ponytail: only facts already published on the site — no invented ratings or geo.
const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Dr. KIM Clinic — หมอคิมคลินิกเวชกรรม เชียงใหม่",
  url: SITE_URL,
  image: `${SITE_URL}/clinic/storefront.jpg`,
  telephone: "+66-84-609-2027",
  address: {
    "@type": "PostalAddress",
    streetAddress: "72/1 ถ.รัตนโกสินทร์ ต.วัดเกต",
    addressLocality: "อ.เมืองเชียงใหม่",
    addressRegion: "เชียงใหม่",
    postalCode: "50000",
    addressCountry: "TH",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "11:00",
    closes: "20:00",
  },
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL],
  priceRange: "฿790–฿24,900",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${playfair.variable} ${sarabun.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ponytail: runs before paint so dark mode never flashes white. Inline is the point — a
            deferred script would paint light first. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme!=="light")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        {/* ponytail: pb clears the fixed mobile LINE bar */}
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <HideOnAdmin>
          <Footer />
          <ContactFab />
          <MobileCtaBar />
          <GoogleTranslate />
        </HideOnAdmin>
        <GsapEffects />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
      </body>
    </html>
  );
}
