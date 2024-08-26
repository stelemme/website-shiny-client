// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Functions
import { calculateProb } from "../../functions/statFunctions";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function ConvertedEncLeaderBoard() {
  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `statsCountersConverted=true`
  );

  const counterStats = counterStatsData?.data;
  const defCounterStats = [];
  let totalTotalEncounters = 0;

  counterStats?.forEach((item) => {
    let totalEncounters = 0;
    item.counter.forEach((item2) => {
      const prob = calculateProb(
        item2.method.odds,
        item2.method.rolls,
        item2.method.shinyCharm,
        item2.method?.charmRolls,
        item2.totalEncounters,
        item2.method?.function,
        item2.method?.searchLevel
      );

      totalEncounters += Math.round((8192 / prob) * item2.totalEncounters)
    });

    defCounterStats.push({
      trainer: item.trainer,
      data: totalEncounters,
    });
    totalTotalEncounters += totalEncounters;
  });

  return (
    <Leaderboard
      data={defCounterStats?.sort((a, b) => {
        return b.data - a.data;
      })}
      loading={counterStatsLoading}
      title={"CURRENT TOTAL #ENC. (8192)"}
      dataAddition={""}
      selectBool={false}
      medalList={[
        medalImages["battle-4-d.png"],
        medalImages["battle-4-g.png"],
        medalImages["battle-4-s.png"],
        medalImages["battle-4-b.png"],
      ]}
      total={totalTotalEncounters}
    />
  );
}
