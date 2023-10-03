import useAxios from "axios-hooks";

// Mui
import { Box, Grid, Typography } from "@mui/material";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function Counters() {
  const { username } = useAuth();

  const [
    {
      data: uncompletedCounters,
      loading: uncompletedLoading,
      error: uncompletedError,
    }
  ] = useAxios(`/counters?trainer=${username}&completed=false&preview=true`);

  const [
    {
      data: completedCounters,
      loading: completedLoading,
      error: completedError,
    },
  ] = useAxios(`/counters?trainer=${username}&completed=true&preview=true`);

  if (completedLoading || uncompletedLoading) {
    return (
      <Box maxWidth={{ lg: "840px", xs: "420px" }} mx="auto" my="20px">
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="ALL COUNTERS"
              subtitle="Here you can find all counters."
            />
          </Box>
          <Typography
             variant="h5"
             style={{ marginBottom: "20px" }}
          >
            Loading ...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box maxWidth={{ lg: "840px", xs: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="YOUR COUNTERS"
            subtitle="Here you can find all counters owned by you."
          />
        </Box>

        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {/* ONGOING CARDS */}
          <Grid item lg={6} xs={12} maxWidth="400px">
            <Typography
              variant="h4"
              fontWeight={"bold"}
              style={{ marginBottom: "20px" }}
            >
              ONGOING COUNTERS
            </Typography>
            {uncompletedCounters?.counters.map((counter) => {
              return (
                <div key={counter._id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    id={counter._id}
                    name={counter.name}
                    gameSprite={counter.sprite.game}
                    count={counter.totalEncounters}
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
            {completedCounters?.counters.map((counter) => {
              return (
                <div key={counter._id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    id={counter._id}
                    name={counter.name}
                    gameSprite={counter.sprite.game}
                    count={counter.totalEncounters}
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
