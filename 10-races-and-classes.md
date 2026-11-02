# Races and Human Classes

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Your **origin** is rolled once, when your magic awakens, and it sets your race, your human class if you are human, and your magic. The roll screen lets you reroll with reroll tokens (the `bCRerollTokens` gamerule, default from the server) or, when the `randomMagic` gamerule is off, pick a magic directly.

## The origin roll

- **Race** is uniform among Human, Elf, Witch, Dwarf and Hybrid (one in five each).
- **Human class** is uniform among Commoner, Noble, Royal and Peasant.
- **Hybrid** picks two different base races. If one is Human it also rolls a human class. A hybrid also gets a **second magic**, drawn from the other playable magics that are not claimed.
- **Magic** is uniform among the fifteen playable origin magics that are still available (see [Magic Types and Spells](09-magics-and-spells.md)). With `uniqueMagic` on, a magic already claimed by another player is skipped unless `allowDuplicateMagicWhenFull` lets it repeat once all are taken.
- **Anti-Magic forces Human Peasant.** Rolling or choosing Anti-Magic overrides the race and class.
- If only one magic is available, a Hybrid roll falls back to Human.
- Each reroll spends one token and guarantees a different result where possible.

Ops can set race and class with `/blockclover race <race>` and `/blockclover character ...`; see the [Admin Reference](15-admin-reference.md).

## Base values by race

These are the starting values behind the stat panel. Hybrids take the **average** of their two races for the first five rows and inherit both races' flat bonuses in the race tree at half strength.

| Race / class | Max mana | Regen speed | Mana output | Mana Control | Spell cost | Starting reputation |
|---|---|---|---|---|---|---|
| Human, Peasant | 100 | ×1.00 | 1.25 | +0 | – | 0 |
| Human, Commoner | 125 | ×1.10 | 1.35 | +5 | – | 10 |
| Human, Noble | 175 | ×1.25 | 1.50 | +15 | −5% | 50 |
| Human, Royal | 250 | ×1.50 | 1.75 | +30 | −10% | 150 |
| Elf | 300 | ×1.75 | 2.00 | +10 | – | 75 |
| Witch | 220 | ×1.50 | 1.75 | +10 | −5% | 50 |
| Dwarf | 150 | ×1.20 | 1.40 | +0 | – | 25 |

Flat extras:

- **Elf**: +25% luck.
- **Dwarf**: +4 max health, +5% physical damage reduction, −4% movement speed (recovered partly by the final race node).
- **Witch**: broom speed bonuses through the race tree.
- **Human**: the only race whose tree grants extra stat and skill points per level.

"Regen speed" multiplies how fast regen ticks arrive. "Mana output" is the base of your spell charge cap. "Mana Control" is added to the stat before cost and cooldown reductions are computed.

## Race trees

Each race has its own ten-node skill tree with distinct bonuses. The node lists and numbers are in [Skill Trees](05-skill-trees.md). A hybrid's tree is called Dual Heritage and applies half of each parent race's nodes.

## Naming

A hybrid is shown as "Hybrid (Noble / Elf)", using the human class name in place of "Human". Yuno-origin characters are a special preset that ops can apply with the `yuno` command branch; it sets Wind magic, a royal lineage and a Sylph bond at Saint Stage.

---
*Sources: CloverRaceData, CloverMagicServerHandler (origin roll), CloverMagicClaims, CloverRaceSkillBonuses, BlockcloverModGameRules, CloverUniqueMagicRules.*
