import { useState } from "react";

// mui imports
import { useTheme, Grid, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import StatsCard from "../Cards/StatsCard";
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function Extremes() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(
    `stats=extremes${query}`
  );
  const userStats = userStatsData?.data[0];

  const stats = [
    {
      data: userStats?.mostFrequentName,
      dataStat: userStats?.mostFrequentName.count,
      statName: "The Most Caught Pokémon",
    },
    {
      data: userStats?.mostFrequentYear,
      dataStat: userStats?.mostFrequentYear.count,
      statName: "The Most Frequent Year",
    },
    {
      data: userStats?.mostFrequentMonth,
      dataStat: userStats?.mostFrequentMonth.count,
      statName: "The Most Frequent Month",
    },
    {
      data: userStats?.mostFrequentDay,
      dataStat: userStats?.mostFrequentDay.count,
      statName: "The Most Frequent Day",
    },
    {
      data: userStats?.mostFrequentNature,
      dataStat: userStats?.mostFrequentNature.count,
      statName: "The Most Frequent Nature",
    },
    {
      data: userStats?.leastFrequentNature,
      dataStat: userStats?.leastFrequentNature.count,
      statName: "The Least Frequent Nature",
    },
    {
      data: userStats?.mostFrequentBall,
      dataStat: userStats?.mostFrequentBall.count,
      statName: "The Most Frequent Ball",
    },
    {
      data: userStats?.leastFrequentBall,
      dataStat: userStats?.leastFrequentBall.count,
      statName: "The Least Frequent Ball",
    },
    {
      data: userStats?.mostFrequentGen,
      dataStat: userStats?.mostFrequentGen.count,
      statName: "The Most Frequent Gen",
    },
    {
      data: userStats?.leastFrequentGen,
      dataStat: userStats?.leastFrequentGen.count,
      statName: "The Least Frequent Gen",
    },
    {
      data: userStats?.mostFrequentGame,
      dataStat: userStats?.mostFrequentGame.count,
      statName: "The Most Frequent Game",
    },
    {
      data: userStats?.leastFrequentGame,
      dataStat: userStats?.leastFrequentGame.count,
      statName: "The Least Frequent Game",
    },
    {
      data: userStats?.mostFrequentMethod,
      dataStat: userStats?.mostFrequentMethod.count,
      statName: "The Most Frequent Method",
    },
    {
      data: userStats?.leastFrequentMethod,
      dataStat: userStats?.leastFrequentMethod.count,
      statName: "The Least Frequent Method",
    },
    {
      data: userStats?.mostFrequentLocation,
      dataStat: userStats?.mostFrequentLocation.count,
      statName: "The Most Frequent Location",
    },
    {
      data: userStats?.mostFrequentGeoLocation,
      dataStat: userStats?.mostFrequentGeoLocation.count,
      statName: "The Most Frequent Geo Location",
    },
  ];

  const splitArray = (array) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];
  };

  const [firstHalf, secondHalf] = splitArray(stats);

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
    }
  };

  return (
    <BoxComponent
      title={"USER STATISTICS"}
      select={
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      }
    >
      <Grid container spacing={"8px"}>
        {/* Left side grid - first half */}
        <Grid item xs={12} xl={6} container spacing={"8px"}>
          {firstHalf.map((stat) => {
            return (
              <Grid item xs={12} key={stat.statName}>
                <LoadingComponent
                  loadingCondition={userStatsLoading}
                  skeleton={
                    <Skeleton
                      sx={{
                        bgcolor: colors.primary[500],
                        height: {
                          xs: "56px",
                          md: "44px",
                        },
                      }}
                      variant="rounded"
                      width={"100%"}
                    />
                  }
                >
                  <StatsCard
                    id={""}
                    name={stat.data?._id}
                    stat={stat.dataStat}
                    statName={stat.statName}
                    bgColor={500}
                  />
                </LoadingComponent>
              </Grid>
            );
          })}
        </Grid>

        {/* Right side grid - second half */}
        <Grid item xs={12} xl={6} container spacing={"8px"}>
          {secondHalf.map((stat) => {
            return (
              <Grid item xs={12} key={stat.statName}>
                <LoadingComponent
                  loadingCondition={userStatsLoading}
                  skeleton={
                    <Skeleton
                      sx={{
                        bgcolor: colors.primary[500],
                        height: {
                          xs: "56px",
                          md: "44px",
                        },
                      }}
                      variant="rounded"
                      width={"100%"}
                    />
                  }
                >
                  <StatsCard
                    id={""}
                    name={stat.data?._id}
                    stat={stat.dataStat}
                    statName={stat.statName}
                    bgColor={500}
                  />
                </LoadingComponent>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
