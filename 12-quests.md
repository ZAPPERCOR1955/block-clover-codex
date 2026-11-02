# Quests

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

The **Quests** tab in the grimoire holds two kinds of quest. **Story quests** are seven milestones that must be completed in order; each pays XP, Yul, reputation, merit and points when you press **Claim**. **Skill quests** track the six techniques that need something more than a skill point (Mana Skin, Mana Zone, Ki, Zetten, Mana Method, Leg Strength Boost). Tracked quests show their objective on the HUD, and two of them give you a tracking marker.

## Story quests at a glance

| # | Quest | How it completes | XP | Yul | Reputation | Merit | Stat pts | Mastery pts | Skill pts |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Obtain Grimoire | Hold a grimoire | 250 | 500 | 25 | 20 | 5 | 0 | 0 |
| 2 | Entrance Exam | Pass the exam | 400 | 800 | 50 | 50 | 5 | 0 | 1 |
| 3 | Join a Squad | Be a squad member | 500 | 1,200 | 100 | 100 | 8 | 0 | 1 |
| 4 | First Dungeon | Help defeat Mars or loot the treasure vault | 1,000 | 1,000 | 250 | 250 | 10 | 1 | 2 |
| 5 | Enter a Strong Magic Region | Finish Mereoleona's region trial | 1,300 | 3,200 | 350 | 350 | 12 | 1 | 2 |
| 6 | Become a Captain | Grand Magic Knight and captain of a squad | 2,000 | 7,000 | 700 | 900 | 15 | 2 | 3 |
| 7 | Become the Wizard King | Reach the Wizard King rank | 5,000 | 25,000 | 2,000 | 0 | 25 | 3 | 5 |

Rules that are easy to miss:

- A quest stays **locked** until the one before it is claimed. The First Dungeon is the one quest that a later completion never auto-completes; it must be earned in a dungeon.
- Rewards are not automatic. When the condition is met the quest turns **Ready** and you must claim it in the tab.
- If a later quest is somehow completed first, every earlier quest is marked complete without paying out.
- Only the Entrance Exam, First Dungeon and Strong Magic Region quests can be **tracked** with a marker. The dungeon tracker shows the current gate's coordinates and your Mars and vault progress inside.
- Reaching Wizard King also maxes every spell you know to level 10.

## Walkthrough

### 1. Obtain Grimoire

Find a **Grimoire Tower** and talk to **Drouot** with your magic awakened (the origin roll confirmed). The grimoire descends over about seven seconds and the quest turns Ready. See [Getting Started](00-getting-started.md).

### 2. Entrance Exam

Go to the **Entrance Exam arena**, register with the examiner and be there when the exam starts. Exams run every 30 minutes. Score above 65 across the four tests to pass. The pass flag is what the quest checks, so a failed attempt can simply be retried next round. Scores, squad thresholds and what each test wants are in [Missions, Squads, Ranks and Economy](13-missions-and-economy.md).

### 3. Join a Squad

Accept a squad offer at the end of the exam. Any squad counts, including a custom one you were invited to. Leaving the squad later does not undo the quest.

### 4. First Dungeon

1. Wait for a dungeon gate. One appears in the Overworld every hour of server time (the `dungeonGateMinutes` gamerule) within 2,500 blocks of the players, and your squad captain messages its coordinates. Track the quest to get the marker. The gate closes after 15 minutes if nobody enters.
2. Inside, either **help defeat Mars** (you need to have hit him or fought beside the group for a while; the killing blow is not required) or **reach the treasure vault**. Either one turns the quest Ready at once.
3. Open your personal vault chest with the Dungeon Vault Key from the dungeon's chests, then escape before the collapse timer ends. Escaping after both milestones pays a further 1,000 XP and Yul and the Dungeon Explorer title.

The quest reward is paid once from the Quests tab. Repeat dungeons still pay their milestones at 60%. Details: [World, Structures and NPCs](14-world-and-npcs.md).

### 5. Enter a Strong Magic Region

This quest no longer waits for the dungeon; it unlocks as soon as Join a Squad is claimed.

1. Speak to **Mereoleona**. She starts the "Survive the Strong Magic Region" mission and gives you a tracking destination.
2. Track the quest and travel to **Yultim Volcano**, 6,500 to 7,200 blocks from spawn. The heat hurts every second unless Mana Skin is active at the required level or you are in a hot spring, so bring healing, fire resistance and a broom.
3. Stay inside the region for 30 seconds. The mission completes, the quest turns Ready, and the Mana Skin trial is marked done at the same time.

The region and its heat rules are described in [World, Structures and NPCs](14-world-and-npcs.md). Anti-Magic users can do this quest too; it is the region, not the Mana tree, that counts.

### 6. Become a Captain

Two things must be true at once: your Magic Knight rank is **Grand Magic Knight** or higher (15,000 merit) and your role in a squad is **captain**. Grand Magic Knights can create a custom squad, which makes them its captain, or they can be promoted inside an existing squad. Merit only accumulates while you are in a squad, so this quest is a long squad career. Rank thresholds are in [Missions, Squads, Ranks and Economy](13-missions-and-economy.md).

### 7. Become the Wizard King

Reach **25,000 merit**. The quest checks the rank name, so nothing else is required. Claiming it pays 25 stat points, 3 mastery points and 5 skill points on top of the rank's own effects.

## Skill quests

Skill quests appear on the same screen and can be tracked. Each completes the moment its technique is unlocked.

| Skill quest | Steps |
|---|---|
| Mana Skin | Speak to Mereoleona to begin training. Survive 30 seconds in the Strong Magic Region (the same mission as story quest 5). Then buy Mana Skin in the Mana tree. |
| Mana Zone | Unlock Mana Skin first and train it to level 3. Speak to Mereoleona for the hot spring trial. Reach the underground hot spring beneath the volcano and bathe at the marked height. Then buy Mana Zone in the Mana tree. |
| Ki | Pay Yami 500 Yul to begin. Then survive projectile hits: each arrow that damages you rolls 0.5% to awaken Ki and each spell hit rolls 2%. Anti-Magic users roll 6% and 30%. |
| Zetten | Awaken Ki first, then buy Zetten in the Ki branch. |
| Mana Method | Buy Mana Method in the Mana tree. |
| Leg Strength Boost | Buy Leg Strength Boost in the Mana tree. |

Anti-Magic users cannot buy into the Mana tree, so for them only the Ki and Zetten quests are completable. See [Skill Trees](05-skill-trees.md) for the nodes and [Bonds, Spirits and Liebe](08-bonds-and-liebe.md) for the Anti-Magic tree.

## Missions are not quests

Missions (Easy, Normal, Hard and squad missions) are the repeatable board in the Missions tab; they pay out automatically and rotate every 10 minutes. They are covered in [Missions, Squads, Ranks and Economy](13-missions-and-economy.md).

---
*Sources: CloverQuestData (ids, titles, descriptions, requirement text, reward arrays, completion checks), CloverSkillQuestData, CloverMissionData (startStrongMagicRegionMission), CloverKiTrainingServerHandler, CloverSquadData, CloverProgressionData (rank names).*
