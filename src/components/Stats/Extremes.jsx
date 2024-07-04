import { useState } from "react";

// mui imports
import { Box, useTheme, Typography, Grid, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
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

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
    }
  };

  const StatsDisplay = ({ data, dataStat, statName, loading }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
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
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <StatsCard
            id={""}
            name={data._id}
            stat={dataStat}
            statName={statName}
            bgColor={500}
          />
        </Grid>
      );
    }
  };

  return (
    <Box
      p="20px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      height="100%"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          USER STATISTICS
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      </Box>
      <Grid container spacing={"8px"}>
        <Grid item xs={12} xl={6} container spacing={"8px"}>
          <StatsDisplay
            data={userStats?.mostFrequentName}
            dataStat={userStats?.mostFrequentName.count}
            statName={"The Most Caught Pokémon"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentYear}
            dataStat={userStats?.mostFrequentYear.count}
            statName={"The Most Frequent Year"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentMonth}
            dataStat={userStats?.mostFrequentMonth.count}
            statName={"The Most Frequent Month"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentDay}
            dataStat={userStats?.mostFrequentDay.count}
            statName={"The Most Frequent Day"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentNature}
            dataStat={userStats?.mostFrequentNature.count}
            statName={"The Most Frequent Nature"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.leastFrequentNature}
            dataStat={userStats?.leastFrequentNature.count}
            statName={"The Least Frequent Nature"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentBall}
            dataStat={userStats?.mostFrequentBall.count}
            statName={"The Most Frequent Ball"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.leastFrequentBall}
            dataStat={userStats?.leastFrequentBall.count}
            statName={"The Least Frequent Ball"}
            loading={userStatsLoading}
          />
        </Grid>
        <Grid item xs={12} xl={6} container spacing={"8px"}>
          <StatsDisplay
            data={userStats?.mostFrequentGen}
            dataStat={userStats?.mostFrequentGen.count}
            statName={"The Most Frequent Gen"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.leastFrequentGen}
            dataStat={userStats?.leastFrequentGen.count}
            statName={"The Least Frequent Gen"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentGame}
            dataStat={userStats?.mostFrequentGame.count}
            statName={"The Most Frequent Game"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.leastFrequentGame}
            dataStat={userStats?.leastFrequentGame.count}
            statName={"The Least Frequent Game"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentMethod}
            dataStat={userStats?.mostFrequentMethod.count}
            statName={"The Most Frequent Method"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.leastFrequentMethod}
            dataStat={userStats?.leastFrequentMethod.count}
            statName={"The Least Frequent Method"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentLocation}
            dataStat={userStats?.mostFrequentLocation.count}
            statName={"The Most Frequent Location"}
            loading={userStatsLoading}
          />
          <StatsDisplay
            data={userStats?.mostFrequentGeoLocation}
            dataStat={userStats?.mostFrequentGeoLocation.count}
            statName={"The Most Frequent Geo Location"}
            loading={userStatsLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
