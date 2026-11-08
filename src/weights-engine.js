// Weighted-gear / gravity / TP maths, ported from Dragon Mine Z 2.2.1
// Dragon Mine Z is GPL-3.0 (Yuseix300 & ezShokkoh), so this port is GPL-3.0 too.
// (com.dragonminez.server.util.GravityLogic and common.stats.StatsData).
// `cfg` is { gravity, gameplay, dynamicGrowth, racialSkills, mutant } from config/dragonminez/general-server.json.
// Works in the browser (window.WeightsEngine) and in node (module.exports).
(function (root) {
  const STATS = ["STR", "SKP", "RES", "VIT", "PWR", "ENE"];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => (t <= 0 ? a : t >= 1 ? b : a + (b - a) * t);
  const jround = (x) => Math.floor(x + 0.5); // Java Math.round

  // Level shown in game (StatsData.getLevel).
  function levelFromTotal(total, initial, maxValue) {
    if (maxValue <= 1) return 1;
    const t = Math.max(initial, total);
    const maxTotal = Math.max(initial, maxValue * 6);
    const progress = clamp((t - initial) / Math.max(1, maxTotal - initial), 0, 1);
    return clamp(1 + Math.floor(progress * (maxValue - 1)), 1, maxValue);
  }
  // Smallest total stats that shows as `level`.
  function totalFromLevel(level, initial, maxValue) {
    const maxTotal = Math.max(initial, maxValue * 6);
    let t = initial + Math.ceil(((level - 1) / (maxValue - 1)) * (maxTotal - initial));
    while (t > initial && levelFromTotal(t - 1, initial, maxValue) >= level) t--;
    while (levelFromTotal(t, initial, maxValue) < level) t++;
    return t;
  }

  // TP cost of the next stat point (StatsData.getSingleStatCost).
  function singleStatCost(totalStats, cfg, classTpCost) {
    const gp = cfg.gameplay, dg = cfg.dynamicGrowth;
    if (!dg.manualTpPurchasesEnabled) return Infinity;
    const maxTotal = gp.maxValue * 6;
    const knee = maxTotal * 0.05;
    const n = Math.max(0, totalStats);
    let variable;
    if (knee > 0 && n > knee) {
      const kneeCost = knee * 1.25;
      variable = kneeCost + (kneeCost / 0.7) * (Math.pow(n / knee, 0.7) - 1);
    } else variable = n * 1.25;
    const base = gp.minTPCost + variable;
    const discount = n < gp.maxTPDiscount ? gp.maxTPDiscount - n : 0;
    let cost = Math.max(gp.minTPCost, Math.trunc(base * gp.globalTPCostMultiplier * classTpCost) - discount);
    if (dg.attributeTpCostMultiplier > 1) cost = Math.ceil(cost * dg.attributeTpCostMultiplier);
    return cost;
  }

  function progressionMultiplier(totalStats, initial, cfg, classTpCost) {
    const gp = cfg.gameplay;
    const strength = gp.increaseTPGainRelativeToTPCost;
    if (strength <= 0 || !cfg.dynamicGrowth.manualTpPurchasesEnabled) return 1;
    const maxLevel = gp.maxValue;
    const refLevel = Math.min(maxLevel, gp.progressionReferenceLevel);
    const maxTotal = Math.max(initial, maxLevel * 6);
    const refTotal = maxLevel <= 1 ? maxTotal : initial + jround(((refLevel - 1) / (maxLevel - 1)) * (maxTotal - initial));
    const refCost = singleStatCost(refTotal, cfg, classTpCost);
    if (!(refCost > 0) || !isFinite(refCost)) return 1;
    const ratio = clamp(singleStatCost(totalStats, cfg, classTpCost) / refCost, 0, 1);
    return 1 + strength * Math.sqrt(ratio);
  }

  // TP multiplier from the load ratio (GravityLogic.weightTpMultiplierForRatio).
  function weightTpForRatio(r, g) {
    if (r <= 0) return 1;
    if (g.tpComfortRatioLow > 0 && r < g.tpComfortRatioLow) return lerp(1, g.tpComfortMultiplier, r / g.tpComfortRatioLow);
    if (r < g.tpIdealRatioLow) return lerp(g.tpComfortMultiplier, g.tpPeakMultiplier, (r - g.tpComfortRatioLow) / (g.tpIdealRatioLow - g.tpComfortRatioLow));
    if (r <= g.tpIdealRatioHigh) return g.tpPeakMultiplier;
    if (r <= g.tpOverloadRatio) return lerp(g.tpPeakMultiplier, g.tpHeavyMultiplier, (r - g.tpIdealRatioHigh) / (g.tpOverloadRatio - g.tpIdealRatioHigh));
    if (r < g.tpOverloadHardRatio) return lerp(g.tpHeavyMultiplier, 1, (r - g.tpOverloadRatio) / (g.tpOverloadHardRatio - g.tpOverloadRatio));
    return 1;
  }
  function zoneForRatio(r, g) {
    if (!(r > 0)) return 0;
    if (r < g.tpIdealRatioLow) return 1;
    if (r <= g.tpIdealRatioHigh) return 2;
    return r < g.tpOverloadHardRatio ? 3 : 4;
  }
  function rawWeightPenalty(r, g) {
    if (r <= g.tpIdealRatioHigh) return 0;
    return r >= g.tpOverloadHardRatio ? g.maxWeightPenalty : (g.maxWeightPenalty * (r - g.tpIdealRatioHigh)) / (g.tpOverloadHardRatio - g.tpIdealRatioHigh);
  }

  /**
   * input = {
   *   cls: { tpGainMultiplier, tpCostMultiplier, initialStats },
   *   frostDemonRacial: bool,
   *   total (total base stats)  OR stats: {STR..ENE},
   *   mult: {STR..ENE} form multipliers (default 1),
   *   dimension: "minecraft:overworld" …, nearKingKai: bool, device: 0 (off) or device gravity,
   *   gravityRoom: "none" | "mk2" | "mk3",
   *   weight: kg on the weights slot,
   *   deadInOtherworld, mutant, kamiBless: bool, potionTp: extra potion multiplier (default 1),
   *   difficulty: "easy" | "normal" | "hard", source: "TRAINING" | "HIT" | …
   * }
   */
  function compute(input, cfg) {
    const g = cfg.gravity, gp = cfg.gameplay;
    const initial = input.cls.initialStats;
    const mult = Object.assign({ STR: 1, SKP: 1, RES: 1, VIT: 1, PWR: 1, ENE: 1 }, input.mult || {});
    let stats;
    if (input.stats) stats = Object.assign({}, input.stats);
    else {
      const each = (input.total || initial) / 6;
      stats = Object.fromEntries(STATS.map((s) => [s, each]));
    }
    const total = STATS.reduce((a, s) => a + stats[s], 0);
    const boosted = STATS.reduce((a, s) => a + stats[s] * mult[s], 0);
    const avgEff = boosted / 6;
    const level = levelFromTotal(Math.round(total), initial, gp.maxValue);

    // Gravity
    const isHTC = input.dimension === "dragonminez:time_chamber";
    const dimG = g.gravityPerWorld[input.dimension] ?? g.defaultWorldGravity;
    const npcG = input.nearKingKai ? g.npcGravityValue : 0;
    const device = g.machineGravityEnabled ? Math.max(0, input.device || 0) : 0;
    const machineExtra = Math.max(0, device - 1);
    const gravityFull = !g.enabled ? 1 : Math.max(0, Math.max(dimG, npcG) + machineExtra);
    const gravityTraining = !g.enabled ? 1 : Math.max(0, Math.max(isHTC ? g.defaultWorldGravity : dimG, npcG) + machineExtra);
    const resistance = (avgEff / Math.max(1, gp.maxValue * g.resistanceStatDivisorRatio)) * g.resistanceScale;
    const net = gravityFull <= 1 ? 0 : Math.max(0, gravityFull - resistance);
    const trainNet = gravityTraining <= 1 ? 0 : Math.max(0, gravityTraining - resistance);
    const gravityBonusG = trainNet >= g.hardStopThreshold ? 0 : trainNet;
    const tpGravity = g.tpEnabled && gravityBonusG > 0 ? 1 + gravityBonusG * g.tpGravityBonusPerGravity : 1;

    // Weights
    const relativeLevel = (boosted - (total - (level - 1) * 6)) / 6 + 1;
    const ideal = g.tpEnabled ? Math.max(0, jround(relativeLevel / g.tpIdealBaseDivisor)) : 0;
    const loadFactor = Math.max(1e-4, 1 + (gravityFull - 1) * g.gravitySensitivity);
    const weight = Math.max(0, Math.round(input.weight || 0));
    const effective = jround(weight * loadFactor);
    const ratio = ideal > 0 && weight > 0 ? effective / ideal : 0;
    const zone = weight > 0 && ideal > 0 ? zoneForRatio(ratio, g) : 0;
    const tpWeights = g.tpEnabled && weight > 0 && ideal > 0 ? weightTpForRatio(ratio, g) : 1;

    let relief = 0;
    if (device > 1 && (input.gravityRoom === "mk2" || input.gravityRoom === "mk3")) {
      const base = input.gravityRoom === "mk3" ? g.gravityRoomMk3Relief : g.gravityRoomMk2Relief;
      const falloff = input.gravityRoom === "mk3" ? g.gravityRoomMk3Falloff : g.gravityRoomMk2Falloff;
      const powerNorm = Math.max(0, avgEff / Math.max(1, gp.maxValue));
      relief = base > 0 ? clamp(base * Math.exp(-falloff * powerNorm), 0, base) : 0;
    }
    const weightPenalty = g.tpEnabled && weight > 0 && ideal > 0 ? rawWeightPenalty(ratio, g) * (1 - relief) : 0;

    // Penalties (GravityLogic.tick / getStatReduction / jump & fly)
    const general = net > 0 ? Math.sqrt(net / 100) * g.penaltyCurveFactor : 0;
    const hard = net >= g.hardStopThreshold;
    let gravStatRed = 0;
    if (g.statReductionEnabled && net > 0) gravStatRed = clamp(net * g.statReductionPerGravity, g.minStatReduction, g.maxStatReduction);
    const statReduction = g.statReductionEnabled ? Math.min(g.maxStatReduction, gravStatRed + weightPenalty) : 0;
    const movePenalty = Math.min(g.maxMovementPenalty, (net > 0 ? (hard ? g.maxMovementPenalty : Math.min(g.maxMovementPenalty, general)) : 0) + weightPenalty);
    const attackPenalty = Math.min(g.maxAttackPenalty, (net > 0 ? (hard ? g.maxAttackPenalty : Math.min(g.maxAttackPenalty, Math.sqrt(net / 100))) : 0) + weightPenalty);
    const jumpFactor = !g.physicalEnabled || net <= 0 ? 1 : hard ? 1 - g.maxJumpPenalty : 1 - Math.min(g.maxJumpPenalty, general);
    const flyFactor = !g.physicalEnabled || net <= 0 ? 1 : hard ? 0 : 1 - Math.min(g.maxFlyPenalty, general);
    const extraFall = !g.physicalEnabled || net <= 0 ? 0 : Math.min(g.maxExtraFall, net * g.extraFallPerGravity);
    const consumption = net <= 0 ? 1 : 1 + net * g.consumptionPerGravity;
    const loadDrain = [1, g.loadDrainComfort, g.loadDrainIdeal, g.loadDrainHeavy, g.loadDrainOverload][zone];

    // TP multiplier (StatsData.getTpSourceMultiplier): every boost adds (x - 1).
    const source = input.source || "TRAINING";
    const diff = { easy: gp.easyModeTPMultiplier, normal: 1, hard: gp.hardModeTPMultiplier }[input.difficulty || "normal"];
    const potion = (input.potionTp || 1) * (input.kamiBless ? gp.kamiBlessTpMultiplier : 1);
    const rs = cfg.racialSkills || {};
    const frost = input.frostDemonRacial && rs.enableRacialSkills !== false && rs.frostdemon && rs.frostdemon.enabled !== false ? rs.frostdemon.tpBoost : 1;
    const boostValues = {
      class: input.cls.tpGainMultiplier ?? 1,
      racialskill: frost,
      htc: isHTC ? gp.HTCTpMultiplier : 1,
      otherworld: input.dimension === "dragonminez:otherworld" && input.deadInOtherworld ? gp.otherworldDeadTpMultiplier : 1,
      gravity: gp.gravityBonusEnabled ? tpGravity : 1,
      weights: tpWeights,
      global: gp.tpGainMultiplier,
      potion,
      mutant: input.mutant && cfg.mutant?.enabled !== false ? cfg.mutant.tpGainMultiplier : 1,
      difficulty: diff,
    };
    const boosts = (gp.tpGainBoosts && gp.tpGainBoosts[source]) || Object.keys(boostValues);
    const parts = boosts.map((b) => ({ id: b, value: boostValues[b] ?? 1 }));
    const progression = source === "TRAINING" ? 1 : progressionMultiplier(Math.round(total), initial, cfg, input.cls.tpCostMultiplier ?? 1);
    if (source !== "TRAINING") parts.push({ id: "progression", value: progression });
    const tpTotal = Math.max(0, 1 + parts.reduce((a, p) => a + (p.value - 1), 0));

    return {
      level, total, boosted, avgEff, relativeLevel,
      gravityFull, gravityTraining, resistance, net, gravityBonusG, tpGravity, hardStop: hard,
      ideal, idealLow: jround(ideal * g.tpIdealRatioLow), idealHigh: jround(ideal * g.tpIdealRatioHigh),
      loadFactor, weight, effective, ratio, zone, tpWeights, relief, weightPenalty,
      gravStatRed, statReduction, movePenalty, attackPenalty, jumpFactor, flyFactor, extraFall, consumption, loadDrain,
      parts, tpTotal, source, progression,
      nextStatCost: singleStatCost(Math.round(total), cfg, input.cls.tpCostMultiplier ?? 1),
    };
  }

  // Weight (kg on the slot) that lands on a given load ratio at this gravity.
  function weightForRatio(r, res) {
    return res.ideal > 0 ? (r * res.ideal) / res.loadFactor : 0;
  }

  const api = { STATS, compute, weightTpForRatio, zoneForRatio, rawWeightPenalty, weightForRatio, levelFromTotal, totalFromLevel, singleStatCost, progressionMultiplier };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.WeightsEngine = api;
})(typeof window !== "undefined" ? window : globalThis);
