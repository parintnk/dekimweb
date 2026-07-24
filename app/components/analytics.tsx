"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "../lib/track";

// ponytail: self-hosted analytics — one pageview per route change plus a single delegated
// click listener that catches every LINE / phone link on the site (no need to wire each button).
// Admin routes are excluded so the clinic's own visits don't inflate the numbers.
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    track("pageview", pathname);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("phone_click", location.pathname);
      else if (href.includes("line.me")) track("line_click", location.pathname);
    }
    // capture phase so it still fires if an inner handler stops propagation
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
