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
  // ponytail: only the first slide renders at first so later slides don't share bandwidth with the LCP
  // image; they mount 2.5s in, well before the first crossfade at 6s.
  const [all, setAll] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAll(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (all ? slides : slides.slice(0, 1)).map((s, n) => {
    const frame = mobile ? s.mobileFrame : s.desktopFrame;
    // landscape desktop photo cropped into a portrait screen needs ~4× the width
    const base = mobile && s.mobile === s.desktop ? 400 : 100;
    return (
      <Image
        key={n}
        src={mobile ? s.mobile : s.desktop}
        alt={n === i ? s.alt : ""}
        fill
        // ponytail: the page renders both the mobile and desktop hero and CSS-hides one. Eager
        // only on the mobile one: phones skip the hidden desktop image (lazy + display:none never
        // loads), desktops pay ~100KB for the hidden mobile one. Mobile is what PageSpeed scores.
        loading={n === 0 && mobile ? "eager" : undefined}
        fetchPriority={n === 0 ? "high" : undefined}
        quality={mobile ? 80 : undefined}
        sizes={`${Math.ceil(base * (frame?.zoom ?? 1))}vw`}
        style={frameStyle(frame)}
        className={`transition-opacity duration-1000 ${n === i ? "opacity-100" : "opacity-0"}`}
      />
    );
  });
}
