import { useState } from "react";
import { useCookies } from "react-cookie";

// mui
import { Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import GeneralSelect from "../Selects/GeneralSelect";
import StatsCard from "../Cards/StatsCard";

// Hooks
import { useCounter } from "../../hooks/useData";

// Functions
import { formatTime } from "../../functions/statFunctions";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function CounterRanking({
  id,
  data,
  setClose,
  name,
  trainer,
  completed,
  method,
}) {
  const [cookies, setCookies] = useCookies(["displayCounterRanking"]);
  const [statString, setStatString] = useState(cookies.displayCounterRanking);
  const [onlyMethod, setOnlyMethod] = useState(false);

  const foreverDate = new Date("9999-12-31T23:59:59");

  console.log(statString, data[statString]);

  const { isLoading: countersLoading, data: countersData } = useCounter(
    `id=${id}&stats=${statString}&checkValue=${
      data[statString] ? data[statString] : 0
    }${onlyMethod ? `&filter=complex&filterMethod=${method.name}` : ""}`
  );

  const stats = countersData?.data[0];

  const handleChange = (e) => {
    setStatString(getKeyByValue(selectList, e.target.value));
    setCookies(
      "displayCounterRanking",
      getKeyByValue(selectList, e.target.value),
      {
        expires: foreverDate,
      }
    );
  };

  const selectList = {
    rankingEnc: "Encounters",
    rankingPercentage: "Percentage",
    rankingTime: "Time",
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
          <Grid item xs={12} mx={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    color="default"
                    checked={onlyMethod}
                    onChange={() => setOnlyMethod((prevState) => !prevState)}
                  />
                }
                label={`Only "${method.name}" Hunts`}
              />
            </FormGroup>
          </Grid>
          {!countersLoading &&
            stats?.valuesAbove.map((item) => {
              return (
                <Grid item xs={12} key={item._id}>
                  <StatsCard
                    id={item._id}
                    name={item.name}
                    statName={item?.rank + "."}
                    stat={
                      statString === "rankingPercentage"
                        ? item[statString].toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + "%"
                        : statString === "rankingTime"
                        ? formatTime(item[statString], false)
                        : item[statString]
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
                  ? stats?.valuesAbove[2]?.rank + 1 + "."
                  : stats?.valuesBelow[0]?.rank + "."
              }
              stat={
                statString === "rankingPercentage"
                  ? data[statString].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + "%"
                  : statString === "rankingTime"
                  ? formatTime(data[statString] ? data[statString] : 0, false)
                  : data[statString]
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
                    statName={item?.rank + 1 + "."}
                    stat={
                      statString === "rankingPercentage"
                        ? item[statString].toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + "%"
                        : statString === "rankingTime"
                        ? formatTime(item[statString], false)
                        : item[statString]
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
