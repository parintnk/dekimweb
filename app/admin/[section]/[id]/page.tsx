"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";
import { blocksToHtml } from "../../blocks-doc";
import ImageField from "../../image-field";
import RichEditor from "../../rich-editor";
import { sections, type Field } from "../../sections";

type Row = Record<string, unknown> & { id?: string };

const inputCls =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink shadow-xs outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

// main content edits on the left; images, meta and actions live in the right rail
const SIDE_TYPES = new Set(["image", "number", "tags", "article"]);

export default function AdminRecordPage() {
  const { section, id } = useParams<{ section: string; id: string }>();
  const router = useRouter();
  const config = sections[section];
  const isNew = id === "new";

  const [row, setRow] = useState<Row | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [articleOptions, setArticleOptions] = useState<
    { slug: string; title: string }[]
  >([]);

  useEffect(() => {
    if (!config) return;
    if (isNew) {
      supabase
        .from(config.table)
        .select("*", { count: "exact", head: true })
        .then(({ count }) => {
          const blank: Row = {};
          for (const f of config.fields) {
            if (f.type === "number") blank[f.key] = count ?? 0;
            else if (f.type === "tags") blank[f.key] = [];
            else if (f.type === "blocks") blank[f.key] = [];
            else if (f.type === "article") blank[f.key] = null;
            else blank[f.key] = "";
          }
          setRow(blank);
        });
    } else {
      supabase
        .from(config.table)
        .select("*")
        .eq("id", id)
        .maybeSingle()
        .then(({ data }) => setRow((data as Row) ?? null));
    }
  }, [config, id, isNew]);

  // ponytail: beforeunload covers close/refresh; in-app back-link nav is not guarded
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const wantsArticles = !!config?.fields.some((f) => f.type === "article");
  useEffect(() => {
    if (!wantsArticles) return;
    supabase
      .from("articles")
      .select("slug,title")
      .order("sort_order")
      .then(({ data }) => setArticleOptions(data ?? []));
  }, [wantsArticles]);

  if (!config) notFound();

  async function save() {
    if (!row) return;
    setBusy(true);
    setStatus("กำลังบันทึก…");
    if (isNew) {
      const { data, error } = await supabase
        .from(config.table)
        .insert(row)
        .select("id")
        .single();
      setBusy(false);
      if (error) {
        setStatus(`บันทึกไม่สำเร็จ: ${error.message}`);
        return;
      }
      setDirty(false);
      router.replace(`/admin/${section}/${data.id}`);
      setStatus("บันทึกแล้ว ✓ หน้าเว็บอัปเดตภายใน 1 นาที");
    } else {
      const { error } = await supabase
        .from(config.table)
        .update(row)
        .eq("id", id);
      setBusy(false);
      if (!error) setDirty(false);
      setStatus(
        error
          ? `บันทึกไม่สำเร็จ: ${error.message}`
          : "บันทึกแล้ว ✓ หน้าเว็บอัปเดตภายใน 1 นาที",
      );
    }
  }

  async function remove() {
    if (!confirm("ลบรายการนี้ถาวร?")) return;
    const { error } = await supabase.from(config.table).delete().eq("id", id);
    if (error) setStatus(`ลบไม่สำเร็จ: ${error.message}`);
    else router.push(`/admin/${section}`);
  }

  function input(f: Field) {
    const value = row?.[f.key];
    const set = (v: unknown) => {
      setDirty(true);
      setRow((r) => ({ ...r!, [f.key]: v }));
    };
    switch (f.type) {
      case "image":
        return (
          <ImageField
            value={(value as string) ?? ""}
            folder={config.table}
            hint={f.hint}
            onChange={set}
            onDims={
              config.storeDims
                ? (w, h) => setRow((r) => ({ ...r!, width: w, height: h }))
                : undefined
            }
          />
        );
      case "article":
        return (
          <select
            value={(row?.related_href as string) ?? ""}
            onChange={(e) => {
              const href = e.target.value;
              const a = articleOptions.find((o) => `/blog/${o.slug}` === href);
              setDirty(true);
              setRow((r) => ({
                ...r!,
                related_href: href || null,
                related_label: a ? `บทความ: ${a.title}` : null,
              }));
            }}
            className={`${inputCls} cursor-pointer`}
          >
            <option value="">— ไม่แสดง —</option>
            {articleOptions.map((o) => (
              <option key={o.slug} value={`/blog/${o.slug}`}>
                {o.title}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            value={(value as string) ?? ""}
            onChange={(e) => set(e.target.value)}
            rows={3}
            className={`${inputCls} leading-6`}
          />
        );
      case "blocks":
        // stored as HTML now; old records still carry blocks — convert them on open
        return (
          <RichEditor
            key={id}
            content={
              ((row?.body_html as string) || "").trim() ||
              blocksToHtml((row?.blocks as never[]) ?? [])
            }
            onChange={(html) => {
              setDirty(true);
              setRow((r) => ({ ...r!, body_html: html }));
            }}
            folder={config.table}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={(value as number) ?? 0}
            onChange={(e) => set(Number(e.target.value))}
            className={`${inputCls} w-28`}
          />
        );
      case "tags":
        return (
          <input
            type="text"
            value={((value as string[]) ?? []).join(", ")}
            onChange={(e) =>
              set(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
            className={inputCls}
          />
        );
      default:
        return (
          <input
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => set(e.target.value)}
            className={inputCls}
          />
        );
    }
  }

  function fieldLabel(f: Field) {
    // ponytail: a <div>, NOT a <label> — a label forwards every click inside it to its first
    // button, which made clicking editor text fire the H2 toolbar button (the ghost-H2 bug)
    return (
      <div key={f.key} className="block text-sm">
        <span className="font-medium text-ink">{f.label}</span>
        {f.hint && f.type !== "image" && (
          <span className="ml-2 text-xs text-ink-body">{f.hint}</span>
        )}
        <div className="mt-1.5">{input(f)}</div>
      </div>
    );
  }

  const previewHref =
    !isNew && typeof row?.slug === "string" && row.slug
      ? section === "blog"
        ? `/blog/${row.slug}`
        : section === "services"
          ? `/services/${row.slug}`
          : null
      : null;

  const mainFields = config.fields.filter((f) => !SIDE_TYPES.has(f.type));
  const sideFields = config.fields.filter((f) => SIDE_TYPES.has(f.type));
  const imageFields = sideFields.filter((f) => f.type === "image");
  const metaFields = sideFields.filter((f) => f.type !== "image");

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href={`/admin/${section}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-body transition-colors hover:text-ink"
          >
            <FiArrowLeft size={13} aria-hidden />
            กลับไปรายการ{config.title}
          </Link>
          <h1 className="mt-1 font-display text-2xl text-ink">
            {isNew ? `เพิ่ม${config.title}` : `แก้ไข${config.title}`}
            {dirty && (
              <span className="ml-3 align-middle rounded-md bg-gold/20 px-2 py-0.5 text-xs font-medium text-accent">
                ยังไม่ได้บันทึก
              </span>
            )}
          </h1>
        </div>
        {previewHref && (
          <Link
            href={previewHref}
            target="_blank"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-4 text-sm font-medium text-ink shadow-xs transition-colors hover:bg-surface-2"
          >
            ดูหน้าจริง ↗
          </Link>
        )}
      </div>

      {!row ? (
        <p className="mt-10 text-center text-sm text-ink-body">
          กำลังโหลดข้อมูล…
        </p>
      ) : (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          {/* main column */}
          <div className="rounded-xl border border-line bg-surface p-5 shadow-xs md:p-6">
            <div className="space-y-5">{mainFields.map(fieldLabel)}</div>
          </div>

          {/* right rail */}
          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-xl border border-line bg-surface p-5 shadow-xs">
              <button
                type="button"
                onClick={save}
                disabled={busy}
                className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-brand text-sm font-medium text-on-brand shadow-xs transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <FiSave size={15} aria-hidden />
                {busy ? "กำลังบันทึก…" : "บันทึก"}
              </button>
              {status && (
                <p className="mt-3 text-xs leading-5 text-accent">{status}</p>
              )}
              {!isNew && (
                <button
                  type="button"
                  onClick={remove}
                  className="mt-3 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-line text-xs font-medium text-ink-body shadow-xs transition-colors hover:border-red-300 hover:bg-red-500/10 hover:text-red-500"
                >
                  <FiTrash2 size={13} aria-hidden />
                  ลบรายการนี้
                </button>
              )}
            </div>

            {imageFields.length > 0 && (
              <div className="rounded-xl border border-line bg-surface p-5 shadow-xs">
                <p className="text-sm font-semibold text-ink">รูปภาพ</p>
                <div className="mt-4 space-y-5">
                  {imageFields.map(fieldLabel)}
                </div>
              </div>
            )}

            {metaFields.length > 0 && (
              <div className="rounded-xl border border-line bg-surface p-5 shadow-xs">
                <p className="text-sm font-semibold text-ink">การตั้งค่า</p>
                <div className="mt-4 space-y-5">
                  {metaFields.map(fieldLabel)}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
