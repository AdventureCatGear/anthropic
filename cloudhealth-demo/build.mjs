// Builds index.html: a single self-contained file with the screenshots embedded,
// so it can be emailed, copied to another computer, or hosted anywhere.
//   node build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
let html = readFileSync(join(dir, "demo.template.html"), "utf8");

html = html.replace(/src: "(screens\/[^"]+\.png)"/g, (_, rel) => {
  const b64 = readFileSync(join(dir, rel)).toString("base64");
  return `src: "data:image/png;base64,${b64}"`;
});

writeFileSync(join(dir, "index.html"), html);
console.log(`index.html written (${(html.length / 1024).toFixed(0)} KB)`);
