import type { Metadata } from "next";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import ImagePlaceholder from "../components/image-placeholder";
import PageHeader from "../components/page-header";
import { LINE_URL, externalLink } from "../contact";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "บทความ",
  description:
    "บทความและเกร็ดความรู้ด้านความงามจากทีมแพทย์ Dr. KIM Clinic เชียงใหม่ — Mounjaro, Biostimulator, COOLTERA และอื่น ๆ",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="บทความ"
        title="Blog & Tips"
        description="บทความและเกร็ดความรู้จากทีมแพทย์ Dr. KIM Clinic อ่านก่อนตัดสินใจ เข้าใจก่อนทำ"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
                >
                  {/* ponytail: article covers still waiting on the clinic — label says which shot to send */}
                  <ImagePlaceholder
                    label={a.imageNote}
                    className="aspect-video rounded-none border-0 border-b border-dashed border-ink-body/25"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="self-start rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-accent">
                      {a.category}
                    </span>
                    <h2 className="mt-3 font-display text-lg leading-7 text-ink">
                      {a.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ink-body">
                      {a.excerpt}
                    </p>
                    <p className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                      อ่านบทความ
                      <FiArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                  </div>
                </Link>
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
