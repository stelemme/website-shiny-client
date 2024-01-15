// mui imports
import { Box, Grid } from "@mui/material";

// Components imports
import Header from "../../components/Header";

import EncountersGraph from "../../components/Graphs/EncountersGraph";
import UserRecords from "../../components/Stats/UserRecordsStats";
import UserStats from "../../components/Stats/UserStats";
import DateGraph from "../../components/Graphs/DateGraph";
import ShiniesAmountLeaderboard from "../../components/Leaderboards/ShiniesAmountLeaderboard";
import ShiniesCountedAmountLeaderboard from "../../components/Leaderboards/ShiniesCountedAmountLeaderboard";
import AverageEncLeaderboard from "../../components/Leaderboards/AverageEncLeaderboard";
import GameStats from "../../components/Stats/GameStats";

export default function ShinyStats() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY STATS"
            subtitle="Here you can find all the Shiny Stats."
          />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xl={4} xs={12}>
            <UserRecords />
          </Grid>
          <Grid item xl={8} xs={12}>
            <EncountersGraph />
          </Grid>
          <Grid item xl={4} xs={12}>
            <ShiniesAmountLeaderboard />
          </Grid>
          <Grid item xl={4} xs={12}>
            <ShiniesCountedAmountLeaderboard />
          </Grid>
          <Grid item xl={4} xs={12}>
            <AverageEncLeaderboard />
          </Grid>
          <Grid item xl={12} xs={12}>
            <UserStats />
          </Grid>
          <Grid item xl={12} xs={12}>
            <GameStats />
          </Grid>
          <Grid item xl={12} xs={12}>
            <DateGraph />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
