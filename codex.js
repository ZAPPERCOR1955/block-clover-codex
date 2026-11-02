const PAGES = __PAGES__;
const byId = Object.fromEntries(PAGES.map(p => [p.id, p]));
const content = document.getElementById("content");
const spine = document.getElementById("spine");
const toggle = document.getElementById("chapters-toggle");
const isMobile = () => window.matchMedia("(max-width: 860px)").matches;

function escapeHtml(s) { return s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c])); }
function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
function clamp(v, lo, hi) { v = Number(v); if (!Number.isFinite(v)) v = lo; return Math.min(hi, Math.max(lo, v)); }

function setActive(id) {
  document.querySelectorAll("#groups a").forEach(a => a.classList.toggle("active", a.dataset.id === id));
  document.getElementById("chapters-current").textContent = id && byId[id] ? "· " + byId[id].title : "";
}
function closeChapters() { spine.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
toggle.addEventListener("click", () => {
  const open = spine.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

function show(token) {
  let [id, anchor] = (token || "").split("--");
  if (!byId[id]) { id = PAGES[0].id; anchor = ""; }
  const p = byId[id];
  const i = PAGES.indexOf(p);
  const prev = PAGES[i - 1], next = PAGES[i + 1];
  content.innerHTML = p.html +
    "<div class=\"pagenav\"><span>" + (prev ? "<a href=\"#" + prev.id + "\">← " + escapeHtml(prev.title) + "</a>" : "") +
    "</span><span>" + (next ? "<a href=\"#" + next.id + "\">" + escapeHtml(next.title) + " →</a>" : "") + "</span></div>";
  initCalcs(content);
  setActive(id);
  closeChapters();
  document.title = p.title + " · Block Clover Codex";
  if (anchor) { const h = document.getElementById(anchor); if (h) { h.scrollIntoView(); return; } }
  if (isMobile()) content.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0);
}

function cleanLine(line) {
  return line.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[|*#`]/g, " ").replace(/\s+/g, " ").trim();
}
function slug(t) { return t.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function highlight(line, q) {
  const i = line.toLowerCase().indexOf(q); if (i < 0) return escapeHtml(line.slice(0, 160));
  const start = Math.max(0, i - 60), end = Math.min(line.length, i + q.length + 90);
  return (start > 0 ? "… " : "") + escapeHtml(line.slice(start, i)) + "<mark class=\"hit\">" + escapeHtml(line.slice(i, i + q.length)) + "</mark>" + escapeHtml(line.slice(i + q.length, end)) + (end < line.length ? " …" : "");
}
function search(q) {
  q = q.trim().toLowerCase();
  if (q.length < 2) { show(location.hash.slice(1)); return; }
  const hits = [];
  outer: for (const p of PAGES) {
    let heading = p.title;
    for (const line of p.text.split("\n")) {
      const h = line.match(/^#{2,3}\s+(.+)$/);
      if (h) { heading = h[1]; continue; }
      if (line.startsWith("|---") || !line.toLowerCase().includes(q)) continue;
      const clean = cleanLine(line);
      if (!clean) continue;
      hits.push({ p, heading, line: clean });
      if (hits.length >= 60) break outer;
    }
  }
  setActive("");
  closeChapters();
  document.title = "Search · Block Clover Codex";
  if (!hits.length) {
    content.innerHTML = "<p class=\"eyebrow\">Search</p><h1>No matches</h1><p class=\"empty\">Nothing in the codex contains “" + escapeHtml(q) + "”.</p>";
  } else {
    content.innerHTML = "<p class=\"eyebrow\">Search</p><h1>" + hits.length + (hits.length >= 60 ? "+" : "") + " matches</h1><ul class=\"results\">" + hits.map(h =>
      "<li><a href=\"#" + h.p.id + "--" + slug(h.heading) + "\">" + escapeHtml(h.p.title) + " › " + escapeHtml(h.heading) + "</a><small>" + highlight(h.line, q) + "</small></li>").join("") + "</ul>";
  }
  if (isMobile()) content.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0);
}

/* Calculators. Formulas mirror the pages they sit on. */
const RACES = [["Human, Peasant", 100, 1.0], ["Human, Commoner", 125, 1.1], ["Human, Noble", 175, 1.25], ["Human, Royal", 250, 1.5], ["Elf", 300, 1.75], ["Witch", 220, 1.5], ["Dwarf", 150, 1.2]];
function field(label, inner) { return "<label class=\"calc-field\"><span>" + label + "</span>" + inner + "</label>"; }
function num(name, val, min, max, step) { return "<input type=\"number\" name=\"" + name + "\" value=\"" + val + "\" min=\"" + min + "\" max=\"" + max + "\" step=\"" + (step || 1) + "\" inputmode=\"numeric\">"; }
function out(label, value) { return "<div><span>" + label + "</span><b>" + value + "</b></div>"; }
function totalXp(L) { return 100 * (L - 1) + 35 * (L - 1) * (L - 2) / 2; }
function xpToNext(L) { return L >= 100 ? 0 : 100 + (L - 1) * 35; }
function pointsAt(L) {
  const big = [25, 50, 75, 100].filter(x => x <= L).length;
  return { stat: 10 + 5 * (L - 1) + 5 * Math.floor(L / 10) + 10 * big, mastery: Math.floor(L / 10), skill: Math.floor(L / 5) + big };
}
const CALCS = {
  xp(el) {
    el.innerHTML = "<p class=\"calc-title\">XP and points calculator</p><div class=\"calc-grid\">" +
      field("Level now", num("lv", 1, 1, 100)) + field("XP into this level", num("xp", 0, 0, 100000)) + field("Target level", num("to", 10, 1, 100)) +
      "</div><div class=\"calc-out\" data-out></div>";
    const g = n => el.querySelector("[name=\"" + n + "\"]"), o = el.querySelector("[data-out]");
    const run = () => {
      const lv = clamp(g("lv").value, 1, 100), to = clamp(g("to").value, 1, 100), xp = clamp(g("xp").value, 0, 1e9);
      const need = Math.max(0, totalXp(to) - totalXp(lv) - xp);
      const pts = pointsAt(to);
      o.innerHTML = out("XP still needed", fmt(need)) + out("Spell casts at 5 XP", fmt(Math.ceil(need / 5))) + out("Hard missions at 550 XP", fmt(Math.ceil(need / 550))) +
        out("XP to next level now", fmt(xpToNext(lv))) + out("Total XP from level 1 to " + to, fmt(totalXp(to))) +
        out("Stat points by level " + to, fmt(pts.stat)) + out("Mastery points", fmt(pts.mastery)) + out("Skill points", fmt(pts.skill)) +
        "<p class=\"calc-note\">Points count levels only, including the 10 you start with. Quests and race nodes add more.</p>";
    };
    el.addEventListener("input", run); run();
  },
  statcost(el) {
    el.innerHTML = "<p class=\"calc-title\">Stat point cost</p><div class=\"calc-grid\">" +
      field("Stat value now", num("from", 0, 0, 100)) + field("Raise it to", num("to", 20, 0, 100)) + "</div><div class=\"calc-out\" data-out></div>";
    const g = n => el.querySelector("[name=\"" + n + "\"]"), o = el.querySelector("[data-out]");
    const run = () => {
      const a = clamp(g("from").value, 0, 100), b = clamp(g("to").value, 0, 100);
      let cost = 0; for (let v = a; v < b; v++) cost += 1 + Math.floor(v / 20);
      o.innerHTML = out("Stat points needed", fmt(cost)) + out("Levels of stat income (5 per level)", fmt(Math.ceil(cost / 5)));
    };
    el.addEventListener("input", run); run();
  },
  mana(el) {
    el.innerHTML = "<p class=\"calc-title\">Max mana and regeneration</p><div class=\"calc-grid\">" +
      field("Race and class", "<select name=\"race\">" + RACES.map((r, i) => "<option value=\"" + i + "\">" + r[0] + "</option>").join("") + "</select>") +
      field("Max Mana stat", num("stat", 0, 0, 100)) + field("Mana Regen Speed stat", num("speed", 0, 0, 100)) + field("Mana Regen Amount stat", num("amount", 0, 0, 100)) +
      field("Distinct magic stones", num("stones", 0, 0, 11)) +
      field("Bond", "<select name=\"bondType\"><option value=\"none\">None</option><option value=\"spirit\">Spirit, matching magic active</option><option value=\"liebe\">Liebe (Anti-Magic)</option></select>") +
      field("Bond percent", num("bond", 0, 0, 100, 10)) + field("Accessory max mana", num("acc", 0, 0, 5000)) +
      field("Anti-Magic sword in hand", "<select name=\"sword\"><option value=\"1\">Not an Anti-Magic user</option><option value=\"0.25\">No sword (25%)</option><option value=\"0.5\">Demon-Slayer, Black Divider or Slasher (50%)</option><option value=\"0.75\">Demon Dweller (75%)</option><option value=\"1\">Demon-Destroyer (100%)</option></select>") +
      "<label class=\"calc-check\"><input type=\"checkbox\" name=\"recovery\"> Mana Recovery node (−15% interval)</label>" +
      "</div><div class=\"calc-out\" data-out></div>";
    const g = n => el.querySelector("[name=\"" + n + "\"]"), o = el.querySelector("[data-out]");
    const run = () => {
      const race = RACES[clamp(g("race").value, 0, RACES.length - 1)];
      const stat = clamp(g("stat").value, 0, 100), speed = clamp(g("speed").value, 0, 100), amount = clamp(g("amount").value, 0, 100);
      const stones = clamp(g("stones").value, 0, 11), bond = clamp(g("bond").value, 0, 100), acc = clamp(g("acc").value, 0, 1e6);
      const sword = Number(g("sword").value) || 1, recovery = g("recovery").checked;
      const bondType = g("bondType").value, tiers = Math.floor(bond / 10);
      const bondMana = bondType === "spirit" ? 200 + 250 * tiers : bondType === "liebe" ? 100 * tiers : 0;
      const bondRegen = bondType === "spirit" ? 1 + 0.1 * tiers : bondType === "liebe" ? 1 + 0.03 * tiers : 1;
      const max = race[1] + 20 * stat + 200 * stones + bondMana + acc;
      const interval = Math.max(1, (20 - speed / 10) / race[2] / sword * (recovery ? 0.85 : 1));
      const pulse = (1 + amount / 10) * (1 + 0.1 * stones) * bondRegen;
      const perSec = pulse * 20 / interval;
      o.innerHTML = out("Max mana", fmt(max)) + out("Pulse every", interval.toFixed(1) + " ticks") + out("Mana per pulse", pulse.toFixed(1)) + out("Mana per second", perSec.toFixed(1)) +
        out("Empty to full", (max / perSec).toFixed(0) + " s") +
        "<p class=\"calc-note\">Base values only: race tree nodes, wands, Willpower and admin base values are not included.</p>";
    };
    el.addEventListener("input", run); el.addEventListener("change", run); run();
  }
};
function initCalcs(root) { root.querySelectorAll(".calc").forEach(el => { const f = CALCS[el.dataset.calc]; if (f) f(el); }); }

document.getElementById("q").addEventListener("input", e => search(e.target.value));
window.addEventListener("hashchange", () => { document.getElementById("q").value = ""; show(location.hash.slice(1)); });
window.addEventListener("resize", () => { if (!isMobile()) closeChapters(); });
show(location.hash.slice(1));
