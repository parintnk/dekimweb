import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev server is opened from other devices on the LAN (phone testing, etc.)
  allowedDevOrigins: ["192.168.110.*"],
  // sharp resize hit the 7s default and returned 500 on large admin PNGs
  experimental: { imgOptTimeoutInSeconds: 30 },
  images: {
    // Vercel optimizer quota hit (402); Supabase storage resizes uploads instead
    loader: "custom",
    loaderFile: "./app/lib/image-loader.ts",
    // mobile hero renders at quality 90; anything not listed here is coerced to 75
    qualities: [75, 90],
    // uploaded admin images live in Supabase storage
    remotePatterns: [
      { protocol: "https", hostname: "zvpnyslpsgazoyvwnxuq.supabase.co" },
    ],
  },
};

export default nextConfig;
