import { llmsTxt } from "../lib/llms";

// https://llmstxt.org — the AI-agent index of the site. Same 60s refresh as the pages.
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  return new Response(`${await llmsTxt()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
