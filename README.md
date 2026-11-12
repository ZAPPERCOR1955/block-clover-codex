# Black Clover Mod Wiki

An unofficial wiki for the **Black Clover** mod by Vez (v0.3.2, Minecraft 1.21.1 / NeoForge).
Everything on it was read from the mod's decompiled code and its language file.

Live at **https://stockscout.uk/** (GitHub Pages serves `index.html` from this branch).

## What's on it

- **Grimoires**: all 33 magic types, with rarity, ceremony draw chance and every spell's damage, range, duration, cooldown and mana cost
- **Spell index**: all 177 spells in one sortable table
- **Races, modes and paths**: roll odds, stat caps, Dash and Leap, and the Ki, Mana, Spirit and Devil paths
- **World**: bosses, server events, gamemodes, quests, structures, armor sets and brooms
- **Server**: admin commands and gamerules

## Editing

The page is one self-contained file. To change it, edit `src/page.html` (layout and scripts) or
`data/wiki.json` (content), then run:

```
python3 build.py
```

which writes a new `index.html`.
