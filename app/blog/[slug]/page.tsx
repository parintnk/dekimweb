import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLine } from "react-icons/fa";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { LINE_URL, externalLink } from "../../contact";
import { articles } from "../articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return article
    ? { title: article.title, description: article.excerpt }
    : { title: "บทความ" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <section className="bg-surface-2">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            {article.category}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-snug tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-ink-body">
            โดยทีมแพทย์ Dr. KIM Clinic
          </p>
        </div>
      </section>

      <article className="bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          {article.blocks.map((b, i) => (
            <div key={i}>
              {b.h && (
                <h2 className="mt-10 font-display text-2xl text-ink first:mt-0">
                  {b.h}
                </h2>
              )}
              {b.p && <p className="mt-4 leading-8 text-ink-body">{b.p}</p>}
              {b.list && (
                <ul className="mt-4 space-y-3">
                  {b.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-accent">
                        <FiCheck size={12} aria-hidden />
                      </span>
                      <span className="leading-7 text-ink-body">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

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

          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            <FiArrowLeft size={16} aria-hidden />
            กลับไปหน้าบทความ
          </Link>
        </div>
      </article>
    </>
  );
}
