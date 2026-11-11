"use client";

import type { ImageLoaderProps } from "next/image";

// ponytail: Vercel's optimizer quota is spent (402), so Supabase resizes admin uploads to the
// requested width and serves WebP/AVIF (1.7MB hero PNG -> ~60KB). It never upscales past the original.
// Local /public files and GIFs (would lose their animation) pass through untouched.
// resize=contain is required: Supabase's default "cover" keeps the original height when only a
// width is given, so it crops the sides (960x1200 at width=750 came back 750x1200, not 750x938).
const OBJECT = "/storage/v1/object/public/";

export default function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.includes(OBJECT) || /\.gif$/i.test(src)) return `${src}?w=${width}`;
  return `${src.replace(OBJECT, "/storage/v1/render/image/public/")}?width=${width}&quality=${quality ?? 75}&resize=contain`;
}
