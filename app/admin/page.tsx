"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiClock,
  FiEdit3,
  FiExternalLink,
  FiImage,
  FiMove,
  FiPlus,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { sections } from "./sections";

const card =
  "rounded-xl border border-line bg-surface p-5 shadow-xs transition-shadow hover:shadow-md";

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    Object.entries(sections).forEach(async ([key, s]) => {
      const { count } = await supabase
        .from(s.table)
        .select("*", { count: "exact", head: true });
      setCounts((c) => ({ ...c, [key]: count ?? 0 }));
    });
  }, []);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {/* hero cell */}
      <div className="relative overflow-hidden rounded-xl bg-navy p-6 md:col-span-2 xl:row-span-2 xl:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gold/20 blur-3xl"
        />
        <p className="text-xs font-medium tracking-[0.2em] text-gold">
          DR. KIM CLINIC
        </p>
        <h1 className="mt-3 font-display text-2xl text-white xl:text-3xl">
          แผงควบคุมเนื้อหา
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
          จัดการทุกอย่างบนเว็บไซต์ได้จากที่นี่ — เนื้อหาทั้งหมด{" "}
          <span className="tabular-nums text-white">{total}</span> รายการ
          แก้ไขแล้วหน้าเว็บอัปเดตเองภายใน 1 นาที
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/admin/blog"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-gold px-4 text-sm font-medium text-navy transition-opacity hover:opacity-90"
          >
            <FiPlus size={14} aria-hidden />
            เขียนบทความ
          </Link>
          <Link
            href="/admin/promotions"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/25 px-4 text-sm font-medium text-white transition-colors hover:border-gold hover:text-gold"
          >
            <FiPlus size={14} aria-hidden />
            ลงโปรใหม่
          </Link>
        </div>
      </div>

      {/* stat cells */}
      {Object.entries(sections).map(([key, s]) => {
        const Icon = s.icon;
        return (
          <Link key={key} href={`/admin/${key}`} className={`group ${card}`}>
            <div className="flex items-start justify-between">
              <span className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-accent">
                <Icon size={16} aria-hidden />
              </span>
              <FiArrowUpRight
                size={15}
                className="text-ink-body/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden
              />
            </div>
            <p className="mt-4 font-display text-3xl tabular-nums text-ink">
              {counts[key] ?? "–"}
            </p>
            <p className="mt-0.5 text-sm font-medium text-ink">{s.title}</p>
            <p className="mt-0.5 truncate text-xs text-ink-body">{s.note}</p>
          </Link>
        );
      })}

      {/* website cell */}
      <div className={`${card} md:col-span-2`}>
        <p className="flex items-center gap-2 text-sm font-medium text-ink">
          <FiClock size={14} className="text-accent" aria-hidden />
          การอัปเดตหน้าเว็บ
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-body">
          ทุกการบันทึกมีผลกับหน้าเว็บจริงภายใน 1 นาที ไม่ต้องกดอะไรเพิ่ม —
          เปิดดูผลได้เลย
        </p>
        <Link
          href="/"
          target="_blank"
          className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-md border border-line px-4 text-sm font-medium text-ink shadow-xs transition-colors hover:bg-surface-2"
        >
          <FiExternalLink size={14} aria-hidden />
          เปิดหน้าเว็บ
        </Link>
      </div>

      {/* tips cell */}
      <div className={`${card} md:col-span-2`}>
        <p className="text-sm font-medium text-ink">เคล็ดลับการใช้งาน</p>
        <ul className="mt-3 space-y-2.5 text-sm leading-6 text-ink-body">
          <li className="flex items-start gap-2.5">
            <FiMove
              size={14}
              className="mt-1 shrink-0 text-accent"
              aria-hidden
            />
            ลากไอคอน ≡ หน้ารายการเพื่อจัดลำดับการแสดงผล
          </li>
          <li className="flex items-start gap-2.5">
            <FiEdit3
              size={14}
              className="mt-1 shrink-0 text-accent"
              aria-hidden
            />
            เนื้อหาบทความ/บริการ จัดรูปแบบด้วย toolbar — หัวข้อ ตัวหนา ลิงก์
            รายการ
          </li>
          <li className="flex items-start gap-2.5">
            <FiImage
              size={14}
              className="mt-1 shrink-0 text-accent"
              aria-hidden
            />
            อัปโหลดรูปได้ทุกจุดที่มีปุ่ม —
            ระบบเก็บไฟล์และแสดงผลขนาดเหมาะสมให้เอง
          </li>
        </ul>
      </div>
    </div>
  );
}
