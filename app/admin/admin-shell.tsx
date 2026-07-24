"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiChevronRight,
  FiExternalLink,
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { sections } from "./sections";

// ponytail: the UI guard is cosmetic — RLS on every table is what actually protects writes.
export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        if (!isLogin) {
          router.replace("/admin/login");
          return;
        }
        setReady(true);
        return;
      }
      if (isLogin) {
        router.replace("/admin");
        return;
      }
      setEmail(data.session.user.email ?? "");
      const { data: row } = await supabase
        .from("admins")
        .select("user_id")
        .maybeSingle();
      setIsAdmin(!!row);
      setReady(true);
    });
  }, [pathname, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready)
    return (
      <div className="flex min-h-96 items-center justify-center text-sm text-ink-body">
        กำลังตรวจสอบสิทธิ์…
      </div>
    );

  const current = Object.entries(sections).find(([key]) =>
    pathname.startsWith(`/admin/${key}`),
  );

  const navItem = (href: string, label: string, Icon: React.ElementType) => {
    const active =
      href === "/admin" ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
          active
            ? "bg-surface-2 font-medium text-ink"
            : "text-ink-body hover:bg-surface-2/60 hover:text-ink"
        }`}
      >
        <Icon
          size={15}
          className={active ? "text-accent" : "text-ink-body/70"}
          aria-hidden
        />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-surface md:flex">
        <div className="flex h-14 items-center gap-2.5 border-b border-line px-5">
          <span className="font-display text-lg tracking-wide text-ink">
            Dr. <span className="font-bold">KIM</span>
          </span>
          <span className="rounded-md bg-gold/20 px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent">
            ADMIN
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {navItem("/admin", "ภาพรวม", FiHome)}
          {navItem("/admin/stats", "สถิติ", FiBarChart2)}
          <p className="px-2.5 pb-1.5 pt-5 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-body/50">
            จัดการเนื้อหา
          </p>
          <div className="space-y-0.5">
            {Object.entries(sections).map(([key, s]) =>
              navItem(`/admin/${key}`, s.title, s.icon),
            )}
          </div>
        </nav>

        <div className="border-t border-line p-3">
          <p className="truncate px-2.5 text-xs text-ink-body">{email}</p>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/admin/login");
            }}
            className="mt-1.5 flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-ink-body transition-colors hover:bg-surface-2/60 hover:text-ink"
          >
            <FiLogOut size={15} aria-hidden />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur-md md:px-6">
          <nav
            aria-label="breadcrumb"
            className="flex min-w-0 items-center gap-1.5 text-sm"
          >
            <Link
              href="/admin"
              className="text-ink-body transition-colors hover:text-ink"
            >
              Admin
            </Link>
            {current && (
              <>
                <FiChevronRight
                  size={13}
                  className="shrink-0 text-ink-body/50"
                  aria-hidden
                />
                <span className="truncate font-medium text-ink">
                  {current[1].title}
                </span>
              </>
            )}
          </nav>
          <Link
            href="/"
            target="_blank"
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-xs font-medium text-ink shadow-xs transition-colors hover:bg-surface-2"
          >
            <FiExternalLink size={13} aria-hidden />
            ดูหน้าเว็บ
          </Link>
        </header>

        {/* mobile nav */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-line bg-surface px-3 py-2 md:hidden">
          {[
            ["/admin", "ภาพรวม"],
            ["/admin/stats", "สถิติ"],
            ...Object.entries(sections).map(([key, s]) => [
              `/admin/${key}`,
              s.title,
            ]),
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                pathname === href
                  ? "bg-brand text-on-brand"
                  : "bg-surface-2 text-ink-body"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <main className="flex-1 bg-surface-3/50 p-4 md:p-8">
          <div className="mx-auto max-w-5xl">
            {!isAdmin && (
              <p className="mb-6 rounded-lg border border-gold bg-gold/10 p-4 text-sm leading-6 text-ink">
                บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแล —
                จะดูข้อมูลได้แต่บันทึกไม่ผ่าน ให้เพิ่ม user id ของบัญชีลงตาราง{" "}
                <code>admins</code> ใน Supabase ก่อน
              </p>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
