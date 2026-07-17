import type { Metadata } from "next";
import { Playfair_Display, Sarabun } from "next/font/google";
import "./globals.css";

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
  title: "Dr. KIM Clinic — เผยผิวสวย มั่นใจในแบบคุณ",
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
            __html: `try{var t=localStorage.theme;if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
