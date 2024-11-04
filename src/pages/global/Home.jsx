// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import EncountersGraph from "../../components/Graphs/EncountersGraph";
import LatestShinies from "../../components/Stats/LatestShinies";
import LatestCounters from "../../components/Stats/LatestCounters";
import OnThisDay from "../../components/Stats/OnThisDay";

export default function Home() {
  return (
    <PageComponent title="HOMEPAGE" subtitle="Welcome to the Homepage">
      <Grid container spacing={"20px"}>
        <Grid item xl={4} md={6} xs={12}>
          <LatestCounters />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <LatestShinies />
        </Grid>
        <Grid item xl={4} xs={12}>
          <OnThisDay />
        </Grid>
        <Grid item xs={12}>
          <EncountersGraph />
        </Grid>
      </Grid>
    </PageComponent>
  );
}
