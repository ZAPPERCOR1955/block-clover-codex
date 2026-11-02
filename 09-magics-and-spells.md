# Magic Types and Spells

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

The code defines 32 magic types, but only **15 playable origin magics** can be rolled or chosen by players: Anti-Magic, Dark, Wind (Yuno), Light, Lightning, Time (Julius), Fire (Mereoleona), Fire (Magna), Shadow, Gravity (Dante), Water (Noelle), Spatial, Ash (Zora), and since 1.8.0 **Slash (Jack)** and **Mineral (Mars)**. Spirit Wind is gained through Sylph, and Star through the Yuno preset. The rest (Beast, Cotton, Dream, Fire (Fuegoleon), Mercury, Mirror, Paint, Poison, Thread, Transmutation, World Tree, Food, Water (Leviathan), Spirit Fire, Bone) belong to NPCs and bosses in this version, though ops can grant them.

## Grimoires

- **Awakening.** Your origin roll decides your magic (see [Races](10-races-and-classes.md)). Until it is confirmed you have magic but no grimoire, and no spells can be cast.
- **Drouot and the Grimoire Tower.** Talk to Drouot at a Grimoire Tower with your magic awakened. The grimoire descends over about 7 seconds, and the Obtain Grimoire quest completes. You get one starter spell at once.
- **Four-leaf grimoires.** When the grimoire is granted there is a 2% chance it is four-leaf, multiplied by 1 + your luck percent ÷ 100. A four-leaf grimoire gives +100% luck permanently. Ops can set it with `/blockclover set grimoire fourleaf`.
- **Two grimoires** is a display toggle that shows a second floating grimoire; ops set it with `/blockclover set grimoire two`.
- **Magic Bullet.** Every non-Anti-Magic grimoire has a basic Magic Bullet that is always available, even before you own a grimoire: 15 mana, 3 base damage, 0.3 s cast and 0.8 s cooldown, 28-block range. Hold Shift when you start charging for a laser: 30 mana, 6 damage, twice the speed, 0.5 s cast and 1.6 s cooldown. Since 1.8.0 it gives no player XP, no spell XP, and does not count for missions. It sits at the end of each magic's spell list.

## How spells work

- Spells are discovered by fighting and casting, then level up with use. See [Spell Discovery and Spell Levels](06-spell-levels-and-discovery.md).
- **Mana** below is the base cost the game charges. Mana Control, race, wand, Mana Efficiency, transformation and Anti-Magic nodes reduce it (see [Stats](03-stats-and-masteries.md)). Where the in-game description quotes a different cost, the number here is the one taken from your bar.
- **Cooldown** is reduced by Mana Control and wands; **cast** time by wands and transformations. A spell without its own value uses the defaults: 5 s cooldown, 1 s cast.
- Holding the cast key **charges** a spell from ×0.75 up to your Mana Output cap, paying extra mana for output above ×1.0. Most projectiles and blasts grow with output, up to 5×.
- **Base damage** in the effect column is before your Magic Damage stat, transformation, charge and spell level multipliers.
- Some spells have an **alternate use** (shift-cast) with its own cost, shown as "(alt)".
- Anti-Magic sword techniques need the matching sword in hand: Bull Thrust needs Demon-Slayer or Demon Dweller, Black Meteorite needs Demon-Slayer, Black Divider needs Demon-Slayer or the Black Divider blade plus an active Anti-Magic form, Black Slash needs Demon Dweller, Infinite Slash Equinox needs Demon Slasher. Dark blade spells need a held weapon except Black Hole, Black Moon, Black Cocoon and Dark Binding.
- Spells that need **Mana Zone active**: Dark's Equinox, Black Moon, Death Thrust and Iai Slash; Mereoleona's Purgatory and Abyss; Shadow's Dark Prison Hunting Ground; Time's Chrono Stasis Grigora; Spirit Wind's Hushed Dance; Star's Never-Never Land and Black Neverland. Lightning's Keraunos needs Mana Method active.
- **Black Meteorite** for Wind, Spirit Wind and Star is not discovered; it is usable whenever Demon Dweller is in either hand, and vanishes from the wheel when you put the sword away.
- **Anti-Magic infusion** powers Wind's black spells and Star's Quintile spells. A Wind or Star user gets it by holding Demon Dweller in either hand (an Anti-Magic friend lends the sword, or lends Anti-Magic with the sword's right click), or an op grants it with `/starinfusion`.

## Spell tables by magic

### Anti Magic

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Demon-Slayer Sword | 50 | 2 s | 0.25 s | Pulls the first sword from the grimoire. Right click reflects spells for 1 s; hold to throw; shift-use rides it once Demon-Slayer Flight is bought. |
| 2 | Demon Dweller | 100 | 2 s | 0.25 s | Pulls the second sword. Right click lends Anti-Magic to an aimed ally or your squad for 60 s; shift-use copies a friendly magic for Black Slash. |
| 3 | Demon-Destroyer Sword | 150 | 5 s | 0.5 s | Pulls the third sword. Right click cleanses harmful effects; shift-use erases magic within 5 blocks. |
| 4 | Demon Slasher Katana | 150 | 5 s | 0.25 s | Pulls Yami's katana. Right click is Dante Slash (40 base damage, 1 min); hold 2 s to charge it. Needed for Equinox. |
| 5 | Bull Thrust | 500 (750 with both swords) | 30 s | 0.5 s | Fixed-direction charge that cuts through spells: 32 base damage with one sword, 48 with Demon-Slayer and Demon Dweller together. |
| 6 | Black Meteorite | 750 | 45 s | 0.5 s | Steerable Anti-Magic flight for up to 3.5 s that cuts spells and dashes through the first enemy hit for 40 base damage. |
| 7 | Black Hurricane | 1000 | 60 s | 1 s | A moving Anti-Magic tornado for 5 s: 5.5-block radius, 4 damage every half second (40 max per target), destroys dispellable magic. |
| 8 | Black Divider | 1250 | 120 s | 1 s | Turns Demon-Slayer into Black Divider for 60 s at 1.5× size and 15 damage; use grows it by 0.5×, shift shrinks it; caps at 2× in Black Form, 3× in Berserk, 5× in Devil Union. |
| 9 | Black Slash | 250 (350 alt) | 3 (10 alt) s | 0.25 s | Ranged slash from Demon Dweller, 10 base damage; copied magic adds ×1.5 damage and speed. Shift fires four half-size slashes of 4 over 1 s. |
| 10 | Infinite Slash Equinox | 2000 | 600 s | 5 s | A 150-block slash from Demon Slasher for 75 base damage. |
| 11 | Infinite Slash | 1000 | 30 s | 1.5 s | A pure-black vertical cut from Demon Slasher: 40 base damage, 120 blocks, twice Dante Slash speed. Bought in the tree at level 30. |

### Dark

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Dark Cloaked Black Blade | 100 | 3 s | 0.25 s | Coats the held weapon and fires a heavy black slash: 15 base damage, 8 blocks. |
| 2 | Dark Cloaked Lightless Blunt Strike | 250 | 15 s | 0.5 s | Dashes behind the aimed target within 8 blocks and strikes with the blunt side: 4 damage plus Blindness, Darkness, Weakness III, Slowness IV and Nausea for 3 s. |
| 3 | Dark Cloaked Black Blade Blunt Slash | 150 | 8 s | 0.5 s | Wide 130° blunt sweep with 20-block reach, 8 damage, launches enemies away. |
| 4 | Dark Cloaked Lightless Slash | 50 | 3 s | 0.25 s | Fast slash projectile, 10 damage, 36 blocks; stops at the first entity or block. |
| 5 | Dark Cloaked Lightless Blade Storm | 750 | 25 s | 1.5 s | Nine large slashes, 15 damage each, 48 blocks. |
| 6 | Dark Cloaked Dimension Slash | 1500 | 300 s | 2.5 s | Spatial cut through entities, blocks and dimensions: 50 damage, 100 blocks. |
| 7 | Dark Cloaked Dimension Slash: Equinox | 2000 | 900 s | 5 s | Enormous Dimension Slash through mountains and caves: 75 damage, 150 blocks. Needs Mana Zone. |
| 8 | Dark Cloaked Iai Slash | 1000 | 45 s | 0.5 s | Five-second counter stance that cuts a target within 8 blocks: 50 inside Black Moon (auto-targets and dashes), 25 outside. Needs Mana Zone. |
| 9 | Death Thrust | 2500 | 60 s | 1 s | Forward thrust, 100 damage, 20 blocks; breaks blocks in a 2-block radius with heavy knockback. Needs Mana Zone. |
| 10 | Dark Cloaked Deep Black Blade | 1000 | 30 s | 1.5 s | Larger Black Blade, 50 damage, 15 blocks, pierces every enemy on its path. |
| 11 | Black Hole | 250 | 20 s | 0.25 s | Absorbs enemy spells within 5 blocks for 10 s and holds nearby enemies still. No damage; +1% size per spell level. |
| 12 | Black Cocoon | 750 | 90 s | 1.5 s | Protective sphere, 3-block radius, 100 health, 20 s. Shift forms it around the aimed entity; hold Shift to move it. |
| 13 | Dark Binding | 350 | 20 s | 0.5 s | Binds the aimed target within 15 blocks for 0.5 to 10 s, longer the lower its health. Shift-right-click the target to carry it. |
| 14 | Black Moon | 1500 | 120 s | 2.5 s | 7-block zone for 25 s that absorbs enemy spells and gives Iai Slash its full damage. +1% size per level. Needs Black Hole known and Mana Zone. |

### Wind (Yuno)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Crescent Kamaitachi | 75 | 3 s | 0.25 s | Fast white crescent, 10 base damage, 36 blocks. |
| 2 | Swift White Hawk | 125 (250 alt) | 4 (5 alt) s | 0.25 s | Hawk projectile, 12 damage, 0.45 s flight. Shift summons it as a flying mount that dissolves when you dismount. |
| 3 | Wind Blades Shower | 450 | 15 s | 1 s | Twenty-four small blades in a staggered shower, 5 damage each (120 max), 40 blocks. |
| 4 | Towering Tornado | 600 | 20 s | 1 s | Slow tornado that climbs terrain, lifts enemies and hits for 7 every half second over 7 s. |
| 5 | Gale White Bow | 500 | 12 s | 1 s | Hold to form a bow; six arrows fire together, 12 each (72 max), 64 blocks. |
| 6 | Tornado Fang | 700 | 20 s | 1 s | Horizontal drilling tornado, 32 damage, 2.35-block radius, 42 blocks, shatters ordinary terrain. |
| 7 | Heavenly Wind Ark | 800 | 15 s | 1 s | Three-seat flying ark with 250 health and 12 armour. |
| 8 | Wind Trident | 900 | 30 s | 1.5 s | Massive trident that pierces up to four enemies (40 direct, 10 burst), 60 blocks. |
| 9 | Black Crescent Kamaitachi | 200 | 6 s | 0.5 s | Needs Crescent Kamaitachi, infusion and Demon Dweller in hand: 2.5× larger black crescent, 30 damage, 72 blocks, cuts terrain and cancels hostile magic. Also spends 40 infusion. |
| 10 | Black Tornado Fang | 850 | 18 s | 0.8 s | Needs Tornado Fang, infusion and Demon Dweller: black drill, 64 damage, 84 blocks, 1.6× radius, 120 cancellation strength. Spends 60 infusion. |
| 11 | Black Wind Blade Shower | 650 | 12 s | 0.8 s | Needs Wind Blades Shower and infusion: 96 black knives in six waves, 10 damage each, pierce three enemies, 80 blocks; each knife can cancel one hostile projectile. Spends 60 infusion. |
| 12 | Black Meteorite | 750 | 45 s | 0.5 s | Hold Demon Dweller in either hand: rush your target 35% faster than Asta's version and land an Anti-Magic strike. Putting the sword away cancels it. |

### Light

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Light Swords of Judgement | 100 | 10 s | 1 s | Twelve golden swords that launch over 1 s and follow your aim until they fly: 5 damage each (60 max), 68 blocks. |
| 2 | Flash of Light | 75 | 3 s | 0.4 s | Teleports you to a safe spot along your aim, up to 42 blocks. |
| 3 | Healing Ray of Light | 250 | 10 s | 1 s | Heals you, or the aimed ally with Shift, for up to 24% max health plus Regeneration II for 5 s, 28 blocks. |
| 4 | Heaven-Splitting Flash | 450 | 12 s | 1 s | Six orbs send bending rays at the aimed point over 1 s, 14 damage, 52 blocks. |
| 5 | Bright Judgment Whip | 500 | 13 s | 0.9 s | Seven light strands for 3 s; punch empty-handed to lash the aimed spot, 14 damage, 34 blocks, once a second. |
| 6 | Light Shaft of Divine Punishment | 1000 | 15 s | 2.5 s | Massive beam that advances over 1 s and destroys terrain, 55 damage, 68 blocks. |
| 7 | Arrows of Judgment | 1500 | 45 s | 3 s | Marks every enemy within 56 blocks and pummels each for 65 damage. |

### Lightning

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Thunder God's Gloves | 250 | 5 s | 0.5 s | Toggle gauntlets: +1 block melee reach and +5 melee damage, +0.5 per spell level. |
| 2 | Thunder God's Boots | 100 | 4 s | 0.5 s | Toggle boots: +45% speed (+5% per level), +35% jump, +0.55 step height, 3 extra safe-fall blocks. |
| 3 | Thunderclap Crumbling Orb | 150 | 7 s | 0.5 s | One large orb, 36 damage with a 2.2-block splash, 52 blocks. Shift fires twelve small orbs of 6 over 2.75 s. |
| 4 | Thunder Fiend | 1250 | 45 s | 0.5 s | Lightning dash; a connecting hit traps the target in a 10-block dome for 23 blitzes over 8 s and a 70-damage finisher. Lock-on within 24 blocks. |
| 5 | Keraunos | 1000 | 25 s | 5 s | Five rune circles, then you become lightning and blitz 50 blocks through every entity crossed. Needs Mana Method active. |
| 6 | Thunder Arrow | 300 | 12 s | 0.25 s | Fast cyan arrow, 64 blocks; after the first hit it chains to up to 20 more enemies within 12 blocks, 20 base damage each, never the same target twice. |

Lightning Battle Fiend is the Lightning transformation; see [Transformations](07-transformations.md).

### Time (Julius)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Chrono Stasis | 250 (600 alt) | 8 (18 alt) s | 1 s | Places stasis bubbles, one more per extra 0.1× charge up to 25, that freeze whatever is inside when they spawn; empty bubbles are Jump Boost V platforms for 15 s. Shift releases a frozen target or drops a delayed expanding field. |
| 2 | Chrono Stasis Grigora | 500 (650 alt) | 15 (20 alt) s | 0.5 s | 4-block field for 5 s that stops hostile spells; normal erases them, Shift fires them back at 1.5× speed. Dimension Slash, Black Slash and Anti-Magic pass through. |
| 3 | Chrono Anastasis | 1500 | 120 s | 1 s | Clock 20 blocks up stops time in a 20-block radius (100 at 5×) for 10 s and erases hostile spells, except Death Thrust, Dimension Slash, Equinox, Black Slash and Anti-Magic. |
| 4 | Chrono Projectile | 100 (350 alt) | 4 (12 alt) s | 0.5 (0.75 alt) s | 20-damage orb, 48 blocks; above 1× charge it becomes a faster piercing beam. Shift detonates an 8-block blast beside you after 0.75 s. |
| 5 | Time Reversal | 350 (450 alt) | 20 (24 alt) s | 0.5 (0.75 alt) s | Heals you for 24% max health (at least 8) over 5 to 15 s with charge; Shift heals the aimed entity within 28 blocks. +5% healing per spell level. |
| 6 | Chrono Stasis: Throw | 450 | 12 s | 0.75 s | Throws a 2.6-block stasis orb ringed with numerals, up to 5× with charge: 40 blocks, 32 damage per enemy, pierces, carves through breakable blocks, does not freeze. |
| 7 | Time Binding: Chrono Lock | 400 | 20 s | 0.75 s | Binds the enemy under your crosshair to a clock face for 5 s. 24 blocks, needs line of sight, not on allies or already frozen targets. |
| 8 | Time Acceleration | 300 | 30 s | 0.5 s | Doubles your movement speed and grants unlimited dashes for 8 s; you can switch spells meanwhile. |
| 9 | Future Sight | 350 | 40 s | 0.5 s | For 15 s, blue echoes show where nearby entities and projectiles will be one second ahead. Sudden turns and teleports are not foreseen. |

### Fire (Mereoleona)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Calidus Brachium | 75 | 5 s | 0.4 s | Flame punch, 24 base damage, reach 3.5 blocks (8.5 at 5× charge), burns and knocks back. |
| 2 | Calidus Brachium Barrage | 750 | 15 s | 0.6 s | Ten rapid punches: nine at 10 damage and a tenth at 24 with a longer burn. |
| 3 | Calidus Brachium Purgatory | 1800 | 60 s | 1.5 s | Ten-second inferno expanding 25 blocks per charge level (75 max), far heavier near the centre, strips four ground layers. |
| 4 | Hellfire Incarnate *(transformation, see [Transformations](07-transformations.md))* | 1200 | 60 s | 1 s | The burning mantle whose heat meter unlocks the three spells below. |
| 5 | Calidus Brachium Purgatory: Abyss | 1200 | 12 s | 0.9 s | Needs Hellfire above 25%: ten fire-beam punches, nine at 32 and a final 64, ignoring hit immunity. |
| 6 | Calidus Brachium Purgatory: Flame Burial | 950 | 10 s | 1.2 s | Needs Hellfire at 10% or more: one 140-damage jet, 26 to 42 blocks with charge, burns for 14 s. |
| 7 | Exercitus Leonum | 2800 | 90 s | 1.5 s | Needs Hellfire at 50% or more: six flame warriors for 30 s that follow, defend and strike with you. |

### Fire (Magna)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Exploding Fireball | 75 | 2 s | 1 s | Fireball, 24 damage in a 3.5-block blast, 48 blocks, 4 s burn. |
| 2 | Exploding Buckshot | 500 | 6 s | 1 s | Nine fireballs in three waves, 12 damage each (three hits per enemy), 40 blocks; curves into a 3×3 pattern on distant targets. |
| 3 | Prison Kill Buckshot | 700 | 12 s | 1 s | Nine fireballs whose blasts leave 12-second flames: 14 per blast plus 4 per second burning. |
| 4 | Explosive Reheating | 250 | 4 s | 1 s | Eruption at the aimed spot within 10 blocks: three pulses of 8 in a 2.2-block radius. Shift cooks the stacks in both hands. |
| 5 | Extreme Killing Vanishing Fireball | 350 | 3 s | 1 s | Dense fireball that vanishes near its target and reappears on a flank, 32 damage. |
| 6 | Explosive Vanishing Scattershot | 800 | 8 s | 1 s | Nine vanishing fireballs in three waves, 16 each, surrounding exposed targets. |
| 7 | Timed Explosion Scattershot | 650 | 8 s | 1 s | Nine fireballs with a charge-set fuse of 0.5 to 5 s, 8 per blast, landing in a 3×3 pattern on distant targets. |
| 8 | Maximum Exploding Fireball | 1500 | 12 s | 1 s | Immense fireball, 60 damage in a 7-block blast, 6 s burn. Shift primes your next melee hit to explode instead. |
| 9 | Soul Chain Deathmatch | 1500 | 60 s | 1 s | Fireball that chains you to its first enemy: health, mana and stats are equalised for up to two minutes; parting beyond 48 blocks breaks it for 8 damage to both. |
| 10 | Flame Rope Solid Binding Formation | 600 | 5 s | 1 s | Binds a visible enemy within 24 blocks for 4 s, 7 s if it is burning; water breaks the ropes. The in-game text says 18 s cooldown, the code uses the default. |
| 11 | Grand Slam | 450 | 8 s | 1 s | Flaming bat that bats an explosive fireball (36 damage, 4.5-block blast, 64 blocks). Sneak-cast sweeps for 28 instead. |
| 12 | Base Run Gamble | 250 | 12 s | 1 s | Flames reinforce your legs for 5 s: 2.5× run speed, 3.5× at full output. Water or binding ends it. |

### Shadow

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Shadow Travel | 50 | 2 s | instant | Hold to sink into a moving shadow: faster, two-block steps, no fall damage, mobs lose you; 60 mana/s. Hold Shift first to blink 50 blocks; shift-right-click rides another's shadow. |
| 2 | Shadow Immobilization | 50 | 5 s | instant | Hold on a grounded enemy within 24 blocks to pin its feet while it can still attack; 40 mana/s. |
| 3 | Shadow Restraint | 350 | 8 s | instant | Tendrils with 30 health hold a grounded enemy within 24 blocks for up to 5 s while you stay free. |
| 4 | Dark Garden Invitation | 650 | 30 s | 1 s | Shadows cover a 20-block radius for 12 s and hold every other living target, allies included. Shift pulls captives down to safe space below. |
| 5 | Dark Prison Hunting Ground | 1100 | 40 s | 1 s | 20-block darkness for 15 s: you see, enemies see a few blocks. Canis doubles the pack's ambush rate. |
| 6 | Shadow Corridor | 600 | 40 s | 4 s | Shift saves coordinates; cast for 4 s without moving or taking damage to open a 20-second doorway for you, squad and team. |
| 7 | Heaven's Shadow Second Sight | 250 | 2 (0.5 alt) s | instant | Needs Felis: toggle mana outlines through walls within 32 blocks (20 mana/s). Shift places a shadow eye within 48 blocks; use it from up to 128 blocks away without aiming at it, and it reveals living things through walls within 96 blocks (40 mana/s). |
| 8 | Monument of Atonement | 2000 | 60 s | 5 s | Shadow tomb closes over you and enemies within 20 blocks for 5 s. Up to nine pulses cost you two hearts each and deal 4, capped by the health you lose. Needs 2.5 hearts. |

### Gravity (Dante)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Gravity Boulder | 100 | 2.5 s | 0.4 s | Gathers stone for 1.5 s, then launches a boulder 40 blocks: 12 damage in a 2-block radius, erases terrain it passes through. |
| 2 | Presence of the Demon King | 700 | 15 s | 1 s | 20-block gravity field for 10 s that forces enemies down and slows them up to 100%; crushes for up to 3 per second. Weaker against targets with more mana. |
| 3 | Heavy Infighting | 500 | 18 s | 0.5 s | Twelve seconds of weighted empty-hand strikes: +4 damage and +35% attack speed at 1×, up to +20 and +75% at 5×. |
| 4 | Heavy Infighting: Gladiator | 350 | 8 s | 0.6 s | Compresses stone into a Gladiator sword for 30 s. Needs an empty main hand. |
| 5 | Gravity Flight | 250 | 18 s | 0.25 s | Toggle flight; sprint to accelerate. Upkeep 20 to 100 mana/s with output. Cast again to stop. |
| 6 | Gravity Warp | 600 | 5 s | instant | Five-second warping field that bends hostile projectiles and Dimension Slash away. Anti-Magic cuts and Equinox are not deflected. |
| 7 | Gravity Singularity | 2000 | 30 s | 1.5 s | Singularity launched at 32 blocks a second for up to 100 blocks through blocks and enemies, up to 5× with output. It grows as it travels, bends hostile projectiles, pulls enemies toward its core, pierces for 40 base damage and erases terrain within 1.5× its core, then collapses. |
| 8 | Evil God's Pressure Craft | 450 | 12 s | 1 s | Lifts nearby blocks into three stone swords over 1.5 s, fired half a second apart: 22 damage each, 40 blocks. |

### Water (Noelle)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Sea Dragon's Waterball | 100 (200 alt) | 5 s | 1 s | Water sphere, 14 damage splash, 48 blocks. Shift fires three smaller balls every 0.5 s at 70% size and damage. |
| 2 | Sea Dragon's Nest | 600 | 25 s | 1 s | Stationary dome (sphere if airborne) of currents, 5-block radius, 240 guard, blocks incoming attacks for 20 s. |
| 3 | Sea Dragon's Cradle | 650 | 30 s | 1 s | Steerable water sphere carrying you and seven allies for 30 s: 3-block radius, 300 guard, underwater breathing. |
| 4 | Sea Dragon's Roar | 1000 | 16 s | 1 s | Sea dragon that travels 96 blocks, 28 damage per enemy, breaks ordinary blocks; your aim steers it. |
| 5 | Valkyrie Dress *(transformation)* | 450 | 45 s | 1 s | Water armour with slow flight and 35% damage reduction; empty-hand thrusts for 28. See [Transformations](07-transformations.md). |
| 6 | Point-Blank Sea Dragon's Roar | 1500 | 20 s | 0.3 s | Needs Sea Dragon's Roar: a dragon head forms around you and bites in front, 72 damage, 6-block reach. |
| 7 | Valkyrie Spear | 150 | 5 s | 0.5 s | Summons the spear (8 damage, 1.4 attack speed). Needs Valkyrie Dress. |

### Spatial

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Fallen Angel Gate | 75 | 25 s | 1 s | Two linked portals for 20 s, the exit on aimed ground within view distance. Shift opens ten saved locations. Players, mobs, items and projectiles pass. |
| 2 | Fallen Angel Flapping | 300 | 3 s | 0.5 s | Homing spatial orbs, up to thirteen with charge, that deal 10 and teleport the target to a saved destination. 20 blocks per second, 8 s life. |
| 3 | Teleport Entity | 75 | 3 s | 0.25 s | Shift selects an entity within 32 blocks; use teleports it to your aim point 5 to 30 blocks away (scroll adjusts). |

### Ash (Zora)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Counter Trap | 75 | 5 s | 1.5 s | Hidden circle on a block face within 20 blocks that catches one moving spell and returns it at double damage and speed. Three at once, 30 s life. |
| 2 | Full-Body Counter Trap | 500 | 15 s | 2 s | Invisible trap on your body for 10 s that catches one spell from any direction and returns it doubled. |
| 3 | Paralysis Trap | 100 | 8 s | 1 s | Hidden trap within 20 blocks; the first enemy in its 3-block trigger is immobilised for 3 s. Three at once. |
| 4 | Pitfall Trap | 200 | 10 s | 1.5 s | Hidden ground trap within 20 blocks that opens a 3×3 pit three deep under the first enemy. Three at once. |
| 5 | Revelation of the Cowardly | 75 | 25 s | 0.5 s | Shows your traps to squad and team within 24 blocks for 20 s. |
| 6 | Secret Counter Trap Magic | 650 | 30 s | 1.5 s | For 10 s, store the damage of one hit you take; a bare-handed hit within the next 10 s adds twice that as flat damage. |

### Spirit (Wind) (via Sylph)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Spirit Dive *(transformation)* | 75 | 60 s | 1 s | Activates the Spirit Dive form (300 to activate, 5 mana/s): crown, mantle, flight and these spells. See [Transformations](07-transformations.md). |
| 2 | Sylph's Breath | 450 | 7 s | 1 s | Enormous spiralling wind mass, 80 blocks and up to 18 wide, that sweeps enemies repeatedly for 3.6 s. |
| 3 | Spirit Storm | 900 | 8 s | 1 s | Hold to fire a steerable wind beam, 48 blocks, 100 mana/s while channelling for up to 10 s. |
| 4 | Liable Tempest | 700 | 15 s | 1 s | Wind cocoon anchored to nearby blocks that holds a visible enemy within 24 blocks for 6 s. |
| 5 | Spirit's Hushed Dance | 450 (+35 per dodge) | 20 s | 1 s | For 10 s you sidestep incoming projectiles and melee automatically, at most every 0.4 s. |
| 6 | Spirit of Zephyr | 650 | 5 s | 1 s | Summons the Spirit of Zephyr sword (10 damage, 2.2 attack speed). |
| 7 | Spirit of Boreas *(planned)* | | | | Listed in the grimoire, no gameplay yet. |
| 8 | Spirit of Euros *(planned)* | | | | Listed in the grimoire, no gameplay yet. |
| 9 | Saint Spirit of Zephyr | 780 | 5 s | 1 s | Summons the Saint Spirit of Zephyr sword (12 damage, 2.2 attack speed). Needs Spirit of Zephyr known, a 100% Sylph bond and an active Spirit Dive. |
| 10 | Spirit of Notos *(planned)* | | | | Listed in the grimoire, no gameplay yet. |
| 11 | Saint Spirit of Boreas *(planned)* | | | | Listed in the grimoire, no gameplay yet. |
| 12 | Black Meteorite | 750 | 45 s | 0.5 s | Same as Wind's: needs Demon Dweller in either hand. |

### Star (Yuno preset)

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Conjunction | 100 | 0.4 s | instant | Shift places a star up to 32 blocks away (four at once, five with infusion, two-minute life). Aim at a star and cast to teleport; hold on a teammate to send them. |
| 2 | Quartile Scutum | 300 (+30/s) | 5 s (8 if shattered) | instant | Draws four stars into a 7×5 shield that follows your aim: 160 guard, up to 20 s. |
| 3 | Quartile Hasta | 650 | 6 s | 0.6 s | Charge 0.6 to 2 s, then fire a piercing beam: 64 blocks, 32 to 64 damage. |
| 4 | Quartile Flagellum | 500 (+20/s) | 5 s | 0.4 s | Whip of light between four stars, 14 blocks, 18 per hit, up to 5 s. |
| 5 | Never-Never Land | 1500 (+40/s) | 60 s | 1 s | Needs Spirit Wind: 32-block field (160 at 5×) for 20 s. Allies +20% speed, +25% magic damage, +50% mana recovery; enemies −25% speed and magic damage. |
| 6 | Black Neverland | 2000 | 60 s | 1 s | Needs Never-Never Land, Spirit Wind and infusion: a 3-second burst boundary that cancels hostile magic. Spends 60 infusion. |
| 7 | Quintile: Atrum Flagellum | 800 (+30/s) | 6 s | 1 s | Five-star black whip, 28 blocks, 36 per hit, erases hostile projectiles it touches. Needs infusion. |
| 8 | Quintile: Atrum Scutum | 900 (+40/s) | 5 s (8 if shattered) | 1 s | Five-star pentagon shield that spends a 240-point infusion reserve against magic and 160 guard against physical hits. Needs infusion. |
| 9 | Quintile: Atrum Hasta | 1200 | 8 s | 1 s | Five black streams converge into a 128-block lance, 64 to 128 damage, breaks Scutum shields. Needs infusion. |
| 10 | Black Meteorite | 750 | 45 s | 0.5 s | Same as Wind's: needs Demon Dweller in either hand. |
| 11 | Single-Star Shield | 200 | 10 s | 0.25 s | Needs one nearby Conjunction star: a stationary 3-block dome for 6 s with 90 guard that blocks incoming attacks across its surface. |
| 12 | Multi-Star Shield | 700 | 20 s | 0.75 s | Needs four nearby stars: an overhead barrier 5 blocks up with a 10-block radius for 10 s, 240 guard, protecting against attacks from above. |
| 13 | Star Beams | 120 | 1.5 s | 0.25 s | Needs at least one nearby star: up to four placed stars fire beams at your aim point, 12 damage per target per volley, 64 blocks from each star. |

### Slash (Jack)

Slash is Jack the Ripper's magic, playable since 1.8.0. Most of its spells need a **Death Scythe** in either hand; Severing Blades gives you one for each hand and they are real items you keep. Slash also has a passive, **adaptation**: fighting an enemy teaches you its attributes, and at 40% and 100% adaptation your cuts ignore 30% and 60% of its magic resistance. Full adaptation lets you cut weak projectiles. Progress decays after 30 seconds without contact. Slash Armor trains adaptation 25% faster and resists up to 40% of adapted area damage.

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Death Scythe | 120 | 3 s | 0.5 s | Fast green crescent, 24 base damage, 48 blocks, hits each enemy once and cuts breakable terrain. Charging grows it. |
| 2 | Death Scythe: Lunatic Slash | 300 | 8 s | 0.5 s | Twelve fast slashes from alternating arms, 10 damage each, 48 blocks; turn to aim the rest of the barrage. |
| 3 | Severing Blades | 100 | 5 s | 0.5 s | Equips a Death Scythe in each hand, summoning any you are missing and storing what you held. The starter spell. |
| 4 | Spinning Slash | 400 | 20 s | 0.5 s | Become a spinning storm of blades and rush 60 blocks over 2 s: 30 damage per enemy, cuts breakable terrain; the direction locks on release. |
| 5 | Final Slash | all remaining mana | none | instant | Last stand only, at level 50 with 50 Strength invested. A lethal hit gives you 10 s of invulnerability; aim and cast once to fire a 90-damage, 150-block slash whose size depends on the mana consumed (300 half, 1,200 normal, 4,800 double, triple at most). Healing cannot save you. |
| 6 | Severing Rush | 350 | 30 s | 0.5 s | Vanish into a storm of green slashes and rush forward for 6 s at about 20 blocks a second, steering with your view: 8 damage per hit, up to twice a second per target. |

### Mineral (Mars)

Mars's magic, playable since 1.8.0. It shapes minerals into weapons, armour and copies of yourself.

| # | Spell | Mana | Cooldown | Cast | Effect |
|---|---|---|---|---|---|
| 1 | Magic Bullet | 15 (30 alt) | 0.8 (1.6 alt) s | 0.3 (0.5 alt) s | The ordinary Magic Bullet, listed first for this magic. |
| 2 | Laevateinn | 180 | 8 s | 1 s | A giant mineral sword for 20 s: aim to position it, swing your hand to slash down for 18 base damage per enemy; scroll to move it closer or farther. |
| 3 | Harpe | 140 | 6 s | 1 s | Seven mineral blades in a spread, 5 damage each, 48 blocks, one enemy per blade. |
| 4 | Nemean Armor | 250 | 40 s | 1 s | Mineral armour for 20 s that cuts incoming damage by 40%. Not while the Titan is active. |
| 5 | Talos Puppet | 220 | 45 s | 1 s | A mineral copy of you with 40 health and 6 attack damage that fights for 30 s. Recasting replaces it. |
| 6 | Talos Puppet Cluster | 600 | 60 s | 1 s | Up to six copies for 30 s, 40 health and 4 damage each, spreading their attacks. Replaces existing puppets. |
| 7 | Heavy Armored Titan | 900 | 90 s | 1 s | A massive mineral titan for 60 s that cuts incoming damage by 65%; cast again to leave it. Replaces Nemean Armor and needs room to form. |
| 8 | Crystal March | 160 | 12 s | 0.8 s | Crystals erupt across the ground over 1.5 s, 12 damage per enemy; turn to steer later eruptions. 8 blocks of range plus 1 per 0.1 output above 1.0, up to 48. |

---
*Sources: CloverMagicData (magic list, cooldowns, cast times, requirements, MagicType constructor extras), CloverMagicBalance (base costs), CloverGrimoireScreen (spell detail text: antiMagicSpellDetailParagraphs, darkMagicSpellDetailParagraphs, yunoWindSpellDetailParagraphs, lightMagicSpellDetailParagraphs, lightningMagicSpellDetailParagraphs, timeMagicSpellDetailParagraphs, mereoleonaFireSpellDetailParagraphs, spellDetailParagraphs, spellDescription), CloverGravityData, CloverAshData, CloverMineralSpells, CloverSeveringBlades, CloverSpinningSlash, CloverFinalSlashLastStand, CloverSlashAdaptation, CloverLuciusTimeSpells, CloverTemporalBuffs, CloverStarArts, CloverThunderArrow, CloverStarInfusion, per-spell handlers (setSpellCooldown calls), CloverGrimoireSlotHandler, DrouotEntity, CloverMagicServerHandler.*
