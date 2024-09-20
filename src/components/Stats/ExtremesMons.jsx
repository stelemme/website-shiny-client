import { useState } from "react";

// mui imports
import { Box, useTheme, Typography, Grid, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../General/BoxComponent";
import StatsCard from "../Cards/StatsCard";
import UserSelect from "../Selects/UserSelect";

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function ExtremesMons() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(
    `stats=extremesMons${query}`
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
                xs: "53px",
                sm: "44px",
                md: "56px",
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
            id={data._id}
            name={data.name}
            stat={dataStat}
            statName={statName}
            trainer={data.trainer}
            bgColor={500}
          />
        </Grid>
      );
    }
  };

  return (
    <BoxComponent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          USER RECORDS
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      </Box>
      <Grid container spacing={"12px"}>
        <StatsDisplay
          data={userStats?.first}
          dataStat={new Date(userStats?.first.endDate).toLocaleDateString()}
          statName={"First Shiny Caught"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.lowestEncounters}
          dataStat={userStats?.lowestEncounters.totalEncounters}
          statName={"Lowest #Encounters"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.mostEncounters}
          dataStat={userStats?.mostEncounters.totalEncounters}
          statName={"Highest #Encounters"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.shortestHunt}
          dataStat={formatTime(
            userStats?.shortestHunt.stats.totalHuntTime,
            false
          )}
          statName={"Shortest Hunt"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.longestHunt}
          dataStat={formatTime(
            userStats?.longestHunt.stats.totalHuntTime,
            false
          )}
          statName={"Longest Hunt"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.mostDays}
          dataStat={`${userStats?.mostDays.stats.daysHunting} days`}
          statName={"Most Days Hunted"}
          loading={userStatsLoading}
        />
      </Grid>
    </BoxComponent>
  );
}
