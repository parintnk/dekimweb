"use client";

import { useEffect } from "react";

// ponytail: same approach as gography.net — the hidden Google Translate widget does the
// work, language switching happens via the googtrans cookie + reload (see
// language-switcher.tsx). The DOM monkey patches stop React from crashing when Google
// wraps text nodes in <font> tags.

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              autoDisplay: boolean;
            },
            elementId: string,
          ): void;
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (typeof Node === "function" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        try {
          return originalRemoveChild.apply(this, [child]) as T;
        } catch {
          return child;
        }
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(
        newNode: T,
        referenceNode: Node | null,
      ): T {
        try {
          return originalInsertBefore.apply(this, [
            newNode,
            referenceNode,
          ]) as T;
        } catch {
          return newNode;
        }
      };
    }

    // ponytail: while a translation is active Google owns the DOM, so Next's soft
    // navigation half-fails (URL changes, old page stays). Capture-phase listener turns
    // internal link taps into full page loads — Google re-translates on arrival.
    const forceFullNav = (e: MouseEvent) => {
      if (!document.cookie.includes("googtrans=/th/")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      if (a.origin !== location.origin) return;
      if (a.pathname === location.pathname && a.hash) return;
      e.preventDefault();
      e.stopPropagation();
      location.href = a.href;
    };
    document.addEventListener("click", forceFullNav, true);

    if (!document.getElementById("google_translate_element")) {
      const div = document.createElement("div");
      div.id = "google_translate_element";
      document.body.appendChild(div);
    }

    window.googleTranslateElementInit = function () {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "th",
            includedLanguages: "th,en,zh-CN",
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => document.removeEventListener("click", forceFullNav, true);
  }, []);

  return null;
}
