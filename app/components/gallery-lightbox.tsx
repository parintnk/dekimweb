"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import type { GalleryPhoto } from "../lib/static-content";

// ponytail: masonry grid + native <dialog> lightbox, same pattern as Promotions — no modal library.
export default function GalleryLightbox({ photos }: { photos: GalleryPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  function open(photo: GalleryPhoto) {
    setActive(photo);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <div className="mt-10 columns-2 gap-5 lg:columns-3">
        {photos.map((g) => (
          <button
            key={g.src}
            type="button"
            onClick={() => open(g)}
            aria-label={`ดูรูปใหญ่: ${g.alt}`}
            className="group relative mb-5 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-line"
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={g.w}
              height={g.h}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-navy/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="flex size-11 items-center justify-center rounded-full bg-gold text-navy">
                <FiMaximize2 size={18} aria-hidden />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* native <dialog> — free top-layer, backdrop and Esc-to-close */}
      <dialog
        ref={dialogRef}
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current?.close()
        }
        className="m-auto max-h-[92dvh] max-w-[92vw] bg-transparent backdrop:bg-slate-700/60 backdrop:backdrop-blur-md"
      >
        {active && (
          <div className="relative">
            <Image
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
              className="max-h-[92dvh] w-auto rounded-2xl"
            />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="ปิด"
              className="absolute right-3 top-3 flex size-11 cursor-pointer items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-navy"
            >
              <FiX size={20} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
