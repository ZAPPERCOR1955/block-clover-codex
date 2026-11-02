# Spell Discovery and Spell Levels

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Spells are not bought. You **discover** them by fighting and casting, then each spell has its own **level** from 1 to 10 that grows as you use it. Anti-Magic swords use the same level system.

## Your first spell

When Drouot gives you a grimoire, or when you log in with one and know nothing yet, you get one starter spell at random from a short preferred list for your magic. The pick must cost no more than your max mana. Examples:

| Magic | Starter candidates |
|---|---|
| Anti-Magic | Demon-Slayer Sword |
| Dark | Dark Cloaked Black Blade or Dark Cloaked Lightless Slash |
| Wind (Yuno) | Crescent Kamaitachi or Swift White Hawk |
| Light | Light Swords of Judgement |
| Lightning | Thunder God's Gloves |
| Fire (Mereoleona) | Calidus Brachium |
| Fire (Magna) | spell 1 |
| Water (Noelle) | spell 4 |
| Slash | Severing Blades, always |
| Everything else | the first two spells in the list |

If none of those fit, any implemented spell you can afford is used instead.

## Discovery rolls

Discovery only runs in survival, while you hold a grimoire and still have undiscovered spells (or an undiscovered transformation). Three triggers roll independently, each with its own cooldown:

| Trigger | Interval | Chance |
|---|---|---|
| A successful spell cast | once per 2 s | 0.25%, plus 0.5% + 3.25% × (missing health)² if you were hit in the last 10 s |
| Taking damage from a living attacker | once per 1 s | 0.4% + 5.5% × (missing health after the hit)² |
| Landing a melee hit | once per 1 s | 0.15% + 1.35% × (missing health)² |

Missing health is a fraction: at half health it is 0.5, so the squared term is a quarter of the bonus. Being nearly dead is by far the strongest multiplier. After any success there is a 10-second lockout.

The rolled chance is then multiplied by:

- **Spell Insight** mastery: +20% per rank.
- **Combat context**: ×1.5 if you fought a hostile mob in the last 10 s, and another ×1.5 if magic damage was involved. Both together: ×2.25.
- **Early spells**: ×2.0 while you know 0 or 1 spells of the magic, ×1.5 at 2.
- **Luck**: +0.25% per luck point, capped at +50%.
- **Challenge mode**: ×5 in the first challenge preset.

Transformations roll first at one fifth of the combat-adjusted chance. If that fails, a spell rolls with the full multipliers.

### Which spell comes next

Candidates are the undiscovered spells whose prerequisites you meet, limited to the first (known + 1) entries of the magic's spell list. That keeps discovery roughly in list order, but one of several eligible spells is picked at random. If the ordered window has nothing eligible, the whole list is considered.

Notable prerequisites:

- Anti-Magic: Demon-Slayer is the starter. Demon Dweller is never discovered; it is the special reward in a dungeon's personal vault chest. Demon-Destroyer needs Demon Dweller known, Demon Slasher needs Demon-Destroyer. Everything from Bull Thrust on comes from the Anti-Magic tree, not discovery.
- Dark: Dimension Slash needs 5 known spells. Blade Storm needs Lightless Slash. Iai Slash and Death Thrust need Dimension Slash. Black Moon needs Black Hole. Spells that require Mana Zone need the Mana Zone node.
- Wind (Yuno): the Black variants need the base spell and Star infusion.
- Star: the Quartile spells need Conjunction; Never-Never Land needs Conjunction and Spirit Wind.
- Lightning: Keraunos needs the Mana Method node.
- Light: Light Shaft of Divine Punishment and Arrows of Judgment cannot be your first spell.
- Fire (Mereoleona): Exercitus Leonum needs both Purgatory variants.
- Variant spells (names with a colon) need their base spell. Magic Bullet is never discovered; it is granted separately.
- Mana Zone spells (Equinox, Black Moon, Death Thrust, Iai Slash, Purgatory, Abyss, Dark Prison Hunting Ground, Chrono Stasis Grigora, Spirit's Hushed Dance, Never-Never Land, Black Neverland) need the Mana Zone node first.
- Spirit Wind: Saint spells need a 100% spirit bond. Black Meteorite (Wind, Spirit Wind and Star) is never discovered; it is usable whenever Demon Dweller is in either hand.
- Slash: Severing Blades is always the starter. Final Slash is never discovered; it is the last-stand spell that only works at level 50 with 50 Strength invested.

Ops can grant any spell with `/blockclover unlock spell <magic> <spell>`.

## Spell levels

Each discovered spell levels from 1 to 10. XP needed per level:

```
XP to next = 50 + level × 50     (100 at level 1, up to 500 at level 9; 2,700 in total)
```

XP comes from using the spell:

| Action | XP | Cap |
|---|---|---|
| Casting it (not Magic Bullet) | 10 | Level 4 only, except utility spells such as Conjunction, Shadow Travel, Teleport Entity and the Neverland spells, which reach 10 from casting |
| Dealing damage with it | 3 × damage dealt, 1 to 120 per hit; area spells get a quarter | 10 |
| Blocking damage with a defensive spell | 2 × damage absorbed, 2 to 150 | 10 |
| Holding a target bound | 1 per 2.5 ticks bound, up to 80 | 10 |
| Hitting with an Anti-Magic sword, melee or thrown | 12 | 10 |

All XP is multiplied by Spell Insight (+10% per rank) and race practice bonuses. A level-up shows a "Spell Level Up" popup.

What a level gives:

- **+3% damage per level** above 1, so +27% at level 10. The bonus also applies to any damage you deal within 10 seconds of casting that spell.
- **+5.5% range per level** for utility spells that use distance.
- **+4.5% travel speed per level** for spells that move you or a projectile.
- Anti-Magic tree nodes require specific sword levels (never above 4).

Becoming Wizard King maxes every spell at once. There is no command to set a single spell's level.

## Transformations

Transformations are discovered with the same rolls at one fifth of the chance, in a fixed order per magic, and only once the form's magic is active. Lightning Battle Fiend needs every Lightning spell known first and Mermaid needs Valkyrie Dress first. Spirit Dive, Full Spirit Dive and Saint Spirit Dive are not discovered at all; they come from the spirit bond at 25%, 50% and 100%. Anti-Magic forms come from the Anti-Magic tree instead. See [Transformations](07-transformations.md).

---
*Sources: CloverSpellDiscoveryData, CloverSpellProgressionData, CloverTransformationDiscoveryData, CloverMagicServerHandler.recordSuccessfulCast, CloverWizardEmperorServerHandler.*
