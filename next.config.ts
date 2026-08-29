import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev server is opened from other devices on the LAN (phone testing, etc.)
  allowedDevOrigins: ["192.168.110.*"],
  images: {
    // uploaded admin images live in Supabase storage
    remotePatterns: [
      { protocol: "https", hostname: "zvpnyslpsgazoyvwnxuq.supabase.co" },
    ],
  },
};

export default nextConfig;
