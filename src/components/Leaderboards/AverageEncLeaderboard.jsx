import { useState } from "react";

// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useShiny } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function AverageEncLeaderboard() {
  const [gen, setGen] = useState("All");

  const { isLoading: shinyStatsLoading, data: shinyStatsData } = useShiny(
    `stats=averageEnc&statsGen=${gen}`
  );

  const { isLoading: shinyTotalStatsLoading, data: shinyTotalStatsData } =
    useShiny(`stats=averageEncTotal&statsGen=${gen}`);

  const handleChange = (e) => {
    setGen(e.target.value);
  };

  const shinyStats = shinyStatsData?.data;
  const shinyTotalStats = shinyTotalStatsData?.data[0]?.avgEncounters;

  return (
    <Leaderboard
      data={shinyStats}
      dataSubstitute={"-"}
      loading={shinyStatsLoading && shinyTotalStatsLoading}
      title={"AVERAGE #ENC."}
      selectBool={true}
      selectLabel={"Gen"}
      selectValue={gen}
      handleChange={handleChange}
      optionList={[
        "All",
        "Gen 1",
        "Gen 2",
        "Gen 3",
        "Gen 4",
        "Gen 5",
        "Gen 6",
        "Gen 7",
        "Gen 8",
        "Gen 9",
      ]}
      medalList={[
        medalImages["adventure-4-d.png"],
        medalImages["adventure-4-g.png"],
        medalImages["adventure-4-s.png"],
        medalImages["adventure-4-b.png"],
      ]}
      total={shinyTotalStats ? shinyTotalStats : "-"}
    />
  );
}
