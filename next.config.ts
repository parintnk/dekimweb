import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev server is opened from other devices on the LAN (phone testing, etc.)
  allowedDevOrigins: ["192.168.110.*"],
  images: {
    // mobile hero renders at quality 90; anything not listed here is coerced to 75
    qualities: [75, 90],
    // uploaded admin images live in Supabase storage
    remotePatterns: [
      { protocol: "https", hostname: "zvpnyslpsgazoyvwnxuq.supabase.co" },
    ],
  },
};

export default nextConfig;
