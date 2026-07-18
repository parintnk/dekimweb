import type { Metadata } from "next";
import { Playfair_Display, Sarabun } from "next/font/google";
import "./globals.css";
import ContactFab from "./components/contact-fab";
import Footer from "./components/footer";
import GsapEffects from "./components/gsap-effects";
import MobileCtaBar from "./components/mobile-cta-bar";
import Navbar from "./components/navbar";

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
  title: {
    default: "Dr. KIM Clinic — เผยผิวสวย มั่นใจในแบบคุณ",
    template: "%s | Dr. KIM Clinic",
  },
  description:
    "คลินิกความงามดูแลโดยแพทย์ผู้เชี่ยวชาญ ด้วยเทคโนโลยีที่ทันสมัย ได้ผลลัพธ์ที่เป็นธรรมชาติ",
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
        <Navbar />
        {/* ponytail: pb clears the fixed mobile LINE bar */}
        <main id="main" className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <ContactFab />
        <MobileCtaBar />
        <GsapEffects />
      </body>
    </html>
  );
}
