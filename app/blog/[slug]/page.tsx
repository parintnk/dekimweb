import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLine } from "react-icons/fa";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import SectionBackdrop from "../../components/section-backdrop";
import ShareButtons from "../../components/share-buttons";
import { LINE_URL, SITE_URL, externalLink } from "../../contact";
import { articles } from "../articles";
import { getArticles } from "../../lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getArticles()).find((a) => a.slug === slug);
  if (!article) return { title: "บทความ" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      ...(article.image && { images: [{ url: article.image }] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) notFound();

  const strip = (t: string) => t.replace(/<[^>]*>/g, "");

  // editor-authored HTML wins; legacy block content still renders below
  let bodyHtml: string | null = null;
  let toc: { id: string; label: string }[] = [];
  let chars = 0;
  if (article.html?.trim()) {
    let n = 0;
    const items: { id: string; label: string }[] = [];
    bodyHtml = article.html.replace(
      /<h2([^>]*)>([\s\S]*?)<\/h2>/g,
      (_m, attrs: string, inner: string) => {
        const anchor = `heading-${n++}`;
        items.push({ id: anchor, label: strip(inner).trim() });
        return `<h2 id="${anchor}"${attrs}>${inner}</h2>`;
      },
    );
    toc = items;
    chars = strip(article.html).length;
  } else {
    chars = article.blocks.reduce(
      (n, b) =>
        n +
        (b.h?.length ?? 0) +
        (b.p?.length ?? 0) +
        (b.list?.join("").length ?? 0),
      0,
    );
    toc = article.blocks.flatMap((b, i) =>
      b.h ? [{ id: `heading-${i}`, label: strip(b.h) }] : [],
    );
  }
  // ponytail: Thai has no spaces to count words — chars/700 is a fair minutes estimate
  const minutes = Math.max(1, Math.round(chars / 700));
  const others = all.filter((a) => a.slug !== slug).slice(0, 2);

  // ponytail: no datePublished — the source posts carry no dates and we don't invent them
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    ...(article.image && { image: `${SITE_URL}${article.image}` }),
    author: {
      "@type": "Person",
      name: "นพ.พงศ์พันธ์ ศิรินภาพันธ์",
      jobTitle: "แพทย์ผู้ดำเนินการ Dr. KIM Clinic",
    },
    publisher: { "@type": "Organization", name: "Dr. KIM Clinic" },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* scrubbed to #article-body by gsap-effects — sits just under the sticky navbar */}
      <div
        id="reading-progress"
        aria-hidden
        className="fixed inset-x-0 top-[4.5rem] z-30 h-0.5 origin-left scale-x-0 bg-gold"
      />

      <section className="relative isolate overflow-hidden border-b border-line bg-surface-2">
        <SectionBackdrop />
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:pb-16 md:pt-14">
          <nav
            aria-label="breadcrumb"
            className="enter flex flex-wrap items-center gap-1.5 text-xs text-ink-body"
          >
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-accent"
            >
              หน้าแรก
            </Link>
            <FiChevronRight size={12} aria-hidden />
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-accent"
            >
              บทความ
            </Link>
            <FiChevronRight size={12} aria-hidden />
            <span className="font-medium text-accent">{article.category}</span>
          </nav>

          <h1 className="enter-2 mt-6 max-w-4xl font-display text-3xl leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            {article.title}
          </h1>

          <p className="enter-3 mt-4 max-w-2xl text-sm leading-7 text-ink-body sm:text-base sm:leading-8">
            {article.excerpt}
          </p>

          <div className="enter-4 mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-3">
              <Image
                src="/doctor.jpg"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full border border-line object-cover object-top"
              />
              <span>
                <span className="block text-sm font-medium text-ink">
                  ทีมแพทย์ Dr. KIM Clinic
                </span>
                <span className="block text-xs text-ink-body">
                  นพ.พงศ์พันธ์ ศิรินภาพันธ์ (ว.49913)
                </span>
              </span>
            </span>
            <span className="hidden h-8 w-px bg-line sm:block" aria-hidden />
            <span className="flex items-center gap-1.5 text-xs text-ink-body">
              <FiClock size={13} aria-hidden />
              อ่านประมาณ {minutes} นาที
            </span>
          </div>
        </div>
      </section>

      <div className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article id="article-body">
            {toc.length > 0 && (
              <details className="mb-10 rounded-2xl border border-line bg-surface-2 p-5 lg:hidden">
                <summary className="cursor-pointer text-sm font-medium text-ink">
                  ในบทความนี้
                </summary>
                <ul className="mt-4 space-y-2.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block border-l-2 border-line pl-4 text-sm leading-6 text-ink-body transition-colors duration-200 hover:border-gold hover:text-ink"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {bodyHtml && (
              <div
                className="article-html"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}

            {!bodyHtml &&
              article.blocks.map((b, i) => (
                <div key={i}>
                  {b.h && (
                    <h2
                      id={`heading-${i}`}
                      className="rich mt-12 scroll-mt-28 border-l-2 border-gold pl-4 font-display text-2xl text-ink first:mt-0"
                      dangerouslySetInnerHTML={{ __html: b.h }}
                    />
                  )}
                  {b.h3 && (
                    <h3
                      className="rich mt-8 font-display text-xl text-ink"
                      dangerouslySetInnerHTML={{ __html: b.h3 }}
                    />
                  )}
                  {b.p && (
                    <p
                      className={`rich ${
                        i === 0
                          ? "mt-4 text-lg leading-9 text-ink-body"
                          : "mt-4 leading-8 text-ink-body"
                      }`}
                      dangerouslySetInnerHTML={{ __html: b.p }}
                    />
                  )}
                  {b.img && (
                    <Image
                      src={b.img.src}
                      alt={b.img.alt}
                      width={b.img.w}
                      height={b.img.h}
                      sizes="(min-width: 1024px) 42rem, 100vw"
                      className="mt-6 w-full rounded-2xl border border-line"
                    />
                  )}
                  {b.list && (
                    <ul className="mt-4 space-y-3">
                      {b.list.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-accent">
                            <FiCheck size={12} aria-hidden />
                          </span>
                          <span
                            className="rich leading-7 text-ink-body"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  {b.ol && (
                    <ol className="mt-4 list-decimal space-y-2 pl-6 marker:font-medium marker:text-accent">
                      {b.ol.map((item) => (
                        <li
                          key={item}
                          className="rich pl-1 leading-7 text-ink-body"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ol>
                  )}
                </div>
              ))}

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
              <p className="text-sm font-medium text-ink">แชร์บทความนี้</p>
              <ShareButtons title={article.title} />
            </div>

            <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
              <h2 className="font-display text-2xl text-white">
                ปรึกษาแพทย์ได้ฟรี ไม่มีค่าใช้จ่าย
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/70">
                สอบถามรายละเอียดหรือประเมินเคสของคุณกับหมอคิมได้โดยตรง
              </p>
              <Link
                href={LINE_URL}
                {...externalLink}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-navy transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <FaLine size={16} aria-hidden />
                ทักไลน์ปรึกษาฟรี
              </Link>
            </div>

            <div className="mt-14 border-t border-line pt-10">
              <h2 className="font-display text-2xl text-ink">บทความอื่น ๆ</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {others.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
                    >
                      {a.image && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={a.image}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 24rem, 100vw"
                            className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${a.imagePos ?? ""}`}
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <span className="self-start rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-accent">
                          {a.category}
                        </span>
                        <p className="mt-3 font-display text-base leading-6 text-ink">
                          {a.title}
                        </p>
                        <p className="mt-auto flex items-center gap-2 pt-3 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                          อ่านบทความ
                          <FiArrowRight size={14} aria-hidden />
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/blog"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
            >
              <FiArrowLeft size={16} aria-hidden />
              กลับไปหน้าบทความ
            </Link>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {toc.length > 0 && (
                <nav
                  aria-label="สารบัญ"
                  className="rounded-2xl border border-line bg-surface-2 p-6"
                >
                  <p className="text-sm font-medium text-ink">ในบทความนี้</p>
                  <ul className="mt-4 space-y-2.5">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="block border-l-2 border-line pl-4 text-[0.8rem] leading-6 text-ink-body transition-colors duration-200 hover:border-gold hover:text-ink"
                        >
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-2xl bg-navy p-6">
                <p className="font-display text-lg text-white">
                  ปรึกษาหมอคิมฟรี
                </p>
                <p className="mt-1 text-xs leading-6 text-white/70">
                  ประเมินเคสของคุณก่อนตัดสินใจ ไม่มีค่าใช้จ่าย
                </p>
                <Link
                  href={LINE_URL}
                  {...externalLink}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-navy transition-opacity duration-200 hover:opacity-90"
                >
                  <FaLine size={15} aria-hidden />
                  ทักไลน์เลย
                </Link>
              </div>

              <div className="rounded-2xl border border-line bg-surface-2 p-6">
                <p className="text-sm font-medium text-ink">แชร์บทความ</p>
                <div className="mt-3">
                  <ShareButtons title={article.title} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
