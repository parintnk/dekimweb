"use client";

import type { ImageLoaderProps } from "next/image";

// ponytail: Vercel's optimizer quota is spent (402), so Supabase resizes admin uploads to the
// requested width and serves WebP/AVIF (1.7MB hero PNG -> ~60KB). It never upscales past the original.
// Local /public files and GIFs (would lose their animation) pass through untouched.
const OBJECT = "/storage/v1/object/public/";

export default function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.includes(OBJECT) || /\.gif$/i.test(src)) return `${src}?w=${width}`;
  return `${src.replace(OBJECT, "/storage/v1/render/image/public/")}?width=${width}&quality=${quality ?? 75}`;
}
