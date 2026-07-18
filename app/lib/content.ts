import type { Article, Block } from "../blog/articles";
import { articles as staticArticles } from "../blog/articles";
import type { ServiceDetail } from "../services/details";
import { serviceDetails as staticDetails } from "../services/details";
import {
  galleryPhotos as staticGallery,
  promotions as staticPromotions,
  serviceCards as staticCards,
  team as staticTeam,
  type GalleryPhoto,
  type Promotion,
  type ServiceCard,
  type TeamMember,
} from "./static-content";
import { supabase } from "./supabase";

// ponytail: every getter follows the same rule — rows in the table win, an empty table (or a
// Supabase hiccup) falls back to the original hard-coded content, so the site can never go blank.

type ServiceRow = {
  slug: string;
  title: string;
  subtitle: string;
  card_detail: string;
  brands: string[];
  price_from: string;
  unit: string;
  image_url: string;
  detail_image_url: string;
  tagline: string;
  excerpt: string;
  blocks: Block[];
  body_html: string;
  related_label: string | null;
  related_href: string | null;
};

async function rows<T>(table: string, select = "*"): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return [];
    return data as T[];
  } catch {
    return [];
  }
}

export async function getServiceCards(): Promise<ServiceCard[]> {
  const data = await rows<ServiceRow>("services");
  const cards = data.filter((r) => r.price_from !== "");
  if (!cards.length) return staticCards;
  return cards.map((r) => ({
    image: r.image_url,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    detail: r.card_detail,
    brands: r.brands,
    from: r.price_from,
    unit: r.unit,
  }));
}

export async function getServiceDetails(): Promise<ServiceDetail[]> {
  const data = await rows<ServiceRow>("services");
  if (!data.length) return staticDetails;
  return data.map((r) => ({
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    tagline: r.tagline,
    image: r.detail_image_url || r.image_url || undefined,
    excerpt: r.excerpt,
    blocks: r.blocks,
    html: r.body_html || undefined,
    related:
      r.related_label && r.related_href
        ? { label: r.related_label, href: r.related_href }
        : undefined,
  }));
}

export async function getResults(): Promise<{ src: string; alt: string }[]> {
  const data = await rows<{ image_url: string; alt: string }>("results");
  return data.map((r) => ({ src: r.image_url, alt: r.alt }));
}

export async function getPromotions(): Promise<Promotion[]> {
  const data = await rows<{
    image_url: string;
    alt: string;
    width: number;
    height: number;
  }>("promotions");
  if (!data.length) return staticPromotions;
  return data.map((r) => ({
    src: r.image_url,
    alt: r.alt,
    width: r.width,
    height: r.height,
  }));
}

export async function getArticles(): Promise<Article[]> {
  const data = await rows<{
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    image_url: string;
    image_pos: string;
    blocks: Block[];
    body_html: string;
  }>("articles");
  if (!data.length) return staticArticles;
  return data.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    image: r.image_url || undefined,
    imagePos: r.image_pos || undefined,
    blocks: r.blocks,
    html: r.body_html || undefined,
  }));
}

export async function getTeam(): Promise<TeamMember[]> {
  const data = await rows<{
    image_url: string;
    name: string;
    role: string;
    quote: string;
  }>("team");
  if (!data.length) return staticTeam;
  return data.map((r) => ({
    image: r.image_url,
    name: r.name,
    role: r.role,
    quote: r.quote,
  }));
}

export async function getGallery(): Promise<GalleryPhoto[]> {
  const data = await rows<{
    image_url: string;
    alt: string;
    width: number;
    height: number;
  }>("gallery");
  if (!data.length) return staticGallery;
  return data.map((r) => ({
    src: r.image_url,
    alt: r.alt,
    w: r.width,
    h: r.height,
  }));
}
