import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getArticles } from "../lib/content";
import ImagePlaceholder from "./image-placeholder";

// ponytail: homepage → /blog + latest posts. Nav/footer links to /blog are boilerplate and
// Google was leaving /blog and the articles as "Discovered - currently not indexed"; a real
// contextual block on the highest-authority page is the crawl signal that fixes that.
export default async function LatestArticles() {
  const articles = (await getArticles()).slice(0, 3);
  if (!articles.length) return null;

  return (
    <section
      aria-label="บทความล่าสุด"
      className="border-t border-line bg-surface-2"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
              <span className="h-px w-8 bg-gold" aria-hidden />
              บทความจากทีมแพทย์
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              อ่านก่อนตัดสินใจ
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            ดูบทความทั้งหมด
            <FiArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug} className="reveal">
              <Link
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
              >
                <div className="relative aspect-video overflow-hidden border-b border-line">
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt={`บทความ ${a.title}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${a.imagePos ?? ""}`}
                    />
                  ) : (
                    <ImagePlaceholder
                      label="รอรูปประกอบจากคลินิก"
                      className="absolute inset-0 rounded-none border-0"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="self-start rounded-full bg-gold/20 px-2.5 py-1 text-xs font-medium text-accent">
                    {a.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg leading-7 text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-body">
                    {a.excerpt}
                  </p>
                  <p className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                    อ่านบทความ
                    <FiArrowRight size={16} aria-hidden />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
