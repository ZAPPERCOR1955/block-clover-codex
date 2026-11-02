// Builds wiki.html from the numbered Markdown pages in this folder.
// Usage: node build.js      (needs `npm install marked@12.0.2` once)
// Pages are rendered here at build time, so the published file needs no scripts from a CDN.
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const dir = __dirname;
const VERSION = "Mod 1.8.1 · NeoForge 1.21.1";
const GROUPS = [
  ["Start here", ["getting-started", "anti-magic-route"]],
  ["Progression", ["leveling-and-points", "stats-and-masteries", "mana-and-anti-magic", "skill-trees", "spell-levels-and-discovery", "transformations", "bonds-and-liebe"]],
  ["Catalogue", ["magics-and-spells", "races-and-classes", "items", "quests"]],
  ["The Kingdom", ["missions-and-economy", "world-and-npcs"]],
  ["Appendix", ["admin-reference", "changelog"]],
];

function slug(t) { return t.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function escapeHtml(s) { return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

const renderer = {
  heading(text, level) { return "<h" + level + " id=\"" + slug(text) + "\">" + text + "</h" + level + ">\n"; },
  table(header, body) { return "<div class=\"table-wrap\"><table><thead>" + header + "</thead><tbody>" + body + "</tbody></table></div>\n"; },
  link(href, title, text) {
    const m = href.match(/^(\d\d-)?([a-z0-9-]+)\.md(#.*)?$/);
    if (m) href = "#" + m[2] + (m[3] ? "--" + m[3].slice(1) : "");
    const ext = /^https?:/.test(href) ? " target=\"_blank\" rel=\"noopener\"" : "";
    return "<a href=\"" + href + "\"" + ext + ">" + text + "</a>";
  },
};
marked.use({ renderer, gfm: true });

const files = fs.readdirSync(dir).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
const pages = files.map(f => {
  const md = fs.readFileSync(path.join(dir, f), "utf8");
  const title = (md.match(/^#\s+(.+)$/m) || [, f])[1].trim();
  const id = f.replace(/^\d\d-/, "").replace(/\.md$/, "");
  const num = f.slice(0, 2);
  let html = marked.parse(md);
  html = html.replace(/<p><em>Sources:/g, "<p class=\"sources\"><em>Sources:");
  html = html.replace(/<p><em>Block Clover /, "<p class=\"note\"><em>Block Clover ");
  html = html.replace(/^<h1/, "<p class=\"eyebrow\">Chapter " + num + "</p><h1");
  const heads = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map(m => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") }));
  if (heads.length >= 4) {
    const toc = "<nav class=\"toc\" aria-label=\"On this page\"><p class=\"toc-title\">On this page</p><ol>" +
      heads.map(h => "<li><a href=\"#" + id + "--" + h.id + "\">" + h.text + "</a></li>").join("") + "</ol></nav>";
    const noteAt = html.indexOf("<p class=\"note\">");
    if (noteAt >= 0) { const end = html.indexOf("</p>", noteAt) + 4; html = html.slice(0, end) + toc + html.slice(end); }
    else html = html.replace(/<\/h1>/, "</h1>" + toc);
  }
  // Search text: markdown lines without raw HTML blocks.
  const text = md.split(/\r?\n/).filter(l => !/^\s*</.test(l)).join("\n");
  return { id, title, num, text, html };
});

const byId = Object.fromEntries(pages.map(p => [p.id, p]));
const grouped = new Set(GROUPS.flatMap(g => g[1]));
const extra = pages.filter(p => !grouped.has(p.id)).map(p => p.id);
const groups = extra.length ? [...GROUPS, ["More", extra]] : GROUPS;

const navHtml = groups.map(([name, ids]) => {
  const items = ids.filter(id => byId[id]).map(id => {
    const p = byId[id];
    return "<li><a href=\"#" + p.id + "\" data-id=\"" + p.id + "\"><span class=\"n\">" + p.num + "</span><span>" + escapeHtml(p.title) + "</span></a></li>";
  }).join("");
  return "<div class=\"group\">" + name + "</div><ul class=\"pages\">" + items + "</ul>";
}).join("\n");

const order = groups.flatMap(g => g[1]).filter(id => byId[id]);
const data = JSON.stringify(order.map(id => byId[id])).replace(/<\/script/gi, "<\\/script");

const clover = "<svg class=\"clover\" viewBox=\"-24 -24 48 54\" aria-hidden=\"true\"><g fill=\"var(--leaf)\" stroke=\"var(--gold)\" stroke-width=\"1.2\" stroke-linejoin=\"round\"><path d=\"M0 -2 C-4 -15 -19 -14 -14 -4 C-19 6 -4 9 0 -2Z\" transform=\"rotate(45)\"/><path d=\"M0 -2 C-4 -15 -19 -14 -14 -4 C-19 6 -4 9 0 -2Z\" transform=\"rotate(135)\"/><path d=\"M0 -2 C-4 -15 -19 -14 -14 -4 C-19 6 -4 9 0 -2Z\" transform=\"rotate(225)\"/><path d=\"M0 -2 C-4 -15 -19 -14 -14 -4 C-19 6 -4 9 0 -2Z\" transform=\"rotate(315)\"/></g><path d=\"M0 2 C2 10 -2 18 1 28\" fill=\"none\" stroke=\"var(--gold)\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>";

const css = fs.readFileSync(path.join(dir, "codex.css"), "utf8");
const js = fs.readFileSync(path.join(dir, "codex.js"), "utf8").replace("__PAGES__", data);

const html = `<title>Block Clover Codex</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Spectral:ital,wght@0,400;0,600;1,400&family=Atkinson+Hyperlegible:wght@400;700&display=swap">
<style>
${css}
</style>
<div class="shell">
  <nav class="spine" id="spine" aria-label="Chapters">
    <div class="brand">${clover}<p class="brand-name">Block Clover Codex<small>${VERSION}</small></p></div>
    <input class="search" id="q" type="search" placeholder="Search the codex" aria-label="Search the codex" autocomplete="off">
    <button class="chapters-toggle" id="chapters-toggle" type="button" aria-expanded="false" aria-controls="groups">Chapters <span id="chapters-current"></span></button>
    <div class="groups" id="groups">
${navHtml}
    </div>
    <p class="spine-foot">Every number on these pages was read from the mod's own code. The mod updates often; when it does, the numbers move.</p>
  </nav>
  <main><article id="content"></article></main>
</div>
<script>
${js}
</script>
`;
fs.writeFileSync(path.join(dir, "wiki.html"), html);
console.log("wrote wiki.html with " + pages.length + " pages (" + (html.length / 1024).toFixed(0) + " KB)");

// Standalone copy for ordinary static hosts (GitHub Pages, Cloudflare Pages, Netlify, Neocities...).
// wiki.html is a fragment for the artifact viewer, which adds the document skeleton itself; index.html carries its own.
const split = html.indexOf("<div class=\"shell\">");
const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Mechanics reference for the Block Clover Minecraft mod, read from the mod's code.">
<style>html { color-scheme: light dark; } body { margin: 0; } img { max-width: 100%; } [hidden] { display: none !important; }</style>
${html.slice(0, split).replace(/<meta name="claude:viewport-fit-sides"[^>]*>\n?/, "")}</head>
<body>
${html.slice(split)}</body>
</html>
`;
fs.writeFileSync(path.join(dir, "index.html"), standalone);
console.log("wrote index.html (standalone, " + (standalone.length / 1024).toFixed(0) + " KB)");
