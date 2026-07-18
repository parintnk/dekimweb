import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiArrowRight, FiHome } from "react-icons/fi";
import { LINE_URL, externalLink } from "./contact";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 size-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-display text-8xl tracking-tight text-ink/15">404</p>
        <h1 className="mt-4 font-display text-3xl tracking-tight text-ink">
          ไม่พบหน้าที่คุณกำลังค้นหา
        </h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-ink-body">
          หน้านี้อาจถูกย้ายหรือลบไปแล้ว
          ลองกลับไปหน้าแรกหรือดูบริการของเราแทนนะครับ
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-on-brand transition-opacity duration-200 hover:opacity-90"
          >
            <FiHome size={15} aria-hidden />
            กลับหน้าแรก
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent"
          >
            ดูบริการและราคา
            <FiArrowRight size={15} aria-hidden />
          </Link>
          <Link
            href={LINE_URL}
            {...externalLink}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent"
          >
            <FaLine size={16} aria-hidden />
            ทักไลน์
          </Link>
        </div>
      </div>
    </section>
  );
}
