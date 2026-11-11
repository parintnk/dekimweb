// ponytail: regex HTML→Markdown for our own editor output only (TipTap / blocksToHtml: h1-6, p, ul/ol/li,
// strong/em/s/u, a, img, table, br, blockquote, hr). Not a general HTML parser — swap for turndown if
// body_html ever starts carrying arbitrary pasted markup. Self-check: node app/lib/html-to-md.check.mjs

const ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  middot: "·",
  bull: "•",
  times: "×",
};

// one pass, so "&amp;lt;" correctly becomes "&lt;", not "<"
const decode = (s: string) =>
  s.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
    e[0] === "#"
      ? String.fromCodePoint(
          e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1)),
        )
      : (ENTITIES[e.toLowerCase()] ?? m),
  );

const strip = (s: string) => s.replace(/<[^>]*>/g, "");
const oneLine = (s: string) => strip(s).replace(/\s+/g, " ").trim();
const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1] ?? "";

// "<p>a</p><p>b</p>" → "a\nb"; keeps the indent of already-converted nested list lines
const blockText = (s: string) =>
  strip(s.replace(/<\/?(p|div)\b[^>]*>/gi, "\n"))
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim())
    .join("\n");

// keep surrounding spaces outside the markers — "** bold**" doesn't render
const wrap = (t: string, m: string) =>
  oneLine(t) ? t.replace(/^(\s*)([\s\S]*?)(\s*)$/, `$1${m}$2${m}$3`) : t;

function list(kind: string, body: string) {
  let n = 0;
  const items = [...body.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(
    ([, li]) => {
      const marker = kind.toLowerCase() === "ol" ? `${++n}.` : "-";
      const pad = "\n" + " ".repeat(marker.length + 1);
      return `${marker} ${blockText(li).split("\n").join(pad)}`;
    },
  );
  return `\n\n${items.join("\n")}\n\n`;
}

function table(body: string) {
  const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map(([, tr]) =>
    [...tr.matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(([, cell]) =>
      oneLine(cell.replace(/<\/p>/gi, " ")).replace(/\|/g, "\\|"),
    ),
  );
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const line = (r: string[]) =>
    `| ${Array.from({ length: width }, (_, i) => r[i] ?? "").join(" | ")} |`;
  return `\n\n${[line(rows[0]), line(Array(width).fill("---")), ...rows.slice(1).map(line)].join("\n")}\n\n`;
}

// innermost list first, so a nested <ul> is already text when its parent <li> is read
const INNER_LIST = /<(ul|ol)\b[^>]*>((?:(?!<(?:ul|ol)\b)[\s\S])*?)<\/\1>/gi;

export function htmlToMd(html: string, origin = ""): string {
  const abs = (u: string) => (/^\/(?!\/)/.test(u) ? origin + u : u);
  let md = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<img\b[^>]*>/gi, (t) => {
      const src = attr(t, "src");
      return src ? `![${attr(t, "alt")}](${abs(src)})` : "";
    })
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, a: string, text: string) => {
      const href = attr(a, "href");
      const t = oneLine(text);
      return href && t && !href.startsWith("#") ? `[${t}](${abs(href)})` : t;
    })
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t: string) => wrap(t, "**"))
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t: string) => wrap(t, "*"))
    .replace(/<(s|del|strike)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t: string) => wrap(t, "~~"))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_, t: string) => table(t));

  for (let prev = ""; prev !== md; ) {
    prev = md;
    md = md.replace(INNER_LIST, (_, kind: string, body: string) => list(kind, body));
  }

  md = md
    .replace(
      /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, n: string, t: string) =>
        `\n\n${"#".repeat(Number(n))} ${oneLine(t).replace(/\*\*/g, "")}\n\n`,
    )
    .replace(
      /<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi,
      (_, t: string) =>
        `\n\n${blockText(t)
          .split("\n")
          .map((l) => `> ${l}`)
          .join("\n")}\n\n`,
    )
    .replace(/<hr\b[^>]*>/gi, "\n\n---\n\n")
    .replace(/<\/?(p|div|section|article)\b[^>]*>/gi, "\n\n");

  return decode(strip(md))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
