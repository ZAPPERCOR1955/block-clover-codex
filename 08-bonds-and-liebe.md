# Bonds, Spirits and Liebe

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

The **Bonds** tab in the grimoire lists every partner you have: an elemental **spirit**, the devil **Liebe** for Anti-Magic users, or the four **Nacht devils** for Shadow users. Since 1.8.0 a bond is a single **percentage** from 0 to 100 that grows through combat and pays its bonuses automatically. The old "channel" slider is gone: whatever your bond is at, you get.

## Spirits

There are four spirits. Each bonds only with a player who owns a compatible magic:

| Spirit | Attribute | Compatible magics |
|---|---|---|
| Salamander | Fire | Fire (Magna), Fire (Mereoleona), Fire (Fuegoleon) |
| Undine | Water | Water (Noelle), Water (Leviathan) |
| Sylph | Wind | Wind (Yuno) |
| Gnome | Earth | Earth, which does not exist yet |

Anti-Magic owners can never be chosen by a spirit.

**How a spirit chooses you.** Two routes:

- **The roll.** Every 5 minutes of play in survival, if you are at or above the `spiritMinimumLevel` gamerule, own a compatible magic and have no spirit, the game rolls a 1 in 1,000 chance. On success one compatible spirit bonds with you.
- **A spirit scroll.** Wind, Fire, Water and Earth Scrolls come from a dungeon's personal vault chest. Hold right-click for one second with the matching magic active and the spirit bonds at once. The scroll is consumed only when the bond succeeds. See [Items and Equipment](11-items.md) for the odds.

With the `uniqueSpirits` gamerule on, each spirit can belong to only one player on the server. Ops can hand one out with `/blockclover unlock spirit <salamander|undine|sylph|gnome>`.

## How bond experience is earned

Both spirit bonds and the Liebe bond use the same ledger: **2,000 bond experience is 100%**, so every 20 experience is one percent. Experience comes from fighting hostile mobs in survival with the bond's magic active:

| Action | Experience |
|---|---|
| A damaging hit with the bond's magic | Up to 5 for the first 15 damage, then 1 per 5 damage beyond, capped at 10 per hit |
| Being hit by an enemy within 10 seconds of attacking it | A quarter of the damage, at most 2 |
| Killing an enemy | Its max health ÷ 10, between 2 and 15 |
| Cancelling an enemy's spell with Anti-Magic (Liebe only) | 4 |

Three caps apply at once: **40 experience per minute**, at most 15 per hit for Liebe, and each enemy can give you at most its max health in experience, clamped between 20 and 60. So one zombie (20 health) is worth 20 experience at most, a boss up to 60. Even at the per-minute cap, 0% to 100% takes 50 minutes of continuous fighting, so expect a few hours of real play.

For a spirit the magic must **match**: Fire magic for Salamander, Water for Undine, Wind for Sylph. For Sylph the Spirit Wind spells only count while a Spirit Dive is active. Creative mode and dummies earn nothing. The spirit roll, the Bonds entry and the old "100 kills" milestone are gone; anyone who had an old bond was converted (synchronized became 25%, Saint became 100%).

## Spirit bond bonuses and milestones

While your active magic matches the spirit, every 10% of bond gives:

- +5% magic damage
- +250 max mana, on top of a flat +200 for having the bond at all
- +10% mana per regeneration pulse

| Bond | What unlocks |
|---|---|
| 25% | **Spirit Dive**. Sylph also unlocks the Spirit Wind magic, usable while a Dive is active. |
| 50% | **Full Spirit Dive** replaces Spirit Dive on the wheel. |
| 100% | **Saint Stage**: **Saint Spirit Dive** replaces Full Spirit Dive, and Saint spells (Saint Spirit of Zephyr) can be discovered. |

Each Dive tier replaces the previous one; see [Transformations](07-transformations.md) for their stats. The Dive ends on its own if you lose the spirit, switch away from the matching magic or remove its crown and mantle. Yuno-origin characters start with Sylph at 100%.

## Liebe (Anti-Magic)

Liebe is the only bond with a prerequisite chain. In 1.8.0 the order became: **Black Form, then the Devil Arm bargain, then the Faust House ritual, then the contract and the bond.**

### Step 1: the Devil Arm bargain

You must be **level 25 with Black Form unlocked**. From then on, whenever an enemy drops you below a quarter of your health, Liebe has a 1 in 4 chance every minute to offer the bargain, and you have 20 seconds to accept. Accepting gives the **Devil Arm** form, usable once for up to three minutes before you bond, and permanently changes your arm's appearance while you have Anti-Magic. The bargain is now **required** before the altar will work: without it the altar tells you to acquire the Devil Arm first.

### Step 2: the ritual

1. Go to **Faust House** (ops can teleport with `/blockclover tp housefaust basement`). Find the Basement Key in the key chest and open the basement.
2. Place an Anti-Magic sword on the Devil Binding Altar. Only an Anti-Magic user who has the Devil Arm bargain can start it.
3. Defeat Liebe yourself within 64 blocks. He has 250 health, 8 armour and hits for 10. Other players cannot hurt him or you during the trial. He stops at 1 health and asks what contract you want; you can also choose later in Bonds.
4. Choose **Equal** or **Master-servant**. The choice is permanent and resets all training counters. The `/liebecontract` command from 1.7.0 no longer exists.

### Step 3: the bond

The Liebe bond starts at 0% when the contract is signed (25% if you already owned Devil Union from an older version, 50% for True Devil Union). It grows only from **Anti-Magic hits**: sword swings with an Anti-Magic sword in hand, techniques, and spells you cancel. While your Anti-Magic is active and not power-locked, every 10% gives:

- +100 max Anti-Magic
- +5% damage on techniques and on sword swings
- +3% Anti-Magic regeneration

At **100%** the bond is mastered: Devil Union and True Devil Union last 25% longer and drain 20% less.

### Devil Union training

Devil Union and True Devil Union are nodes in the Anti-Magic tree, but they stay locked until Liebe is satisfied. Progress only counts while you are alive, in survival, holding a grimoire, with Anti-Magic active, not power-locked. "Spent" means Anti-Magic resource used, including the drain of a transformation.

| Node | Bond | Master contract | Equal contract |
|---|---|---|---|
| Devil Union | 25% | 5 hostile victories and 1,000 Anti-Magic spent | 50 victories, 10,000 spent, level 25, Black Form unlocked |
| True Devil Union | 50% | Level 35, Devil Union, then 200 victories, 600 combat seconds and 50,000 spent, all inside Devil Union | Level 35, Devil Union, then 100 victories, 300 combat seconds and 25,000 spent inside Devil Union |

A combat second ticks only while a hostile you have traded hits with in the last 5 seconds is alive within 32 blocks. Liebe sends a chat message when each node is ready. Both cost 2 skill points.

### Familiar

After the contract you can summon or dismiss Liebe as a familiar in Bond controls, choosing his small form or full base form. Liebe can also lock your power during certain story moments; nothing can be spent while locked.

## Anti-Magic tree

Replaces the Mana tree for Anti-Magic users. Branch roots are granted free once you own that sword. Requirements are player level, the sword's own level (see [Spell Levels](06-spell-levels-and-discovery.md)) and the parent node. No node needs a bond percentage any more; only Devil Union and True Devil Union need a Liebe contract.

| Node | Branch | Cost | Level | Sword level | Needs | Effect |
|---|---|---|---|---|---|---|
| Anti-Magic | root | free | – | – | – | Foundation. |
| Demon-Slayer | Slayer | free | – | – | sword | Reflection; hold use to throw. |
| Bull Thrust | Slayer | 1 | 5 | 1 | Demon-Slayer | Forward sword thrust. |
| Black Hurricane | Slayer | 1 | 15 | 2 | Bull Thrust | Spinning attack. |
| Black Divider | Slayer | 1 | 20 | 2 | Demon-Slayer, Black Form | Extend Demon-Slayer with anti-magic. |
| Divider Control | Slayer | 1 | 30 | 3 | Black Divider | Black Divider lasts 25% longer. |
| Demon-Dweller | Dweller | free | – | – | sword | Sword combat and throwing. |
| Black Slash | Dweller | 1 | 10 | 1 | Demon-Dweller | Ranged anti-magic slashes. |
| Magic Absorption | Dweller | 1 | 15 | 2 | Demon-Dweller, Black Slash | Shift-use to absorb magic, release it once through Black Slash. |
| Magic Storage | Dweller | 1 | 20 | 2 | Magic Absorption | Three releases per absorption. |
| Anti-Magic Sharing | Dweller | 1 | 40 | 4 | Magic Storage, Devil Union | Infuse allies with anti-magic. |
| Demon-Destroyer | Destroyer | free | – | – | sword | Effect removal on use. |
| Causality Break | Destroyer | 1 | 20 | 2 | Demon-Destroyer | Shift-use to cancel nearby magic. |
| Wider Cancellation | Destroyer | 1 | 35 | 3 | Causality Break | +25% Causality Break radius. |
| Cleanse Efficiency | Destroyer | 1 | 30 | 3 | Causality Break | −25% Demon-Destroyer cooldowns. |
| Demon-Slasher | Slasher | free | – | – | sword | Hold up to 2 s for Dante Slash; shift-hold throws. |
| Selective Cutting | Slasher | 1 | 20 | 1 | Demon-Slasher | Menu for choosing what the blade cuts. |
| Slash Control | Slasher | 1 | 35 | 3 | Demon-Slasher | Dante Slash +15% damage. |
| Infinite Slash | Slasher | 1 | 30 | 3 | Demon-Slasher | Fast vertical black cut over 120 blocks. |
| Infinite Slash Equinox | Slasher | 2 | 35 | 4 | Infinite Slash, Selective Cutting | Ultimate long-range cut. |
| Anti-Magic Control | Control | free | – | – | – | Branch root. |
| Sword Recall | Control | 1 | 5 | – | Control | Call thrown swords back. |
| Demon-Slayer Flight | Control | 1 | 15 | 2 (Slayer) | Sword Recall, Demon-Slayer | Shift-use Demon-Slayer to fly on it. |
| Flight Control | Control | 1 | 30 | 3 (Slayer) | Flight | +15% flight and boost speed. |
| Recovery I | Control | 1 | 10 | – | Control | +10% Anti-Magic regen. |
| Recovery II | Control | 1 | 30 | – | Recovery I | +20% Anti-Magic regen. |
| Efficient Techniques | Control | 1 | 15 | – | Control | Techniques cost 10% less. |
| Efficient Forms | Control | 1 | 35 | – | Black Form, Efficient Techniques | Transformation drain −15%. |
| Black Form | Control | 2 | 15 | 2 (Slayer) | Control | Unlock Black Form. No contract needed. |
| Black Meteorite | Control | 1 | 25 | 2 (Slayer) | Black Form, Bull Thrust | Combine Bull Thrust with Black Form. |
| Berserk Mode | Control | 1 | 25 | 3 (Slayer) | Black Form | Unlock Berserk Mode. |
| Devil Union | Control | 2 | – | – | Black Form, contract, 25% bond, training | Unlock Devil Union. |
| True Devil Union | Control | 2 | – | – | Devil Union, 50% bond, training | Unlock True Devil Union. |

Buying a spell node also discovers that spell; buying a form node unlocks the transformation. The whole tree costs 31 skill points.

## Nacht devils (Shadow)

Shadow owners see Gimodelo, Slotos, Plumede and Walgner in Bonds. They need no ritual: select their forms in Shadow's Devil Union menu with a grimoire and enough mana. In 1.8.1 the Nacht devils have no bond percentage and give no passive bonuses; their forms are described in [Transformations](07-transformations.md).

---
*Sources: CloverSpiritData, CloverSpiritServerHandler, CloverSpiritBondTraining, CloverSpiritDiveAccess, CloverSpiritGameRules, CloverBondPower, CloverLiebeBond, LiebeContract (armProgressionReady, ritualBlockReason), DevilBindingAltarBlockEntity, LiebeEntity, CloverLiebeProgression, CloverAntiMagicTree, CloverNachtDevilHandler, FireScrollItem and the other scroll items, DungeonLoot.rollSpecial.*
