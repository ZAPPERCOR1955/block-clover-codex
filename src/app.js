(function () {
  "use strict";
  const D = window.WIKI_DATA || {};
  const C = D.calc;
  const W = D["dmz-world"] || {};
  const R = D.races || {};
  const N = D.noea || {};
  const E = window.WeightsEngine;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = (s) => String(s ?? "").replace(/§./g, "");
  const pretty = (k) => String(k).replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
  const fmt = (n, d = 0) => (n == null || !isFinite(n) ? "–" : Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }));
  const x2 = (n) => "×" + fmt(n, 2);
  const pct = (n, d = 0) => fmt(n * 100, d) + "%";
  const neg = (n) => (n > 0.0005 ? "−" + pct(n, 1) : "None");
  const store = {
    get(k, d) { try { const v = localStorage.getItem("noeawiki." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("noeawiki." + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
  };
  const arr = (v) => (Array.isArray(v) ? v : v ? [v] : []);
  const ZONES = [
    { name: "No weight", color: "var(--z-none)" },
    { name: "Comfortable", color: "var(--z-comfort)" },
    { name: "Ideal", color: "var(--z-ideal)" },
    { name: "Pushing Hard", color: "var(--z-heavy)" },
    { name: "Overloaded", color: "var(--z-over)" },
  ];
  const BOOST_NAMES = { class: "Class", racialskill: "Frost Demon racial", htc: "Time Chamber", otherworld: "Dead in Otherworld", gravity: "Gravity", weights: "Weighted gear", global: "Server multiplier", potion: "Potions / Kami's blessing", mutant: "Mutant", difficulty: "Story difficulty", progression: "Progression bonus" };
  const SOURCE_NAMES = { TRAINING: "Training minigames", HIT: "Hitting enemies", KILL: "Kills", PASSIVE: "Passive (over time)", TRAVEL: "Travelling", MINED: "Mining blocks", CRAFTED: "Crafting", STORY: "Story quests" };

  // ================= Views =================
  const has = (v) => (Array.isArray(v) ? v.length > 0 : v && typeof v === "object" ? Object.keys(v).length > 0 : !!v);
  const VIEWS = [
    { id: "weights", name: "Weight Calculator", render: renderCalc, show: () => !!C },
    { id: "races", name: "Races", render: renderRaces, show: () => has(R.races) || has(C && C.races) },
    { id: "forms", name: "Forms", render: renderForms, show: () => !!C },
    { id: "skills", name: "Skills", render: () => listView("Skills", "Buyable and learnable skills, their levels and costs.", [["skills", W.skills]]), show: () => has(W.skills) },
    { id: "techniques", name: "Ki & Strikes", render: () => { listView("Ki attacks & strikes", "Ki blasts, strikes and evasions: costs, damage and who teaches them.", [["Ki attacks", arr(W.techniques).filter((t) => /ki/i.test(t.type))], ["Strikes", arr(W.techniques).filter((t) => /strike/i.test(t.type))], ["Evasion", arr(W.techniques).filter((t) => /evasion/i.test(t.type))], ["Other", arr(W.techniques).filter((t) => !/ki|strike|evasion/i.test(t.type))]]); if (has(W.techniqueRules)) view.insertAdjacentHTML("beforeend", `<h3 class="section-title">How techniques work</h3><div class="card prose"><ul>${arr(W.techniqueRules).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>`); }, show: () => has(W.techniques) },
    { id: "training", name: "Training & TP", render: renderTraining, show: () => has(W.training) || has(W.tpSources) },
    { id: "items", name: "Items", render: () => listView("Items", "Gameplay items from Dragon Mine Z and Noea.", [["Dragon Mine Z", tagSrc(W.items, "DMZ")], ["Noea", tagSrc(N.items, "Noea")]]), show: () => has(W.items) || has(N.items) },
    { id: "npcs", name: "NPCs", render: () => listView("NPCs & masters", "Who to talk to and what they offer.", [["npcs", W.npcs]]), show: () => has(W.npcs) },
    { id: "world", name: "World", render: renderWorld, show: () => has(W.dimensions) || has(W.raids) || has(N.planets) },
    { id: "quests", name: "Quests", render: renderQuests, show: () => has(W.sagas) || has(W.sideQuests) || has(N.missions) },
    { id: "noea", name: "Noea", render: renderNoea, show: () => has(N) },
    { id: "commands", name: "Commands & Keys", render: renderCommands, show: () => has(W.commands) || has(W.keybinds) || has(N.commands) },
    { id: "mechanics", name: "Mechanics", render: renderMechanics, show: () => has(R.stats) || has(R.formRules) },
  ].filter((v) => v.show());

  const tabs = $("#tabs"), view = $("#view");
  tabs.innerHTML = VIEWS.map((v) => `<a href="#${v.id}" data-v="${v.id}">${esc(v.name)}</a>`).join("");
  let pendingFilter = null;
  function route() {
    const id = (location.hash || "").slice(1);
    const v = VIEWS.find((x) => x.id === id) || VIEWS[0];
    tabs.querySelectorAll("a").forEach((a) => (a.dataset.v === v.id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    const cur = tabs.querySelector('[aria-current="page"]');
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest", inline: "nearest" });
    view.innerHTML = "";
    v.render(view);
    if (pendingFilter != null) {
      const f = view.querySelector("[data-filter]");
      if (f) { f.value = pendingFilter; f.dispatchEvent(new Event("input")); }
      pendingFilter = null;
    }
  }
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

  // ================= Generic entry rendering =================
  const TITLE_KEYS = ["name", "command", "title", "race", "wish", "dragon", "id"];
  const TEXT_KEYS = ["summary", "overview", "effect", "what", "how", "goal", "howToUse", "whatsThere", "description", "offers", "format", "trigger"];
  const SKIP_KEYS = new Set(["source", "_src"]);
  function valueHTML(v) {
    if (v == null || v === "") return "–";
    if (Array.isArray(v)) {
      if (!v.length) return "–";
      if (v.every((x) => typeof x !== "object")) return v.length > 3 || v.some((x) => String(x).length > 40) ? `<ul>${v.map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul>` : esc(v.map(strip).join(", "));
      return `<ul>${v.map((x) => `<li>${objLine(x)}</li>`).join("")}</ul>`;
    }
    if (typeof v === "object") return objLine(v);
    if (typeof v === "number") return fmt(v, Number.isInteger(v) ? 0 : Math.abs(v) < 1 ? 3 : 2);
    if (typeof v === "boolean") return v ? "Yes" : "No";
    return esc(strip(v));
  }
  function objLine(o) {
    if (o == null || typeof o !== "object") return esc(strip(o));
    const t = TITLE_KEYS.map((k) => o[k]).find((x) => x != null && typeof x !== "object");
    const rest = Object.entries(o).filter(([k, v]) => v !== t && v != null && v !== "" && !(Array.isArray(v) && !v.length));
    const body = rest.map(([k, v]) => (typeof v === "object" ? `${esc(pretty(k))}: ${Array.isArray(v) ? esc(v.map((x) => (typeof x === "object" ? JSON.stringify(x) : x)).join(", ")) : esc(Object.entries(v).map(([a, b]) => `${a} ${typeof b === "object" ? JSON.stringify(b) : b}`).join(", "))}` : `${esc(pretty(k))}: ${esc(strip(typeof v === "number" ? fmt(v, Number.isInteger(v) ? 0 : 3) : v))}`)).join(" · ");
    return t != null ? `<strong>${esc(strip(t))}</strong>${body ? " — " + body : ""}` : body;
  }
  function titleOf(o) { return strip(TITLE_KEYS.map((k) => o && o[k]).find((x) => x != null && typeof x !== "object") ?? "Entry"); }
  function entryHTML(o, opts = {}) {
    if (typeof o !== "object" || o == null) return `<div class="entry"><p>${esc(strip(o))}</p></div>`;
    const title = titleOf(o);
    const idTag = o.id && strip(o.id) !== title ? `<code>${esc(o.id)}</code>` : o.command && o.id ? "" : "";
    const src = o.source || o._src;
    const badge = src ? `<span class="src ${/noea/i.test(src) ? "noea" : ""}">${esc(src)}</span>` : "";
    const used = new Set(TITLE_KEYS.filter((k) => o[k] != null && strip(o[k]) === title));
    if (o.id) used.add("id");
    const paras = TEXT_KEYS.filter((k) => typeof o[k] === "string" && o[k].trim()).map((k) => { used.add(k); return `<p>${esc(strip(o[k]))}</p>`; }).join("");
    const rows = Object.entries(o).filter(([k, v]) => !used.has(k) && !SKIP_KEYS.has(k) && v != null && v !== "" && !(Array.isArray(v) && !v.length) && !(typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length));
    const dl = rows.length ? `<dl>${rows.map(([k, v]) => `<dt>${esc(pretty(k))}</dt><dd>${valueHTML(v)}</dd>`).join("")}</dl>` : "";
    return `<article class="entry${opts.wide ? " wide" : ""}" data-text="${esc((title + " " + JSON.stringify(o)).toLowerCase())}"><h3>${esc(title)} ${badge} ${idTag}</h3>${paras}${dl}</article>`;
  }
  function tagSrc(list, src) { return arr(list).map((x) => (typeof x === "object" && x && !x.source ? Object.assign({ _src: src }, x) : x)); }
  function head(eyebrow, title, blurb) {
    return `<div class="view-head"><div><div class="eyebrow">${esc(eyebrow)}</div><h2>${esc(title)}</h2>${blurb ? `<p>${esc(blurb)}</p>` : ""}</div></div>`;
  }
  // sections: [[title, items, {wide}]]
  function listView(title, blurb, sections, eyebrow = "Wiki") {
    const live = sections.filter(([, items]) => has(items));
    view.innerHTML = head(eyebrow, title, blurb) +
      `<div class="filters"><input type="search" data-filter placeholder="Filter ${esc(title.toLowerCase())}…" aria-label="Filter"><span class="count" id="cnt"></span></div>` +
      live.map(([t, items, o]) => `${live.length > 1 || o?.always ? `<h3 class="section-title">${esc(pretty(t))} <span class="count">${arr(items).length}</span></h3>` : ""}<div class="entries">${arr(items).map((x) => entryHTML(x, o)).join("")}</div>`).join("") ||
      `<div class="empty">Nothing extracted for this section yet.</div>`;
    wireFilter();
  }
  function wireFilter() {
    const f = view.querySelector("[data-filter]");
    if (!f) return;
    const cnt = $("#cnt", view);
    const run = () => {
      const q = f.value.trim().toLowerCase();
      let shown = 0, total = 0;
      view.querySelectorAll("[data-text]").forEach((el) => { total++; const ok = !q || q.split(/\s+/).every((w) => el.dataset.text.includes(w)); el.hidden = !ok; if (ok) shown++; });
      if (cnt) cnt.textContent = q ? `${shown} of ${total}` : `${total} entries`;
    };
    f.addEventListener("input", run);
    run();
  }

  // ================= Weight calculator =================
  const allForms = () => (C ? C.races.flatMap((r) => r.forms.map((f) => Object.assign({ race: r.id }, f))).concat(C.sharedForms.map((f) => Object.assign({ race: "*" }, f))) : []);
  const DEFAULTS = { race: "saiyan", cls: "warrior", mode: "level", level: 400, stats: { STR: 120, SKP: 80, RES: 80, VIT: 80, PWR: 40, ENE: 20 }, form: "", stack: "", mastery: 0, dimension: "minecraft:overworld", nearKingKai: false, device: 0, gravityRoom: "none", weight: 200, source: "TRAINING", difficulty: "normal", deadInOtherworld: false, mutant: false, kamiBless: false };
  let S = Object.assign({}, DEFAULTS, store.get("calc", {}));
  S.stats = Object.assign({}, DEFAULTS.stats, S.stats || {});

  function formMult(form, mastery) {
    const out = { STR: 1, SKP: 1, RES: 1, VIT: 1, PWR: 1, ENE: 1 };
    if (!form) return out;
    const m = form.mult;
    const base = { STR: m.STR, SKP: m.SKP, RES: (m.DEF + m.STM) / 2, VIT: m.VIT, PWR: m.PWR, ENE: m.ENE };
    for (const k in base) {
      let v = base[k] ?? 1;
      if (v > 1 && form.maxMastery > 0) v *= 1 + Math.min(1, Math.max(0, mastery / 100)) * ((form.maxStatsMultiplier ?? 1) - 1);
      out[k] = v;
    }
    return out;
  }
  function findForm(key) { if (!key) return null; const [race, group, id] = key.split("|"); return allForms().find((f) => f.race === race && f.group === group && f.id === id) || null; }
  function buildInput(over = {}) {
    const st = Object.assign({}, S, over);
    const race = C.races.find((r) => r.id === st.race) || C.races[0];
    const cls = race.classes.find((c) => c.id === st.cls) || race.classes[0];
    const f1 = formMult(findForm(st.form), st.mastery), f2 = formMult(findForm(st.stack), st.mastery);
    const mult = {};
    for (const k of E.STATS) mult[k] = C.cfg.gameplay.multiplicationInsteadOfAdditionForMultipliers ? f1[k] * f2[k] : 1 + (f1[k] - 1) + (f2[k] - 1);
    const input = {
      cls, frostDemonRacial: race.racialSkill === "frostdemon", mult,
      dimension: st.dimension, nearKingKai: st.nearKingKai, device: st.device, gravityRoom: st.gravityRoom, weight: st.weight,
      source: st.source, difficulty: st.difficulty, deadInOtherworld: st.deadInOtherworld, mutant: st.mutant, kamiBless: st.kamiBless,
    };
    if (st.mode === "stats") input.stats = Object.fromEntries(E.STATS.map((k) => [k, Math.max(0, +st.stats[k] || 0)]));
    else input.total = E.totalFromLevel(Math.max(1, Math.round(st.level) || 1), cls.initialStats, C.cfg.gameplay.maxValue);
    return { input, race, cls };
  }
  // Weight range (kg on the slot) whose load ratio lands in [lo, hi].
  function slotRange(lo, hi) {
    const { input } = buildInput();
    const at = (w) => E.compute(Object.assign({}, input, { weight: w }), C.cfg).ratio;
    const maxW = C.cfg.gravity.maxWeightRequested || 100000;
    const first = (pred) => { let a = 1, b = maxW; if (!pred(b)) return null; while (a < b) { const m = Math.floor((a + b) / 2); pred(m) ? (b = m) : (a = m + 1); } return a; };
    const a = first((w) => at(w) >= lo);
    const bPlus = first((w) => at(w) > hi);
    if (a == null) return null;
    const b = bPlus == null ? maxW : bPlus - 1;
    return b >= a ? [a, b] : null;
  }

  function renderCalc() {
    const g = C.cfg.gravity, gp = C.cfg.gameplay;
    const dims = Object.keys(g.gravityPerWorld);
    view.innerHTML = head("Weighted gear & gravity", "Training weight calculator",
      "Work out how much weight to carry for the biggest TP bonus without slowing yourself down. Uses this pack's settings and the exact formulas from Dragon Mine Z's code.") +
      `<div class="bench">
        <form class="panel" id="calcForm" autocomplete="off">
          <fieldset><legend>Your character</legend>
            <div class="row2">
              <div class="field"><label for="c-race">Race</label><select id="c-race">${C.races.map((r) => `<option value="${r.id}">${esc(r.name)}</option>`).join("")}</select></div>
              <div class="field"><label for="c-cls">Class</label><select id="c-cls"></select></div>
            </div>
            <div class="seg" role="group" aria-label="Enter level or stats"><button type="button" data-mode="level">My level</button><button type="button" data-mode="stats">My six stats</button></div>
            <div class="field" id="lvlBox"><label for="c-level">Level (from the stats screen)</label><input id="c-level" type="number" min="1" max="${gp.maxValue}" step="1"></div>
            <div id="statBox" hidden><div class="row3">${E.STATS.map((k) => `<div class="field"><label for="c-s-${k}">${k}</label><input id="c-s-${k}" type="number" min="0" step="1" data-stat="${k}"></div>`).join("")}</div><p class="hint" id="lvlOut"></p></div>
          </fieldset>
          <fieldset><legend>Active form</legend>
            <div class="field"><label for="c-form">Form</label><select id="c-form"></select></div>
            <div class="field"><label for="c-stack">Stack form (Kaioken, Ultra Instinct…)</label><select id="c-stack"><option value="">None</option>${groupOptions(C.sharedForms.map((f) => Object.assign({ race: "*" }, f)))}</select></div>
            <div class="field"><label for="c-mastery">Form mastery: <span class="num" id="masteryOut"></span></label><input id="c-mastery" type="range" min="0" max="100" step="1"></div>
            <p class="hint">Forms raise your ideal weight and your gravity resistance, because both use your boosted stats.</p>
          </fieldset>
          <fieldset><legend>Where you train</legend>
            <div class="field"><label for="c-dim">Dimension</label><select id="c-dim">${dims.map((d) => `<option value="${d}">${esc(C.dimensionNames[d] || d)} · ${fmt(g.gravityPerWorld[d], 0)} G</option>`).join("")}<option value="other">Any other dimension · ${fmt(g.defaultWorldGravity)} G</option></select></div>
            <label class="check"><input id="c-kai" type="checkbox"> Within ${fmt(g.npcGravityRange)} blocks of King Kai (${fmt(g.npcGravityValue)} G)</label>
            <div class="row2">
              <div class="field"><label for="c-dev">Gravity Device (G, 0 = off)</label><input id="c-dev" type="number" min="0" max="${g.deviceMaxGravity}" step="1"></div>
              <div class="field"><label for="c-room">Bulma's upgrade</label><select id="c-room"><option value="none">None</option><option value="mk2">Mk2 dampeners</option><option value="mk3">Mk3 dampeners</option></select></div>
            </div>
            <label class="check" id="deadBox"><input id="c-dead" type="checkbox"> I'm dead (Otherworld TP bonus)</label>
          </fieldset>
          <fieldset><legend>Weighted gear</legend>
            <div class="field"><label for="c-w">Weight on your weights slot (kg)</label><input id="c-w" type="number" min="0" max="${g.maxWeightRequested}" step="1"></div>
            <input id="c-wr" type="range" min="0" max="1000" step="1" aria-label="Weight slider">
            <div class="btns"><button type="button" class="btn primary" id="b-ideal">Set to ideal</button><button type="button" class="btn" id="b-max">Set to max TP</button><button type="button" class="btn" id="b-none">Take it off</button></div>
          </fieldset>
          <fieldset><legend>Other TP bonuses</legend>
            <div class="row2">
              <div class="field"><label for="c-src">TP from</label><select id="c-src">${Object.keys(gp.tpGainBoosts || SOURCE_NAMES).map((s) => `<option value="${s}">${esc(SOURCE_NAMES[s] || pretty(s.toLowerCase()))}</option>`).join("")}</select></div>
              <div class="field"><label for="c-diff">Story difficulty</label><select id="c-diff"><option value="easy">Easy</option><option value="normal">Normal</option><option value="hard">Hard</option></select></div>
            </div>
            <label class="check"><input id="c-mut" type="checkbox"> Mutant (×${fmt(C.cfg.mutant.tpGainMultiplier, 2)} TP)</label>
            <label class="check"><input id="c-kami" type="checkbox"> Kami's blessing (×${fmt(gp.kamiBlessTpMultiplier, 2)} TP)</label>
          </fieldset>
          <button type="button" class="btn" id="b-reset">Reset to example</button>
        </form>
        <div class="readout" id="out" aria-live="polite"></div>
      </div><div class="mbar" id="mbar"></div>` + explainer();

    const form = $("#calcForm");
    const set = (k, v) => { S[k] = v; S.touched = true; store.set("calc", S); update(); };
    const fillClasses = () => {
      const race = C.races.find((r) => r.id === S.race) || C.races[0];
      $("#c-cls").innerHTML = race.classes.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
      if (!race.classes.some((c) => c.id === S.cls)) S.cls = race.classes[0].id;
      $("#c-cls").value = S.cls;
      $("#c-form").innerHTML = `<option value="">Base form</option>` + groupOptions(race.forms.map((f) => Object.assign({ race: race.id }, f)));
      if (!findForm(S.form) || !S.form.startsWith(race.id + "|")) S.form = "";
      $("#c-form").value = S.form;
    };
    const syncInputs = () => {
      $("#c-race").value = S.race; fillClasses();
      $("#c-level").value = S.level; E.STATS.forEach((k) => ($("#c-s-" + k).value = S.stats[k]));
      form.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === S.mode)));
      $("#lvlBox").hidden = S.mode !== "level"; $("#statBox").hidden = S.mode !== "stats";
      $("#c-stack").value = S.stack; $("#c-mastery").value = S.mastery;
      $("#c-dim").value = g.gravityPerWorld[S.dimension] != null ? S.dimension : "other";
      $("#c-kai").checked = S.nearKingKai; $("#c-dev").value = S.device; $("#c-room").value = S.gravityRoom; $("#c-dead").checked = S.deadInOtherworld;
      $("#c-w").value = S.weight; $("#c-src").value = S.source; $("#c-diff").value = S.difficulty; $("#c-mut").checked = S.mutant; $("#c-kami").checked = S.kamiBless;
    };
    syncInputs();
    $("#c-race").addEventListener("change", (e) => { S.race = e.target.value; fillClasses(); set("race", S.race); });
    $("#c-cls").addEventListener("change", (e) => set("cls", e.target.value));
    form.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => { S.mode = b.dataset.mode; syncInputs(); set("mode", S.mode); }));
    $("#c-level").addEventListener("input", (e) => set("level", Math.max(1, Math.min(gp.maxValue, Math.round(+e.target.value || 1)))));
    form.querySelectorAll("[data-stat]").forEach((el) => el.addEventListener("input", () => { S.stats[el.dataset.stat] = Math.max(0, +el.value || 0); set("stats", S.stats); }));
    $("#c-form").addEventListener("change", (e) => set("form", e.target.value));
    $("#c-stack").addEventListener("change", (e) => set("stack", e.target.value));
    $("#c-mastery").addEventListener("input", (e) => set("mastery", +e.target.value));
    $("#c-dim").addEventListener("change", (e) => set("dimension", e.target.value === "other" ? "other:dimension" : e.target.value));
    $("#c-kai").addEventListener("change", (e) => set("nearKingKai", e.target.checked));
    $("#c-dev").addEventListener("input", (e) => set("device", Math.max(0, Math.min(g.deviceMaxGravity, +e.target.value || 0))));
    $("#c-room").addEventListener("change", (e) => set("gravityRoom", e.target.value));
    $("#c-dead").addEventListener("change", (e) => set("deadInOtherworld", e.target.checked));
    $("#c-w").addEventListener("input", (e) => set("weight", Math.max(0, Math.min(g.maxWeightRequested, Math.round(+e.target.value || 0)))));
    $("#c-wr").addEventListener("input", (e) => { const max = +$("#c-wr").dataset.kg || 1000; S.weight = Math.round((+e.target.value / 1000) * max); $("#c-w").value = S.weight; set("weight", S.weight); });
    $("#c-src").addEventListener("change", (e) => set("source", e.target.value));
    $("#c-diff").addEventListener("change", (e) => set("difficulty", e.target.value));
    $("#c-mut").addEventListener("change", (e) => set("mutant", e.target.checked));
    $("#c-kami").addEventListener("change", (e) => set("kamiBless", e.target.checked));
    $("#b-ideal").addEventListener("click", () => { const r = slotRange(g.tpIdealRatioLow, g.tpIdealRatioHigh); const mid = slotRange(1, 1); S.weight = mid ? mid[0] : r ? r[0] : 0; $("#c-w").value = S.weight; set("weight", S.weight); });
    $("#b-max").addEventListener("click", () => { const r = slotRange(g.tpOverloadRatio, g.tpOverloadRatio); S.weight = r ? r[0] : 0; $("#c-w").value = S.weight; set("weight", S.weight); });
    $("#b-none").addEventListener("click", () => { S.weight = 0; $("#c-w").value = 0; set("weight", 0); });
    $("#b-reset").addEventListener("click", () => { S = JSON.parse(JSON.stringify(DEFAULTS)); store.set("calc", S); syncInputs(); update(); });
    form.addEventListener("submit", (e) => e.preventDefault());
    update();
  }
  function groupOptions(forms) {
    const groups = {};
    forms.forEach((f) => (groups[f.group] = groups[f.group] || []).push(f));
    return Object.entries(groups).map(([gid, fs]) => `<optgroup label="${esc(pretty(gid))}">${fs.map((f) => `<option value="${esc(f.race + "|" + f.group + "|" + f.id)}">${esc(fs.length > 1 && /^x\d+$/i.test(f.name) ? pretty(gid) + " " + f.name : f.name)}</option>`).join("")}</optgroup>`).join("");
  }

  function update() {
    const g = C.cfg.gravity, gp = C.cfg.gameplay;
    const { input, cls } = buildInput();
    const r = E.compute(input, C.cfg);
    $("#masteryOut").textContent = S.mastery + "%";
    $("#deadBox").hidden = S.dimension !== "dragonminez:otherworld";
    if (S.mode === "stats") $("#lvlOut").textContent = `That's level ${fmt(r.level)} (${fmt(r.total)} total stats).`;
    const ideal = slotRange(g.tpIdealRatioLow, g.tpIdealRatioHigh);
    const maxTp = slotRange(g.tpOverloadRatio, g.tpOverloadRatio);
    const sliderMax = Math.max(10, Math.ceil(Math.max(S.weight * 1.25, maxTp ? maxTp[0] * 1.4 : 0, ideal ? ideal[1] * 2.2 : 0)));
    $("#c-wr").dataset.kg = sliderMax; $("#c-wr").value = Math.round((S.weight / sliderMax) * 1000);

    const zone = ZONES[r.zone];
    const range = ideal ? (ideal[0] === ideal[1] ? `${fmt(ideal[0])} kg` : `${fmt(ideal[0])}–${fmt(ideal[1])} kg`) : null;
    const where = S.dimension === "other:dimension" ? "here" : `in ${C.dimensionNames[S.dimension] || "this dimension"}`;
    let headline, sub;
    if (!r.ideal) { headline = "No weight bonus yet"; sub = "Your ideal weight rounds to 0 kg. Gain a few levels first."; }
    else if (!ideal) { headline = `Gravity is too heavy for any weight`; sub = `At ${fmt(r.gravityFull, 1)} G even 1 kg weighs ${fmt(r.loadFactor)} kg, more than your ideal ${fmt(r.ideal)} kg. Train at lower gravity or level up.`; }
    else { headline = `Carry <em>${range}</em> ${where}`; sub = `That keeps you in the Ideal zone: ${x2(g.tpPeakMultiplier)} TP from weights with no speed or stat penalty.${r.loadFactor > 1 ? ` Gravity makes every kg weigh ${fmt(r.loadFactor, 1)} kg.` : ""}`; }
    const nowLine = r.weight > 0
      ? `With ${fmt(r.weight)} kg on, your load is ${fmt(r.effective)} kg of an ideal ${fmt(r.ideal)} kg (${pct(r.ratio)}).`
      : "You have no weighted gear on.";
    const maxLine = maxTp && r.ideal ? `Max TP: ${fmt(maxTp[0])} kg gives ${x2(g.tpHeavyMultiplier)}, but costs ${pct(g.maxWeightPenalty * (g.tpOverloadRatio - g.tpIdealRatioHigh) / (g.tpOverloadHardRatio - g.tpIdealRatioHigh) * (1 - r.relief))} of your speed and stats.` : "";

    const parts = r.parts.filter((p) => Math.abs(p.value - 1) > 1e-9);
    const tpPerHit = Math.max(1, Math.floor((gp.tpPerHit || 2) * r.tpTotal));
    $("#out").innerHTML = `
      <section class="verdict" style="--zone:${zone.color}">
        <div><span class="pill"><i></i>${esc(zone.name)}</span> ${S.touched ? "" : '<span class="hint">Example values: enter your own on the left</span>'}</div>
        <div class="big">${headline}</div>
        <p>${esc(sub)}</p>
        <p>${esc(nowLine)} ${esc(maxLine)}</p>
      </section>
      <div class="tiles">
        <div class="tile"><span class="k">Ideal load</span><span class="v num">${fmt(r.ideal)} kg</span><span class="s">Ideal zone ${fmt(r.idealLow)}–${fmt(r.idealHigh)} kg</span></div>
        <div class="tile"><span class="k">Your load</span><span class="v num">${fmt(r.effective)} kg</span><span class="s">${fmt(r.weight)} kg × ${fmt(r.loadFactor, 1)} G</span></div>
        <div class="tile ${r.tpWeights > 1 ? "hot" : ""}"><span class="k">Weight training</span><span class="v num">${x2(r.tpWeights)}</span><span class="s">${esc(zone.name)}</span></div>
        <div class="tile ${r.tpGravity > 1 ? "hot" : ""}"><span class="k">Gravity bonus</span><span class="v num">${x2(r.tpGravity)}</span><span class="s">${r.hardStop ? "None past " + fmt(g.hardStopThreshold) + " G" : fmt(r.gravityBonusG, 1) + " G counts"}</span></div>
        <div class="tile hot"><span class="k">Total TP</span><span class="v num">${x2(r.tpTotal)}</span><span class="s">${esc(SOURCE_NAMES[r.source] || r.source)}</span></div>
      </div>
      <div class="card"><h3>TP from weights vs. kg carried</h3><div class="chart-wrap" id="chart"></div>
        <div class="chart-legend">${ZONES.slice(1).map((z) => `<span><i style="background:${z.color};opacity:.55"></i>${z.name}</span>`).join("")}<span><i style="background:var(--accent)"></i>TP multiplier</span><span><i style="background:var(--ink-2)"></i>Speed &amp; stat penalty</span></div></div>
      <div class="two">
        <div class="card"><h3>What the weight and gravity cost you</h3><dl class="kv">
          <dt>Gravity around you</dt><dd>${fmt(r.gravityFull, 1)} G</dd>
          <dt>Your gravity resistance</dt><dd>${fmt(r.resistance, 2)} G</dd>
          <dt>Net gravity</dt><dd class="${r.net > 0 ? "bad" : ""}">${fmt(r.net, 1)} G</dd>
          <dt>Stat penalty (STR, SKP, PWR, DEF, STM)</dt><dd class="${r.statReduction > 0 ? "bad" : ""}">${neg(r.statReduction)}</dd>
          <dt>Movement speed</dt><dd class="${r.movePenalty > 0 ? "bad" : ""}">${neg(r.movePenalty)}</dd>
          <dt>Attack speed</dt><dd class="${r.attackPenalty > 0 ? "bad" : ""}">${neg(r.attackPenalty)}</dd>
          <dt>Jump height</dt><dd>${pct(r.jumpFactor)}</dd>
          <dt>Flight</dt><dd class="${r.flyFactor < 1 ? "bad" : ""}">${r.flyFactor <= 0 ? "Blocked" : pct(r.flyFactor)}</dd>
          <dt>Extra fall damage</dt><dd>${r.extraFall > 0 ? "+" + pct(r.extraFall) : "None"}</dd>
          <dt>Ki & stamina cost</dt><dd>${x2(r.consumption)}</dd>
          <dt>Stamina & form drain from load</dt><dd>${x2(r.loadDrain)}</dd>
          ${r.relief > 0 ? `<dt>Bulma's dampeners</dt><dd class="good">−${pct(r.relief)} weight penalty</dd>` : ""}
        </dl></div>
        <div class="card"><h3>TP multiplier breakdown</h3><dl class="kv">
          ${parts.length ? parts.map((p) => `<dt>${esc(BOOST_NAMES[p.id] || pretty(p.id))}</dt><dd>+${fmt(p.value - 1, 3)}</dd>`).join("") : "<dt>No bonuses active</dt><dd>+0</dd>"}
          <dt><strong>Total</strong></dt><dd><strong>${x2(r.tpTotal)}</strong></dd>
        </dl>
        <p class="hint" style="margin-top:10px">Bonuses add up (each adds its value minus 1). A hit is worth ${fmt(gp.tpPerHit)} TP base, so ${fmt(tpPerHit)} TP per hit right now. Your next stat point costs ${fmt(r.nextStatCost)} TP${cls.tpCostMultiplier !== 1 ? ` (class cost ×${fmt(cls.tpCostMultiplier, 2)})` : ""}.</p></div>
      </div>`;
    const mb = $("#mbar");
    if (mb) mb.innerHTML = `<span class="mz" style="--zone:${zone.color}"><i></i>${ideal && r.ideal ? "Carry " + range : esc(headline.replace(/<[^>]+>/g, ""))}</span><span>TP ${x2(r.tpTotal)}</span><a href="#weights" id="mbGo">Results ↑</a>`;
    const go = $("#mbGo"); if (go) go.addEventListener("click", (e) => { e.preventDefault(); $("#out").scrollIntoView({ behavior: "smooth", block: "start" }); });
    drawChart(input, r);
  }

  function drawChart(input, cur) {
    const host = $("#chart");
    if (!host) return;
    const g = C.cfg.gravity;
    const w = Math.max(300, host.clientWidth || 600), h = 250;
    const m = { l: 44, r: 12, t: 12, b: 34 }, gap = 18;
    const h1 = 128, h2 = h - m.t - m.b - h1 - gap;
    const ideal = cur.ideal, lf = cur.loadFactor;
    const kgAt = (ratio) => (ideal > 0 ? (ratio * ideal) / lf : 0);
    let maxKg = Math.max(kgAt(g.tpOverloadHardRatio * 1.15), cur.weight * 1.1, 5);
    const X = (kg) => m.l + (kg / maxKg) * (w - m.l - m.r);
    const yMax = Math.max(g.tpHeavyMultiplier, g.tpPeakMultiplier) + 0.25;
    const Y1 = (v) => m.t + h1 - ((v - 1) / (yMax - 1)) * h1;
    const top2 = m.t + h1 + gap;
    const pMax = Math.max(0.05, g.maxWeightPenalty);
    const Y2 = (p) => top2 + h2 - (p / pMax) * h2;
    const N = 220, pts = [];
    for (let i = 0; i <= N; i++) {
      const kg = (i / N) * maxKg;
      const ratio = ideal > 0 ? Math.round(kg * lf) / ideal : 0;
      const tp = kg <= 0 || ideal <= 0 ? 1 : E.weightTpForRatio(ratio, g);
      const pen = kg <= 0 || ideal <= 0 ? 0 : E.rawWeightPenalty(ratio, g) * (1 - cur.relief);
      pts.push({ kg, tp, pen, zone: kg > 0 && ideal > 0 ? E.zoneForRatio(ratio, g) : 0 });
    }
    const bands = ideal > 0 ? [[0, kgAt(g.tpIdealRatioLow), 1], [kgAt(g.tpIdealRatioLow), kgAt(g.tpIdealRatioHigh), 2], [kgAt(g.tpIdealRatioHigh), kgAt(g.tpOverloadHardRatio), 3], [kgAt(g.tpOverloadHardRatio), maxKg, 4]] : [];
    const bandRects = (top, hh) => bands.map(([a, b, z]) => `<rect x="${X(Math.min(a, maxKg)).toFixed(1)}" y="${top}" width="${Math.max(0, X(Math.min(b, maxKg)) - X(Math.min(a, maxKg))).toFixed(1)}" height="${hh}" fill="${ZONES[z].color}" fill-opacity="var(--band-alpha)" style="fill-opacity:var(--band-alpha)"/>`).join("");
    const path = (fy) => pts.map((p, i) => `${i ? "L" : "M"}${X(p.kg).toFixed(1)},${fy(p).toFixed(1)}`).join("");
    const yTicks = [1, 1.5, 2, 2.5].filter((v) => v <= yMax);
    const nice = (v) => { const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * p; };
    const step = nice(maxKg / 5);
    const xTicks = []; for (let v = 0; v <= maxKg + 1e-9; v += step) xTicks.push(v);
    const cx = X(Math.min(cur.weight, maxKg));
    const curTp = cur.weight > 0 ? cur.tpWeights : 1, curPen = cur.weightPenalty;
    host.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="TP multiplier and penalty by weight carried">
      ${bandRects(m.t, h1)}${bandRects(top2, h2)}
      ${yTicks.map((v) => `<line x1="${m.l}" x2="${w - m.r}" y1="${Y1(v)}" y2="${Y1(v)}" stroke="var(--line)" stroke-width="1"/><text x="${m.l - 6}" y="${Y1(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="var(--font-display)">×${v}</text>`).join("")}
      ${[0, pMax / 2, pMax].map((p) => `<line x1="${m.l}" x2="${w - m.r}" y1="${Y2(p)}" y2="${Y2(p)}" stroke="var(--line)" stroke-width="1"/><text x="${m.l - 6}" y="${Y2(p) + 4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="var(--font-display)">−${Math.round(p * 100)}%</text>`).join("")}
      ${xTicks.map((v) => `<text x="${X(v)}" y="${h - m.b + 16}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--font-display)">${fmt(v)}</text>`).join("")}
      <text x="${w - m.r}" y="${h - 4}" text-anchor="end" font-size="11" fill="var(--muted)">kg on your weights slot</text>
      <path d="${path((p) => Y1(p.tp))}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
      <path d="${path((p) => Y2(p.pen))}" fill="none" stroke="var(--ink-2)" stroke-width="2" stroke-linejoin="round"/>
      ${cur.weight > 0 ? `<line x1="${cx}" x2="${cx}" y1="${m.t}" y2="${top2 + h2}" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3"/>
      <circle cx="${cx}" cy="${Y1(curTp)}" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>
      <circle cx="${cx}" cy="${Y2(curPen)}" r="5" fill="var(--ink-2)" stroke="var(--surface)" stroke-width="2"/>` : ""}
      <line id="xh" x1="0" x2="0" y1="${m.t}" y2="${top2 + h2}" stroke="var(--muted)" stroke-width="1" visibility="hidden"/>
      <rect x="${m.l}" y="${m.t}" width="${w - m.l - m.r}" height="${top2 + h2 - m.t}" fill="transparent" id="hit"/>
    </svg><div class="tip" id="tip" hidden></div>`;
    const svg = host.querySelector("svg"), tip = $("#tip", host), xh = $("#xh", host);
    const move = (ev) => {
      const rect = svg.getBoundingClientRect();
      const px = ((ev.clientX - rect.left) / rect.width) * w;
      const kg = Math.max(0, Math.min(maxKg, ((px - m.l) / (w - m.l - m.r)) * maxKg));
      const p = pts[Math.round((kg / maxKg) * N)];
      xh.setAttribute("x1", X(p.kg)); xh.setAttribute("x2", X(p.kg)); xh.setAttribute("visibility", "visible");
      tip.hidden = false;
      tip.style.left = (X(p.kg) / w) * rect.width + "px"; tip.style.top = (Y1(p.tp) / h) * rect.height + "px";
      tip.innerHTML = `<b>${fmt(p.kg)} kg</b> · ${ZONES[p.zone].name}<br>TP ${x2(p.tp)} · penalty −${pct(p.pen)}`;
    };
    const hit = $("#hit", host);
    hit.addEventListener("pointermove", move);
    hit.addEventListener("pointerleave", () => { tip.hidden = true; xh.setAttribute("visibility", "hidden"); });
    hit.addEventListener("click", (ev) => {
      const rect = svg.getBoundingClientRect();
      const kg = Math.round(Math.max(0, Math.min(maxKg, ((((ev.clientX - rect.left) / rect.width) * w - m.l) / (w - m.l - m.r)) * maxKg)));
      S.weight = kg; store.set("calc", S); const wi = $("#c-w"); if (wi) wi.value = kg; update();
    });
  }
  let rz;
  window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if ($("#chart")) update(); }, 150); });

  function explainer() {
    const g = C.cfg.gravity, gp = C.cfg.gameplay;
    return `<h3 class="section-title">How weighted training works</h3>
    <div class="two">
      <div class="card prose">
        <p><strong>Getting gear.</strong> Master Roshi gives a Turtle Shell, King Kai gives Workout Weights and Piccolo gives a Weighted Cape. You type how many kg you want (up to ${fmt(g.maxWeightRequested)} kg). The item goes in your one <strong>Weights</strong> curio slot, and only that slot counts.</p>
        <p><strong>Ideal weight</strong> is about half your level in kg. Forms raise it, because it uses your boosted stats. Gravity multiplies what the gear weighs: 50 kg at 10 G is a 500 kg load.</p>
        <p><strong>Zones.</strong> Below ${pct(g.tpIdealRatioLow)} of ideal you're Comfortable (TP climbs from ×1 to ×${g.tpPeakMultiplier}). From ${pct(g.tpIdealRatioLow)} to ${pct(g.tpIdealRatioHigh)} is Ideal (×${g.tpPeakMultiplier}, no penalty). Up to ${pct(g.tpOverloadRatio)} the bonus keeps rising to ×${g.tpHeavyMultiplier}, but you lose speed and stats (up to −${pct(g.maxWeightPenalty)}). Past ${pct(g.tpOverloadRatio)} the bonus falls, and at ${pct(g.tpOverloadHardRatio)} you're Overloaded: no bonus, full penalty.</p>
        <p><strong>Gravity</strong> adds its own TP bonus: +${fmt(g.tpGravityBonusPerGravity * 100, 1)}% per G of net gravity (gravity minus your resistance), up to ${fmt(g.hardStopThreshold)} G, where it stops and flight is blocked. Each net G also cuts STR, SKP, PWR, DEF and STM by ${pct(g.statReductionPerGravity)}. In the Time Chamber the chamber's own ${fmt(g.gravityPerWorld["dragonminez:time_chamber"])} G makes your gear heavier but gives no gravity TP bonus; the chamber gives ×${fmt(gp.HTCTpMultiplier, 2)} TP instead.</p>
        <p><strong>Bulma's dampeners</strong> (side quests "Gravity Device Mk2/Mk3") cut the weight penalty by up to ${pct(g.gravityRoomMk2Relief)} / ${pct(g.gravityRoomMk3Relief)} while you stand in an active Gravity Device field. The cut shrinks as you get stronger.</p>
      </div>
      <div class="card"><h3>Formulas (from the mod code)</h3>
<div class="formula">relative level = (Σ stat × form mult − starting stats) / 6 + 1
ideal weight   = round(relative level / ${g.tpIdealBaseDivisor})
load           = round(kg × (1 + (gravity − 1) × ${g.gravitySensitivity}))
load ratio     = load / ideal weight
resistance (G) = avg(stat × mult) / (${fmt(gp.maxValue)} × ${g.resistanceStatDivisorRatio}) × ${g.resistanceScale}
net gravity    = gravity − resistance   (0 at ≤ 1 G)
gravity TP     = 1 + net × ${g.tpGravityBonusPerGravity}   (0 bonus at ≥ ${g.hardStopThreshold} G)
weight penalty = ${g.maxWeightPenalty} × (ratio − ${g.tpIdealRatioHigh}) / ${fmt(g.tpOverloadHardRatio - g.tpIdealRatioHigh, 2)}   (ratio > ${g.tpIdealRatioHigh})
total TP       = 1 + Σ (each bonus − 1)</div>
        <p class="hint" style="margin-top:10px">Ported from GravityLogic and StatsData in Dragon Mine Z 2.2.1. In level mode the calculator assumes your stats are spread evenly, which only matters when a form boosts some stats more than others. Enter your six stats for an exact result.</p>
      </div>
    </div>`;
  }

  // ================= Races & forms =================
  function raceInfo(id) { return arr(R.races).find((r) => r.id === id) || {}; }
  function renderRaces() {
    const list = C ? C.races : arr(R.races);
    view.innerHTML = head("Wiki", "Races", "Every playable race in the pack: classes, starting stats, TP rates and transformations. Tap a race to open it.") +
      `<div class="filters"><input type="search" data-filter placeholder="Filter races…" aria-label="Filter races"><span class="count" id="cnt"></span></div>` +
      list.map((cr) => {
        const ri = raceInfo(cr.id);
        const src = ri.source || "";
        const classes = cr.classes || arr(ri.classes);
        const riClasses = arr(ri.classes);
        const groups = arr(ri.formGroups);
        const formsByGroup = {};
        (cr.forms || []).forEach((f) => (formsByGroup[f.group] = formsByGroup[f.group] || []).push(f));
        return `<details class="race" data-text="${esc((cr.name + " " + JSON.stringify(ri)).toLowerCase())}"><summary>
          <div class="race-head"><h3>${esc(cr.name || ri.name)}</h3>${src ? `<span class="src ${/noea/i.test(src) ? "noea" : ""}" style="font-family:var(--font-display);font-size:.7rem;font-weight:700;padding:1px 6px;border-radius:4px;background:${/noea/i.test(src) ? "var(--accent-soft)" : "var(--ki-soft)"};color:${/noea/i.test(src) ? "var(--accent)" : "var(--ki)"}">${esc(src)}</span>` : ""}<span class="count">${(cr.forms || []).length} forms · ${classes.length} classes</span></div>
          ${ri.summary ? `<p class="hint" style="font-size:.92rem;color:var(--ink-2)">${esc(strip(ri.summary))}</p>` : ""}
        </summary><div class="body">
          ${ri.racialSkill ? `<div class="entry wide"><h3>Racial skill: ${esc(ri.racialSkill.name || ri.racialSkill.id || "")}</h3><p>${esc(strip(ri.racialSkill.effect || ""))}</p></div>` : ""}
          <div><h3 style="margin-bottom:8px">Classes</h3><div class="tablewrap"><table><thead><tr><th>Class</th>${E.STATS.map((k) => `<th>${k}</th>`).join("")}<th>TP gain</th><th>TP cost</th><th>Passive</th></tr></thead><tbody>
            ${classes.map((c) => { const rc = riClasses.find((x) => x.id === c.id) || {}; return `<tr><td>${esc(c.name)}</td>${E.STATS.map((k) => `<td class="n">${fmt((c.baseStats || {})[k] ?? 0)}</td>`).join("")}<td class="n">×${fmt(c.tpGainMultiplier, 2)}</td><td class="n">×${fmt(c.tpCostMultiplier, 2)}</td><td class="wrap">${esc(strip(rc.passive?.summary || ""))}</td></tr>`; }).join("")}
          </tbody></table></div><p class="hint">Starting stats per class. TP gain multiplies TP you earn; TP cost multiplies what stat points cost.</p></div>
          <div><h3 style="margin-bottom:8px">Transformations</h3>${formTable(Object.values(formsByGroup).flat(), groups, cr.id)}</div>
          ${raceDetails(ri)}
        </div></details>`;
      }).join("");
    wireFilter();
  }
  function raceDetails(ri) {
    const ch = ri.character || {};
    const costs = ch.formSkillCosts || ch.formSkillsCosts;
    const rows = Object.entries(ch).filter(([k]) => !/^formSkills?Costs$|^racialSkill$/.test(k)).map(([k, v]) => `<dt>${esc(pretty(k))}</dt><dd>${valueHTML(v)}</dd>`).join("");
    const groupName = (id) => (arr(ri.formGroups).find((g) => g.id === id) || {}).name || pretty(id);
    const costRows = costs && typeof costs === "object" ? Object.entries(costs).map(([gid, c]) => {
      const prices = arr(c && c.prices).map((p) => (p < 0 ? "not for sale" : fmt(p))).join(" → ");
      if (!prices) return "";
      return `<dt>${esc((c && c.name) || groupName(gid))}</dt><dd>${prices}${c && c.buyFromMaster ? " · from a master" : ""}</dd>`;
    }).join("") : "";
    if (!rows && !costRows) return "";
    return `<div class="entry wide"><h3>Race details</h3>${rows ? `<dl>${rows}</dl>` : ""}${costRows ? `<h3 style="font-size:.95rem;margin-top:6px">Form skill prices (TP per level)</h3><dl>${costRows}</dl>` : ""}</div>`;
  }
  function formExtra(groups, f) {
    const g = groups.find((x) => x.id === f.group);
    const fx = g ? arr(g.forms).find((x) => x.id === f.id) : null;
    return { g, fx };
  }
  function formTable(forms, groups, raceId) {
    if (!forms.length) return `<p class="hint">No forms.</p>`;
    return `<div class="tablewrap"><table><thead><tr><th>Form</th><th>Group</th><th>STR</th><th>SKP</th><th>DEF</th><th>PWR</th><th>VIT</th><th>ENE</th><th>Speed</th><th>Max mastery bonus</th><th>How to unlock</th></tr></thead><tbody>
      ${forms.map((f) => { const { g, fx } = formExtra(groups, f); return `<tr data-text="${esc((f.name + " " + f.group + " " + raceId).toLowerCase())}"><td><strong>${esc(f.name)}</strong></td><td>${esc(g?.name || pretty(f.group))}</td>${["STR", "SKP", "DEF", "PWR", "VIT", "ENE", "SPEED"].map((k) => `<td class="n">×${fmt(f.mult[k] ?? 1, 2)}</td>`).join("")}<td class="n">${f.maxStatsMultiplier > 1 ? "×" + fmt(f.maxStatsMultiplier, 2) : "–"}</td><td class="wrap">${esc(strip(fx?.unlock || g?.unlockedBy || ""))}</td></tr>`; }).join("")}
    </tbody></table></div>`;
  }
  function renderForms() {
    const races = C.races;
    const rows = allForms();
    const groupsFor = (race) => (race === "*" ? arr(R.sharedFormGroups) : arr(raceInfo(race).formGroups));
    const raceName = (id) => (id === "*" ? "Any race" : (races.find((r) => r.id === id) || {}).name || id);
    let sortKey = "STR", sortDir = -1, raceFilter = store.get("formsRace", "all");
    view.innerHTML = head("Wiki", "All transformations", "Every form's stat multipliers side by side. Click a column to sort. Mastery multiplies a form's boosts by up to the last column at full mastery.") +
      `<div class="filters"><input type="search" data-filter placeholder="Filter forms…" aria-label="Filter forms"><div class="chips" id="raceChips">${["all", ...races.map((r) => r.id), "*"].map((id) => `<button class="chip" data-race="${id}" aria-pressed="${id === raceFilter}">${esc(id === "all" ? "All" : raceName(id))}</button>`).join("")}</div><span class="count" id="cnt"></span></div><div id="ftable"></div>` +
      (has(R.formRules) ? `<h3 class="section-title">How forms work</h3><div class="card prose"><ul>${arr(R.formRules).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>` : "");
    const cols = [["name", "Form"], ["race", "Race"], ["group", "Group"], ["STR", "STR"], ["SKP", "SKP"], ["DEF", "DEF"], ["PWR", "PWR"], ["VIT", "VIT"], ["ENE", "ENE"], ["SPEED", "Speed"], ["maxStatsMultiplier", "Mastery ×"], ["unlock", "How to unlock"]];
    const draw = () => {
      const q = ($("[data-filter]", view).value || "").trim().toLowerCase();
      const list = rows.filter((f) => raceFilter === "all" || f.race === raceFilter).map((f) => {
        const groups = groupsFor(f.race), g = groups.find((x) => x.id === f.group), fx = g ? arr(g.forms).find((x) => x.id === f.id) : null;
        return Object.assign({}, f, { raceName: raceName(f.race), groupName: g?.name || pretty(f.group), unlock: strip(fx?.unlock || g?.unlockedBy || ""), src: fx?.source || g?.source || "" });
      }).filter((f) => !q || q.split(/\s+/).every((w) => (f.name + " " + f.raceName + " " + f.groupName + " " + f.unlock).toLowerCase().includes(w)));
      const val = (f) => (sortKey in (f.mult || {}) ? f.mult[sortKey] ?? 1 : sortKey === "race" ? f.raceName : sortKey === "group" ? f.groupName : f[sortKey] ?? "");
      list.sort((a, b) => { const x = val(a), y = val(b); return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y))) * sortDir; });
      $("#cnt", view).textContent = `${list.length} forms`;
      $("#ftable", view).innerHTML = `<div class="tablewrap"><table><thead><tr>${cols.map(([k, l]) => `<th data-k="${k}" aria-sort="${k === sortKey ? (sortDir > 0 ? "ascending" : "descending") : "none"}">${l}${k === sortKey ? (sortDir > 0 ? " ▲" : " ▼") : ""}</th>`).join("")}</tr></thead><tbody>${list.map((f) => `<tr><td><strong>${esc(f.name)}</strong>${f.src && /noea/i.test(f.src) ? ' <span class="src noea" style="font-size:.65rem;padding:0 5px;border-radius:4px;background:var(--accent-soft);color:var(--accent);font-family:var(--font-display);font-weight:700">NOEA</span>' : ""}</td><td>${esc(f.raceName)}</td><td>${esc(f.groupName)}</td>${["STR", "SKP", "DEF", "PWR", "VIT", "ENE", "SPEED"].map((k) => `<td class="n">×${fmt(f.mult[k] ?? 1, 2)}</td>`).join("")}<td class="n">${f.maxStatsMultiplier > 1 ? "×" + fmt(f.maxStatsMultiplier, 2) : "–"}</td><td class="wrap">${esc(f.unlock)}</td></tr>`).join("")}</tbody></table></div>`;
      $("#ftable", view).querySelectorAll("th").forEach((th) => th.addEventListener("click", () => { const k = th.dataset.k; if (k === sortKey) sortDir = -sortDir; else { sortKey = k; sortDir = ["name", "race", "group", "unlock"].includes(k) ? 1 : -1; } draw(); }));
    };
    $("[data-filter]", view).addEventListener("input", draw);
    $("#raceChips", view).querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { raceFilter = b.dataset.race; store.set("formsRace", raceFilter); $("#raceChips", view).querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(); }));
    draw();
  }

  // ================= Other views =================
  function renderTraining() {
    listView("Training & TP", "How you earn Training Points and the training minigames.", [
      ["Training", W.training], ["TP sources", W.tpSources], ["Difficulty", W.difficulty],
    ], "Wiki");
    if (has(W.tpRules)) view.insertAdjacentHTML("beforeend", `<h3 class="section-title">Spending TP</h3><div class="card prose"><ul>${arr(W.tpRules).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>`);
  }
  function renderWorld() {
    const db = W.dragonBalls ? [Object.assign({ name: "Dragon Balls" }, W.dragonBalls)] : [];
    listView("World", "Dimensions, planets, raids, tournaments and the Dragon Balls.", [
      ["Dimensions (DMZ)", tagSrc(W.dimensions, "DMZ")], ["Planets (Noea)", tagSrc(N.planets, "Noea")], ["Raids", tagSrc(W.raids, "DMZ").concat(tagSrc(N.raids, "Noea"))],
      ["Tournaments", tagSrc(W.tournaments, "DMZ").concat(tagSrc(N.tournaments, "Noea"))], ["Dragon Balls", db, { wide: true }], ["Wishes (Noea)", tagSrc(N.wishes, "Noea")], ["World bosses", W.worldBosses],
    ]);
    if (has(W.worldBossRules)) view.insertAdjacentHTML("beforeend", `<h3 class="section-title">World boss rules</h3><div class="card prose"><ul>${arr(W.worldBossRules).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>`);
  }
  function renderQuests() {
    listView("Quests", "Story sagas, side quests and Noea's planet missions.", [
      ["Side quests", W.sideQuests], ["Noea missions", tagSrc(N.missions, "Noea")],
    ]);
    if (has(W.sagas)) {
      const sagaHTML = arr(W.sagas).map((s) => `<details class="race" data-text="${esc((s.name + " " + JSON.stringify(s.quests || [])).toLowerCase())}"><summary><div class="race-head"><h3>${esc(s.name)}</h3><span class="count">${fmt(s.questCount || arr(s.quests).length)} quests</span></div>${s.requires ? `<p class="hint" style="color:var(--ink-2)">${esc(strip(s.requires))}</p>` : ""}</summary>
        <div class="body"><div class="tablewrap"><table><thead><tr><th>#</th><th>Quest</th><th>Goal</th><th>Reward</th></tr></thead><tbody>${arr(s.quests).map((q) => `<tr><td class="n">${esc(q.n ?? "")}</td><td><strong>${esc(strip(q.name))}</strong></td><td class="wrap">${esc(strip(q.goal))}</td><td class="wrap">${esc(strip(q.reward))}</td></tr>`).join("")}</tbody></table></div></div></details>`).join("");
      const anchor = view.querySelector(".filters");
      anchor.insertAdjacentHTML("afterend", `<h3 class="section-title">Story sagas <span class="count">${arr(W.sagas).length}</span></h3><div>${sagaHTML}</div>`);
      wireFilterAgain();
    }
    if (has(W.partyAndStory)) view.insertAdjacentHTML("beforeend", `<h3 class="section-title">Parties & story</h3><div class="card prose"><ul>${arr(W.partyAndStory).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>`);
  }
  function wireFilterAgain() { const f = view.querySelector("[data-filter]"); if (f) f.dispatchEvent(new Event("input")); }
  function renderNoea() {
    const extra = [];
    if (N.fusion) extra.push(Object.assign({ name: "Fusion" }, N.fusion));
    if (N.gamma) extra.push(Object.assign({ name: "Gamma editor" }, N.gamma));
    listView("Dragon Block Noea", N.overview || "What the Noea add-on adds on top of Dragon Mine Z.", [
      ["Features", N.features], ["Fusion & Gamma", extra], ["Bosses", N.bosses], ["New races & forms", N.racesAndForms],
      ["Changes to Dragon Mine Z", arr(N.changesToDmz).map((t) => ({ name: String(t).split(/[.:]/)[0].slice(0, 70), what: t })), {}],
      ["Unfinished in this build", arr(N.unfinished).map((t) => ({ name: String(t).split(/[.:]/)[0].slice(0, 70), what: t }))],
    ], "Add-on");
  }
  function renderCommands() {
    listView("Commands & keys", "Chat commands, default keybinds and gamerules.", [
      ["Commands (DMZ)", tagSrc(W.commands, "DMZ")], ["Commands (Noea)", tagSrc(N.commands, "Noea")],
      ["Keybinds", tagSrc(W.keybinds, "DMZ").concat(tagSrc(N.keybinds, "Noea"))], ["Gamerules", W.gamerules],
    ]);
  }
  function renderMechanics() {
    listView("Stats & mechanics", "What each stat does and the formulas behind HP, ki and damage.", [
      ["Stats", R.stats], ["Derived values", R.derived],
    ]);
    if (has(R.formRules)) view.insertAdjacentHTML("beforeend", `<h3 class="section-title">Form rules</h3><div class="card prose"><ul>${arr(R.formRules).map((x) => `<li>${esc(strip(x))}</li>`).join("")}</ul></div>`);
  }

  // ================= Global search =================
  const INDEX = [];
  const add = (v, items) => arr(items).forEach((o) => o && typeof o === "object" && INDEX.push({ v, t: titleOf(o), s: JSON.stringify(o).toLowerCase() }));
  if (C) { C.races.forEach((r) => INDEX.push({ v: "races", t: r.name, s: r.name.toLowerCase() + " race" })); allForms().forEach((f) => INDEX.push({ v: "forms", t: f.name, s: (f.name + " " + f.group + " form " + f.race).toLowerCase(), sub: pretty(f.group) })); }
  add("skills", W.skills); add("techniques", W.techniques); add("training", W.training); add("items", W.items); add("items", N.items); add("npcs", W.npcs);
  add("world", W.dimensions); add("world", N.planets); add("world", W.raids); add("world", W.tournaments); add("quests", W.sagas); add("quests", W.sideQuests); add("quests", N.missions);
  add("world", W.worldBosses); add("noea", N.features); add("noea", N.bosses); add("commands", W.commands); add("commands", N.commands); add("commands", W.keybinds); add("mechanics", R.stats);
  const q = $("#q"), qres = $("#qres");
  q.addEventListener("input", () => {
    const s = q.value.trim().toLowerCase();
    if (s.length < 2) { qres.hidden = true; return; }
    const words = s.split(/\s+/);
    const hits = INDEX.map((e) => ({ e, score: (e.t.toLowerCase().includes(s) ? 0 : 1) + (e.t.toLowerCase().startsWith(s) ? -1 : 0) })).filter(({ e }) => words.every((w) => e.s.includes(w) || e.t.toLowerCase().includes(w))).sort((a, b) => a.score - b.score).slice(0, 30);
    qres.innerHTML = hits.length ? hits.map(({ e }) => `<button type="button" data-v="${e.v}" data-t="${esc(e.t)}">${esc(e.t)}<small>${esc((VIEWS.find((x) => x.id === e.v) || {}).name || e.v)}${e.sub ? " · " + esc(e.sub) : ""}</small></button>`).join("") : `<div class="hint" style="padding:10px 12px">No matches.</div>`;
    qres.hidden = false;
    qres.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      qres.hidden = true; q.value = "";
      pendingFilter = b.dataset.t;
      if (location.hash === "#" + b.dataset.v) route(); else location.hash = b.dataset.v;
    }));
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) qres.hidden = true; });
  q.addEventListener("keydown", (e) => { if (e.key === "Escape") { qres.hidden = true; q.blur(); } if (e.key === "Enter") { const b = qres.querySelector("button"); if (b) b.click(); } });

  route();
})();
