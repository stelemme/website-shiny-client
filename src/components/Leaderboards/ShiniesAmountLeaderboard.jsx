import { useState } from "react";

// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useShiny } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function ShiniesAmountLeaderboard() {
  const [gen, setGen] = useState("All");

  const { isLoading: shinyStatsLoading, data: shinyStatsData } = useShiny(
    `stats=totalAmount&statsGen=${gen}`
  );

  const handleChange = (e) => {
    setGen(e.target.value);
  };

  const shinyStats = shinyStatsData?.data;

  return (
    <Leaderboard
      data={shinyStats}
      loading={shinyStatsLoading}
      title={"#SHINIES (ALL)"}
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
        medalImages["special-7-d.png"],
        medalImages["special-7-g.png"],
        medalImages["special-7-s.png"],
        medalImages["special-7-b.png"],
      ]}
      total={shinyStats?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.data;
      }, 0)}
    />
  );
}
