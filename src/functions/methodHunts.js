export default function methodHunts(
  methodFunction,
  totalEncounters = 0,
  shinyCharm = false,
  lure = false,
  chainMatters = false,
  letsGoChain = 0,
  researchLevel = null,
  svOutbreak = null,
  svSparklingPower = null,
  wormholeType = null,
  wormholeDistance = null,
  searchLevel = null
) {
  let rolls = 1
  switch (methodFunction) {
    case "pokeradar-gen4":
      const rollsCollection = {
        0: 8,
        1: 9,
        2: 9,
        3: 9,
        4: 9,
        5: 10,
        6: 10,
        7: 10,
        8: 10,
        9: 11,
        10: 11,
        11: 11,
        12: 12,
        13: 12,
        14: 13,
        15: 13,
        16: 14,
        17: 14,
        18: 15,
        19: 15,
        20: 16,
        21: 17,
        22: 18,
        23: 19,
        24: 20,
        25: 21,
        26: 22,
        27: 24,
        28: 26,
        29: 28,
        30: 30,
        31: 33,
        32: 37,
        33: 41,
        34: 47,
        35: 55,
        36: 66,
        37: 82,
        38: 110,
        39: 164,
        40: 328,
      }

      if (totalEncounters > 40) {
        rolls = 328
      } else {
        rolls = rollsCollection[totalEncounters]
      }

      return Math.round((1 - (65535 / 65536) ** rolls) ** -1)
    case "pokeradar-gen6":
      if (totalEncounters <= 40) {
        return Math.round(8100 - totalEncounters * 200)
      } else {
        return 100
      }
    case "pokeradar-gen8":
      const oddsCollection = {
        0: 4096,
        1: 3855,
        2: 3640,
        3: 3449,
        4: 3277,
        5: 3121,
        6: 2979,
        7: 2849,
        8: 2731,
        9: 2621,
        10: 2521,
        11: 2427,
        12: 2341,
        13: 2259,
        14: 2185,
        15: 2114,
        16: 2048,
        17: 1986,
        18: 1927,
        19: 1872,
        20: 1820,
        21: 1771,
        22: 1724,
        23: 1680,
        24: 1638,
        25: 1598,
        26: 1560,
        27: 1524,
        28: 1489,
        29: 1456,
        30: 1310,
        31: 1285,
        32: 1260,
        33: 1236,
        34: 1213,
        35: 1192,
        36: 993,
        37: 799,
        38: 400,
        39: 200,
        40: 99,
      }

      if (totalEncounters > 40) {
        return 99
      } else {
        return oddsCollection[totalEncounters]
      }
    case "chainfishing":
      if (totalEncounters <= 20) {
        rolls = 1 + 2 * totalEncounters
      } else { rolls = 41 }
      if (shinyCharm) {
        rolls += 2
      }

      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    case "dexnav":
      let n = 1
      let n1 = 1
      let level = searchLevel
      let dexNavLevel = 0.0

      if (shinyCharm) {
        n += 2
        n1 += 2
      }

      if (totalEncounters === 50) {
        n += 5
      } else if (totalEncounters === 100) {
        n += 10
      }

      if (level > 200) {
        dexNavLevel += level - 200
        level = 200
      }
      if (level > 100) {
        dexNavLevel += (level * 2) - 200
        level = 100
      }
      if (level > 0) {
        dexNavLevel += level * 6
      }

      const oddsDexNav = Math.ceil(dexNavLevel * 0.01) / 10000

      const endOdds = Math.round((0.04 * (1 - ((1 - oddsDexNav) ** (n + 4)))
        + 0.04 * ((1 - oddsDexNav) ** (n + 4)) * (1 - ((4095 / 4096) ** n1))
        + 0.96 * (1 - ((1 - oddsDexNav) ** n))
        + 0.96 * ((1 - oddsDexNav) ** n) * (1 - ((4095 / 4096) ** n1))) ** -1)

      return endOdds
    case "letsgospawn":
      if (lure) {
        rolls += 1
      }
      if (shinyCharm) {
        rolls += 2
      }
      if (chainMatters) {
        if (letsGoChain > 30) {
          rolls += 11
        } else if (letsGoChain > 20) {
          rolls += 7
        } else if (letsGoChain > 10) {
          rolls += 3
        }
      }
      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    case "sos-chain-sm":
      let chainSosSm = (totalEncounters % 256)

      if (shinyCharm) {
        rolls += 2
      }
      if (chainSosSm > 30) {
        rolls += 12
      } else if (chainSosSm > 20) {
        rolls += 8
      } else if (chainSosSm > 10) {
        rolls += 4
      }

      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    case "sos-chain":
      if (shinyCharm) {
        rolls += 2
      }
      if (totalEncounters > 30) {
        rolls += 12
      } else if (totalEncounters > 20) {
        rolls += 8
      } else if (totalEncounters > 10) {
        rolls += 4
      }
      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    case "ultra-wormhole":
      let d = 0
      let ultraWormholeOdds = 0

      if (1000 <= wormholeDistance <= 5000) {
        d = Math.floor((wormholeDistance / 500) - 1)
      } else if (wormholeDistance > 5000) {
        d = 9
      }

      if (wormholeType === 0) {
        ultraWormholeOdds = (1 * 0.01) ** -1
      } else if (wormholeType === 1 && wormholeDistance >= 1000) {
        ultraWormholeOdds = ((1 + d) * 0.01) ** -1
      } else if (wormholeType === 2 && wormholeDistance >= 1000) {
        ultraWormholeOdds = ((1 + 2 * d) * 0.01) ** -1
      } else if (wormholeType === 3 && wormholeDistance >= 2500) {
        ultraWormholeOdds = (4 * d * 0.01) ** -1
      }
      return Math.round(ultraWormholeOdds)
    case "arceus-spawn":
    case "arceus-mass-outbreak":
    case "arceus-massive-mass-outbreak":
      if (shinyCharm) {
        rolls += 3
      }

      if (methodFunction === "arceus-mass-outbreak") {
        rolls += 25
      } else if (methodFunction === "arceus-massive-mass-outbreak") {
        rolls += 12
      }

      if (researchLevel === "10") {
        rolls += 1
      } else if (researchLevel === "perfect") {
        rolls += 3
      }

      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    case "sv-spawn":
    case "sv-outbreak":
      if (shinyCharm) {
        rolls += 2
      }

      if (methodFunction === "sv-outbreak") {
        if (svOutbreak === "30") {
          rolls += 1
        } else if (svOutbreak === "60") {
          rolls += 2
        }
      }

      if (svSparklingPower === "1") {
        rolls += 1
      } else if (svSparklingPower === "2") {
        rolls += 2
      } else if (svSparklingPower === "3") {
        rolls += 3
      }

      return Math.round((1 - (4095 / 4096) ** rolls) ** -1)
    default:
      console.log("Something went wrong calculating the method function.")
  }
}