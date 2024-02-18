// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Functions
import { calculateMultiplePercentage } from "../../functions/statFunctions";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function CountersPercentageLeaderboard() {
  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `?statsCountersPercentage=true`
  );

  const counterStats = counterStatsData?.data;
  const defCounterStats = [];
  const totalCounterStats = []

  counterStats?.forEach((item) => {
    defCounterStats.push({
      trainer: item.trainer,
      data: calculateMultiplePercentage(item.encounterData),
    });
    totalCounterStats.push(...item.encounterData)
  });

  return (
    <Leaderboard
      data={defCounterStats?.sort((a, b) => {
        return b.data - a.data;
      })}
      dataAddition={" %"}
      loading={counterStatsLoading}
      title={"TOTAL COUNTER PERCENTAGE"}
      selectBool={false}
      medalList={[
        medalImages["battle-3-d.png"],
        medalImages["battle-3-g.png"],
        medalImages["battle-3-s.png"],
        medalImages["battle-3-b.png"],
      ]}
      total={`${calculateMultiplePercentage(totalCounterStats)} %`}
    />
  );
}
