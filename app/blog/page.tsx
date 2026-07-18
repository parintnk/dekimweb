import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaLine } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import ImagePlaceholder from "../components/image-placeholder";
import PageHeader from "../components/page-header";
import { LINE_URL, externalLink } from "../contact";
import type { articles } from "./articles";
import { getArticles } from "../lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "บทความ",
  description:
    "บทความและเกร็ดความรู้ด้านความงามจากทีมแพทย์ Dr. KIM Clinic เชียงใหม่ — Mounjaro, Biostimulator, COOLTERA และอื่น ๆ",
};

function Cover({
  article: a,
  sizes,
}: {
  article: (typeof articles)[number];
  sizes: string;
}) {
  return a.image ? (
    <Image
      src={a.image}
      alt=""
      fill
      sizes={sizes}
      className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${a.imagePos ?? ""}`}
    />
  ) : (
    <ImagePlaceholder
      label={a.imageNote ?? "รอรูปประกอบจากคลินิก"}
      className="absolute inset-0 rounded-none border-0"
    />
  );
}

export default async function BlogPage() {
  // ponytail: newest-first is just sort_order — no dates on the source posts
  const [featured, ...rest] = await getArticles();
  return (
    <>
      <PageHeader
        eyebrow="บทความ"
        title="Blog & Tips"
        description="บทความและเกร็ดความรู้จากทีมแพทย์ Dr. KIM Clinic อ่านก่อนตัดสินใจ เข้าใจก่อนทำ"
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-line bg-surface-2 transition-all duration-200 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5 lg:grid-cols-5"
          >
            <div className="relative aspect-video overflow-hidden lg:col-span-3 lg:aspect-auto lg:min-h-96">
              <Cover
                article={featured}
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-medium text-on-brand">
                  บทความแนะนำ
                </span>
                <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-accent">
                  {featured.category}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-body">
                {featured.excerpt}
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                อ่านบทความเต็ม
                <FiArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </p>
            </div>
          </Link>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-line">
                    <Cover
                      article={a}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
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
