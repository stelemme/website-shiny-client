import { useState } from "react";
import { useCookies } from "react-cookie";

// Mui
import { Box, Grid, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import CounterCard from "../../components/Cards/CounterCard";
import SortMenu from "../../components/Menus/SortMenu";
import FilterMenu from "../../components/Dialogs/FilterDialog";

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
  const [cookie] = useCookies([
    "ongoingCounterSort",
    "completedCounterSort",
    "ongoingTrainerFilter",
    "completedTrainerFilter",
  ]);

  const { isLoading: ongoingCountersLoading, data: ongoingCountersData } =
    useCounter("preview=counter");
  const { isLoading: completedCountersLoading, data: completedCountersData } =
    useShiny("preview=counter&filter=counters");

  const CountersDisplay = ({ data, loading, isCompleted, filter }) => {
    const filteredItems =
      filter !== "All" ? data?.filter((item) => item.trainer === filter) : data;

    return filteredItems?.map((item) => {
      return (
        <LoadingComponent loadingCondition={loading} key={item._id}>
          <Grid item lg={6} xs={12}>
            <CounterCard
              id={item._id}
              name={item.name}
              gameSprite={item.sprite.game}
              count={item.totalEncounters}
              trainer={item.trainer}
              query={isCompleted ? "?completed=true" : ""}
            />
          </Grid>
        </LoadingComponent>
      );
    });
  };

  return (
    <PageComponent
      title={"ALL COUNTERS"}
      subtitle={"Here you can find all counters."}
      widthSnaps={3}
    >
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
            options={["game", "pokedexNo", "date", "encounters", "abc"]}
          />
        </Box>
      </Box>
      <Grid container spacing={"20px"} mb={"20px"}>
        <CountersDisplay
          data={sortData(ongoingCountersData?.data, cookie.ongoingCounterSort)}
          loading={ongoingCountersLoading}
          isCompleted={false}
          filter={
            cookie.ongoingTrainerFilter ? cookie.ongoingTrainerFilter : "All"
          }
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
            options={["game", "pokedexNo", "date", "encounters", "abc"]}
          />
        </Box>
      </Box>
      <Grid container spacing={"20px"}>
        <CountersDisplay
          data={sortData(
            completedCountersData?.data,
            cookie.completedCounterSort
          )}
          loading={completedCountersLoading}
          isCompleted={true}
          filter={cookie.completedTrainerFilter}
        />
      </Grid>
    </PageComponent>
  );
}
