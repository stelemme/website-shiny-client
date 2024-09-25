// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function LatestEncounter() {
  const { isLoading: counterStatsLoading, data: counterStatsData } =
    useCounter(`stats=latest`);

  const counterStats = counterStatsData?.data;

  return (
    <Leaderboard
      data={counterStats}
      dataSubstitute={""}
      loading={counterStatsLoading}
      title={"ONLINE HUNTERS"}
      medalList={[
        medalImages["battle-2-d.png"],
        medalImages["battle-2-g.png"],
        medalImages["battle-2-s.png"],
        medalImages["battle-2-b.png"],
      ]}
      timeValue
      onlineIcons
      timeToolTip="Time passed since latest encounter."
    />
  );
}
