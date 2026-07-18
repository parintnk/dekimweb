"use client";

import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  open,
  title,
  detail,
  confirmLabel = "ลบรายการ",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  detail?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        aria-label="ปิด"
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-navy/40 backdrop-blur-sm"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-sm rounded-xl border border-line bg-surface p-6 shadow-2xl shadow-navy/20"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <FiAlertTriangle size={20} aria-hidden />
        </span>
        <h2
          id="confirm-title"
          className="mt-4 text-base font-semibold text-ink"
        >
          {title}
        </h2>
        {detail && (
          <p className="mt-1 text-sm leading-6 text-ink-body">{detail}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 cursor-pointer items-center rounded-md border border-line px-4 text-sm font-medium text-ink shadow-xs transition-colors hover:bg-surface-2"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-9 cursor-pointer items-center rounded-md bg-red-500 px-4 text-sm font-medium text-white shadow-xs transition-colors hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
