"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiMenu, FiPlus, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import ConfirmDialog from "../confirm-dialog";
import { sections } from "../sections";

type Row = Record<string, unknown> & { id?: string };

function SortableRow({
  row,
  imageKey,
  labelKey,
  href,
  onDelete,
  onToggleHidden,
}: {
  row: Row;
  imageKey?: string;
  labelKey: string;
  href: string;
  onDelete: () => void;
  onToggleHidden: () => void;
}) {
  const hidden = row.hidden === true;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id as string });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-4 bg-surface p-4 transition-colors hover:bg-surface-2/40 ${
        isDragging ? "relative z-10 opacity-80 shadow-xl shadow-navy/10" : ""
      } ${hidden ? "opacity-50" : ""}`}
    >
      <span
        {...attributes}
        {...listeners}
        title="ลากเพื่อจัดลำดับ"
        className="cursor-grab touch-none text-ink-body/60 outline-none active:cursor-grabbing"
      >
        <FiMenu size={16} aria-hidden />
      </span>
      {imageKey &&
        ((row[imageKey] as string) ? (
          <Image
            src={row[imageKey] as string}
            alt=""
            width={56}
            height={56}
            unoptimized
            className="size-14 shrink-0 rounded-lg border border-line object-cover"
          />
        ) : (
          <div className="size-14 shrink-0 rounded-lg border border-dashed border-line" />
        ))}
      <Link href={href} className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate text-sm font-medium text-ink">
          {(row[labelKey] as string) || "(ไม่มีชื่อ)"}
          {hidden && (
            <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[11px] font-medium text-ink-body">
              ซ่อนอยู่
            </span>
          )}
        </p>
        <p className="text-xs text-ink-body">
          ลำดับ {String(row.sort_order ?? "")}
        </p>
      </Link>
      <button
        type="button"
        onClick={onToggleHidden}
        aria-label={hidden ? "แสดงบนเว็บ" : "ซ่อนจากเว็บ"}
        title={hidden ? "แสดงบนเว็บ" : "ซ่อนจากเว็บ"}
        className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-line text-ink-body shadow-xs transition-colors hover:bg-surface-2"
      >
        {hidden ? <FiEyeOff size={14} aria-hidden /> : <FiEye size={14} aria-hidden />}
      </button>
      <Link
        href={href}
        className="flex h-8 items-center rounded-md border border-line px-3 text-xs font-medium text-ink shadow-xs transition-colors hover:bg-surface-2"
      >
        แก้ไข
      </Link>
      <button
        type="button"
        onClick={onDelete}
        aria-label="ลบ"
        className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-line text-ink-body shadow-xs transition-colors hover:border-red-300 hover:bg-red-500/10 hover:text-red-500"
      >
        <FiTrash2 size={14} aria-hidden />
      </button>
    </li>
  );
}

export default function AdminSection() {
  const { section } = useParams<{ section: string }>();
  const config = sections[section];
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const load = useCallback(async () => {
    if (!config) return;
    const { data } = await supabase
      .from(config.table)
      .select("*")
      .order("sort_order", { ascending: true });
    setRows((data as Row[]) ?? []);
  }, [config]);

  useEffect(() => {
    load();
  }, [load]);

  if (!config) notFound();

  async function applyOrder(next: Row[]) {
    next.forEach((r, i) => (r.sort_order = i));
    setRows(next);
    setStatus("กำลังบันทึกลำดับ…");
    const results = await Promise.all(
      next.map((r, i) =>
        supabase
          .from(config.table)
          .update({ sort_order: i })
          .eq("id", r.id as string),
      ),
    );
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      setStatus(`บันทึกลำดับไม่สำเร็จ: ${failed.error.message}`);
      load();
    } else {
      setStatus("บันทึกลำดับแล้ว ✓ หน้าเว็บอัปเดตภายใน 1 นาที");
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = rows.findIndex((r) => r.id === active.id);
    const to = rows.findIndex((r) => r.id === over.id);
    applyOrder(arrayMove(rows, from, to));
  }

  async function toggleHidden(row: Row) {
    const next = !(row.hidden === true);
    setRows((rs) =>
      rs.map((r) => (r.id === row.id ? { ...r, hidden: next } : r)),
    );
    const { error } = await supabase
      .from(config.table)
      .update({ hidden: next })
      .eq("id", row.id as string);
    if (error) {
      setStatus(`เปลี่ยนสถานะไม่สำเร็จ: ${error.message}`);
      load();
    } else {
      setStatus(
        next ? "ซ่อนแล้ว ✓ หายจากเว็บภายใน 1 นาที" : "แสดงแล้ว ✓ กลับมาภายใน 1 นาที",
      );
    }
  }

  async function remove(row: Row) {
    setPendingDelete(null);
    const { error } = await supabase
      .from(config.table)
      .delete()
      .eq("id", row.id as string);
    if (error) setStatus(`ลบไม่สำเร็จ: ${error.message}`);
    else {
      setStatus("ลบแล้ว");
      load();
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">{config.title}</h1>
          <p className="mt-1 text-sm text-ink-body">{config.note}</p>
        </div>
        <Link
          href={`/admin/${section}/new`}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-brand px-4 text-sm font-medium text-on-brand shadow-xs transition-opacity hover:opacity-90"
        >
          <FiPlus size={15} aria-hidden />
          เพิ่มรายการ
        </Link>
      </div>

      {status && <p className="mt-4 text-sm text-accent">{status}</p>}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={rows.map((r) => r.id as string)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-xs">
            {rows.map((row) => (
              <SortableRow
                key={row.id}
                row={row}
                imageKey={config.imageKey}
                labelKey={config.labelKey}
                href={`/admin/${section}/${row.id}`}
                onDelete={() => setPendingDelete(row)}
                onToggleHidden={() => toggleHidden(row)}
              />
            ))}
            {!rows.length && (
              <li className="p-6 text-center text-sm text-ink-body">
                ยังไม่มีรายการ — กด “เพิ่มรายการ” เพื่อเริ่ม
              </li>
            )}
          </ul>
        </SortableContext>
      </DndContext>

      <ConfirmDialog
        open={!!pendingDelete}
        title="ลบรายการนี้?"
        detail={`"${(pendingDelete?.[config.labelKey] as string) || "รายการนี้"}" จะถูกลบถาวรและหายจากหน้าเว็บภายใน 1 นาที`}
        onConfirm={() => pendingDelete && remove(pendingDelete)}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
