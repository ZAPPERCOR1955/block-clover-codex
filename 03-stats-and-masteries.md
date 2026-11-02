# Stats and Masteries

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

The grimoire screen has two upgrade panels: twelve **main stats** bought with stat points, and five **mastery stats** bought with mastery points. Anti-Magic users see the same stats, but the mana ones are labelled Anti-Magic and the Mana Sense row is hidden.

## Main stats

Each main stat runs from 0 to 100. Points cost 1 to 5 each depending on how high the stat already is (see [Leveling and Points](02-leveling-and-points.md)). Every stat has a hidden **base value** on top of the upgradeable one. Base values come from your race and human class, and ops can set them per player. The base value usually adds its own percentage, as noted below.

| Stat | Effect per point | At 100 |
|---|---|---|
| Strength | +1% melee damage | +100% |
| Speed | +0.3% movement speed | +30% |
| Physical Defense | +0.5% physical damage reduction | 50% reduction |
| Magic Defense | +0.5% magic damage reduction | 50% reduction |
| Max Mana | +20 max mana | +2,000 |
| Mana Regen Speed | regen tick every 20 − (value ÷ 10) ticks | every 0.5 s instead of 1 s |
| Mana Control | −0.4% spell mana cost and −0.25% spell cooldown | −40% cost, −25% cooldown |
| Mana Output | +0.02 to the spell charge cap | cap +2.0 |
| Mana Sense | sense range 4 + (value ÷ 2) blocks | 54 blocks |
| Health | +0.8 HP | +80 HP (40 hearts) |
| Magic Damage | +1% spell damage | +100% |
| Mana Regen Amount | 1 + (value ÷ 10) mana per regen tick | 11 per tick |

Details worth knowing:

- **Damage reduction is capped.** Physical and magic reduction from every source together (stats, Mana Skin, transformations, race, rings, Willpower) is capped at 90%.
- **Max mana** is race base + 20 per point + race tree bonuses + ring bonus + magic stones + bond power (spirits: 200 plus 250 per 10% bond while your magic matches; Liebe: 100 per 10%). The in-game text shows "100 + 20 × value" as a plain illustration; the real base is your race's.
- **Mana regen** has two halves. Regen Speed sets how often a tick happens. Regen Amount sets how much each tick restores, multiplied by 1 + 0.1 per magic stone you carry. The Mana Recovery skill node cuts the interval by 15%, held wands by up to 90%, and Willpower adds speed when you are hurt. For Anti-Magic the regen is further scaled by which sword you hold (see [Mana and Anti-Magic](04-mana-and-anti-magic.md)).
- **Mana Control** stacks with race control bonuses before the percentage is worked out, so a race with high control reaches the caps sooner. Spell cost is then reduced again by race cost reduction (capped at 90%), held wand, Mana Efficiency mastery, your transformation's cost multiplier and the Anti-Magic Efficient Techniques node.
- **Mana Output** is the ceiling for charged spells. Holding a cast charges from ×0.75 up to the cap, which is race base + value ÷ 50 + base value ÷ 100 + wand bonus, multiplied by your transformation and by 1.5 while Mana Zone release is active. Charging above ×1.0 costs extra mana in proportion.
- **Strength and Magic Damage** also pick up the Willpower bonus below, ring bonuses, race tree bonuses and (for magic) magic stone bonuses and bond multipliers: +5% per 10% spirit bond while your magic matches the spirit, or +5% per 10% Liebe bond on techniques and sword swings.
- **Health** base values are stored as "20 + bonus", so a base of 20 means no change.

## Mastery stats

Five masteries, each from 0 to 5, one mastery point per rank. You get one point per 10 levels plus a few from quests, so not everything can be maxed.

### Luck

+20% luck per rank. Luck is a single percentage that also gets race, ring, race-tree and four-leaf grimoire bonuses. It is used in four places:

- Spell discovery chance: +0.25% per luck point, capped at +50%.
- Four-leaf grimoire roll when Drouot hands you a grimoire: base 2% chance, multiplied by (1 + luck ÷ 100).
- Enchanting: chance of extra enchantment levels (luck ÷ 200 expected) and extra enchantments (luck ÷ 250 expected).
- Wither skeletons: bonus skull chance of luck ÷ 2000, capped at 75%.

### Willpower

A "comeback" stat that only works below half health. The bonus scales linearly from nothing at 50% HP to the full value at 0% HP. Per rank at full intensity:

- +5% outgoing damage, melee and magic.
- +4% physical and magic damage reduction.
- +10% mana regen speed.

Willpower also reduces mana pressure you receive from other players by 10% per rank at all times.

### Mana Efficiency

- −5% spell mana cost per rank, applied after Mana Control and race reductions.
- −8% transformation resource drain per rank.

For Anti-Magic users this row is labelled Anti-Magic Efficiency and does the same thing to the Anti-Magic bar.

### Spell Insight

- +10% spell practice XP per rank. This feeds both player XP from casting and spell level XP.
- +20% spell discovery chance per rank.

### Transformation Mastery

- +10% transformation duration per rank, for forms with a timer.
- +5% per rank scaling on every positive stat of a transformation (damage, speed, defense, output) and the same scaling on its cost and cast-time discounts. Drain per second is not scaled.
- Two earned titles need rank 5 together with a specific form unlocked.

## Where to see the numbers

The grimoire's stats page shows each stat's current effect text. The mana page shows your max mana, regen and output after every bonus. Admin stat overrides (the `modifier` command) can multiply XP, luck, mana cost and cooldowns per player; see the [Admin Reference](15-admin-reference.md).

---
*Sources: CloverProgressionData (stat and mastery formulas), CloverStatServerHandler (damage pipeline, luck), CloverGrimoireSlotHandler (four-leaf roll), CloverSpellDiscoveryData (luck and insight), CloverTransformationStats, CloverTransformationData.*
