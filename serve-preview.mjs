// Local preview of index.html at http://localhost:5178 (run: node serve-preview.mjs).
import { createServer } from "http";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const here = dirname(fileURLToPath(import.meta.url));
createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(readFileSync(join(here, "index.html")));
}).listen(5178, () => console.log("preview on http://localhost:5178"));
