"use client";

import Heading from "@tiptap/extension-heading";
import ImageExtension from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { CharacterCount, Placeholder, TrailingNode } from "@tiptap/extensions";
import {
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
  useEditorState,
  type NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCircle,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuImagePlus,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuRedo2,
  LuRemoveFormatting,
  LuSquare,
  LuStrikethrough,
  LuTable,
  LuUnderline,
  LuUndo2,
  LuUnlink,
} from "react-icons/lu";
import { uploadImage } from "./upload";

// headings only from the toolbar — no shortcuts / "## " rules (Thai IME was tripping them)
const QuietHeading = Heading.extend({
  addKeyboardShortcuts() {
    return {};
  },
  addInputRules() {
    return [];
  },
  addPasteRules() {
    return [];
  },
});

// ---- resizable / floatable image node view (ported from gography.net's editor) ----
function ResizableImage({ node, updateAttributes, selected }: NodeViewProps) {
  const [resizingWidth, setResizingWidth] = useState<string | null>(null);
  const currentWidth = resizingWidth || node.attrs.width || "100%";
  const currentFloat = node.attrs.float || "none";
  const currentRadius = node.attrs.borderRadius || "0.75rem";

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidthVal =
        parseInt(String(currentWidth).replace("%", "").replace("px", "")) ||
        100;
      let dragWidth = startWidthVal;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const diff = moveEvent.clientX - startX;
        let newWidth = startWidthVal + (diff / 800) * 100;
        newWidth = Math.max(10, Math.min(100, newWidth));
        dragWidth = newWidth;
        setResizingWidth(`${Math.round(newWidth)}%`);
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        setResizingWidth(null);
        updateAttributes({ width: `${Math.round(dragWidth)}%` });
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [currentWidth, updateAttributes],
  );

  function setFloat(
    e: React.MouseEvent,
    floatValue: "left" | "right" | "none",
  ) {
    e.preventDefault();
    e.stopPropagation();
    let newWidth = currentWidth;
    if (floatValue !== "none" && currentWidth === "100%") newWidth = "50%";
    updateAttributes({ float: floatValue, width: newWidth });
  }

  function cycleRadius(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const order = ["0px", "0.75rem", "1.5rem", "9999px"];
    const next = order[(order.indexOf(currentRadius) + 1) % order.length];
    updateAttributes({ borderRadius: next });
  }

  let floatClasses = "block mx-auto my-3";
  if (currentFloat === "left") floatClasses = "float-left mr-4 mb-2";
  if (currentFloat === "right") floatClasses = "float-right ml-4 mb-2";

  const bubbleBtn = (active: boolean) =>
    `flex size-8 cursor-pointer items-center justify-center transition-colors ${
      active ? "bg-gold/20 text-accent" : "text-ink-body hover:bg-surface-2"
    }`;

  return (
    <NodeViewWrapper
      as="span"
      className={`relative transition-all ${floatClasses}`}
      style={{
        width: currentWidth,
        display: currentFloat === "none" ? "block" : "inline-block",
        clear: currentFloat === "none" ? "both" : "none",
      }}
    >
      <div
        className={`group relative ${selected ? "ring-2 ring-gold" : ""}`}
        style={{ borderRadius: currentRadius }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- editor preview */}
        <img
          src={node.attrs.src}
          alt={node.attrs.alt ?? ""}
          className="w-full transition-all"
          style={{ borderRadius: currentRadius }}
        />

        {selected && (
          <span
            className="absolute -top-11 left-1/2 z-50 flex -translate-x-1/2 overflow-hidden rounded-md border border-line bg-surface shadow-lg"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              title="ชิดซ้าย ข้อความล้อมขวา"
              className={bubbleBtn(currentFloat === "left")}
              onClick={(e) => setFloat(e, "left")}
            >
              <LuAlignLeft size={14} aria-hidden />
            </button>
            <button
              type="button"
              title="เต็มความกว้าง / กึ่งกลาง"
              className={bubbleBtn(currentFloat === "none")}
              onClick={(e) => setFloat(e, "none")}
            >
              <LuAlignJustify size={14} aria-hidden />
            </button>
            <button
              type="button"
              title="ชิดขวา ข้อความล้อมซ้าย"
              className={bubbleBtn(currentFloat === "right")}
              onClick={(e) => setFloat(e, "right")}
            >
              <LuAlignRight size={14} aria-hidden />
            </button>
            <span className="mx-0.5 my-2 w-px bg-line" aria-hidden />
            <button
              type="button"
              title="สลับมุมโค้ง"
              className={bubbleBtn(false)}
              onClick={cycleRadius}
            >
              {currentRadius === "0px" ? (
                <LuSquare size={14} aria-hidden />
              ) : currentRadius === "9999px" ? (
                <LuCircle size={14} aria-hidden />
              ) : (
                <span className="size-3.5 rounded-md border-2 border-current" />
              )}
            </button>
          </span>
        )}

        {/* drag right edge to resize */}
        <span
          className="absolute bottom-0 right-0 top-0 z-10 flex w-4 cursor-col-resize items-center justify-center opacity-0 group-hover:opacity-100"
          onMouseDown={onResizeStart}
        >
          <span className="h-8 w-1.5 rounded-full border border-line bg-surface shadow-md" />
        </span>
      </div>
    </NodeViewWrapper>
  );
}

const CustomImage = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (element) =>
          element.style.width || element.getAttribute("width") || "100%",
        renderHTML: (attributes) => ({
          style: `width: ${attributes.width}; height: auto;`,
        }),
      },
      float: {
        default: "none",
        parseHTML: (element) =>
          element.style.float || element.getAttribute("data-float") || "none",
        renderHTML: (attributes) => {
          const floatStyle =
            attributes.float === "left"
              ? "float: left; margin-right: 1em;"
              : attributes.float === "right"
                ? "float: right; margin-left: 1em;"
                : "";
          return { "data-float": attributes.float, style: floatStyle };
        },
      },
      borderRadius: {
        default: "0.75rem",
        parseHTML: (element) => element.style.borderRadius || "0.75rem",
        renderHTML: (attributes) => ({
          style: `border-radius: ${attributes.borderRadius};`,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImage, { as: "span" });
  },
});

function ToolButton({
  active,
  disabled,
  label,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex size-9 cursor-pointer items-center justify-center rounded-md transition-colors ${
        active ? "bg-brand text-on-brand" : "text-ink hover:bg-surface-2"
      } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return (
    <span className="mx-1 h-5 w-px shrink-0 self-center bg-line" aria-hidden />
  );
}

export default function RichEditor({
  content,
  onChange,
  folder,
  placeholder,
}: {
  content: string;
  onChange: (html: string) => void;
  folder: string;
  placeholder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    enableInputRules: false,
    enablePasteRules: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        link: { openOnClick: false },
      }),
      QuietHeading.configure({ levels: [2, 3, 4] }),
      // block-level: a loose <img> parses as its own block (inline mode wrapped it into headings)
      CustomImage.configure({ inline: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TableKit.configure({ table: { resizable: true } }),
      CharacterCount,
      Placeholder.configure({
        placeholder: placeholder ?? "เริ่มพิมพ์เนื้อหาที่นี่…",
      }),
      TrailingNode,
    ],
    content,
    editorProps: {
      attributes: { class: "tiptap" },
      // paste an image from the clipboard -> uploads to storage automatically
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items ?? []).filter(
          (item) => item.type.startsWith("image"),
        );
        if (!items.length) return false;
        event.preventDefault();
        for (const item of items) {
          const file = item.getAsFile();
          if (!file) continue;
          uploadImage(file, folder)
            .then((url) => {
              const node = view.state.schema.nodes.image.create({ src: url });
              view.dispatch(view.state.tr.replaceSelectionWith(node));
            })
            .catch(() => alert("อัปโหลดรูปไม่สำเร็จ — ตรวจสอบสิทธิ์ admin"));
        }
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // v3: components do NOT re-render on selection changes — this subscription is what
  // keeps the toolbar's active states honest as the cursor moves (the bug behind
  // "ปุ่ม H2 ติดค้างเอง" was reading isActive() from a stale render)
  // v3: components do NOT re-render on selection changes — this subscription keeps the
  // toolbar's active states and the "กำลังพิมพ์" pill honest as the cursor moves
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e
        ? {
            h2: e.isActive("heading", { level: 2 }),
            h3: e.isActive("heading", { level: 3 }),
            h4: e.isActive("heading", { level: 4 }),
            bold: e.isActive("bold"),
            italic: e.isActive("italic"),
            underline: e.isActive("underline"),
            strike: e.isActive("strike"),
            bulletList: e.isActive("bulletList"),
            orderedList: e.isActive("orderedList"),
            alignLeft: e.isActive({ textAlign: "left" }),
            alignCenter: e.isActive({ textAlign: "center" }),
            alignRight: e.isActive({ textAlign: "right" }),
            link: e.isActive("link"),
            table: e.isActive("table"),
            canUndo: e.can().undo(),
            canRedo: e.can().redo(),
            chars: e.storage.characterCount.characters() as number,
          }
        : null,
  });

  // keep in sync if the parent swaps content (no-op while typing — we emitted that HTML)
  useEffect(() => {
    if (!editor) return;
    // emitUpdate false — this programmatic sync must not count as a user edit
    // (it was marking freshly-opened legacy records as dirty)
    if (content !== editor.getHTML())
      editor.commands.setContent(content, { emitUpdate: false });
  }, [content, editor]);

  if (!editor) return null;

  const chain = () => editor.chain().focus();

  async function insertImage(file: File) {
    try {
      const url = await uploadImage(file, folder);
      chain()
        .insertContent({ type: "image", attrs: { src: url } })
        .run();
    } catch {
      alert("อัปโหลดรูปไม่สำเร็จ — ตรวจสอบสิทธิ์ admin");
    }
  }

  function setLink() {
    const prev = editor?.getAttributes("link").href as string | undefined;
    const url = window.prompt("ใส่ลิงก์ (URL)", prev ?? "https://");
    if (url === null) return;
    if (!url || url === "https://") chain().unsetLink().run();
    else chain().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-surface-2/80 p-1.5">
        <ToolButton
          label="หัวข้อใหญ่ (H2)"
          active={state?.h2}
          onClick={() => chain().toggleHeading({ level: 2 }).run()}
        >
          <LuHeading2 size={16} aria-hidden />
        </ToolButton>
        <ToolButton
          label="หัวข้อรอง (H3)"
          active={state?.h3}
          onClick={() => chain().toggleHeading({ level: 3 }).run()}
        >
          <LuHeading3 size={16} aria-hidden />
        </ToolButton>
        <ToolButton
          label="หัวข้อย่อย (H4)"
          active={state?.h4}
          onClick={() => chain().toggleHeading({ level: 4 }).run()}
        >
          <LuHeading4 size={16} aria-hidden />
        </ToolButton>
        <Divider />
        <ToolButton
          label="ตัวหนา (Ctrl+B)"
          active={state?.bold}
          onClick={() => chain().toggleBold().run()}
        >
          <LuBold size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ตัวเอียง (Ctrl+I)"
          active={state?.italic}
          onClick={() => chain().toggleItalic().run()}
        >
          <LuItalic size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ขีดเส้นใต้ (Ctrl+U)"
          active={state?.underline}
          onClick={() => chain().toggleUnderline().run()}
        >
          <LuUnderline size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ขีดฆ่า"
          active={state?.strike}
          onClick={() => chain().toggleStrike().run()}
        >
          <LuStrikethrough size={15} aria-hidden />
        </ToolButton>
        <Divider />
        <ToolButton
          label="รายการแบบจุด"
          active={state?.bulletList}
          onClick={() => chain().toggleBulletList().run()}
        >
          <LuList size={16} aria-hidden />
        </ToolButton>
        <ToolButton
          label="รายการแบบตัวเลข"
          active={state?.orderedList}
          onClick={() => chain().toggleOrderedList().run()}
        >
          <LuListOrdered size={16} aria-hidden />
        </ToolButton>
        <Divider />
        <ToolButton
          label="ชิดซ้าย"
          active={state?.alignLeft}
          onClick={() => chain().setTextAlign("left").run()}
        >
          <LuAlignLeft size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="กึ่งกลาง"
          active={state?.alignCenter}
          onClick={() => chain().setTextAlign("center").run()}
        >
          <LuAlignCenter size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ชิดขวา"
          active={state?.alignRight}
          onClick={() => chain().setTextAlign("right").run()}
        >
          <LuAlignRight size={15} aria-hidden />
        </ToolButton>
        <Divider />
        <ToolButton label="ใส่ลิงก์" active={state?.link} onClick={setLink}>
          <LuLink size={14} aria-hidden />
        </ToolButton>
        <ToolButton
          label="เอาลิงก์ออก"
          onClick={() => chain().unsetLink().run()}
        >
          <LuUnlink size={14} aria-hidden />
        </ToolButton>
        <ToolButton label="แทรกรูป" onClick={() => fileRef.current?.click()}>
          <LuImagePlus size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="แทรกตาราง"
          active={state?.table}
          onClick={() =>
            chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <LuTable size={15} aria-hidden />
        </ToolButton>
        <Divider />
        <ToolButton
          label="ล้างรูปแบบ"
          onClick={() => chain().unsetAllMarks().setParagraph().run()}
        >
          <LuRemoveFormatting size={14} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ย้อนกลับ (Ctrl+Z)"
          disabled={!state?.canUndo}
          onClick={() => chain().undo().run()}
        >
          <LuUndo2 size={15} aria-hidden />
        </ToolButton>
        <ToolButton
          label="ทำซ้ำ"
          disabled={!state?.canRedo}
          onClick={() => chain().redo().run()}
        >
          <LuRedo2 size={15} aria-hidden />
        </ToolButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) insertImage(file);
            e.target.value = "";
          }}
        />
        {/* live indicator — always shows what block the cursor is in */}
        <span
          className={`ml-auto hidden shrink-0 rounded-md px-2.5 py-1 text-[0.7rem] font-semibold sm:inline-block ${
            state?.h2 || state?.h3 || state?.h4
              ? "bg-gold/20 text-accent"
              : "bg-surface text-ink-body"
          }`}
        >
          กำลังพิมพ์:{" "}
          {state?.h2
            ? "หัวข้อใหญ่ H2"
            : state?.h3
              ? "หัวข้อรอง H3"
              : state?.h4
                ? "หัวข้อย่อย H4"
                : state?.bulletList
                  ? "รายการแบบจุด"
                  : state?.orderedList
                    ? "รายการตัวเลข"
                    : state?.table
                      ? "ตาราง"
                      : "ย่อหน้าปกติ"}
        </span>
      </div>

      {state?.table && (
        <div className="flex flex-wrap gap-1 border-b border-line bg-surface-2/50 px-2 py-1.5 text-xs">
          {(
            [
              ["เพิ่มแถว", () => chain().addRowAfter().run()],
              ["เพิ่มคอลัมน์", () => chain().addColumnAfter().run()],
              ["ลบแถว", () => chain().deleteRow().run()],
              ["ลบคอลัมน์", () => chain().deleteColumn().run()],
              ["ลบตาราง", () => chain().deleteTable().run()],
            ] as const
          ).map(([label, run]) => (
            <button
              key={label}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={run}
              className="cursor-pointer rounded-md border border-line bg-surface px-2.5 py-1 font-medium text-ink transition-colors hover:bg-surface-2"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* content scrolls inside the box (editor-app style) so the toolbar never leaves;
          clicking the blank padding under the text lands in the trailing paragraph */}
      <div className="max-h-[65vh] overflow-y-auto overscroll-contain">
        <EditorContent
          editor={editor}
          className="px-4 py-3"
          onClick={(e) => {
            if (e.target === e.currentTarget) editor?.commands.focus("end");
          }}
        />
      </div>

      <p className="flex items-center justify-between border-t border-line bg-surface-2/40 px-4 py-2 text-xs text-ink-body">
        <span>
          คีย์ลัด: Ctrl+B หนา · Ctrl+I เอียง · Ctrl+U ขีดเส้นใต้ · วางรูปจาก
          clipboard ได้เลย
        </span>
        <span className="tabular-nums">{state?.chars ?? 0} ตัวอักษร</span>
      </p>
    </div>
  );
}
