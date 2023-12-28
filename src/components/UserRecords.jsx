import { useState } from "react";

// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Skeleton
} from "@mui/material";
import { tokens } from "../theme";

// Components imports
import StatsCard from "./StatsCard";
import UserSelect from "./UserSelect";

// Functions
import { formatTime } from "../functions/statFunctions";

// Hooks
import { useShiny } from "../hooks/useData";

export default function UserRecords() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(`?action=userRecords&amount=1${query}`);
  const userStats = userStatsData?.data

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All")
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value)
    }
  };

  const StatsDisplay = ({ data, dataStat, statName, loading }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <Skeleton
            sx={{ bgcolor: colors.primary[500], height: {
              xs: '53px',
              sm: '44px',
              md: '56px',
            } }}
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
          USER RECORDS
        </Typography>
          <UserSelect label={"User"} handleChange={handleChange} defaultValue={trainer}/>
      </Box>
      <Grid container spacing={"12px"}>
        <StatsDisplay
          data={userStats?.first[0]}
          dataStat={new Date(userStats?.first[0].endDate).toLocaleDateString()}
          statName={"First Shiny Caught"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.lowestEncounters[0]}
          dataStat={userStats?.lowestEncounters[0].totalEncounters}
          statName={"Lowest Amount of Encounters"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.mostEncounters[0]}
          dataStat={userStats?.mostEncounters[0].totalEncounters}
          statName={"Highest Amount of Encounters"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.shortestHunt[0]}
          dataStat={formatTime(userStats?.shortestHunt[0].stats.totalHuntTime, false)}
          statName={"Shortest Hunt"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.longestHunt[0]}
          dataStat={formatTime(userStats?.longestHunt[0].stats.totalHuntTime, false)}
          statName={"Longest Hunt"}
          loading={userStatsLoading}
        />
        <StatsDisplay
          data={userStats?.mostDays[0]}
          dataStat={`${userStats?.mostDays[0].stats.daysHunting} days`}
          statName={"Most Days Hunted"}
          loading={userStatsLoading}
        />
      </Grid>
    </Box>
  );
}
