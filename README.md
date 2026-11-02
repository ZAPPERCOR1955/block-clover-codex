# Block Clover Codex

A mechanics reference for the Block Clover Minecraft mod (NeoForge 1.21.1), read from the mod's decompiled code.

- `index.html` is the published site (GitHub Pages serves it from this branch).
- The `NN-*.md` files are the chapters; `build.js` renders them into `wiki.html` (artifact fragment) and `index.html` (standalone).
- `node build.js && node check.js` rebuilds and validates links. `npm install` first for the `marked` dependency.
