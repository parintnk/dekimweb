// ponytail: the one check for the regex converter — run `node app/lib/html-to-md.check.mjs`
// (Node 23+ strips the .ts types natively). Plain .mjs so tsc/next build never see the .ts import.
import assert from "node:assert/strict";
import { htmlToMd } from "./html-to-md.ts";

const o = "https://drkimcnx.com";

assert.equal(
  htmlToMd(
    '<h2>Botox คืออะไร?</h2><p>ฉีดโดย<strong>แพทย์ </strong>&amp; <a href="/services/botox">ดูราคา</a></p>',
    o,
  ),
  "## Botox คืออะไร?\n\nฉีดโดย**แพทย์** & [ดูราคา](https://drkimcnx.com/services/botox)",
);
assert.equal(
  htmlToMd("<ul><li><p>หน้าผาก</p><ul><li><p>ร่องลึก</p></li></ul></li><li><p>กราม</p></li></ul>"),
  "- หน้าผาก\n  - ร่องลึก\n- กราม",
);
assert.equal(htmlToMd("<ol><li>ทักไลน์</li><li>พบแพทย์</li></ol>"), "1. ทักไลน์\n2. พบแพทย์");
assert.equal(
  htmlToMd(
    "<table><tbody><tr><th><p>ยี่ห้อ</p></th><th><p>ราคา</p></th></tr><tr><td><p>Aestox</p></td><td><p>3,590</p></td></tr></tbody></table>",
  ),
  "| ยี่ห้อ | ราคา |\n| --- | --- |\n| Aestox | 3,590 |",
);
assert.equal(
  htmlToMd('<p><img src="/blog/a.jpg" alt="ก่อน-หลัง"></p><blockquote><p>คำคม</p></blockquote>', o),
  "![ก่อน-หลัง](https://drkimcnx.com/blog/a.jpg)\n\n> คำคม",
);
assert.equal(htmlToMd("<p>&amp;lt;tag&amp;gt; &#3585; &ldquo;x&rdquo;</p>"), "&lt;tag&gt; ก “x”");

console.log("html-to-md ok");
