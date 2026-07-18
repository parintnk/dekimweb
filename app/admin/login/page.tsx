"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) setError("เข้าสู่ระบบไม่สำเร็จ — ตรวจสอบอีเมลและรหัสผ่าน");
    else router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-3/50 px-6">
      <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-7 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-xl tracking-wide text-ink">
            Dr. <span className="font-bold">KIM</span>
          </span>
          <span className="rounded-md bg-gold/20 px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent">
            ADMIN
          </span>
        </div>
        <h1 className="mt-4 font-display text-xl text-ink">
          เข้าสู่ระบบผู้ดูแล
        </h1>
        <p className="mt-1 text-xs text-ink-body">
          สำหรับทีมงาน Dr. KIM Clinic เท่านั้น
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-ink">อีเมล</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-surface px-4 py-2.5 text-sm text-ink shadow-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink">รหัสผ่าน</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-surface px-4 py-2.5 text-sm text-ink shadow-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="h-10 w-full cursor-pointer rounded-md bg-brand text-sm font-medium text-on-brand shadow-xs transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}
