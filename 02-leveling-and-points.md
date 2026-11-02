# Leveling and Points

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

Your character has a **level** (1 to 100) and three kinds of points you spend: **stat points**, **mastery points** and **skill points**. All of them are shown in the grimoire screen.

## XP curve

XP needed to go from one level to the next:

```
XP to next level = 100 + (level - 1) × 35
```

| Level | XP to next | Total XP from level 1 |
|---|---|---|
| 1 | 100 | 0 |
| 5 | 240 | 610 |
| 10 | 415 | 2,160 |
| 20 | 765 | 7,885 |
| 25 | 940 | 12,060 |
| 35 | 1,290 | 23,035 |
| 50 | 1,815 | 46,060 |
| 75 | 2,690 | 101,935 |
| 99 | 3,530 | 176,155 |
| 100 | 0 | 179,685 |

Level 100 is the cap. Any XP left over at 100 is discarded.

<div class="calc" data-calc="xp"></div>

## Where XP comes from

There are only six XP sources in the code. Mob kills do **not** give XP by themselves.

| Source | XP |
|---|---|
| Casting any spell successfully | 5 per cast, scaled by your spell practice bonuses. Magic Bullet gives nothing. |
| Killing a bandit | 20 / 35 / 60 / 90 / 130 by bandit tier 1 to 5 |
| Completing a mission | 100 to 600 depending on the mission (see below) |
| Completing a quest | 250 to 5,000 depending on the quest |
| Squad mission rewards | Varies by mission |
| Dungeon milestones | 1,500 for helping defeat Mars, 2,500 for reaching the treasure vault, 1,000 for escaping; 60% of that after your first clear |

Spell-cast XP is multiplied by race practice bonuses and by **Spell Insight** mastery (+10% per point). Mission and bandit XP are multiplied by race general-XP bonuses only. Admin stat overrides can also change both.

### Mission XP

| Mission | Tier | XP | Yul | Reputation |
|---|---|---|---|---|
| Spell Practice | 0 | 100 | 125 | 5 |
| Monster Cleanup | 0 | 125 | 150 | 6 |
| Supply Run | 0 | 125 | 175 | 8 |
| Targeted Combat Patrol | 1 | 225 | 250 | 10 |
| Mana Control | 1 | 250 | 275 | 12 |
| Bandit Scout | 1 | 275 | 325 | 14 |
| Bandit Hunt | 2 | 450 | 500 | 20 |
| Siege Breaker | 2 | 550 | 650 | 25 |
| Dangerous Threat | 2 | 600 | 700 | 28 |
| Survive the Strong Magic Region | 1 | 300 | 350 | 15 |
| Reach the Mana Zone Hot Spring | 1 | 0 | 0 | 0 |

### Quest XP

Quests are the big story milestones. They also give points directly.

| Quest | XP | Yul | Reputation | Merit | Stat points | Mastery points |
|---|---|---|---|---|---|---|
| Obtain Grimoire | 250 | 500 | 25 | 20 | 5 | 0 |
| Entrance Exam | 400 | 800 | 50 | 50 | 5 | 0 |
| Join a Squad | 500 | 1,200 | 100 | 100 | 8 | 0 |
| First Dungeon | 1,000 | 1,000 | 250 | 250 | 10 | 1 |
| Enter a Strong Magic Region | 1,300 | 3,200 | 350 | 350 | 12 | 1 |
| Become a Captain | 2,000 | 7,000 | 700 | 900 | 15 | 2 |
| Become the Wizard King | 5,000 | 25,000 | 2,000 | 0 | 25 | 3 |

Quests also pay skill points: 1 each for the exam and the squad, 2 each for the dungeon and the Strong Magic Region, 3 for Captain and 5 for Wizard King. See [Quests](12-quests.md).

## What each level gives

You start at level 1 with **10 stat points**, 0 mastery points and 0 skill points. Every level-up grants:

| Condition | Stat points | Mastery points | Skill points |
|---|---|---|---|
| Every level | +5 | | |
| Every 5th level (5, 10, 15 ...) | | | +1 |
| Every 10th level (10, 20, 30 ...) | +5 more | +1 | |
| Levels 25, 50, 75 and 100 | +10 more | | +1 more |

So level 10 gives 10 stat points, 1 mastery point and 1 skill point. Level 25 gives 15 stat points and 2 skill points. Level 50 gives 20 stat points, 1 mastery point and 2 skill points.

Over the full 1 to 100 climb that adds up to **585 stat points** (plus the starting 10), **10 mastery points** and **24 skill points** from levels alone. Some race tree nodes add extra stat or skill points on certain levels (see Races).

Commands can set your level directly (`/blockclover level <n>` as an op). Setting a level that way does **not** grant the points for the skipped levels.

## Stat points

Stat points raise the twelve main stats, each from 0 to 100. The cost per point rises as the stat grows:

| Current stat value | Cost of next point |
|---|---|
| 0 to 19 | 1 |
| 20 to 39 | 2 |
| 40 to 59 | 3 |
| 60 to 79 | 4 |
| 80 to 99 | 5 |

Maxing one stat from 0 to 100 costs 300 stat points. Maxing all twelve would cost 3,600, far more than levels give, so builds matter.

<div class="calc" data-calc="statcost"></div>
 See [Stats and Masteries](03-stats-and-masteries.md) for what each stat does.

## Mastery points

Mastery points raise the five mastery stats (Luck, Willpower, Mana Efficiency, Spell Insight, Transformation Mastery), each from 0 to 5. One point per rank, no scaling cost. You get one per 10 levels and a few from quests, 16 in total, while maxing everything would take 25.

## Skill points

Skill points buy nodes in the skill trees (Mana, Ki, Race and the Anti-Magic tree). Most nodes cost 1 point; a few Anti-Magic nodes cost 2. See [Skill Trees](05-skill-trees.md).

## Related commands (ops only)

Ops can set level, XP and every point pool through the `/blockclover` command. The exact syntax is in the [Admin Reference](15-admin-reference.md).

---
*Sources: CloverProgressionData, CloverMissionData, CloverQuestData, CloverSquadData, CloverMissionServerHandler, CloverMagicServerHandler.recordSuccessfulCast, CloverRaceSkillBonuses.*
