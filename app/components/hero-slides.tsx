"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Hero } from "../lib/content";
import { frameStyle } from "../lib/frame";

// ponytail: image layer only — overlays and text stay in the server-rendered hero.
// Crossfades every 6s; one slide or prefers-reduced-motion = static. No dots/arrows.
export default function HeroSlides({
  slides,
  mobile,
}: {
  slides: Hero[];
  mobile?: boolean;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return slides.map((s, n) => {
    const frame = mobile ? s.mobileFrame : s.desktopFrame;
    // landscape desktop photo cropped into a portrait screen needs ~4× the width
    const base = mobile && s.mobile === s.desktop ? 400 : 100;
    return (
      <Image
        key={n}
        src={mobile ? s.mobile : s.desktop}
        alt={n === i ? s.alt : ""}
        fill
        // ponytail: the page renders both the mobile and desktop hero and CSS-hides one, so eager
        // also fetches the hidden one. Fine now that the loader shrinks it to ~70KB; lazy instead
        // made the LCP image wait for layout.
        loading={n === 0 ? "eager" : undefined}
        fetchPriority={n === 0 ? "high" : undefined}
        quality={mobile ? 90 : undefined}
        sizes={`${Math.ceil(base * (frame?.zoom ?? 1))}vw`}
        style={frameStyle(frame)}
        className={`transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}
      />
    );
  });
}
