# Transformations

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Transformations are forms you toggle from the transformation wheel. Each belongs to one magic, multiplies your stats while active, drains your resource bar every second, and has a cooldown after it ends. Only one armour-type form can be active at once, and you must turn the current one off before starting another.

## How you get them

- Most forms are **discovered** while fighting, the same way as spells but at one fifth of the chance, in a fixed order for your magic. See [Spell Discovery](06-spell-levels-and-discovery.md).
- Anti-Magic forms are bought in the Anti-Magic tree instead. Devil Union and True Devil Union also need Liebe contract training. See [Bonds and Liebe](08-bonds-and-liebe.md).
- Yami Demon Form comes from the Kikongan item.
- Shadow's Nacht devil forms are always available once you own Shadow magic and a grimoire.
- The three Spirit Dives come from your spirit bond: Spirit Dive at 25%, Full Spirit Dive at 50%, Saint Spirit Dive at 100%. Each replaces the previous one on the wheel, and all three need the spirit's magic active. Slash Armor is discovered by Slash users.
- **Sprint flight.** Black Form, Berserk Mode, Devil Union, True Devil Union, the Spirit Dives and Valkyrie Dress can sprint while flying: hold sprint for three seconds to charge, then fly fast, and sneak to brake.
- Transformation Mastery adds 10% duration per rank and scales every positive stat by 5% per rank.

## Stat multipliers

Columns: magic damage, physical damage, magic defense, physical defense, movement speed, attack speed, knockback resistance, mana output, spell cost, cast time, projectile speed. Drain is resource per second before Mana Efficiency.

| Form | Magic dmg | Phys dmg | Magic def | Phys def | Speed | Atk speed | KB resist | Output | Cost | Cast time | Proj speed | Drain/s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Black Form | ×1.15 | ×1.10 | +15% | +10% | ×1.10 | ×1.05 | +10% | ×1.10 | ×1.0 | ×1.0 | ×1.0 | 2 |
| Berserk Mode | ×1.35 | ×1.35 | +20% | +5% | ×1.25 | ×1.15 | +25% | ×1.25 | ×1.1 | ×1.0 | ×1.0 | 6 |
| Devil Arm | ×1.45 | ×1.38 | +35% | +15% | ×1.30 | ×1.18 | +40% | ×1.30 | ×1.0 | ×1.0 | ×1.0 | 9 |
| Devil Union | ×1.55 | ×1.40 | +50% | +30% | ×1.35 | ×1.20 | +60% | ×1.40 | ×0.9 | ×1.0 | ×1.0 | 12 |
| True Devil Union | ×1.85 | ×1.60 | +75% | +50% | ×1.50 | ×1.30 | +100% | ×1.65 | ×0.8 | ×1.0 | ×1.0 | 50 |
| Lightning Battle Fiend | ×1.45 | ×1.38 | +28% | +14% | ×1.75 | ×1.28 | +35% | ×1.34 | ×0.95 | ×0.9 | ×1.2 | 9 |
| Yami Demon Form | ×1.75 | ×1.55 | +55% | +35% | ×1.30 | ×1.20 | +60% | ×1.50 | ×1.0 | ×0.8 | ×1.2 | 30 |
| Hellfire Incarnate | ×1.25 to ×3.5 | same | +15% to +60% | same | ×1.15 to ×1.45 | ×1.1 to ×1.25 | +25% | ×1.0 | ×1.0 | ×1.0 | ×1.0 | 20 to 50 |
| Spirit Dive | ×1.25 | ×1.10 | +15% | +10% | ×1.30 | ×1.10 | +15% | ×1.20 | ×1.0 | ×0.9 | ×1.1 | 5 |
| Full Spirit Dive | ×1.50 | ×1.20 | +25% | +20% | ×1.45 | ×1.20 | +25% | ×1.40 | ×1.0 | ×0.8 | ×1.25 | 10 |
| Saint Spirit Dive | ×1.65 | ×1.30 | +35% | +25% | ×1.55 | ×1.25 | +35% | ×1.50 | ×1.0 | ×0.75 | ×1.3 | 10 |
| Slash Armor | ×1.25 | ×1.35 | +20% | +25% | ×1.20 | ×1.20 | +20% | ×1.15 | ×1.0 | ×0.9 | ×1.1 | 8 |
| Valkyrie Dress | ×1.40 | ×1.20 | +25% | +20% | ×1.35 | ×1.15 | +30% | ×1.25 | ×1.0 | ×0.85 | ×1.15 | 8 |
| Mermaid Form | ×1.60 | ×1.35 | +30% | +25% | ×1.50 | ×1.25 | +35% | ×1.45 | ×0.9 | ×0.75 | ×1.3 | 12 |

Hellfire scales with its heat meter from 0 to 150: damage is 1.25 + 0.015 per point, defense 0.15 + 0.003 per point, drain 20 + heat ÷ 5.

## Activation cost, duration and cooldown

| Form | Magic | Activation cost | Duration | Cooldown |
|---|---|---|---|---|
| Black Form | Anti-Magic | 500 | 10 min | 1 min |
| Berserk Mode | Anti-Magic | 800 | 5 min | 2 min |
| Devil Union | Anti-Magic | 1,000 | 5 min | 3 min |
| True Devil Union | Anti-Magic | 2,000 | 1 min | 5 min |
| Devil Arm | Anti-Magic | none | 3 min | none, one use |
| Lightning Battle Fiend | Lightning | 1,000 | 5 min | 2 min |
| Yami Demon Form | Dark (Kikongan) | none | 5 min | 3 min |
| Hellfire Incarnate | Fire (Mereoleona) | 1,200 | until ended | 1 min |
| Spirit Dive | Any spirit, matching magic | 300 | 5 min | 1 min |
| Full Spirit Dive | Any spirit, 50% bond | 300 | 5 min | 1 min |
| Saint Spirit Dive | Any spirit, 100% bond | 300 | 5 min | 1 min |
| Slash Armor | Slash | 500 | 5 min | 1 min |
| Valkyrie Dress | Water (Noelle) | 450 | 5 min | 45 s |
| Mermaid Form | Water (Noelle) | 700 | 3 min | 1 min |

Activation cost is reduced by your normal spell cost reductions. Drain is reduced by Mana Efficiency (8% per rank) and for Anti-Magic forms by Efficient Forms (15%). A form ends when the drain cannot be paid, when its duration runs out, or when you toggle it off. Cooldown starts when it ends. Creative players skip cooldowns.

## Form notes

**Black Form, Berserk Mode, Devil Union, True Devil Union** (Anti-Magic). Bought in the Anti-Magic tree. Black Form and Berserk can be trained before a Liebe contract; Devil Union needs the contract and its training. Devil Union and True Devil Union grant creative-style flight while active. Each point of resource drained in Devil Union counts toward True Devil Union training.

**Devil Arm** (Anti-Magic). Granted by Liebe's arm bargain, which he offers at random when an enemy drops you below a quarter health before you have fought him. Since 1.8.0 you must be level 25 with Black Form unlocked to receive the offer, and the bargain is required before the altar ritual will start. The boost can be used once, for up to three minutes, and only before you bond with Liebe. The arm's appearance stays with you permanently.

**Lightning Battle Fiend** (Lightning). Discovered only after every Lightning spell is known.

**Yami Demon Form** (Dark). Activated by using the Kikongan item, which is on a 3-minute cooldown. While active, a rage meter from 0 to 100 builds from damage you deal (35 × damage ÷ target max health) and damage you take (55 × damage ÷ your max health). When the form ends you get Weakness and Slowness for 20 seconds.

**Hellfire Incarnate** (Fire, Mereoleona). Costs 1,200 mana to begin, drains 20 or more per second and has no timer. Heat rises by 1 per tick up to 3,000. Past 2,000 heat the form becomes **irreversible**: ending it or running out of mana kills you. Lethal hits are instead paid for with 1,000 mana while it lasts. Nearby threats are ignited every half second.

**Spirit Dive, Full Spirit Dive, Saint Spirit Dive** (any spirit). Need a 25%, 50% or 100% spirit bond and the spirit's magic active; the Dive ends if you switch magic, lose the spirit or remove its crown and mantle. With Sylph your magic switches to Spirit Wind while active and swaps back when it ends; Salamander and Undine keep your own magic with the spirit's colours. **Liebe at 100%**: Devil Union and True Devil Union last 25% longer and drain 20% less.

**Valkyrie Dress and Mermaid Form** (Water, Noelle). Valkyrie grants slow flight. Mermaid is discovered only after Valkyrie Dress and cannot start while mounted or in another form.

## Nacht devil forms (Shadow)

Shadow magic has four devils that can be combined freely from the Devil Union menu: Canis (Gimodelo), Equus (Slotos), Felis (Plumede) and Gallus (Walgner). Equipping costs 300 mana per devil in the new set, and upkeep is 20 per second per devil plus 10 for each devil beyond the first. The combined stats are:

- Magic damage ×(1 + 0.12 per devil), +0.1 with Gallus.
- Physical damage ×(1 + 0.08 per devil), +0.2 each for Canis and Felis, +0.15 for Equus.
- Magic defense +3% per devil, physical defense +2% per devil.
- Speed +65% with Felis, +15% with Gallus. Attack speed +15% with Felis, +10% with Canis.
- Output ×(1 + 0.08 per devil). Gallus gives ×0.95 cast time and ×1.1 projectile speed.

Abilities: Canis summons four dark afterimages that ambush enemies. Equus cuts incoming damage by 60% with full knockback resistance. Felis sidesteps a direct attack every 3 seconds for 25 mana. Gallus gives a crow stun (80 mana, 8-second cooldown) and 10 seconds of flight on a 10-second cooldown.

---
*Sources: CloverTransformationData, CloverTransformationStats, CloverTransformationServerHandler, CloverTransformationDiscoveryData, CloverHellfireData, CloverHellfireServerHandler, CloverNachtFormData, CloverNachtDevilHandler, CloverValkyrieHandler, CloverMermaidHandler, CloverStatServerHandler (Kikongan rage), LiebeContract.*
