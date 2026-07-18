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
  }, []);

  return null;
}
