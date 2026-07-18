import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLine } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiCheck, FiTag } from "react-icons/fi";
import { LINE_URL, externalLink } from "../../contact";
import { serviceDetails } from "../details";
import { getServiceDetails } from "../../lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getServiceDetails()).find((s) => s.slug === slug);
  if (!service) return { title: "บริการ" };
  return {
    title: `${service.title} (${service.subtitle}) เชียงใหม่`,
    description: service.excerpt,
    openGraph: {
      title: `${service.title} (${service.subtitle}) — Dr. KIM Clinic เชียงใหม่`,
      description: service.excerpt,
      ...(service.image && { images: [{ url: service.image }] }),
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = (await getServiceDetails()).find((s) => s.slug === slug);
  if (!service) notFound();

  // ponytail: the standing rate card stays on /services — this page is the knowledge layer,
  // so the price CTA links back to the matching anchor there.
  const priceHref =
    slug === "weight-management" ? "/services#mounjaro" : `/services#${slug}`;

  return (
    <>
      <section className="bg-surface-2">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent">
            <span className="h-px w-8 bg-gold" aria-hidden />
            {service.subtitle}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-body">
            {service.tagline}
          </p>
          <Link
            href={priceHref}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent"
          >
            <FiTag size={14} className="text-accent" aria-hidden />
            ดูราคา {service.title}
          </Link>
        </div>
      </section>

      <article className="bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          {service.image && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-line">
              <Image
                src={service.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />
            </div>
          )}

          {service.html?.trim() && (
            <div
              className="article-html"
              dangerouslySetInnerHTML={{ __html: service.html }}
            />
          )}

          {!service.html?.trim() &&
            service.blocks.map((b, i) => (
              <div key={i}>
                {b.h && (
                  <h2
                    className="rich mt-10 font-display text-2xl text-ink first:mt-0"
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
                    className="rich mt-4 leading-8 text-ink-body"
                    dangerouslySetInnerHTML={{ __html: b.p }}
                  />
                )}
                {b.img && (
                  <Image
                    src={b.img.src}
                    alt={b.img.alt}
                    width={b.img.w}
                    height={b.img.h}
                    sizes="(min-width: 768px) 48rem, 100vw"
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

          {service.related && (
            <Link
              href={service.related.href}
              className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-2 p-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent"
            >
              อ่านต่อ — {service.related.label}
              <FiArrowRight
                size={16}
                className="shrink-0 text-accent"
                aria-hidden
              />
            </Link>
          )}

          <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
            <h2 className="font-display text-2xl text-white">
              ปรึกษาแพทย์ได้ฟรี ไม่มีค่าใช้จ่าย
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/70">
              ประเมินเคสของคุณกับหมอคิมโดยตรง หรือเช็กราคา {service.title}{" "}
              ล่าสุดก่อนตัดสินใจ
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={LINE_URL}
                {...externalLink}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-medium text-navy transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <FaLine size={16} aria-hidden />
                ทักไลน์ปรึกษาฟรี
              </Link>
              <Link
                href={priceHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                ดูราคาทั้งหมด
              </Link>
            </div>
          </div>

          <Link
            href="/services"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            <FiArrowLeft size={16} aria-hidden />
            กลับไปหน้าบริการและราคา
          </Link>
        </div>
      </article>
    </>
  );
}
