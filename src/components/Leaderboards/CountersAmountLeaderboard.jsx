// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function CountersAmountLeaderboard() {
  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `stats=totalAmount`
  );

  const counterStats = counterStatsData?.data;

  return (
    <Leaderboard
      data={counterStats}
      loading={counterStatsLoading}
      title={"#ONGOING COUNTERS"}
      selectBool={false}
      medalList={[
        medalImages["battle-1-d.png"],
        medalImages["battle-1-g.png"],
        medalImages["battle-1-s.png"],
        medalImages["battle-1-b.png"],
      ]}
      total={counterStats?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.data;
      }, 0)}
    />
  );
}
