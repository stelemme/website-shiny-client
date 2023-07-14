import { useState, useEffect } from "react";
import axios from "axios";

// Mui
import { Box, Grid, Typography } from "@mui/material";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";

// Hooks
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

export default function Counters() {
  const { username } = useAuth();

  const [uncompletedCounters, setUncompletedCounters] = useState(undefined)
  const [completedCounters, setCompletedCounters] = useState(undefined)

  useEffect(() => {
    axios["get"](`/counters?trainer=${username}&completed=false&preview=true`)
      .then((res) => {
        setUncompletedCounters(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    axios["get"](`/counters?trainer=${username}&completed=true&preview=true`)
      .then((res) => {
        setCompletedCounters(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

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
            {uncompletedCounters?.counters.length > 0 ? uncompletedCounters?.counters.map((counter) => {
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
            }) : (
              <Typography>
                No Counters Found
              </Typography>
            )}
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
            {completedCounters?.counters.length > 0 ? completedCounters?.counters.map((counter) => {
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
            }) : (
              <Typography>
                No Counters Found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
