// Mui
import { Box, Grid, Typography } from "@mui/material";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";

// Hooks
import useAxios from "../../hooks/useAxios";

export default function Counters() {
  const {
    response: uncompletedCounters,
    loading: uncompletedLoading
  } = useAxios({
    method: "get",
    url: `/counters?completed=false&preview=true`,
  });

  const {
    response: completedCounters,
    loading: completedLoading
  } = useAxios({
    method: "get",
    url: `/counters?completed=true&preview=true`,
  });

  return (
    <Box maxWidth={{ lg: "840px", xs: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="ALL COUNTERS"
            subtitle="Here you can find all counters."
          />
        </Box>

        {/* CARDS */}
        {!uncompletedLoading && !completedLoading && (<Grid container spacing={"20px"}>
          {/* ONGOING CARDS */}
          <Grid item lg={6} xs={12} maxWidth="400px">
            <Typography
              variant="h4"
              fontWeight={"bold"}
              style={{ marginBottom: "20px" }}
            >
              ONGOING COUNTERS
            </Typography>
            {uncompletedCounters?.counters?.map((counter) => {
              return (
                <div key={counter._id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    id={counter._id}
                    name={counter.name}
                    gameSprite={counter.sprite.game}
                    count={counter.totalEncounters}
                    trainer={counter.trainer}
                  />
                </div>
              );
            })}
          </Grid>
          {/* COMPLETED CARDS */}
          <Grid item lg={6} xs={12} maxWidth="400px">
            <Typography
              variant="h4"
              fontWeight={"bold"}
              style={{ marginBottom: "20px" }}
            >
              COMPLETED COUNTERS
            </Typography>
            {completedCounters?.counters?.map((counter) => {
              return (
                <div key={counter._id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    id={counter._id}
                    name={counter.name}
                    gameSprite={counter.sprite.game}
                    count={counter.totalEncounters}
                    trainer={counter.trainer}
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>)}
      </Box>
    </Box>
  );
}
