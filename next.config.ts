import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev server is opened from other devices on the LAN (phone testing, etc.)
  allowedDevOrigins: ["192.168.110.*"],
  // sharp resize hit the 7s default and returned 500 on large admin PNGs
  experimental: { imgOptTimeoutInSeconds: 30 },
  // llmstxt.org: every page has a Markdown twin at "<url>.md" ("/" → "/index.md"), served by
  // app/md/[...path]/route.ts. beforeFiles so "/services/botox.md" never hits the [slug] page.
  // "/index" also serves the homepage; send it (and its old canonical) to "/"
  async redirects() {
    return [{ source: "/index", destination: "/", permanent: true }];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/:path*\\.md", destination: "/md/:path*" }],
      afterFiles: [],
      fallback: [],
    };
  },
  // ...and each HTML page advertises its twin + the llms.txt index via HTTP Link headers
  async headers() {
    const link = (md: string) =>
      `<${md}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`;
    return [
      { source: "/", headers: [{ key: "Link", value: link("/index.md") }] },
      {
        source: "/:page(about|services|blog|contact|promotions|reviews)",
        headers: [{ key: "Link", value: link("/:page.md") }],
      },
      {
        source: "/:section(services|blog)/:slug([^/.]+)",
        headers: [{ key: "Link", value: link("/:section/:slug.md") }],
      },
    ];
  },
  images: {
    // Vercel optimizer quota hit (402); Supabase storage resizes uploads instead
    loader: "custom",
    loaderFile: "./app/lib/image-loader.ts",
    // mobile hero renders at quality 80 (90 was ~50% heavier for the LCP image); anything not listed here is coerced to 75
    qualities: [75, 80],
    // uploaded admin images live in Supabase storage
    remotePatterns: [
      { protocol: "https", hostname: "zvpnyslpsgazoyvwnxuq.supabase.co" },
    ],
  },
};

export default nextConfig;
