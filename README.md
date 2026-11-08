# Noea Pack Wiki

An unofficial wiki and **training weight calculator** for the Dragon Block Noea Pack
(Minecraft 1.20.1 / Forge): **Dragon Mine Z 2.2.1** plus the **Dragon Block Noea 1.2.0** add-on.
Everything on it was read from the two mods' decompiled code and the pack's config files.

Live at **https://stockscout.uk/** (GitHub Pages serves `index.html` from this branch).

## What's on it

- **Weight Calculator**: how many kg of weighted gear to carry for the biggest TP bonus, for your race, class, level, form, dimension, King Kai and Gravity Device. Ported from Dragon Mine Z's `GravityLogic` and `StatsData`.
- **Races & Forms**: every race, class, starting stats, TP rates and all 127 transformations with their multipliers and unlocks.
- **Skills, Ki & Strikes, Training & TP, Items, NPCs, World, Quests**: Dragon Mine Z's content.
- **Noea**: space travel, planets, bosses, missions, fusion, Gamma, wishes, Noea items, and what Noea changes in Dragon Mine Z.
- **Commands & Keys** and **Mechanics** (stat formulas, how forms stack).

## Files

- `index.html`: the built site (one self-contained page, no build step needed to host it).
- `src/page.html`, `src/app.js`, `src/weights-engine.js`: page layout, wiki views and calculator maths.
- `data/*.json`: the extracted wiki data (`calc.json` holds the pack's race/form/gravity settings).
- `build-wiki.mjs`: rebuilds `index.html` from `src/` and `data/`.

```
node build-wiki.mjs        # rebuild index.html
node serve-preview.mjs     # preview at http://localhost:5178
```

To refresh the calculator numbers from a game's configs:
`node build-wiki.mjs --config "<game folder>/config/dragonminez" --lang <en_us.json> ...`

## Credits

Unofficial fan reference. Dragon Mine Z is by Yuseix300 & ezShokkoh (GPL-3.0); `src/weights-engine.js`
ports its formulas and is GPL-3.0 as well. Dragon Block Noea is by ButterJaffa and contributors
(all rights reserved); this site only describes its features in its own words and contains none of its code or assets.

The previous Block Clover Codex is in this repo's history (commit `c25e794`).
