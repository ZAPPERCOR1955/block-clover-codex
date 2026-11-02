// Serves the codex on http://127.0.0.1:8765 for the built-in browser.
// Serves index.html (the standalone build) as-is; falls back to wrapping wiki.html if index.html is missing.
const http = require("http"), fs = require("fs"), path = require("path");
const dir = __dirname;
http.createServer((req, res) => {
  const standalone = path.join(dir, "index.html");
  let html;
  if (fs.existsSync(standalone)) {
    html = fs.readFileSync(standalone, "utf8");
  } else {
    const body = fs.readFileSync(path.join(dir, "wiki.html"), "utf8");
    html = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>' + body + '</body></html>';
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}).listen(8765, "127.0.0.1", () => console.log("codex preview on http://127.0.0.1:8765"));
