# Changelog and Verification

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

This codex was written against **Block Clover 1.8.1**, the NeoForge 1.21.1 build uploaded on 1 November 2026, and first built from 1.7.0 a week earlier. The mod has shipped a release roughly every week since the start of October, so expect numbers to move. The release notes below are condensed from the author's CurseForge changelogs; everything else in the codex comes from the 1.7.0 code itself.

## Release history

| Version | Date | Loader | Highlights |
|---|---|---|---|
| 1.8.1 | 2026-11-01 | NeoForge 1.21.1 | Saint Spirit Dive, Faust House rides, Second Sight range, dungeon quest fixes |
| 1.8.0 | 2026-10-31 | NeoForge 1.21.1 | Dungeons and Mars, Mineral and Slash magic, Jack the Ripper, spirit and Liebe bond progression, new Time, Star and Lightning spells, sword progression rework, event gamerules |
| 1.7.0 | 2026-10-24 | NeoForge 1.21.1 | Magna's Fire Magic, Anti-Magic skill tree, Faust House and the Liebe fight, Devil Arm, Valkyrie Spear, Mana Method and Mana Zone rework |
| 1.6.0 | 2026-10-17 | NeoForge 1.21.1 | Asta, Yuno and Mereoleona boss forms, Vanessa and Magna NPCs, Magic Bullet, challenges, mastery titles, unique-magic gamerules |
| 1.5.1 | 2026-10-08 | NeoForge 1.21.1 | Bug fixes and small improvements |
| 1.5.0 | 2026-10-02 | NeoForge 1.21.1 | Eight new magics, quests tab, skill quests, Kingdoms, Bonds, parties, duels, titles |
| 1.3.1 | 2026-08-26 | NeoForge 1.21.1 | Fix for worlds that could not be rejoined |
| 1.3.0 | 2026-08-25 | NeoForge 1.21.1 | Entrance Exam with four stages and squad offers |
| 1.2.0 | 2026-08-21 | NeoForge 1.21.1 | Yultim Volcano, Mana Skin and Mana Zone quests, Yami, magic stones |
| 1.1.0 | 2026-08-03 | NeoForge 1.21.1 | Time and Lightning magic, mission tiers, 20 max mana per level |
| 1.0.0 | 2026-07-27 | NeoForge 1.21.1 | Full rewrite for 1.21.1 with Wind, Light, Dark and Anti-Magic |
| 0.1.0 to 0.4.0 | 2026-01 to 2026-05 | Forge 1.20.1 | The previous rewrite; not compatible with the current saves |
| 1.8.6 to 1.9.20 | 2024-10 to 2025-03 | Forge 1.20.1 | The original mod line; the version numbers restarted after it |

Version numbers restarted twice, so "1.7.0" is newer than the old "1.9.20". When comparing servers, check the loader and date, not only the number.

## 1.8.1 (1 November 2026)

- Saint Spirit Dive at 100% spirit bond, using the Full Spirit Dive model; Full Spirit Dive is stronger and a higher Dive stage replaces the previous one.
- Faust House is a Magna travel destination at twice the fare; Black Bulls still ride free.
- Shadow Second Sight no longer needs you to look at the eye; control range 128 blocks, through-wall detection 96 blocks.
- Dungeon quests complete when you help defeat Mars or loot the treasure room; crumbling dungeons close their outside portal when the last player leaves. The Strong Magic Region condition was removed from the dungeon quest.
- Base Jack's natural spawn rate matches Yami's. Descriptions for Severing Rush and Mars's Mineral spells.
- Fixes: Salamander and Undine transformations hidden without Spirit Wind, brooms unusable while a dungeon crumbles, time-stopped entities staying invulnerable, mission refresh timers stuck at zero.
- Removed: the `/liebecontract` and `/blockclover wizardemperor` commands.

## 1.8.0 (31 October 2026)

Added:

- Dungeons, with Mars as their boss, Magic Crystals that merchants buy for 100 Yul, and the First Dungeon quest.
- Mineral Magic (Mars) and Slash Magic (Jack the Ripper, base and Spade Raid versions) as playable magics, with Slash adaptation and Final Slash's last stand.
- Thunder Arrow for Lightning, four Time spells (Chrono Stasis: Throw, Time Binding: Chrono Lock, Time Acceleration, Future Sight), two Star spells plus Star Beams, Black Meteorite for Wind, Spirit Wind and Star users holding Demon Dweller, Infinite Slash for Asta, Saint Spirit of Zephyr.
- Spirit Dive for every spirit, Full Spirit Dive, spirit scrolls, and spirit bond progression with damage, mana and regen bonuses and milestones at 25%, 50% and 100%.
- Liebe bond progression on top of the existing Devil Union and True Devil Union requirements; the old power percentage system was removed.
- Gamerules for Black Market reset time, Entrance Exam wait time and Star Festival time. Sprint flight for selected transformations, wing animations, Ki destroying magical attacks, playtime in the Overview, grimoire textures for Nacht and Zora, Yuno's 2% Magic Stone drop, and the "Gotta Catch Them All" title.

Reworked:

- Demon sword progression: Demon Dweller comes from dungeons, Destroyer needs Dweller, Slasher needs Destroyer.
- Devil Arm acquisition now needs level 25 and Black Form, and the bargain is required before the ritual.
- Magic Bullet gives no XP and its cooldown doubled. Leg Strength Boost and Flash Step, Mana Zone requirements for several spells, the multiplayer Entrance Exam, Singularity, Chrono Stasis (stops combat AI), Flame Knuckles animation, elemental trap visuals.

Fixes: Devil Arm overlapping the unions, Liebe's texture, items on brooms, party chat, sneaking on Ctrl, transformation armour visibility and removal, Sea Dragon's Nest on uneven ground, the skill-point display, Mana Skin trial progress while dead, Black Market price switching, interference in the Liebe fight, Thunder Fiend visuals, Hellfire never ending with enough regen, the one-broom limit, spells vanishing on plants, hybrid roll visuals, Mana Zone incompatibilities, and Anti-Magic Wind and Star spells showing without Anti-Magic.

## 1.7.0 (24 October 2026)

New content:

- Magna's Fire Magic with twelve spells, including Soul Chain Deathmatch, Flame Knuckles and Grand Slam. Royal Knights and the Spade Raid version of Magna were added as characters.
- Magna offers Crazy Cyclone rides, free for Black Bulls.
- The Anti-Magic skill tree replaces the Mana tree for Anti-Magic users, with chargeable Demon Slasher attacks and timed Zetten slashes.
- Faust House, the Basement Key and the Devil Binding Altar. Liebe's boss fight, a ritual cutscene and the Equal or Master-servant contract choice.
- Devil Arm bargains, and training requirements for Devil Union and True Devil Union. Liebe can follow you as a familiar in either form.
- Valkyrie Spear, 3D Valkyrie Dress armour, Vanessa's Hat and Magna's Glasses.
- Gravity's Evil God's Pressure Craft and usable Wind Spirit Scrolls.

Reworks:

- Mana Method and Mana Zone were reworked, including the Full Release.
- Transformation costs, drain, duration and flight were retuned.
- Noelle's water spells were improved and gained sneak variants.
- Yami teaches Ki for 500 Yul. Merchant trades, mob spawning, Anti-Bird behaviour and broom riding were adjusted.

Fixes: Magic Bullet problems, several spell effects, item names, unlock requirements and progression issues.

## 1.6.0 (17 October 2026)

- Asta and Yuno in several forms, from base to Final Arc, plus three versions of Mereoleona with full combat AI. Yami's combat AI was reworked.
- Vanessa and Magna NPCs; squad cloaks sold by Vanessa.
- Magic Bullet for every magic except Anti-Magic, usable before you own a grimoire, with a charge and a laser variant.
- Three challenges with completion tracking: magic changes every minute (Normal), 50,000 mana with no refills (Hard), one heart with infinite mana (Extreme).
- More titles, including the magic mastery titles, Heaven Splitter and Star Chaser, with unlock notifications and tooltips. Passing the exam grants Junior Magic Knight 5th Class.
- Gamerules for unique player magics and for disabling spell block destruction. A full player reset command with confirmation.
- Magic stones now give 200 max mana each.
- Projectile reflection, shields and Anti-Magic interactions improved. Gravity Warp works better against Dimension Slash. Demon-Destroyer's area ability has a shorter cooldown and cleanses more debuffs.

## 1.5.1 (8 October 2026)

Bug fixes and small improvements, no details given.

## 1.5.0 (2 October 2026)

- Eight magics added: Water (Noelle), Shadow, Fire (Mereoleona), Spatial, Ash, Spirit Wind, Gravity and Star. Anti-Magic infused spells for Wind.
- Trackable quests and skill quests. Kingdoms tab, Bonds tab for devil or spirit owners, Party tab, duels between players.
- Titles in the settings tab, grimoire GUI scaling, tameable Anti-Birds.
- Fixes for the Entrance Exam not passing on a high score and the volcano trial not spawning.

## 1.3.1 and 1.3.0 (25 and 26 August 2026)

- The Entrance Exam with four stages and squad offers at the end. Extra commands. Mana Skin became obtainable. Structure spawning fixed.
- 1.3.1 fixed worlds that could not be rejoined.

## 1.2.0 (21 August 2026)

- Yultim Volcano, spawning once per world, with Mereoleona giving its coordinates. Quests for Mana Skin and Mana Zone.
- Yami with three boss variants, only the first spawning naturally.
- Magic stones, at first only from the Black Market.
- Slowness while charging and casting. Health stat cap raised from +20 to +80.
- Black Market timer no longer resets when players leave.

## 1.1.0 (3 August 2026)

- Time and Lightning magic. New Grimoire Tower build. Bandits can drop magic tools.
- Mission tiers Easy, Normal and Hard. Levelling grants 20 max mana per level instead of 5.
- Fixes for tower selection, despawning knights and bandits, and deaths when landing a flying mount.

## 1.0.0 (27 July 2026)

The rewrite for NeoForge 1.21.1: Wind, Light, Dark and Anti-Magic as the playable magics, Drouot and the grimoire GUI, missions in normal and squad versions, the Black Market, magic tools, stats, skill trees and masteries, Reinforcement Magic, Mana Sense and Mana Pressure, spell discovery, five bandit tiers with attributes, XP and levels, per-spell levels, the race system with hybrids, True Devil Union, Zetten Slash and the admin commands.

## What this codex does not cover

- Spirit Wind's Spirit of Boreas, Euros, Notos and Saint Spirit of Boreas are listed in the grimoire but still marked as planned.
- Dungeon room layouts, trap types and the explorer bandits are described only in outline.
- Structure spacing and rarity: the worldgen folders in the jar are empty, so distances between towers, arenas and Faust Houses could not be read.
- NPC boss stat sheets beyond Liebe and Mars.

## Worth checking on your own server

Everything in the codex was read from code, not played. These are the places where a server's gamerules, lag or a hotfix could make the live game differ:

- Entrance exam pass bar (above 65) and the per-squad thresholds.
- Black Market cadence: five listings every 30 minutes, 30-second anti-snipe extension, refunds on outbid.
- The Liebe ritual: an Anti-Magic sword on the altar, the fight within 64 blocks, Liebe stopping at 1 HP and asking for a contract.
- Spirit bonding: one roll in 1,000 every five minutes at or above the `spiritMinimumLevel` gamerule.
- Squad pay every server hour: 300 base, 75 per rank step, 100 or 200 for officers.
- Mission board rotation every 10 minutes and the three-mission limit.
- Spell discovery pace at low health, which is the biggest multiplier in the formula.
- Dungeon gate cadence (every 60 minutes by default) and the 15-minute window before an unentered gate closes.
- Spirit scroll odds from the personal vault (1 in 400 per compatible spirit, 1 in 4 with a four-leaf grimoire).
- Bond experience caps: 40 per minute and 20 to 60 per enemy.

## Updating this codex for a new release

1. Decompile the new jar (Vineflower works on the whole jar in under a minute).
2. Diff the classes named in each page's **Sources** line against the previous version.
3. Update the affected Markdown pages, keeping the version note at the top of each page current.
4. Rebuild with `node build.js` and republish the generated file.

---
*Sources: CurseForge file pages for each release (changelog text), BlockcloverMod, CloverDungeon, CloverMagicData (planned spell markers), worldgen folders in the jar.*
