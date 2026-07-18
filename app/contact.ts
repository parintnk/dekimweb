// ponytail: single source for every contact target. The clinic takes bookings on LINE, so LINE_URL
// is what every CTA points at — change it here, not in eight components.

// Canonical origin for sitemap/robots/OG URLs. Set NEXT_PUBLIC_SITE_URL when the real
// domain goes live — the fallback only exists so local builds produce valid absolute URLs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const LINE_URL = "https://line.me/R/ti/p/@doctorkimcnx";
export const LINE_ID = "@doctorkimcnx";

export const PHONE = "084-609-2027";
export const PHONE_TEL = "tel:0846092027";

export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61556527622589";
export const INSTAGRAM_URL = "https://www.instagram.com/doctorkimcnx/";
export const TIKTOK_URL = "https://www.tiktok.com/@doctorkimcnx";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=drkim+clinic#lrd=0x30da2524c50c942f:0x3c69403bd07f213f,1";

// ponytail: spread onto any <Link> that leaves the site
export const externalLink = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
