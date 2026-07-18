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
} from "react-icons/fi";
import SectionBackdrop from "../../components/section-backdrop";
import { LINE_URL, externalLink } from "../../contact";
import { getServiceDetails } from "../../lib/content";
import { serviceDetails } from "../details";
import { serviceRates } from "../rates";

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
  const all = await getServiceDetails();
  const service = all.find((s) => s.slug === slug);
  if (!service) notFound();

  // ponytail: the full rate card stays on /services — the sidebar shows this service's rows
  const rates = serviceRates[slug];
  const priceHref =
    slug === "weight-management" ? "/services#mounjaro" : `/services#${slug}`;
  const others = all.filter((s) => s.slug !== slug && s.image).slice(0, 2);

  return (
    <>
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
              href="/services"
              className="transition-colors duration-200 hover:text-accent"
            >
              บริการของเรา
            </Link>
            <FiChevronRight size={12} aria-hidden />
            <span className="font-medium text-accent">{service.subtitle}</span>
          </nav>

          <h1 className="enter-2 mt-6 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {service.title}
          </h1>

          <p className="enter-3 mt-4 max-w-2xl text-sm leading-7 text-ink-body sm:text-base sm:leading-8">
            {service.tagline}
          </p>

          {rates && (
            <p className="enter-4 mt-6 inline-block rounded-lg bg-surface px-4 py-2.5 text-xs leading-6 text-accent shadow-xs">
              เหมาะสำหรับ: {rates.fit}
            </p>
          )}
        </div>
      </section>

      <div className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <article id="article-body" className="lg:order-1">
            {service.image && (
              <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-line">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 44rem, 100vw"
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
                      className="rich mt-10 border-l-2 border-gold pl-4 font-display text-2xl text-ink first:mt-0"
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
                      sizes="(min-width: 1024px) 44rem, 100vw"
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

            {others.length > 0 && (
              <div className="mt-14 border-t border-line pt-10">
                <h2 className="font-display text-2xl text-ink">
                  บริการอื่นที่น่าสนใจ
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-navy/5"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={s.image!}
                            alt=""
                            fill
                            sizes="(min-width: 640px) 22rem, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 hidden bg-navy/25 mix-blend-multiply dark:block" />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <p className="font-display text-lg text-ink">
                            {s.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-ink-body">
                            {s.subtitle}
                          </p>
                          <p className="mt-auto flex items-center gap-2 pt-3 text-sm font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                            อ่านรายละเอียด
                            <FiArrowRight size={14} aria-hidden />
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/services"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
            >
              <FiArrowLeft size={16} aria-hidden />
              กลับไปหน้าบริการและราคา
            </Link>
          </article>

          {/* price + LINE rail — first in DOM so phones see the price before the long read */}
          <aside className="order-first lg:order-2 lg:sticky lg:top-24">
            <div className="space-y-4">
              {rates && (
                <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
                  <p className="border-b border-line bg-surface-2/60 px-5 py-3.5 text-sm font-semibold text-ink">
                    ราคา {service.title}
                  </p>
                  <ul className="divide-y divide-line px-5">
                    {rates.rows.map((r) => (
                      <li
                        key={r.name}
                        className="flex items-baseline justify-between gap-3 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-ink">{r.name}</p>
                          <p className="text-xs text-ink-body">
                            {r.note ? `${r.note} · ` : ""}
                            {r.unit}
                          </p>
                        </div>
                        <p className="shrink-0 font-display text-lg tabular-nums text-ink">
                          {r.price}
                          <span className="ml-0.5 font-sans text-xs text-ink-body">
                            .-
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-line px-5 py-3.5">
                    <Link
                      href={priceHref}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-opacity duration-200 hover:opacity-80"
                    >
                      ดูตารางราคาเต็ม
                      <FiArrowRight size={13} aria-hidden />
                    </Link>
                    <p className="mt-1.5 text-[0.68rem] leading-5 text-ink-body">
                      ราคาอาจเปลี่ยนแปลงตามโปรโมชั่นประจำเดือน
                    </p>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-navy p-6">
                <p className="font-display text-lg text-white">
                  ปรึกษาหมอคิมฟรี
                </p>
                <p className="mt-1 text-xs leading-6 text-white/70">
                  ประเมินเคสและออกแบบการรักษาก่อนตัดสินใจ ไม่มีค่าใช้จ่าย
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
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
