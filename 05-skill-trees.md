# Skill Trees

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Open **Skill Trees** from the grimoire screen. There are four trees that spend skill points, plus six **skill branches** that upgrade individual techniques. Anti-Magic users see the Anti-Magic tree in place of the Mana tree; it is covered in [Bonds and Liebe](08-bonds-and-liebe.md).

Root nodes are free and already unlocked. Every other node costs 1 skill point unless noted, and needs its parent node first. Nothing can be refunded in this version except by an op reset.

## Mana tree

| Node | Needs | Cost | What it does |
|---|---|---|---|
| Mana Flow | – | free | Root. |
| Mana Sense | Mana Flow | 1 | Toggle: see nearby mana signatures through terrain, with aura strength. Range is the Mana Sense stat. |
| Reinforcement Magic | Mana Flow | 1 | Toggle: spend up to 5 points across head, body, arms and legs (see below). |
| Mana Recovery | Mana Flow | 1 | Passive: mana regen interval 15% shorter. |
| Mana Skin | Reinforcement Magic and Mereoleona's 30-second Strong Magic Region trial | 1 | Toggle: damage reduction for mana per second (see the Mana Skin branch). |
| Mana Pressure | Mana Sense | 1 | Shift + Mana Sense: overwhelm weaker mana nearby. 5 mana per second. |
| Leg Strength Boost | Reinforcement Magic | 1 | Toggle: speed and jump boost for mana per second. |
| Mana Zone | Mana Skin **and** Mana Sense, Mana Skin branch level 3, Mereoleona's hot spring trial | 2 | Toggle: gather natural mana, remote casting, air walking (see branch). |
| Mana Method | Mana Recovery | 2 | Toggle: gather natural mana and apply one "order" to your projectiles (see branch). |

The Mana tree cannot be bought into while Anti-Magic is your active magic.

### Reinforcement Magic

Five points shared across four body parts. Drain is 1 mana per second per point assigned. Effects while active:

- **Head**: +10% Mana Sense range per point. 2 or more points give Night Vision. Underwater you recover air faster with more points.
- **Body**: −4% incoming damage per point, +5% knockback resistance per point, and you thaw from freezing faster.
- **Arms**: +5% melee damage per point, +4% attack speed per point, Haste I at 1 point, II at 3, III at 5.
- **Legs**: Speed I at 1 point, II at 3, III at 5. Jump Boost I at 2 points, II at 4. +2% swim speed per point.

### Mana Pressure

Your mana presence is compared with each target's. Targets with less presence are suppressed: their outgoing damage drops by up to 65%, and they take feedback. Range is 4 to 20 blocks depending on your power. Allies, familiars and owned pets are never pressured. Willpower mastery reduces pressure you receive by 10% per rank.

## Skill branches

Each technique has a six-node chain under **Skill Trees > Branches**. The first node is granted free when you unlock the technique in the Mana tree (or awaken Ki); the other five cost 1 skill point each and must be bought in order.

### Ki branch

Ki is not in the Mana tree. Pay Yami 500 Yul to start training, then get hit by projectiles. Each projectile hit that damages you rolls to awaken Ki: 0.5% for arrows, 2% for spell hits. Anti-Magic users roll 6% and 30%. Since 1.8.0 Ki also cuts down magical attacks: a held melee weapon intercepts weak projectiles, and each Ki rank raises the strength it can destroy and shortens the delay between intercepts.

| Node | Effect |
|---|---|
| Ki Awareness | Sense visible movement within 5 blocks; sensed entities glow white. A held melee weapon intercepts weak arrows. |
| Expanded Awareness | 10 blocks, through walls. |
| Intent Reading | 15 blocks. Passive beings glow green, hostiles and players red. |
| Advanced Intent | 20 blocks. Players blue, threats targeting you dark red, other fights gold. |
| Wide Awareness | 25 blocks. |
| Unlock Zetten | Opens the Zetten branch. |

### Zetten branch

Zetten is a charged melee release with three modes: Single Strike, Five Hits, Flying Slash.

| Node | Single strike / Flying Slash | Five Hits (each) | Ready window | Cooldown |
|---|---|---|---|---|
| Zetten | ×1.5 | ×1.1 | 5 s | 18 s |
| Lasting Focus | ×1.5 | ×1.1 | 7 s | 18 s |
| Sharper Release | ×2.0 | ×1.2 | 7 s | 18 s |
| Rapid Focus | ×2.0 | ×1.2 | 7 s | 15 s |
| Perfect Control | ×2.25 | ×1.35 | 9 s | 15 s |
| Zetten Mastery | ×2.5 | ×1.5 | 10 s | 12 s |

### Mana Zone branch

Since 1.8.0 more spells need the Mana Zone node before they can be discovered: Dark's Equinox, Black Moon, Death Thrust and Iai Slash, Mereoleona's Purgatory and Abyss, Shadow's Dark Prison Hunting Ground, Time's Chrono Stasis Grigora, Spirit Wind's Hushed Dance, and Star's Never-Never Land and Black Neverland.

| Node | Target lock range | Drain per second | Extra |
|---|---|---|---|
| Mana Zone | 20 blocks | 12 | Gathers natural mana; +50% Mana Sense and Ki range; remote casts inside the range. |
| Expanded Domain | 30 | 12 | |
| Mana Footing | 30 | 12 | Air walking. |
| Efficient Domain | 30 | 10 | |
| Spatial Control | 40 | 9 | |
| Mana Dominion | 50 | 8 | Natural mana capacity 200%. Unlocks **Full Release**: 75 block range, +50% output and doubled sense range for 20 seconds, then 60 seconds recovery. Needs Mana Zone active and 25% natural mana stored. |

### Mana Skin branch

Toggle. Reduces damage while draining mana each second. The glow colour matches your magic.

| Node | Physical reduction | Magic reduction | Drain per second |
|---|---|---|---|
| Mana Skin | 2% | 6% | 6 |
| Hardened Skin | 5% | 6% | 6 |
| Arcane Shell | 5% | 14% | 6 |
| Efficient Skin | 5% | 14% | 5 |
| Balanced Layer | 6% | 18% | 4 |
| Mana Fortress | 8% | 22% | 3 |

Mana Skin "level" as quoted by Mereoleona counts the nodes bought: level 1 is the base, 2 after Hardened Skin, 3 after Arcane Shell or Efficient Skin, 4 after Balanced Layer, 5 after Mana Fortress.

### Leg Strength Boost branch

Reworked in 1.8.0. The branch now applies attributes directly: each speed level adds +20% movement speed, each jump level adds +0.1 jump power and one block of safe fall distance, and **Flash Step** is a 5-second burst that doubles your movement speed on a 30-second cooldown.

| Node | Speed | Jump Boost | Drain per second |
|---|---|---|---|
| Leg Strength Boost | I | I | 8 |
| Faster Steps | II | I | 8 |
| Skybound Legs | II | II | 8 |
| Efficient Reinforcement | II | II | 6 |
| Reinforced Movement | III | III | 5 |
| Flash Step | IV | IV | 4, plus Shift + Use dashes forward for 20 mana on a 3-second cooldown |

### Mana Method branch

Mana Method gathers **natural mana** (see [Mana](04-mana-and-anti-magic.md)) and applies one order to compatible projectile spells. Shift + the skill key cycles the order: Grow Bigger, Pursue Target, Go Faster, Pierce, Explode, Last Longer. Pursue Target also gives ×1.25 projectile speed and Go Faster ×1.5; mastery raises those to ×1.5 and ×1.75.

| Node | Natural mana capacity | Refill time |
|---|---|---|
| Mana Method | 100% of max mana | 60 s |
| Faster Inscription | 100% | 55 s |
| Natural Mana Capacity | 150% | 55 s |
| Efficient Method | 150% | 50 s, no idle drain |
| Stronger Arrays | 175% | 50 s |
| Mana Method Mastery | 200% | 40 s, stronger orders |

## Race tree

Ten nodes, all 1 point except the free origin. Layout: Origin leads to nodes 1, 2 and 3; node 1 leads to 4; node 2 leads to 5; node 3 leads to 6; node 5 leads to 7 and 9; the final node 8 needs both 7 and 9. Names and effects depend on your race. Hybrids get half of both parent races' bonuses, and their level-interval bonuses only trigger every second interval.

**Human**: Human Origin, Adaptive Footwork (+2% speed), Study Habit (+10% general XP), Mixed Training (+12% weapon damage, +25 max mana), Hard Worker (+1 stat point every 5 levels), Combat Adaptation (+16% weapon damage), Fast Learner (+1 skill point every 10 levels), Survival Footwork (+3% speed), Adaptation (+10% XP, +25 mana, +12% weapon damage), **Limit Breaker** (+20% XP, +2 stat points every 10 levels, +50 mana, +20% weapon damage).

**Elf**: Elf Origin, Arcane Luck (+15% luck, +15% spell practice XP), Mana Wellspring (+40 mana), Gentle Flow (regen 2 ticks faster), Lucky Insight (+20% luck), Mana Tutelage (+70 mana, +15% luck, regen 2 ticks faster, +1 skill point every 10 levels), Spell Instinct (+15% luck, +20% practice XP), Royal Mana (+90 mana), Ultimate Aptitude (+15% luck, +15% practice XP), **Apostle Arcana** (+140 mana, regen 3 ticks faster, +20% luck, +35% practice XP, +4% magic resistance).

**Witch**: Witch Origin, Curse Ward (+4% magic resistance), Broom Balance (+8% broom speed, +3% speed), Herbal Recovery (+20% healing), Hex Stitching (+20% healing, +4% magic resistance), Magic Control (+25 Mana Control, −8% spell cost, +8% broom), Broom Acceleration (+8% broom), Broom Mastery (+10% broom), Ritual Control (+20 Mana Control, −7% cost, +9% broom), **Queen's Rite** (+35 Mana Control, −12% cost, +12% broom, +35% healing, +6% magic resistance).

**Dwarf**: Dwarf Origin (+1 ore fortune, −4% speed), Dense Body (+2 armor, +3% physical resistance), Stone Stance (+18% knockback resistance), Tool Grip (+15% mining speed, +8% weapon damage), Mountain Guard (+3 armor, +12% knockback resistance, +4% physical resistance), Ore Sense (+20% mining, +1 fortune), Forge Hands (+12% weapon damage), Deep Delver (+20% mining, +1 fortune), Gemcraft (+10% mining, +1 fortune, +8% weapon damage), **Mountain Core** (+4 armor, +22% knockback resistance, +25% mining, +1 fortune, +15% weapon damage, +6% physical resistance, recovers 2% speed). Knockback resistance from the tree is capped at 75%.

## Combat tree

Nine nodes are listed (Footwork, Dash Mastery, Weapon Handling, Guard Break, Counter Step, Combo Flow, Heavy Strike, Air Step, Battle Rhythm) but the tree is disabled: the server refuses every purchase in 1.8.1.

## Anti-Magic tree

Replaces the Mana tree for Anti-Magic users. 33 nodes in four sword branches plus a control branch. Node requirements are player level, the sword's own level and parent nodes; only Devil Union and True Devil Union need a Liebe contract and bond. The full table is in [Bonds and Liebe](08-bonds-and-liebe.md).

## Mereoleona's trials

Both Mana tree gates are run by Mereoleona at Yultim Volcano:

1. **Strong Magic Region trial** (for Mana Skin): talk to her, then survive 30 seconds inside the Strong Magic Region. Track it under Quests > Skill Quests.
2. **Hot spring trial** (for Mana Zone): reach Mana Skin level 3, talk to her again, find the underground hot spring beneath the main volcano and bathe in its core.

Creative-mode players skip both gates.

---
*Sources: CloverProgressionData (node ids, parents, costs), CloverSkillTreeScreen (in-game descriptions), CloverSkillCooldownServerHandler, CloverReinforcementServerHandler, CloverManaPressureServerHandler, CloverManaZoneRelease, CloverNaturalMana, CloverRaceSkillBonuses, CloverKiTrainingServerHandler, CloverYultimVolcanoServerHandler.*
