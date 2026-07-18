import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";
import { SITE_URL } from "./contact";
import { serviceDetails } from "./services/details";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/promotions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7 },
    { path: "/reviews", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: changeFrequency ?? "weekly",
    priority,
  }));

  const services: MetadataRoute.Sitemap = serviceDetails.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    // ponytail: Mounjaro is the brief's SEO priority — its page outranks its siblings
    priority: s.slug === "weight-management" ? 0.9 : 0.8,
  }));

  const blog: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...services, ...blog];
}
