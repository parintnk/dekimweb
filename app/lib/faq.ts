// ponytail: pull Q&A pairs out of rendered HTML for FAQPage schema — articles and services store
// one HTML body (or blocks → HTML), no separate faq column. Looks for an <h2> containing
// "คำถามที่พบบ่อย" (or FAQ), then reads <h3>question</h3> + following prose until the next <h3>/<h2>.
export function extractFaqs(html: string): { q: string; a: string }[] {
  const txt = (s: string) =>
    s
      .replace(/<[^>]*>/g, "")
      .replace(/&ldquo;|&rdquo;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  const start = html.search(/<h2[^>]*>[^<]*(?:คำถามที่พบบ่อย|FAQ)/i);
  if (start === -1) return [];
  const afterHeading = html
    .slice(start)
    .replace(/^<h2[^>]*>[\s\S]*?<\/h2>/, "");
  const nextH2 = afterHeading.search(/<h2[^>]*>/);
  const block = nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2);
  const faqs: { q: string; a: string }[] = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block))) {
    const q = txt(m[1]);
    const a = txt(m[2]);
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
}
