import { useState, useEffect } from "react";

// Components imports
import Leaderboard from "./LeaderBoard";

// Hooks
import { useShiny } from "../../hooks/useData";

// Functions
import { calculateMultiplePercentage } from "../../functions/statFunctions";

// Images
import { medalImages } from "../../assets/imgExporter";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function CountersPercentageLeaderboard() {
  const getRequest = useGetRequest();

  const [defCounterStats, setDefCounterStats] = useState([]);
  const [totalCounterStats, setTotalCounterStats] = useState([]);

  const { isLoading: latestShinyLoading, data: latestShinyData } = useShiny(
    `filter=counters&filter=latest`
  );

  const latestShiny = latestShinyData?.data;
  console.log(latestShiny)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!latestShiny) return;
    const fetchData = async () => {
      const updatedDefCounterStats = [];
      let newestEndDate = new Date(latestShiny[0]?.endDate);
      
      for (const item of latestShiny) {
        const itemEndDate = new Date(item?.endDate);
        if (itemEndDate > newestEndDate) {
          newestEndDate = itemEndDate;
        }

        try {
          const response = await getRequest(`/counters`, {
            params: {
              statsCountersPercentage: true,
              trainer: item.trainer,
              statsPeriodDay: itemEndDate,
            },
          });

          updatedDefCounterStats.push({
            trainer: item.trainer,
            data: calculateMultiplePercentage(response),
          });
        } catch (error) {
          return
        }
      }

      try {
        const response = await getRequest(`/counters`, {
          params: {
            statsCountersPercentage: true,
            statsPeriodDay: newestEndDate,
          },
        });

        console.log(newestEndDate)
        console.log(response)

        setTotalCounterStats(response);
      } catch (error) {
        return
      }

      setDefCounterStats(updatedDefCounterStats);
    };

    fetchData();
  }, [latestShiny]);

  return (
    <Leaderboard
      data={defCounterStats?.sort((a, b) => {
        return b.data - a.data;
      })}
      dataAddition={" %"}
      loading={latestShinyLoading}
      title={"COUNTER PERCENTAGE SINCE LATEST SHINY"}
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
