import type { MetadataRoute } from "next";
import { SITE_URL } from "./contact";
import { getArticles, getServiceDetails } from "./lib/content";

// content lives in Supabase now — pull live slugs so admin-created pages get indexed
export const revalidate = 3600;

type SitemapItem = MetadataRoute.Sitemap[number];
type ChangeFrequency = SitemapItem["changeFrequency"];

const origin = SITE_URL.replace(/\/$/, "");
const siteLastModified = new Date("2026-07-27T00:00:00.000Z");

const staticPages: {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  images?: string[];
}[] = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
    images: ["/clinic/storefront.jpg", "/hero-portrait.jpg"],
  },
  {
    path: "/services",
    changeFrequency: "weekly",
    priority: 0.95,
    images: ["/clinic/products.jpg", "/services/filler.jpg"],
  },
  {
    path: "/promotions",
    changeFrequency: "weekly",
    priority: 0.85,
    images: ["/promotions/july.jpg"],
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.75,
    images: ["/doctor.jpg", "/clinic/consult-room.jpg"],
  },
  {
    path: "/reviews",
    changeFrequency: "monthly",
    priority: 0.7,
    images: ["/reviews/chanathimad.png"],
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
    images: ["/clinic/storefront.jpg"],
  },
];

function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${origin}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function uniqueImages(images: (string | undefined)[] = []) {
  return [
    ...new Set(
      images
        .filter((image): image is string => Boolean(image))
        .map((image) => toAbsoluteUrl(image)),
    ),
  ];
}

function toLastModified(value?: string) {
  if (!value) return siteLastModified;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? siteLastModified : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceDetails, articles] = await Promise.all([
    getServiceDetails(),
    getArticles(),
  ]);

  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${origin}${page.path}`,
    lastModified: siteLastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: uniqueImages(page.images),
  }));

  const services: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${origin}/services/${s.slug}`,
    lastModified: toLastModified(s.updatedAt),
    changeFrequency: "monthly",
    // ponytail: Mounjaro is the brief's SEO priority — it should outrank sibling services.
    priority: s.slug === "weight-management" ? 0.95 : 0.85,
    images: uniqueImages([s.image]),
  }));

  const blog: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${origin}/blog/${a.slug}`,
    lastModified: toLastModified(a.updatedAt),
    changeFrequency: "monthly",
    priority: a.slug.includes("mounjaro") ? 0.75 : 0.65,
    images: uniqueImages([
      a.image,
      ...a.blocks.flatMap((block) => (block.img ? [block.img.src] : [])),
    ]),
  }));

  return [...pages, ...services, ...blog]
    .filter(
      (entry, index, all) => all.findIndex((x) => x.url === entry.url) === index,
    )
    .sort(
      (a, b) =>
        (b.priority ?? 0) - (a.priority ?? 0) || a.url.localeCompare(b.url),
    );
}
