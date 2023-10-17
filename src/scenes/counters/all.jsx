import { useEffect, useState } from "react";
import axios from "axios";

// Mui
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";
import SortMenu from "../../components/SortMenu";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function Counters() {
  const { username } = useAuth();
  const [anchorElOngoing, setAnchorElOngoing] = useState(null);
  const openFilterOngoing = Boolean(anchorElOngoing);
  const [anchorElCompleted, setAnchorElCompleted] = useState(null);
  const openFilterCompleted = Boolean(anchorElCompleted);

  const [ongoingSort, setOngoingSort] = useState(null);
  const [ongoingCounters, setOngoingCounters] = useState(null);
  const [ongoingCountersLoading, setOngoingCountersLoading] = useState(true);

  const [completedSort, setCompletedSort] = useState(null);
  const [completedCounters, setCompletedCounters] = useState(null);
  const [completedCountersLoading, setCompletedCountersLoading] =
    useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/user?user=${username}&action=counterSort`
        );
        setOngoingSort(response.data.user.ongoingCounterSortAll);
        setCompletedSort(response.data.user.completedCounterSortAll);
      } catch (error) {
        console.error(error);
      }
    };
    if (username) {
      fetchUserData();
    }
  }, [username]);

  useEffect(() => {
    setOngoingCountersLoading(true);
    const fetchOngoingData = async () => {
      try {
        const response = await axios.get(
          `/counters?preview=true&sort=${ongoingSort}`
        );
        setOngoingCounters(response.data);
        setOngoingCountersLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (ongoingSort) {
      fetchOngoingData();
    }
  }, [ongoingSort]);

  useEffect(() => {
    setCompletedCountersLoading(true);
    const fetchCompletedData = async () => {
      try {
        const response = await axios.get(
          `/shiny?preview=true&sort=${completedSort}&action=counters`
        );
        console.log(response.data)
        setCompletedCounters(response.data);
        setCompletedCountersLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (completedSort) {
      fetchCompletedData();
    }
  }, [completedSort]);

  const handleOngoingClose = (sortString) => {
    if (typeof sortString === "string") {
      setOngoingSort(sortString);
      axios
        .patch(`/user?user=${username}&ongoingCounterSortAll=${sortString}`)
        .catch((err) => {
          console.log(err);
        });
    }
    setAnchorElOngoing(null);
  };

  const handleCompletedClose = (sortString) => {
    if (typeof sortString === "string") {
      setCompletedSort(sortString);
      axios
        .patch(`/user?user=${username}&completedCounterSortAll=${sortString}`)
        .catch((err) => {
          console.log(err);
        });
    }

    setAnchorElCompleted(null);
  };

  const OngoingCountersDisplay = () => {
    if (ongoingCountersLoading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return ongoingCounters?.counters.map((counter) => {
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
      });
    }
  };

  const CompletedCountersDisplay = () => {
    if (completedCountersLoading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return completedCounters?.shiny.map((counter) => {
        return (
          <div key={counter._id} style={{ marginBottom: "20px" }}>
            <CounterCard
              id={counter._id}
              name={counter.name}
              gameSprite={counter.sprite.game}
              count={counter.totalEncounters}
              trainer={counter.trainer}
              query={"?completed=true"}
            />
          </div>
        );
      });
    }
  };

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
        <Grid container spacing={"20px"}>
          {/* ONGOING CARDS */}
          <Grid item lg={6} xs={12} maxWidth="400px">
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
                handleClose={handleOngoingClose}
              />
            </Box>
            {OngoingCountersDisplay()}
          </Grid>
          {/* COMPLETED CARDS */}
          <Grid item lg={6} xs={12} maxWidth="400px">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb="10px"
            >
              <Typography variant="h4" fontWeight={"bold"}>
                COMPLETED COUNTERS
              </Typography>
              <IconButton
                onClick={(e) => setAnchorElCompleted(e.currentTarget)}
              >
                <SortIcon style={{ transform: "scaleX(-1)" }} />
              </IconButton>
              <SortMenu
                open={openFilterCompleted}
                anchorEl={anchorElCompleted}
                handleClose={handleCompletedClose}
              />
            </Box>
            {CompletedCountersDisplay()}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
