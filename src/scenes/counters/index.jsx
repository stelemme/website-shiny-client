// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";

const data = [
  { id: 1, name: "Alcremie", game: "red", count: 5 },
  { id: 2, name: "Dynamax Adventures", game: "sword", count: 100 },
  { id: 3, name: "Bulbasaur", game: "yellow", count: 1000 },
  { id: 4, name: "Route 14", game: "black-2", count: 55555 },
];

export default function Counters() {
  return (
    <Box
      maxWidth={{ lg: "840px", xs: "420px" }}
      mx="auto"
      my="20px"
    >
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="COUNTERS"
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
            {data.map((counter) => {
              return (
                <div key={counter.id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    name={counter.name}
                    gameSprite={counter.game}
                    count={counter.count}
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
            {data.map((counter) => {
              return (
                <div key={counter.id} style={{ marginBottom: "20px" }}>
                  <CounterCard
                    name={counter.name}
                    gameSprite={counter.game}
                    count={counter.count}
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
