// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import EncountersLeaderboard from "../../components/Leaderboards/EncountersLeaderboard";
import CountersAmountLeaderboard from "../../components/Leaderboards/CountersAmountLeaderboard";
import CountersPercentageLeaderboard from "../../components/Leaderboards/CountersPercentageLeaderboard";
import ConvertedEncLeaderBoard from "../../components/Leaderboards/ConvertedEncLeaderboard";
import LatestEncounter from "../../components/Leaderboards/LatestEncounters";

export default function CounterStats() {
  return (
    <PageComponent
      title="COUNTER STATS"
      subtitle="Here you can find all the Counter Stats."
    >
      <Grid container spacing={"20px"}>
        <Grid item xl={4} xs={12}>
          <EncountersLeaderboard />
        </Grid>
        <Grid item xl={4} xs={12}>
          <LatestEncounter />
        </Grid>
        <Grid item xl={4} xs={12}>
          <ConvertedEncLeaderBoard />
        </Grid>
        <Grid item xl={4} xs={12}>
          <CountersPercentageLeaderboard />
        </Grid>
        <Grid item xl={4} xs={12}>
          <CountersAmountLeaderboard />
        </Grid>
      </Grid>
    </PageComponent>
  );
}
