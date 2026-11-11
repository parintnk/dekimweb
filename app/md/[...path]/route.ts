import { htmlUrl, MD_FOOTER, pageMarkdown } from "../../lib/llms";

// Markdown twin of each page (llmstxt.org: "/about" → "/about.md", "/" → "/index.md").
// Reached through the `/:path*.md` rewrite in next.config.ts, not linked directly.
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const path = (await params).path
    .map((p) => {
      try {
        return decodeURIComponent(p);
      } catch {
        return p;
      }
    })
    .join("/");
  const md = await pageMarkdown(path);
  if (!md)
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  const page = path.replace(/(^|\/)index$/, "");
  return new Response(md + MD_FOOTER, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // the HTML page stays the one search engines index
      Link: `<${htmlUrl(page && `/${page}`)}>; rel="canonical", </llms.txt>; rel="describedby"`,
    },
  });
}
