"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// ponytail: one global effects pass instead of per-component hooks. Anything tagged
// `.reveal` fades up on scroll (staggered per batch), `[data-parallax]` drifts inside its
// parent, `.glow` slow-floats forever. Re-runs per route; matchMedia sits out for
// prefers-reduced-motion users, so they just see everything in place.
export default function GsapEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(".reveal", { y: 28, autoAlpha: 0 });
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      const bar = document.getElementById("reading-progress");
      const articleBody = document.getElementById("article-body");
      if (bar && articleBody) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: articleBody,
              start: "top 80px",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".glow").forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 ? -40 : 40,
          y: 30,
          duration: 7 + i,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
