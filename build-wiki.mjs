// Builds index.html: one self-contained page (wiki + weight calculator), ready for GitHub Pages.
//
//   node build-wiki.mjs [--config <instance config/dragonminez dir>] [--lang <en_us.json> ...]
//
// --config: refreshes data/calc.json (races, classes, forms, gravity/TP settings) from a game's
//           config/dragonminez folder. Without it the existing calc.json is used.
// --lang:   lang files used for display names when refreshing calc.json.
// Wiki text comes from data/{races,dmz-world,noea}.json (extracted from the decompiled mods).
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (name) => { const out = []; args.forEach((a, i) => a === name && args[i + 1] && out.push(args[i + 1])); return out; };
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const demojibake = (s) => (/Ã[-¿]/.test(s) ? Buffer.from(s, "latin1").toString("utf8") : s);
const strip = (s) => demojibake(String(s ?? "")).replace(/§./g, "").trim();
const pretty = (id) => id.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());

// ---------- calc.json from a live config folder ----------
const configDir = opt("--config")[0];
if (configDir) {
  const lang = {};
  for (const f of opt("--lang")) Object.assign(lang, readJson(f));
  const L = (key, fallback) => (lang[key] ? strip(lang[key]) : fallback);
  const gs = readJson(join(configDir, "general-server.json"));
  const formFiles = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => join(dir, f)) : []);
  const readForms = (file, race) => {
    const j = readJson(file);
    const group = j.groupName || file.replace(/^.*[\\/]/, "").replace(/\.json$/, "");
    return Object.entries(j.forms || {}).map(([id, d]) => ({
      id, group, formType: j.formType || "",
      name: L(`race.dragonminez.${race}.form.${group}.${id}`, L(`race.dragonminez.stack.form.${group}.${id}`, pretty(id))),
      mult: { STR: d.strMultiplier, SKP: d.skpMultiplier, STM: d.stmMultiplier, DEF: d.defMultiplier, VIT: d.vitMultiplier, PWR: d.pwrMultiplier, ENE: d.eneMultiplier, SPEED: d.speedMultiplier },
      maxMastery: d.maxMastery ?? 0, maxStatsMultiplier: d.maxStatsMultiplier ?? 1,
      stackable: !!d.formStackable,
    }));
  };
  const races = readdirSync(join(configDir, "races")).filter((r) => statSync(join(configDir, "races", r)).isDirectory()).sort().map((race) => {
    const dir = join(configDir, "races", race);
    const stats = readJson(join(dir, "stats.json"));
    const ch = existsSync(join(dir, "character.json")) ? readJson(join(dir, "character.json")) : {};
    const classes = Object.entries(stats.classes || {}).map(([id, c]) => ({
      id, name: L(`class.dragonminez.${id}`, pretty(id)),
      baseStats: c.baseStats, initialStats: Object.values(c.baseStats || {}).reduce((a, b) => a + b, 0),
      tpGainMultiplier: c.tpGainMultiplier ?? 1, tpCostMultiplier: c.tpCostMultiplier ?? 1,
    }));
    const forms = formFiles(join(dir, "forms")).flatMap((f) => readForms(f, race));
    return { id: race, name: L(`race.dragonminez.${race}`, pretty(race)), racialSkill: ch.racialSkill || "", classes, forms };
  });
  const shared = formFiles(join(configDir, "forms")).flatMap((f) => readForms(f, "stack"));
  const pick = (o, keys) => Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));
  const calc = {
    races, sharedForms: shared,
    cfg: {
      gravity: gs.gravity,
      gameplay: pick(gs.gameplay, ["maxValue", "tpGainMultiplier", "increaseTPGainRelativeToTPCost", "progressionReferenceLevel", "globalTPCostMultiplier", "minTPCost", "maxTPDiscount", "tpPerHit", "passiveTpGain", "tpPer20BlocksTraveled", "tpPerBlockMined", "tpPerItemCrafted", "gravityBonusEnabled", "HTCTpMultiplier", "otherworldDeadTpMultiplier", "kamiBlessTpMultiplier", "kamiBlessDurationSeconds", "kamiBlessCooldownSeconds", "easyModeTPMultiplier", "hardModeTPMultiplier", "multiplicationInsteadOfAdditionForMultipliers", "tpGainBoosts"]),
      dynamicGrowth: pick(gs.dynamicGrowth, ["manualTpPurchasesEnabled", "attributeTpCostMultiplier", "growthStatsCountForTpCost"]),
      racialSkills: { enableRacialSkills: gs.racialSkills.enableRacialSkills, frostdemon: pick(gs.racialSkills.frostdemon || {}, ["enabled", "tpBoost"]) },
      mutant: pick(gs.mutant, ["enabled", "tpGainMultiplier"]),
    },
    dimensionNames: Object.fromEntries(Object.keys(gs.gravity.gravityPerWorld).map((d) => [d, L(`dimension.${d.replace(":", ".")}`, pretty(d.split(":")[1]))])),
    source: { dmz: gs.configVersion, builtFrom: "config/dragonminez of the Dragon Ball Test 1 profile" },
  };
  calc.dimensionNames["minecraft:overworld"] = "Overworld";
  calc.dimensionNames["minecraft:the_nether"] = "The Nether";
  calc.dimensionNames["minecraft:the_end"] = "The End";
  writeFileSync(join(here, "data", "calc.json"), JSON.stringify(calc, null, 1));
  console.log(`calc.json: ${races.length} races, ${races.reduce((a, r) => a + r.forms.length, 0)} race forms, ${shared.length} shared forms`);
}

// ---------- page ----------
const data = {};
for (const name of ["calc", "races", "dmz-world", "noea"]) {
  const p = join(here, "data", `${name}.json`);
  data[name] = existsSync(p) ? readJson(p) : null;
  if (!data[name]) console.warn(`missing data/${name}.json`);
}
const page = readFileSync(join(here, "src", "page.html"), "utf8");
const engine = readFileSync(join(here, "src", "weights-engine.js"), "utf8");
const app = readFileSync(join(here, "src", "app.js"), "utf8");
const json = JSON.stringify(data).replace(/</g, "\\u003c");
const out = page
  .replace("/*__DATA__*/", () => `window.WIKI_DATA = ${json};`)
  .replace("/*__ENGINE__*/", () => engine)
  .replace("/*__APP__*/", () => app);
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Unofficial wiki and training weight calculator for Dragon Mine Z 2.2.1 + Dragon Block Noea 1.2.0.">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${out}
</html>
`;
writeFileSync(join(here, "index.html"), doc);
console.log(`index.html: ${(doc.length / 1024).toFixed(0)} KB`);
