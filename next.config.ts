import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // uploaded admin images live in Supabase storage
    remotePatterns: [
      { protocol: "https", hostname: "zvpnyslpsgazoyvwnxuq.supabase.co" },
    ],
  },
};

export default nextConfig;
