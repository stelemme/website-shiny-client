// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import EncountersGraph from "../../components/Graphs/EncountersGraph";
import ExtremesMons from "../../components/Stats/ExtremesMons";
import Extremes from "../../components/Stats/Extremes";
import DateGraph from "../../components/Graphs/DateGraph";
import ShiniesAmountLeaderboard from "../../components/Leaderboards/ShiniesAmountLeaderboard";
import ShiniesCountedAmountLeaderboard from "../../components/Leaderboards/ShiniesCountedAmountLeaderboard";
import AverageEncLeaderboard from "../../components/Leaderboards/AverageEncLeaderboard";
import GameStats from "../../components/Stats/GameStats";
import GenderStats from "../../components/Stats/GenderStats";

export default function ShinyStats() {
  return (
    <PageComponent
      title="SHINY STATS"
      subtitle="Here you can find all the Shiny Stats."
    >
      <Grid container spacing={"20px"}>
        <Grid item xl={4} xs={12}>
          <ExtremesMons />
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
          <Extremes />
        </Grid>
        <Grid item xl={12} xs={12}>
          <GameStats />
        </Grid>
        <Grid item xl={12} xs={12}>
          <GenderStats />
        </Grid>
        <Grid item xl={12} xs={12}>
          <DateGraph />
        </Grid>
      </Grid>
    </PageComponent>
  );
}
