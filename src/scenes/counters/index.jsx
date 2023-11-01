import { useState } from "react";
import Cookies from "js-cookie";

// Mui
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";
import SortMenu from "../../components/SortMenu";
import FilterMenu from "../../components/FilterMenu";

// Functions
import sortData from "../../functions/sortData";

// Hooks
import { useCounter, useShiny } from "../../hooks/useData";

export default function Counters() {
  const [anchorElOngoing, setAnchorElOngoing] = useState(null);
  const openSortOngoing = Boolean(anchorElOngoing);
  const [anchorElCompleted, setAnchorElCompleted] = useState(null);
  const openSortCompleted = Boolean(anchorElCompleted);
  const [openFilterOngoing, setOpenFilterOngoing] = useState(false);
  const [openFilterCompleted, setOpenFilterCompleted] = useState(false);

  const ongoingCounterSort = Cookies.get("ongoingCounterSort")
    ? Cookies.get("ongoingCounterSort")
    : "newest";
  const completedCounterSort = Cookies.get("completedCounterSort")
    ? Cookies.get("completedCounterSort")
    : "newest";
  const ongoingTrainerFilter = Cookies.get("ongoingTrainerFilter")
    ? Cookies.get("ongoingTrainerFilter")
    : "All";
  const completedTrainerFilter = Cookies.get("completedTrainerFilter")
    ? Cookies.get("completedTrainerFilter")
    : "All";

  const { isLoading: ongoingCountersLoading, data: ongoingCountersData } =
    useCounter("?preview=true");
  const { isLoading: completedCountersLoading, data: completedCountersData } =
    useShiny("?preview=counter&action=counters");

  const CountersDisplay = ({ data, loading, isCompleted, filter }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5">Loading ...</Typography>
        </Grid>
      );
    } else {
      const filteredItems =
        filter !== "All"
          ? data?.filter((item) => item.trainer === filter)
          : data;

      return filteredItems?.map((item) => {
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
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={(e) => setOpenFilterOngoing(true)}>
              <FilterAltOutlinedIcon />
            </IconButton>
            <FilterMenu
              open={openFilterOngoing}
              setOpen={setOpenFilterOngoing}
              cookieTrainer={"ongoingTrainerFilter"}
              options={["trainer"]}
            />
            <IconButton onClick={(e) => setAnchorElOngoing(e.currentTarget)}>
              <SortIcon style={{ transform: "scaleX(-1)" }} />
            </IconButton>
            <SortMenu
              open={openSortOngoing}
              anchorEl={anchorElOngoing}
              setAnchorEl={setAnchorElOngoing}
              cookie={"ongoingCounterSort"}
              options={["game", "pokedexNo", "date", "encounters"]}
            />
          </Box>
        </Box>
        <Grid container spacing={"20px"} mb={"20px"}>
          <CountersDisplay
            data={sortData(
              ongoingCountersData?.data,
              ongoingCounterSort
            )}
            loading={ongoingCountersLoading}
            isCompleted={false}
            filter={ongoingTrainerFilter}
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
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={(e) => setOpenFilterCompleted(true)}>
              <FilterAltOutlinedIcon />
            </IconButton>
            <FilterMenu
              open={openFilterCompleted}
              setOpen={setOpenFilterCompleted}
              cookieTrainer={"completedTrainerFilter"}
              options={["trainer"]}
            />
            <IconButton onClick={(e) => setAnchorElCompleted(e.currentTarget)}>
              <SortIcon style={{ transform: "scaleX(-1)" }} />
            </IconButton>
            <SortMenu
              open={openSortCompleted}
              anchorEl={anchorElCompleted}
              setAnchorEl={setAnchorElCompleted}
              cookie={"completedCounterSort"}
              options={["game", "pokedexNo", "date", "encounters"]}
            />
          </Box>
        </Box>
        <Grid container spacing={"20px"}>
          <CountersDisplay
            data={sortData(
              completedCountersData?.data,
              completedCounterSort
            )}
            loading={completedCountersLoading}
            isCompleted={true}
            filter={completedTrainerFilter}
          />
        </Grid>
      </Box>
    </Box>
  );
}
