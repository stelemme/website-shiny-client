import { useState } from "react";

// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

export default function EncountersLeaderboard() {
  const [period, setPeriod] = useState("Today");
  const [query, setQuery] = useState(1);

  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `?statsPeriodTotal=${query}`
  );

  const counterStats = counterStatsData?.data;

  const handleChange = (e) => {
    setPeriod(e.target.value);
    if (e.target.value === "Last 7 Days") {
      setQuery(7);
    } else if (e.target.value === "Last 30 Days") {
      setQuery(30);
    } else if (e.target.value === "Last 90 Days") {
      setQuery(90);
    } else if (e.target.value === "Last Year") {
      setQuery(365);
    } else if (e.target.value === "All Time") {
      setQuery(999999);
    } else if (e.target.value === "Yesterday") {
      setQuery("yesterday");
    } else {
      setQuery(1);
    }
  };

  return (
    <Leaderboard
      data={counterStats}
      loading={counterStatsLoading}
      title={"TOTAL #ENCOUNTERS"}
      selectBool={true}
      selectLabel={"Period"}
      selectValue={period}
      handleChange={handleChange}
      optionList={[
        "Today",
        "Yesterday",
        "Last 7 Days",
        "Last 30 Days",
        "Last 90 Days",
        "Last Year",
        "All Time",
      ]}
      medalList={[
        medalImages["battle-5-d.png"],
        medalImages["battle-5-g.png"],
        medalImages["battle-5-s.png"],
        medalImages["battle-5-b.png"],
      ]}
      total={counterStats?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.data;
      }, 0)}
    />
  );
}
