// mui imports
import { Box, Grid } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import Extremes from "../../components/Stats/ExtremesMons";
import EncountersGraph from "../../components/Graphs/EncountersGraph";
import LatestShinies from "../../components/Stats/LatestShinies";
import LatestCounters from "../../components/Stats/LatestCounters";

export default function Home() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="HOMEPAGE" subtitle="Welcome to the Homepage" />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xl={4} md={6} xs={12}>
            <LatestCounters />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <LatestShinies />
          </Grid>
          <Grid item xl={4} xs={12}>
            <Extremes />
          </Grid>
          <Grid item xs={12}>
            <EncountersGraph />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
