import type { Block } from "../blog/articles";

// ponytail: one-way legacy bridge — old records store Block[]; the editor now works in
// HTML (body_html). This converts blocks to HTML the first time a record is opened.

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (t: string) => escapeHtml(t).replace(/"/g, "&quot;");

export function blocksToHtml(blocks: Block[]): string {
  const html = blocks
    .map((b) => {
      const parts: string[] = [];
      if (b.h) parts.push(`<h2>${b.h}</h2>`);
      if (b.h3) parts.push(`<h3>${b.h3}</h3>`);
      if (b.p) parts.push(`<p>${b.p}</p>`);
      if (b.list)
        parts.push(`<ul>${b.list.map((i) => `<li>${i}</li>`).join("")}</ul>`);
      if (b.ol)
        parts.push(`<ol>${b.ol.map((i) => `<li>${i}</li>`).join("")}</ol>`);
      if (b.img)
        parts.push(
          `<img src="${escapeAttr(b.img.src)}" alt="${escapeAttr(b.img.alt)}" width="${b.img.w}" height="${b.img.h}">`,
        );
      return parts.join("");
    })
    .join("");
  return html || "<p></p>";
}
