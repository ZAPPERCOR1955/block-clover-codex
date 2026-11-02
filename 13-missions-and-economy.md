# Missions, Squads, Ranks and Economy

*Block Clover 1.8.1 (NeoForge 1.21.1). Read from the mod's code; numbers change between versions.*

## Story quests

Seven story quests in the grimoire's Quests tab mark the main path: Obtain Grimoire, Entrance Exam, Join a Squad, First Dungeon (not completable yet), Enter a Strong Magic Region, Become a Captain, Become the Wizard King. Their rewards, including direct stat and mastery points, are tabled in [Leveling and Points](02-leveling-and-points.md). Skill quests (Mana Skin trial, Mana Zone trial, Ki, Zetten) are tracked on the same screen.

## Missions

Missions live in the grimoire's Missions tab in three tiers: Easy, Normal and Hard.

- You can hold **3 accepted missions** at once. Rewards are claimed automatically when the objective is met.
- The mission board rotates every **10 minutes**. Some missions have variants (which mob to hunt, which item to deliver) that change with the rotation.
- **Tier unlock**: complete 10 missions of the previous tier. Unlocking a tier grants 5 stat points.
- Siege Breaker resets if more than 8 seconds pass between kills.

| Mission | Tier | Objective | XP | Yul | Reputation |
|---|---|---|---|---|---|
| Spell Practice | Easy | Cast 5 spells successfully | 100 | 125 | 5 |
| Monster Cleanup | Easy | Defeat 5 hostile mobs | 125 | 150 | 6 |
| Supply Run | Easy | Deliver 16 wheat, 16 coal, 8 iron ingots, 12 oak logs, 8 bread or 32 cobblestone (consumed) | 125 | 175 | 8 |
| Targeted Combat Patrol | Normal | Defeat 10 zombies, 8 skeletons, 8 spiders, 7 creepers, 2 witches or 3 endermen | 225 | 250 | 10 |
| Mana Control (shown as Anti-Magic Control to Anti-Magic users) | Normal | Spend 750 mana | 250 | 275 | 12 |
| Bandit Scout | Normal | Defeat 2 tier 1 or 2 bandits | 275 | 325 | 14 |
| Bandit Hunt | Hard | Defeat a tier 3 to 5 bandit | 450 | 500 | 20 |
| Siege Breaker | Hard | Defeat 15 hostiles with no gap over 8 seconds | 550 | 650 | 25 |
| Dangerous Threat | Hard | Defeat an enderman, witch, ravager or evoker | 600 | 700 | 28 |
| Survive the Strong Magic Region | Normal | Stay 30 seconds in the Strong Magic Region (Mereoleona's trial) | 300 | 350 | 15 |
| Reach the Mana Zone Hot Spring | Normal | Reach the hot spring beneath the volcano (Mereoleona's trial) | 0 | 0 | 0 |

## Bandits

Bandits are hostile mages spawned for the bandit missions and by op command; the code has no natural spawn for them. Each rolls a tier and an attribute:

| Tier | Chance | XP | Merit | Reputation |
|---|---|---|---|---|
| 1 | 52% | 20 | 1 | 1 |
| 2 | 27% | 35 | 1 | 2 |
| 3 | 13% | 60 | 2 | 3 |
| 4 | 6% | 90 | 3 | 5 |
| 5 | 2% | 130 | 5 | 8 |

Attributes are normal (fire, water, wind, earth, ice, lightning), uncommon (poison, plant, sand, smoke, steel: +1 merit, +1 reputation) or rare (light, dark, spatial, blood: +2 merit, +3 reputation). Merit is only earned while you are in a squad.

## Entrance Exam

Register with the examiner Magic Knight at the Entrance Exam arena and return before it starts. Exams run every 30 minutes by default (the `entranceExamWaitMinutes` gamerule); since 1.8.0 several candidates queue and run together, and nobody outside the exam can hurt you or your targets during it. Four tests follow: Broom Flying (Anti-Magic users wait this one out and keep the practice broom as their permanent broom), Magical Ability, Magical Ability Control (six targets) and Combat. The total score decides which squads make an offer.

- A score **above 65** guarantees at least one offer. A four-leaf grimoire makes every squad offer.
- Each squad has its own threshold: Golden Dawn 90, Silver Eagles 88, Black Bulls 70, Blue Rose Knights 82, Crimson Lion Kings 85, Green Praying Mantises 66, Coral Peacocks 78, Purple Orcas 72, Aqua Deer 75.
- Thresholds drop for fitting magic (fire for Crimson Lion Kings, wind and light for Golden Dawn, water for Blue Rose, Anti-Magic and Dark for Black Bulls, and so on), for nobles and royals, for 100 or more reputation, and for 180 or more max mana.

Passing the exam completes the Entrance Exam quest and grants the lowest Magic Knight rank title.

## Squads

The nine canonical squads are Golden Dawn, Silver Eagles, Black Bulls, Blue Rose Knights, Crimson Lion Kings, Green Praying Mantises, Coral Peacocks, Purple Orcas and Aqua Deer. Roles are member, vice-captain and captain. Grand Magic Knights and the Wizard King can create a custom squad.

**Pay.** Every hour of server time each member is paid Yul: 300 plus 75 per rank above Junior Magic Knight 5th Class, plus 100 for a vice-captain or 200 for a captain. A Wizard King captain earns 1,700 an hour.

**Squad missions.** Two shared missions rotate for the squad:

| Squad mission | XP | Yul | Reputation | Merit | Stars |
|---|---|---|---|---|---|
| Complete a Raid (defend a village within 512 blocks) | 350 | 600 | 40 | 35 | 3 |
| Stop a Tier 5 Mage | 450 | 750 | 50 | 45 | 4 |

Abandoning a stalled squad mission gives the squad **black stars**. Dungeons also award squad stars: 3 for helping defeat Mars, 4 for reaching the treasure vault and 3 for escaping, halved after your first clear.

**Star Awards Festival.** Every 10 hours of server time (the `starFestivalMinutes` gamerule) the squads are ranked by net stars (stars minus black stars), the top squads are announced and rewarded, and all stars reset. Finishing a period with 50 personal net stars earns the Star Chaser title.

## Magic Knight ranks

Rank is set by **merit**, which only accumulates while you are in a squad.

| Rank | Merit |
|---|---|
| Junior Magic Knight 5th Class | 0 |
| Junior 4th | 150 |
| Junior 3rd | 350 |
| Junior 2nd | 650 |
| Junior 1st | 1,000 |
| Intermediate 5th | 1,500 |
| Intermediate 4th | 2,100 |
| Intermediate 3rd | 2,800 |
| Intermediate 2nd | 3,600 |
| Intermediate 1st | 4,500 |
| Senior 5th | 5,600 |
| Senior 4th | 7,000 |
| Senior 3rd | 8,600 |
| Senior 2nd | 10,400 |
| Senior 1st | 12,500 |
| Grand Magic Knight | 15,000 |
| Wizard King | 25,000 |

Becoming Wizard King completes the last story quest and maxes every spell level.

## Yul and shops

**Yul** is the currency. It comes from missions, quests, squad pay, squad missions and selling goods to merchants. Ways to spend it:

- **Ki training** with Yami: 500 Yul.
- **Vanessa's cloaks**: 500 Yul each, free for Black Bulls.
- **Magna's rides** on the Crazy Cyclone, free for Black Bulls; Faust House costs double.
- **Magic crystal shards** mined in dungeons sell for 100 Yul each to the Supply and Equipment Merchants.
- **Travelling merchants** wander with guards and caravans. A Supply Merchant (budget 25,000) sells food, torches, arrows, tools and iron and buys leather, wheat, wool, coal, ingots and string. An Equipment Merchant (budget 40,000) also stocks golden apples, ender pearls, a diamond, an Uncommon ring and a broom. A Black Market Dealer (budget 100,000) stocks the Kikongan (9,000), Epic rings and bracelets (14,000), a Rare necklace (7,500), netherite scrap, a Totem of Undying (30,000), echo shards, blaze rods, random accessories by tier and single magic stones at 30,000. Merchants pay you from their budget and run out.
- **Black Market auctions**: five listings every 30 minutes (the `blackMarketResetMinutes` gamerule), bid in Yul. Rarity odds are 40% Common, 27% Uncommon, 17% Rare, 10% Epic, 5% Legendary, 1% Mythic with base prices of 75, 150, 300, 650, 1,400 and 3,000. A bid in the last 30 seconds extends the auction by 30 seconds. Losers are refunded; winners claim the delivery later.

**Reputation** starts from your race and class, grows with missions and bandits, and mainly eases entrance exam offers at 100 or more.

## Titles

Titles are shown in Social. Rank titles come with each Magic Knight rank. Social titles: Team Player (create or join a party), Challenger (finish a duel), Duelist (win a duel), Helping Hand (5 missions), Veteran (25 missions).

**Mastery titles**, one per magic, need every available spell discovered, all at level 4 or more, and one at level 10: Lights Out (Dark), The Uncrowned Lioness (Fire, Mereoleona), Let There Be Light (Light), Living Thunder (Lightning), Between Worlds (Spatial), Sea God's Heir (Water), Eye of the Storm (Spirit Wind), Winds of Change (Wind), Time Is Mine (Time), What Lurks Below (Shadow), Written in the Stars (Star), Walking Calamity (Gravity), Architect of Misfortune (Ash). Flaw of the World needs every Anti-Magic spell and all four Asta forms; Prince of Spade needs Wind and Star magic.

**Feat titles:**

| Title | Requirement |
|---|---|
| Beyond My Limits | Win a knockout duel after falling below 10% health |
| Untouchable | Win a knockout duel without taking damage |
| Royalty Means Nothing | Win an equalized duel against a royal as a commoner or peasant |
| Chosen by the Wind | Bond with Sylph |
| Saint of the Storm | Reach Saint Stage with Sylph |
| A Very Expensive Mistake | Buy a Mythic accessory from a black-market dealer |
| Nothing Left to Burn | Hellfire Incarnate with Transformation Mastery 5 |
| Death Was Negotiable | Win a Soul Chain fight after falling below 10% HP |
| Devil's Equal | Devil Union with Transformation Mastery 5 |
| Against All Odds | Win a normal duel against 1.5× your starting combat power |
| Return to Sender | Kill a hostile caster with their own reflected spell |
| Chosen by luck | Obtain a four-leaf grimoire |
| Trial by Fire | Complete Mereoleona's Mana Skin trial |
| Out of Your League | As a human Peasant, defeat Yami, Mereoleona, Elf Reincarnation Asta or Yuno, or a later arc of them |
| Yin and Yang | Own both Light and Dark magic |
| Catch These Hands | Kill a 100+ HP hostile or captain-level character with melee only, unassisted |
| Grounded | Kill an airborne hostile with a Gravity spell at least two blocks up |
| Star Chaser | Finish a Star Festival period with 50 personal net stars |
| Will of Perfection | Reach level 100 and Wizard King |
| Heaven Splitter | Unlock Zetten |
| Gotta Catch Them All | Carry all 11 magic stones at once |
| Dungeon Explorer | Defeat Mars, reach the treasure vault and escape a dungeon alive |

---
*Sources: CloverMissionData, CloverMissionServerHandler, CloverQuestData, CloverSquadData, CloverSquadMissionData, CloverSquadServerHandler, CloverEntranceExamServerHandler, CloverProgressionData (ranks, merit), CloverBanditServerHandler, CloverVanessaShop, CloverMerchantService, CloverBlackMarketData, CloverEarnedTitles, CloverSocialServer.*
