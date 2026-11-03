# Admin Reference

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

## There is no config file

The mod never registers a NeoForge config, so nothing appears in the `config` folder. Server behaviour is set with **gamerules**, per-player values with the **/blockclover** command, and client cosmetics in a properties file next to `options.txt`.

## Gamerules

| Gamerule | Type | Effect |
|---|---|---|
| `randomMagic` | boolean | Players get a random magic at their origin roll instead of choosing. |
| `bCRerollTokens` | integer | Reroll tokens each player gets on the origin screen. |
| `uniqueMagic` | boolean | Each playable magic can be claimed by only one player. |
| `allowDuplicateMagicWhenFull` | boolean | With `uniqueMagic`, let magics repeat once all are claimed. |
| `uniqueSpirits` | boolean | Each spirit can bond with only one player. |
| `spiritMinimumLevel` | integer | Level needed before a spirit can choose you. |
| `partyMemberLimit` | integer | Maximum party size. |
| `dungeonGateMinutes` | integer, default 60 | Minutes between dungeon gates (1 to 10,080). |
| `blackMarketResetMinutes` | integer, default 30 | Length of each Black Market auction. |
| `entranceExamWaitMinutes` | integer, default 30 | Minutes between entrance exams. |
| `starFestivalMinutes` | integer, default 600 | Length of a Star Awards Festival period. |
| `magicBlockDestruction` | boolean, default true | Whether spells break terrain (Dimension Slash, Tornado Fang, Purgatory, Light Shaft, Singularity and the rest). Set it to false to stop craters. |

Set them with the vanilla command, for example `/gamerule uniqueMagic false`. They are stored per world.

## The /blockclover command

Groups marked (4) need permission level 4; the rest need level 2. Use tab completion for argument values.

```
/blockclover guide                                   give the guide book
/blockclover tp grimoiretower | entranceexam
/blockclover tp housefaust outside | basement
/blockclover add wandering_merchant [black_market|supply|equipment|caravan]
/blockclover add trap
/blockclover add bandit <tier|attribute> [attribute] [broom]
/blockclover add magic_knight <tier|attribute> [attribute] [broom]
/blockclover unlock spirit <salamander|undine|sylph|gnome>       (4)
/blockclover unlock devil | liebe                                (4)
/blockclover unlock skill <skill>                                (4)
/blockclover unlock spell <magic> <spell>                        (4)
/blockclover unlock transformation <transformation>              (4)
/blockclover unlock magic all | <magic>                          (4)
/blockclover remove spirit | devil | skill <skill> | spell <magic> <spell> | transformation <t> | magic all | <magic>   (4)
/blockclover reset all | mana | cooldown | itemcooldown          (4)
/blockclover reset <progression reset with confirmation>         (4)
/blockclover set effect anti_magic <seconds|infinite>
/blockclover set skill <skill> <level 0-6>
/blockclover set squad <squad>
/blockclover set character yuno full | start | none
/blockclover set race <race>
/blockclover set status <commoner|noble|royal|peasant>
/blockclover set grimoire fourleaf <true|false> [magic]
/blockclover set grimoire two <true|false>
/blockclover set grimoire scale <x> <y> <z>        (0.75 to 1.25)
/blockclover set points stat|mastery|skill <amount>
/blockclover set stat <stat> <value> [target]
/blockclover set base <stat> <value>
/blockclover set modifier <modifier> <value>
/blockclover set level <1-100> | xp <n> | yul <n> | reputation <n> | merit <n> | rank <rank>
/blockclover get all | stat <stat> [target] | base <stat> | modifier <modifier> | mana | magic | transformation | progression | squad | origin | grimoire   (4)
/blockclover debug basementkey give | glow                       (4)
/blockclover debug devmode <true|false>                          (4)
/blockclover debug manapressure <1-100> [color]                  (4)
/blockclover debug grimoireawakening <target>                    (4)
/blockclover debug entranceexam timer set <seconds> | end | start | cancel | reset   (4)
/blockclover debug playanimation <animation>                     (4)
/blockclover debug starfestival start | settime <seconds>        (4)
/blockclover debug blackmarket end | settime <seconds>           (4)
/blockclover target <entity> ...                                  run any branch as another player (4)
/blockclover dummy spawn | stat | spell | cast | target
/blockclover dungeon spawn | vaultkey | generate | return        place a gate, get a vault key, build or leave an instance
/blockclover debug dungeon generate | return                     (4)
```

Notes:

- Skill ids for `set skill` and `unlock skill`: `ki`, `zetten`, `manazone`, `manaskin`, `legstrengthboost`, `manamethod`, `manasense`, `manapressure`, `reinforcementmagic`. The level sets how many branch nodes are owned (0 to 6, or 0 to 5 for Ki).
- Stat ids: `strength`, `speed`, `physical_defense`, `magic_defense`, `max_mana`, `mana_regen_speed`, `mana_control`, `mana_output`, `mana_sense`, `health`, `magic_damage`, `mana_regen_amount`. `set base` writes the hidden base value that race normally provides.
- Modifier ids multiply a player's values: `mana_cost`, `cooldown`, `base_armor`, `knockback_resist`, `mining_speed`, `mining_fortune`, `luck`, `broom_speed`, `healing_received`, `general_xp`, `spell_xp`.
- Setting a level directly does not grant the points for skipped levels; use `set points`.
- `set effect anti_magic` applies the Anti Magic status effect for a time.
- Dev mode makes every grimoire roll four-leaf and skips several gates.
- Magic ids for `unlock magic` and `unlock spell` now include `slash` and `mineral`.
- Removed in 1.8.x: `/liebecontract` (choose the contract in Bonds) and `/blockclover wizardemperor`.

## Challenges

The Challenges tab lets a player pick one run-long challenge. Completion requires reaching Wizard King without cheats or creative mode.

| Challenge | Difficulty | Rule |
|---|---|---|
| Magic changes every minute | Normal | Your magic is swapped every 60 seconds. Spell discovery is 5× faster. |
| 50,000 Mana, No Refills | Hard | One mana budget of 50,000 for the whole run, kept across deaths. Natural mana is disabled. |
| One Heart, Infinite Mana | Extreme | Max health is one heart; mana is unlimited. Normal unlocks and cooldowns. |

## Files on disk

| File | Where | Purpose |
|---|---|---|
| `blockclover-client-settings.properties` | game folder, next to `options.txt` | HUD positions, menu scales, opening animation, tracked quests. Edited from the grimoire settings button. |
| `blockclover_challenges.properties` | game folder | Local record of completed challenges. |
| `data/blockclover_squads.dat` | world folder | Squads, members, stars, festival timer. |
| `data/blockclover_spirits.dat` | world folder | Spirit bonds and victories. |
| `data/blockclover_black_market.dat` | world folder | Auction listings, bids, refunds. |
| `data/blockclover_magic_claims.dat` | world folder | Which player owns which magic (for `uniqueMagic`). |
| `data/blockclover_challenges.dat` | world folder | Active challenge and mana budgets. |
| `data/blockclover_placed_structures.dat` | world folder | Registered Grimoire Towers, exam arenas and Faust Houses. |
| `data/blockclover_kingdoms.dat` | world folder | Territory boundaries and discoveries. |

Per-player progression (level, points, stats, spells, bonds) lives in the player's own NBT data inside the world's `playerdata` folder. Social profiles (bond power, Liebe counters, titles) are in the social saved data.

## Creative mode and ops

Creative players spend no mana, skip transformation cooldowns, bypass trial gates and can buy any tree node, but they cannot discover spells or transformations, earn bond victories, or complete challenges. Switch back to survival for normal progression.

---
*Sources: BlockcloverModGameRules, CloverSocialGameRules, CloverSpiritGameRules, CloverUniqueMagicRules, BlockcloverCommandCommand, CloverDummy, CloverStatOverrides, CloverChallengeData, CloverChallengeRules, CloverClientSettings, CloverChallengeClientState, saved-data class names.*
