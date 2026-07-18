"use client";

import { useState } from "react";
import { FiImage, FiInfo, FiUploadCloud } from "react-icons/fi";
import { imageDims, uploadImage } from "./upload";

function measureUrl(url: string): Promise<{ w: number; h: number } | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// dropzone-style upload: click or drag a file in, or paste a URL below.
// Dimensions are measured automatically and reported via onDims.
export default function ImageField({
  value,
  folder,
  hint,
  onChange,
  onDims,
}: {
  value: string;
  folder: string;
  hint?: string;
  onChange: (url: string) => void;
  onDims?: (w: number, h: number) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const [url, dims] = await Promise.all([
        uploadImage(file, folder),
        imageDims(file),
      ]);
      onChange(url);
      onDims?.(dims.w, dims.h);
    } catch {
      alert("อัปโหลดไม่สำเร็จ — ตรวจสอบสิทธิ์ admin");
    }
    setBusy(false);
  }

  async function handleUrl(url: string) {
    onChange(url);
    if (!url) return;
    const dims = await measureUrl(url);
    if (dims) onDims?.(dims.w, dims.h);
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const file = e.dataTransfer.files?.[0];
          if (file?.type.startsWith("image/")) handleFile(file);
        }}
        className={`group relative block cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors ${
          drag
            ? "border-accent bg-gold/10"
            : "border-line hover:border-accent/60 hover:bg-surface-2/50"
        }`}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- preview of arbitrary admin URL */}
            <img
              src={value}
              alt=""
              className="h-44 w-full bg-surface-2 object-contain"
            />
            <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-navy/60 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              <FiUploadCloud size={14} aria-hidden />
              คลิกหรือลากรูปมาวางเพื่อเปลี่ยน
            </span>
          </>
        ) : (
          <span className="flex h-36 flex-col items-center justify-center gap-2 text-ink-body">
            <span className="flex size-10 items-center justify-center rounded-full bg-surface-2">
              <FiImage size={17} aria-hidden />
            </span>
            <span className="text-xs font-medium">
              คลิกหรือลากรูปมาวางที่นี่
            </span>
            <span className="text-[0.65rem] text-ink-body/70">
              JPG, PNG, WebP
            </span>
          </span>
        )}
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center bg-surface/80 text-xs font-medium text-ink">
            กำลังอัปโหลด…
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </label>

      {hint && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-accent">
          <FiInfo size={12} className="shrink-0" aria-hidden />
          {hint}
        </p>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => handleUrl(e.target.value)}
        placeholder="หรือวางลิงก์รูป (URL)"
        className="mt-1.5 w-full rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-ink shadow-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
