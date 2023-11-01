// mui imports
import { Box, Grid } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import UserStats from "../../components/UserStats";
import EncountersGraph from "../../components/EncountersGraph";

export default function ShinyStats() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="SHINY STATS" subtitle="Here you can find all the Shiny Stats." />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xl={4} xs={12}>
            <UserStats />
          </Grid>
          <Grid item xl={8} xs={12}>
            <EncountersGraph />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
