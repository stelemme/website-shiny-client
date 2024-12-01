import { useState } from "react";
import { useCookies } from "react-cookie";

// mui
import { Grid } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import GeneralSelect from "../Selects/GeneralSelect";
import StatsCard from "../Cards/StatsCard";

// Hooks
import { useCounter } from "../../hooks/useData";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function CounterRanking({
  id,
  encounters,
  percentage,
  setClose,
  name,
  trainer,
  completed,
}) {
  const [cookies, setCookies] = useCookies(["displayCounterRankingEnc"]);
  const [statString, setStatString] = useState(
    cookies.displayCounterRankingEnc ? "rankingEnc" : "rankingPercentage"
  );

  const foreverDate = new Date("9999-12-31T23:59:59");

  const { isLoading: countersLoading, data: countersData } = useCounter(
    `id=${id}&stats=${statString}&checkValue=${
      statString === "rankingEnc" ? encounters : percentage
    }`
  );

  const stats = countersData?.data[0];

  const handleChange = (e) => {
    setStatString(getKeyByValue(selectList, e.target.value));
    setCookies("displayCounterRankingEnc", e.target.value === "Encounters", {
      expires: foreverDate,
    });
  };

  const selectList = {
    rankingEnc: "Encounters",
    rankingPercentage: "Percentage",
  };

  return (
    <BoxComponent
      colored={false}
      title={"Counter Ranking"}
      py="5px"
      px="0px"
      select={
        <GeneralSelect
          label={"Criteria"}
          handleChange={handleChange}
          list={Object.values(selectList)}
          value={selectList[statString]}
        />
      }
    >
      <LoadingComponent loadingCondition={countersLoading}>
        <Grid container spacing={1}>
          {!countersLoading &&
            stats?.valuesAbove.map((item) => {
              return (
                <Grid item xs={12} key={item._id}>
                  <StatsCard
                    id={item._id}
                    name={item.name}
                    statName={item.rank + "."}
                    stat={
                      statString === "rankingEnc"
                        ? item.totalEncounters
                        : item.stats.percentage.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + "%"
                    }
                    trainer={item.trainer}
                    bgColor={500}
                    query={item?.source === "shinies" ? "?completed=true" : ""}
                    additionalAction={() => setClose(false)}
                    nameWidth="30px"
                    navigateString="counters"
                  />
                </Grid>
              );
            })}
          <Grid item xs={12}>
            <StatsCard
              id={id}
              name={name}
              statName={
                stats?.valuesAbove[2]?.rank
                  ? stats?.valuesAbove[2].rank + 1 + "."
                  : stats?.valuesBelow[0].rank + "."
              }
              stat={
                statString === "rankingEnc"
                  ? encounters
                  : percentage.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + "%"
              }
              trainer={trainer}
              bgColor={400}
              query={completed ? "?completed=true" : ""}
              additionalAction={() => setClose(false)}
              nameWidth="30px"
              navigateString="counters"
            />
          </Grid>
          {!countersLoading &&
            stats?.valuesBelow.map((item) => {
              return (
                <Grid item xs={12} key={item._id}>
                  <StatsCard
                    id={item._id}
                    name={item.name}
                    statName={item.rank + 1 + "."}
                    stat={
                      statString === "rankingEnc"
                        ? item.totalEncounters
                        : item.stats.percentage.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + "%"
                    }
                    trainer={item.trainer}
                    bgColor={500}
                    query={item?.source === "shinies" ? "?completed=true" : ""}
                    additionalAction={() => setClose(false)}
                    nameWidth="30px"
                    navigateString="counters"
                  />
                </Grid>
              );
            })}
        </Grid>
      </LoadingComponent>
    </BoxComponent>
  );
}
