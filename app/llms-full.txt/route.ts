import { llmsFullTxt } from "../lib/llms";

// every page's Markdown in one file, for agents that want the whole site in a single fetch
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  return new Response(`${await llmsFullTxt()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
