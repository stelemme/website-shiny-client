import { useState } from "react";

// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Images
import { medalImages } from "../../assets/imgExporter";

// Functions
import { formatDateToString } from "../../functions/statFunctions";

export default function EncountersLeaderboard() {
  const today = formatDateToString(new Date());
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [period, setPeriod] = useState("Today");
  const [dateQuery, setDateQuery] = useState(today);
  const [periodQuery, setPeriodQuery] = useState(1);

  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `stats=encDuringPeriodTotal&date=${dateQuery}&period=${periodQuery}&timezone=${timezone}`
  );

  const counterStats = counterStatsData?.data;

  const handleChange = (e) => {
    setPeriod(e.target.value);
    if (e.target.value === "Last 7 Days") {
      setDateQuery(today);
      setPeriodQuery(7);
    } else if (e.target.value === "Last 30 Days") {
      setDateQuery(today);
      setPeriodQuery(30);
    } else if (e.target.value === "Last 90 Days") {
      setDateQuery(today);
      setPeriodQuery(90);
    } else if (e.target.value === "Last Year") {
      setDateQuery(today);
      setPeriodQuery(365);
    } else if (e.target.value === "All Time") {
      setDateQuery(today);
      setPeriodQuery(999999);
    } else if (e.target.value === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      setDateQuery(formatDateToString(yesterday));
      setPeriodQuery(1);
    } else {
      setDateQuery(today);
      setPeriodQuery(1);
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
      timeValue
      timeToolTip="Total time hunted."
    />
  );
}
