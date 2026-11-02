# World, Structures and NPCs

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

## Kingdoms

The overworld is divided into four named territories. Crossing a border shows an "Entering ..." message.

| Kingdom | X range | Z range |
|---|---|---|
| Clover Kingdom | −1,500 to 1,500 | −1,500 to 1,500 |
| Spade Kingdom | −1,500 to 1,500 | −5,000 to −2,000 (north) |
| Heart Kingdom | −5,000 to −2,000 (west) | −1,500 to 1,500 |
| Diamond Kingdom | 2,000 to 5,000 (east) | −1,500 to 1,500 |

Ops can edit territories through the saved kingdom data.

## Structures

Three mod structures generate in the world and are tracked by the mod so they can be repaired and found again:

- **Grimoire Tower**: Drouot waits here. Talk to him with your magic awakened to receive your grimoire (see [Magic Types](09-magics-and-spells.md)).
- **Entrance Exam arena**: the examiner Magic Knight registers you for the next exam. The arena is protected from block damage during exams (see [Missions and Squads](13-missions-and-economy.md)).
- **Faust House**: holds the Devil Binding Altar in its basement. The basement needs a Basement Key found in the house's key chest; ops can give or highlight it. Offer an Anti-Magic sword on the altar to fight Liebe; since 1.8.0 the altar only works once you hold the Devil Arm bargain (see [Bonds](08-bonds-and-liebe.md)). Magna flies you here on the Crazy Cyclone for double the usual fare.

Ops can jump to any of them:

```
/blockclover tp grimoiretower
/blockclover tp entranceexam
/blockclover tp housefaust outside
/blockclover tp housefaust basement
```

## Yultim Volcano and the Strong Magic Region

Each world places one volcanic region 6,500 to 7,200 blocks from the world spawn, in a direction chosen from the seed. Its layout:

- A volcanic field about 1,750 blocks across with a main volcano 440 blocks in radius and 200 blocks tall, with a crater and rim.
- A **hot spring** on the surface (radius 22) and a second hot spring in the cave beneath the main volcano (the Mana Zone trial destination).
- No ordinary mobs spawn inside the main cave, and no mod characters except Mereoleona spawn anywhere in the region.

Entering the region discovers it and updates the story quest. Inside, **heat** damages you every second unless Mana Skin is active at the required level or you are inside a hot spring:

| Where | Mana Skin level needed |
|---|---|
| Volcanic field | 1 |
| Near any volcano | 2 |
| Inside the volcanic cave | 3 |

Damage per second is 1 + 5 × heat intensity + 1.5 per level above 1, as magic damage, reduced by your physical reduction. Creative and spectator players are immune. Mereoleona runs both trials here (see [Skill Trees](05-skill-trees.md)).

## Dungeons

Dungeons went live in 1.8.0.

**Gates.** Every hour of server time (the `dungeonGateMinutes` gamerule, 1 to 10,080 minutes) a stone-brick gate appears in the Overworld within 2,500 blocks of the players, with a beacon sound. Every squad member gets a chat message with the coordinates from their captain (Julius Novachrono if you are the captain), and the First Dungeon quest tracks it. A gate nobody enters closes after 15 minutes; ops can place one with `/blockclover dungeon spawn`.

**Inside.** Each run is a generated instance in its own dimension with gravity rooms, traps, water sections, blue crystal clusters to mine, explorer bandits, a treasure vault and **Mars** (240 health, hits for 7, Mineral Magic). The instance lives for an hour. Brooms cannot fly inside. Two milestones count: helping defeat Mars (you must have hit him or fought near him for a while) and reaching the treasure vault. Either completes the First Dungeon quest. Your **personal vault chest** in the treasure room opens with a Dungeon Vault Key from the dungeon's chests and holds accessories (Rare to Mythic), valuables and a special reward: Demon Dweller for Anti-Magic users, otherwise a chance at a spirit scroll.

**Collapse and escape.** Once the seal breaks you have five minutes to reach the exit. Escaping after both milestones pays the third reward and, the first time, the Dungeon Explorer title. The outside portal closes when the last player leaves a crumbling dungeon.

| Milestone | XP | Yul | Squad stars |
|---|---|---|---|
| Mars defeated | 1,500 | 1,500 | 3 |
| Treasure vault reached | 2,500 | 2,500 | 4 |
| Dungeon cleared (escape after both) | 1,000 | 1,000 | 3 |

After your first clear every later run pays 60% of the XP and Yul and half the stars. Creative players earn nothing.

## Characters

| Character | Where | What they do |
|---|---|---|
| Drouot | Grimoire Tower | Grants grimoires and runs the ceremony. |
| Yami Sukehiro | Spawns naturally, population capped | Starts Ki training for 500 Yul. Dark magic user. Dark Triad and Final Arc (Kikongan) versions exist as boss variants. |
| Mereoleona Vermillion | Yultim Volcano | Runs the Mana Skin and Mana Zone trials. Fire magic. Spade Raid and Final Arc variants exist. |
| Yuno Grinberryall | Boss and preset character | Wind and Star magic; Royal Knight, Dark Triad, Elf Reincarnation, Spade Raid and Final Arc variants exist. |
| Asta | Boss variants | Dark Triad, Elf Reincarnation, Final Arc, Spade Raid and Witch Forest versions. |
| Magna Swing | Spawns naturally, population capped | Fire (Magna) user; Royal Knight variant exists. |
| Vanessa Enoteca | Spawns naturally, population capped | Sells squad cloaks for 500 Yul, free for Black Bulls. |
| Wandering Merchant | Spawns with guards | Supply, Equipment or Black Market Dealer kinds; a second caravan merchant appears 10% of the time. |
| Magic Knight | Entrance Exam, op spawns | Examiner, exam combatant, and spawnable fighter by tier and attribute. |
| Bandit | Missions, op spawns | Tiered hostile mage, see [Missions](13-missions-and-economy.md). |
| Liebe | Faust House ritual, then your familiar | Devil of Anti-Magic. |
| Mars | Dungeons | Mineral Magic boss with 240 health; one of the two dungeon milestones. |
| Jack the Ripper | Natural spawn, base and Spade Raid versions | Slash Magic captain. The base version spawns as often as Yami. |
| Training Dummy | `/blockclover dummy spawn` | Target with configurable stats, defense and spells for testing. |
| Exercitus Leonum warriors | Summoned by Mereoleona's spell | Fire warriors that fight for the caster. |

Boss variants are spawned by op commands or events rather than natural spawning. Yami, Magna and Vanessa spawn naturally with a per-type population cap.

## Social: parties and duels

- **Parties** are created from the Social tab. Invites expire after 60 seconds. The size limit is the `partyMemberLimit` gamerule. Joining or creating a party earns the Team Player title.
- **Duels** are challenged between 2 and 4 ready players and start after a short countdown. A duel can be **normal** or **equalized**; equalized duels snapshot everyone's health, absorption and mana so the fight is on even terms, the same system Magna's Soul Chain Deathmatch uses. Health and mana are restored when the duel ends. A knockout win after at least 10 seconds of fighting counts toward the duel titles (Untouchable, Beyond My Limits, Royalty Means Nothing, Against All Odds).
- Players can block duel invites and party invites, and hide their title in chat or over their name.

## In-game guide

New players receive a guide book on first join, and `/blockclover guide` gives it again. It covers the Z key for casting and charging, points from quests, the Settings menu (grimoire animation, four-leaf glow, HUD layout), the Black Market as the main item source, the Star Festival every 10 hours, and Ki training with Yami.

---
*Sources: CloverKingdomData, CloverKingdomServerHandler, CloverPlacedStructures, CloverFaustHouse, CloverYultimVolcanoServerHandler, CloverYultimWorldgenBootstrap, CloverDungeon, DungeonCollapse, DungeonVault, CloverNaturalPopulation, CloverMerchantService, CloverSocialServer, PlayerJoinsProcedure.*
