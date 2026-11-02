# The Anti-Magic Route

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Anti-Magic is the one magic that plays by different rules. You are always a Human Peasant, your bar is called Anti-Magic and only refills properly with a sword in hand, you never cast Magic Bullet, no spirit will ever choose you, and the Mana tree is replaced by the **Anti-Magic tree**. This page is the whole path from the origin roll to True Devil Union, in the order it actually unlocks in 1.8.1. The numbers come from [Bonds, Spirits and Liebe](08-bonds-and-liebe.md), [Mana and the Anti-Magic Resource](04-mana-and-anti-magic.md) and [Transformations](07-transformations.md).

## What is different for you

| Rule | What it means in play |
|---|---|
| Race is forced to Human Peasant | 100 base Anti-Magic, ×1.0 regen, 1.25 output, 0 starting reputation. The Human race tree still gives you extra points. |
| Regen follows your sword | 25% with no sword, 50% with Demon-Slayer, Black Divider or Slasher, 75% with Demon Dweller, 100% with Demon-Destroyer. Either hand counts. |
| Your spells are your swords | The first four "spells" pull the four swords from the grimoire. Everything from Bull Thrust on is bought in the tree, not discovered. |
| Demon Dweller comes from a dungeon | Since 1.8.0 the second sword is never discovered. It is the guaranteed special reward in a dungeon's personal vault chest. Destroyer is discovered only once you know Dweller, and Slasher only once you know Destroyer. |
| No Mana tree | Mana Skin, Mana Zone, Mana Method and Leg Strength are out. Ki and Zetten are in, and come faster for you. |
| The Liebe bond comes last | Black Form needs no contract. Devil Union needs the contract and a 25% bond, True Devil Union a 50% bond, and the contract itself needs the Devil Arm first. |
| XP comes from casts, missions, quests, bandits and dungeons | Mob kills alone give nothing. Every sword pull counts as a cast for XP and for the Spell Practice mission. |

## Stats and masteries for this build

Technique damage (Bull Thrust, Black Meteorite, Black Hurricane, Black Slash, Infinite Slash, Equinox, Dante Slash) is multiplied by the same **Magic Damage** path as spells, by your form, by your Liebe bond and by the technique's own level. Sword swings use **Strength** and also pick up the Liebe bond. The forms list their bonus as Anti-Magic damage, which is the same multiplier.

Spend points roughly in this order:

1. **Magic Damage** and **Strength**, together. One feeds techniques, the other every swing in between.
2. **Max Mana** (your bar). Forms are expensive: Devil Union costs 1,000 to start and 12 a second, True Devil Union 2,000 and 50 a second, Equinox 2,000 in one go. A full minute of True Devil Union needs about 5,000 before regen.
3. **Mana Regen Speed** and **Regen Amount**. Your regen is already halved by the sword rule, so these matter more for you than for casters.
4. **Mana Control** cuts technique cost by 0.4% and cooldown by 0.25% per point, which matters on 30 to 600 second cooldowns.
5. **Health**, then the two defenses.

Masteries: **Mana Efficiency** first (−5% technique cost and −8% form drain per rank), then **Transformation Mastery** (+10% duration and +5% on every form bonus per rank), then **Willpower** for the below-half-health bonuses, then **Spell Insight** for faster sword discovery and sword XP. Luck is last; it does nothing for your tree.

## Levels 1 to 5: the first sword

1. Confirm the origin roll, find a Grimoire Tower and take the grimoire from Drouot. Your starter spell is **Demon-Slayer Sword**: 50 Anti-Magic pulls it into your hand. It never breaks, and if you lose it you simply cast again.
2. Keep it in a hand at all times. With no sword your bar refills at a quarter speed.
3. Learn the sword's own controls: right click reflects spells for one second (5 s cooldown); hold right click past 30% charge to throw it; the thrown sword's damage scales with its speed.
4. Take the three Easy missions. Spell Practice (cast 5 spells) is five sword pulls. Monster Cleanup and Supply Run complete themselves.
5. Hit things. Every melee or thrown hit gives the sword 12 XP: level 2 after 9 hits, level 3 after 21, level 4 after 38. No tree node asks for more than level 4.

Spend the first 10 stat points on Magic Damage, Strength and Max Mana.

## Levels 5 to 15: the tree opens

Skill points arrive at every fifth level (one each at 5, 10 and 15, two at 25), plus one from the Entrance Exam quest, one from Join a Squad and two from the First Dungeon quest. Buy in this order:

| When | Buy | Why |
|---|---|---|
| Level 5 | **Bull Thrust** (needs Demon-Slayer level 1) | Your first technique: 500 cost, 30 s, 32 base damage, 48 when you also carry Demon Dweller. |
| Level 10 | **Recovery I** | +10% regen for the whole game. |
| Exam and squad points | **Sword Recall**, then **Black Slash** once you own Demon Dweller | Recall calls thrown swords back. Black Slash is a 250-cost ranged slash on a 3 s cooldown. |
| Level 15 | **Black Form** (2 points) | Level 15, Demon-Slayer level 2, nothing else. See below. |

**The entrance exam.** Do it as soon as you find the arena. You skip the broom test and still get the permanent broom. Black Bulls' bar is 70 and it drops for Anti-Magic users, so it is the natural squad. A squad is what makes merit count, pays Yul every hour, and is how dungeon orders reach you.

**Ki.** Pay Yami 500 Yul. Each arrow that damages you rolls 6% and each spell hit 30%, against 0.5% and 2% for everyone else, so Ki arrives in a handful of hits. Since 1.8.0 Ki also lets a held weapon cut down weak magical attacks. Zetten follows in the Ki branch and earns the Heaven Splitter title.

**Black Form** costs 2 skill points and needs level 15 and Demon-Slayer level 2. It is your first form: 500 to start, 2 a second, ten minutes, ×1.15 magic and ×1.10 physical damage, double-tap jump to fly at 70% of Devil Union speed, and sprint in the air for powered flight. From here on fight in Black Form; it is cheap enough to keep up.

## The dungeon: your second sword

Every hour of server time (the `dungeonGateMinutes` gamerule) a stone gate appears in the Overworld within 2,500 blocks, and your squad captain messages everyone its coordinates. Track the **First Dungeon** quest to see the marker. The gate closes after 15 minutes if nobody enters, and the instance lives for an hour.

Inside, do one of two things: help beat **Mars** (240 health, hits for 7, Mineral Magic) or reach the **treasure vault**. Either turns the quest Ready. Then open your **personal vault chest**: as an Anti-Magic user its special reward is always **Demon Dweller**. Escape through the exit before the collapse timer runs out. The milestones pay 1,500 XP and Yul for Mars, 2,500 for the vault and 1,000 for escaping, and the quest itself pays 1,000 XP, 1,000 Yul, 10 stat points, 1 mastery point and 2 skill points. See [World, Structures and NPCs](14-world-and-npcs.md).

Dweller is the best sword to hold between fights (75% regen) and its right click lends Anti-Magic to an ally for 60 seconds. With Dweller known, **Demon-Destroyer** can be discovered (fight hostiles at low health), and after it **Demon Slasher**. Destroyer refills your bar at full speed and cleanses debuffs. Slasher's right click is Dante Slash (40 base damage) and it is the sword Infinite Slash and Equinox need.

## Levels 20 to 25: Faust House

**Black Divider** (level 20, Slayer level 2, Black Form) turns Demon-Slayer into a blade that starts at 1.5× size and 15 damage and grows by 0.5× per use, up to 2× in Black Form. **Causality Break** (level 20, Destroyer level 2) is your anti-caster tool: shift-use cancels nearby magic.

Level 25 brings two skill points and ten extra stat points. Buy **Black Meteorite** (Slayer 2, Black Form and Bull Thrust): 3.5 seconds of steerable flight that cuts through spells and hits for 40. Buy **Berserk Mode** (Slayer 3, Black Form): 800 to start, 6 a second, five minutes, ×1.35 damage.

Level 25 with Black Form also unlocks **the Devil Arm bargain**, and you need it before Liebe will fight you:

1. Let an enemy drop you below a quarter health. Each minute you stay there, Liebe has a 1 in 4 chance to offer the bargain for 20 seconds. Accept it. You now own the **Devil Arm**, a one-use form between Berserk and Devil Union that lasts three minutes, and your arm's look changes for good.
2. Go to **Faust House**, take the Basement Key from the key chest, and put any Anti-Magic sword on the **Devil Binding Altar**. Without the Devil Arm the altar refuses.
3. Beat Liebe yourself within 64 blocks: 250 health, 8 armour, hits for 10. Nobody else can interfere. The Devil Arm is the obvious thing to spend on this fight. He stops at 1 health to talk.
4. Pick the contract. It is permanent and resets all training counters:

| Contract | Devil Union needs | True Devil Union needs (all inside Devil Union) |
|---|---|---|
| Master-servant | 25% bond, 5 hostile victories and 1,000 Anti-Magic spent | 50% bond, level 35, 200 victories, 600 combat seconds, 50,000 spent |
| Equal | 25% bond, 50 victories, 10,000 spent, level 25 and Black Form | 50% bond, level 35, 100 victories, 300 combat seconds, 25,000 spent |

Equal halves the True Devil Union grind, and the 25% bond takes long enough that the Equal counters fill on their own meanwhile. Take Equal unless you want Devil Union the very first evening. "Spent" counts every point of Anti-Magic used, including form drain, and a combat second only ticks while a hostile you have traded hits with in the last five seconds is alive within 32 blocks.

## The Liebe bond

After the contract your bond starts at 0% and grows only from **Anti-Magic hits**: sword swings with an Anti-Magic sword in hand, techniques, kills made that way, and spells you cancel. Up to 10 experience per hit, 2 to 15 per kill, at most 40 a minute, and 2,000 for the whole bar, so 25% is at least 25 minutes of capped fighting and usually an evening. Every 10% gives +100 to your bar, +5% technique and sword damage, and +3% regen. **Devil Union** (2 points) unlocks at 25% once the counters are done, **True Devil Union** at 50% and level 35. At 100% both unions last 25% longer and drain 20% less.

## Levels 30 to 40: the rest of the tree

| Level | Buy | Notes |
|---|---|---|
| 30 | **Infinite Slash** (Slasher level 3), **Recovery II** (+20% regen), **Divider Control**, **Cleanse Efficiency**, **Flight Control** | Infinite Slash: 1,000 cost, 30 s, 40 base damage across 120 blocks at twice Dante Slash speed. |
| 35 | **True Devil Union** (2 points, once bond and training are done), **Efficient Forms** (−15% form drain), **Slash Control**, **Wider Cancellation** | True Devil Union: 2,000 to start, 50 a second, one minute, ×1.85 magic damage, ×1.60 physical, the four-sword ring. |
| 35 | **Infinite Slash Equinox** (2 points, Slasher level 4, Infinite Slash and Selective Cutting) | 2,000 cost, ten-minute cooldown, 75 base damage across 150 blocks. |
| 40 | **Anti-Magic Sharing** (Magic Storage and Devil Union) | Lets you infuse allies; a Wind or Star friend's black spells run on it. |

The whole tree costs **31 skill points**: 23 one-point nodes and four two-point nodes. Levels alone give 24 by level 100 and the story quests add 14 more, so everything is affordable eventually, but between levels 15 and 40 you will be choosing. Magic Absorption, Magic Storage, Selective Cutting and Efficient Techniques are the nodes to leave for later unless you fight casters.

## What to carry

- A sword in each hand. Fight with Demon-Slayer or Slasher; keep Demon Dweller or Destroyer in the off-hand for the regen rate.
- Food and a Totem if you can afford one (30,000 from a Black Market Dealer). Fire resistance potions for the volcano quest, which you can still do for its 1,300 XP and 12 stat points even without Mana Skin.
- Accessories with Max mana, Health and Melee damage affixes. Rings and bracelets stack with everything on this page. Dungeon vaults are the best source.
- Magic stones when you are rich: each distinct colour is +200 bar and +5% technique damage. Dungeon stone chests and Yuno's 2% drop are the free routes.

## Mistakes that cost the most

- Fighting without a sword out: your bar barely moves.
- Carrying a sword as a non-user, or lending one to a friend who is not an Anti-Magic user: it drains their mana every tick.
- Going to Faust House before the Devil Arm: the altar will not start.
- Choosing the contract on the spot. Decide between Master and Equal before you touch the altar.
- Starting Black Divider without a form active, or True Devil Union with less than about 5,000 on the bar.
- Playing in creative to "test": creative blocks sword discovery, bond experience, dungeon rewards and the Liebe training counters.

---
*Sources: CloverAntiMagicTree (nodes, costs, level and sword requirements), CloverLiebeBond (experience, caps, tier bonuses), CloverSpiritBondTraining (hit and victory formulas), CloverLiebeProgression, LiebeContract (armProgressionReady, ritualBlockReason), LiebeEntity, DungeonRewards, DungeonLoot.rollSpecial, DungeonGates, MarsEntity, CloverSpellDiscoveryData (sword prerequisites), CloverMagicServerHandler, CloverKiTrainingServerHandler, CloverKiProjectileDefense, CloverPoweredFlight, CloverTransformationData, CloverQuestData.*
