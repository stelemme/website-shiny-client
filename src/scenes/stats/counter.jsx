// mui imports
import { Box, Grid } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import CounterLeaderboard from "../../components/CounterLeaderboard";

export default function CounterStats() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="COUNTER STATS"
            subtitle="Here you can find all the Counter Stats."
          />
        </Box>
        <Grid container spacing={"20px"}>
          <Grid item xl={4} xs={12}>
            <CounterLeaderboard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
