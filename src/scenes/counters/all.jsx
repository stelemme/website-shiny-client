import { useEffect, useState } from "react";

// Mui
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";
import SortMenu from "../../components/SortMenu";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import useAxios from "axios-hooks";

export default function Counters() {
  const { username } = useAuth();
  const [anchorElOngoing, setAnchorElOngoing] = useState(null);
  const openFilterOngoing = Boolean(anchorElOngoing);
  const [anchorElCompleted, setAnchorElCompleted] = useState(null);
  const openFilterCompleted = Boolean(anchorElCompleted);

  const [ongoingCounters, setOngoingCounters] = useState(null);
  const [completedCounters, setCompletedCounters] = useState(null);

  const [{ data: userData, loading: userDataLoading }] = useAxios(
    `/user?user=${username}&action=counterSort`
  );

  const [{ data: ongoingCountersData, loading: ongoingCountersLoading }] =
    useAxios(
      `/counters?preview=true&sort=${userData?.user.ongoingCounterSort}`
    );

  const [{ data: completedCountersData, loading: completedCountersLoading }] =
    useAxios(
      `/shiny?preview=counter&sort=${userData?.user.completedCounterSort}&action=counters`
    );

  useEffect(() => {
    if (!ongoingCountersLoading) {
      setOngoingCounters(ongoingCountersData.counters);
    }
  }, [ongoingCountersData, ongoingCountersLoading]);

  useEffect(() => {
    if (!completedCountersLoading) {
      setCompletedCounters(completedCountersData.shiny);
    }
  }, [completedCountersData, completedCountersLoading]);

  const CountersDisplay = ({ data, loading, isCompleted }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5">Loading ...</Typography>
        </Grid>
      );
    } else {
      return data?.map((item) => {
        return (
          <Grid item lg={6} xs={12} key={item._id}>
            <CounterCard
              id={item._id}
              name={item.name}
              gameSprite={item.sprite.game}
              count={item.totalEncounters}
              trainer={item.trainer}
              query={isCompleted ? "?completed=true" : ""}
            />
          </Grid>
        );
      });
    }
  };

  return (
    <Box
      maxWidth={{ lg: "840px", md: "630px", sm: "420px" }}
      mx="auto"
      my="20px"
    >
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="ALL COUNTERS"
            subtitle="Here you can find all counters."
          />
        </Box>

        {/* CARDS */}
        {/* ONGOING CARDS */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="10px"
        >
          <Typography variant="h4" fontWeight={"bold"}>
            ONGOING COUNTERS
          </Typography>
          <IconButton onClick={(e) => setAnchorElOngoing(e.currentTarget)}>
            <SortIcon style={{ transform: "scaleX(-1)" }} />
          </IconButton>
          <SortMenu
            open={openFilterOngoing}
            anchorEl={anchorElOngoing}
            setAnchorEl={setAnchorElOngoing}
            data={ongoingCounters}
            setData={setOngoingCounters}
            username={username}
            sortKey="ongoingCounterSort"
            options={["game", "pokedexNo", "date", "encounters"]}
          />
        </Box>
        <Grid container spacing={"20px"}>
          <CountersDisplay
            data={ongoingCounters}
            loading={ongoingCountersLoading || userDataLoading}
            isCompleted={false}
          />
        </Grid>
        {/* COMPLETED CARDS */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="10px"
        >
          <Typography variant="h4" fontWeight={"bold"}>
            COMPLETED COUNTERS
          </Typography>
          <IconButton onClick={(e) => setAnchorElCompleted(e.currentTarget)}>
            <SortIcon style={{ transform: "scaleX(-1)" }} />
          </IconButton>
          <SortMenu
            open={openFilterCompleted}
            anchorEl={anchorElCompleted}
            setAnchorEl={setAnchorElCompleted}
            data={completedCounters}
            setData={setCompletedCounters}
            username={username}
            sortKey="completedCounterSort"
            options={["game", "pokedexNo", "date", "encounters"]}
          />
        </Box>
        <Grid container spacing={"20px"}>
          <CountersDisplay
            data={completedCounters}
            loading={completedCountersLoading || userDataLoading}
            isCompleted={true}
          />
        </Grid>
      </Box>
    </Box>
  );
}
