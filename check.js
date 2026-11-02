// Sanity checks on the built wiki.html: every hash link points at a page, every page--anchor exists, the script parses.
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "wiki.html"), "utf8");
const scriptStart = html.lastIndexOf("<script>") + 8, scriptEnd = html.lastIndexOf("</script>");
const js = html.slice(scriptStart, scriptEnd);
try { new Function(js); console.log("script parses"); } catch (e) { console.log("SCRIPT ERROR", e.message); process.exitCode = 1; }
const m = js.match(/const PAGES = (\[[\s\S]*?\]);\nconst byId/);
const pages = JSON.parse(m[1].replace(/<\\\/script/g, "</script"));
const ids = new Set(pages.map(p => p.id));
let bad = 0, total = 0;
for (const p of pages) {
  const anchors = new Set([...p.html.matchAll(/ id="([^"]+)"/g)].map(x => x[1]));
  for (const [, href] of p.html.matchAll(/href="#([^"]+)"/g)) {
    total++;
    const [pid, anchor] = href.split("--");
    if (!ids.has(pid)) { console.log("missing page:", p.id, "->", href); bad++; continue; }
    if (anchor) {
      const target = pages.find(x => x.id === pid);
      if (!target.html.includes(' id="' + anchor + '"')) { console.log("missing anchor:", p.id, "->", href); bad++; }
    }
  }
  void anchors;
}
console.log(pages.length + " pages, " + total + " hash links, " + bad + " broken");
for (const p of pages) {
  const blanks = [...p.html.matchAll(/<td><\/td>/g)].length;
  if (blanks) console.log("blank cells on", p.id + ":", blanks);
}
