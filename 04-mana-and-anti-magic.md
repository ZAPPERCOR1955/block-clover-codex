# Mana and the Anti-Magic Resource

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Every magic user has one resource bar. For most magics it is **Mana**. For Anti-Magic users the same bar is called **Anti-Magic** and follows a few different rules. Spells, skills and transformations all draw from it.

## Maximum

```
max = race base
    + 20 × Max Mana stat
    + race tree bonuses
    + accessory bonuses
    + 200 × magic stones carried
    + spirit bond: 200 + 250 × each 10% bond (matching magic active)
    + Liebe bond: 100 × each 10% bond
```

Creative mode, the Infinite challenge rule and a few special states (Soul Chain, some challenge modes) override this.

<div class="calc" data-calc="mana"></div>

## Regeneration

Regen runs on the server every tick while you are not charging a spell. Two numbers matter:

- **Interval**: `20 − (Mana Regen Speed ÷ 10)` ticks, so 1 second at 0 and 0.5 seconds at 100. The Mana Recovery skill node cuts it by 15%, a held wand's regen affix by up to 90%, and Willpower by up to 50% when you are badly hurt. Minimum 1 tick.
- **Amount per interval**: `1 + (Mana Regen Amount ÷ 10)`, times `1 + 0.1 × magic stones carried`, times the bond multiplier (spirits +10% per 10% bond with matching magic, Liebe +3% per 10%), plus any base value.

The interval is also sped up by a race multiplier, by the base Regen Speed value as a percentage, by the Anti-Magic Recovery nodes, and by 1.5× while inside a Neverland zone.

Regen is paused while you hold a spell charge. Hellfire form ends if you hit 0 mana.

### Anti-Magic regen depends on your sword

For Anti-Magic users the regen speed is multiplied by a percentage set by what you hold in either hand:

| Held sword | Regen speed |
|---|---|
| None of the swords | 25% |
| Demon-Slayer, Black Divider or Demon-Slasher | 50% |
| Demon-Dweller | 75% |
| Demon-Destroyer | 100% |

Anti-Magic users also cannot use Mana Method natural gathering, and their mana regen does not count toward the Mana Control mission.

## Spending

- Spells cost their base mana reduced by Mana Control, race reductions (capped at 90%), the held wand, Mana Efficiency mastery, your transformation's cost multiplier and the Anti-Magic Efficient Techniques node. Minimum 1.
- **Charging** a spell above ×1.0 output costs extra mana in proportion to the extra output, limited to what you have.
- Toggle skills such as Mana Skin drain a fractional amount per second, scaled by the same cost reductions as spells.
- Transformations drain a fixed amount per second, reduced by Mana Efficiency mastery (8% per rank) and, for Anti-Magic forms, by Efficient Forms (15%).
- If a spend fails you see "Not enough Mana for ...". Creative players and the Infinite challenge rule spend nothing. While Liebe has locked your power, nothing can be spent at all.
- Every point spent by an Anti-Magic user with a Liebe contract counts toward Devil Union training (see [Bonds](08-bonds-and-liebe.md)).

### Non-users holding Anti-Magic swords

If you are not an Anti-Magic user, every Anti-Magic sword anywhere in your inventory drains your mana **every tick**: 1 for Demon-Slayer or Black Divider, 2 for Demon-Dweller or Demon-Slasher, 3 for Demon-Destroyer. That is 20 to 60 mana per second per sword, so carrying one as a non-user empties the bar almost instantly.

## Natural mana (Mana Method and Mana Zone)

Non-Anti-Magic users with the Mana Method or Mana Zone skill active gather a second pool of **natural mana** that spells draw from first.

- Capacity: your max mana × 1.0, or ×1.5 with Mana Method Capacity, ×1.75 with Mana Method Power, ×2.0 once Mana Method or Mana Zone is mastered.
- Fills from empty in 1,200 ticks (60 s), or 1,100 with Mana Method Speed, 1,000 with Mana Method Efficiency, 800 when mastered. Filling runs at a quarter speed while a Mana Zone release is recovering.
- Drains at 1% of capacity per tick while neither skill is active.
- Not available under the Finite challenge rule, during Soul Chain, or while Liebe has locked your power.

## Magic stones

There are eleven magic stones: white, green, yellow, red, orange, cyan, blue, pink, magenta, lavender and grey. Each distinct stone in your inventory gives:

- +200 max mana
- +5% magic damage
- +10% mana regen amount

All eleven together: +2,200 max mana, +55% magic damage, +110% regen amount.

## Accessories

You can wear up to **8 accessories**: 2 rings, 2 earrings, 2 bracelets and 2 necklaces. Each comes in six rarities (Common, Uncommon, Rare, Epic, Legendary, Mythic) and rolls up to five affixes. Bonuses from all eight stack.

| Affix | Common | Uncommon | Rare | Epic | Legendary | Mythic |
|---|---|---|---|---|---|---|
| Max mana | 20–40 | 40–75 | 75–130 | 130–220 | 220–350 | 350–500 |
| Health | 1–3 | 2–5 | 4–8 | 7–12 | 10–18 | 15–25 |
| Melee damage % | 2–4 | 3–6 | 5–10 | 8–15 | 12–22 | 18–30 |
| Movement speed % | 1–2 | 2–4 | 3–6 | 5–9 | 7–12 | 10–16 |
| Physical defense % | 1–3 | 3–6 | 5–10 | 8–15 | 12–22 | 18–25 |
| Magic defense % | 1–3 | 3–6 | 5–10 | 8–15 | 12–22 | 18–25 |
| Luck % | – | – | 5–8 | 8–15 | 15–30 | 25–50 |

## Wands

Items tagged as wands roll affixes when first held. Every wand gets a cast time affix and a mana output affix. There is a `35 + 8 × rarity` percent chance (35% Common up to 75% Mythic) of a third support affix: mana regen, mana cost or cooldown. Values are percentages.

| Affix | Common | Uncommon | Rare | Epic | Legendary | Mythic |
|---|---|---|---|---|---|---|
| Cast time | 2–4 | 4–7 | 7–11 | 11–17 | 17–25 | 25–35 |
| Mana output | 3–6 | 6–10 | 10–16 | 16–25 | 25–38 | 38–55 |
| Mana regen | 3–6 | 6–10 | 10–16 | 16–24 | 24–34 | 34–45 |
| Mana cost | 1–2 | 2–4 | 4–7 | 7–11 | 11–16 | 16–23 |
| Cooldown | 1–2 | 2–4 | 4–7 | 7–11 | 11–16 | 16–23 |

Wand bonuses only apply while the wand is held.

---
*Sources: CloverProgressionData (maxMana, manaRegenTicks, spellManaCost), CloverMagicServerHandler (regenerateMana, antiMagicRegenPercent, trySpendMana, drainForeignAntiMagicWeapons), CloverNaturalMana, CloverMagicStoneData, CloverRingData, CloverRingEquipment, CloverWandData.*
