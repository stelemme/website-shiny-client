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
import FilterMenuBeta from "../../components/Menus/FilterMenu";

// Hooks
import { useCounter, useShiny } from "../../hooks/useData";

export default function Counters() {
  const [anchorElOngoing, setAnchorElOngoing] = useState(null);
  const openSortOngoing = Boolean(anchorElOngoing);
  const [anchorElCompleted, setAnchorElCompleted] = useState(null);
  const openSortCompleted = Boolean(anchorElCompleted);
  const [openFilter, setOpenFilter] = useState(false);
  const [cookie] = useCookies(["sortCountersCompleted", "sortCountersOngoing"]);

  const handleFilterClick = () => {
    setOpenFilter(true);
  };

  const { isLoading: ongoingCountersLoading, data: ongoingCountersData } =
    useCounter(`preview=counter&sort=${cookie.sortCountersOngoing}`, true);
  const { isLoading: completedCountersLoading, data: completedCountersData } =
    useShiny(
      `preview=counter&filter=counters&sort=${cookie.sortCountersCompleted}`,
      true,
      "Counter"
    );

  return (
    <PageComponent
      title={"ALL COUNTERS"}
      subtitle={"Here you can find all counters."}
      widthSnaps={3}
      icon1={<FilterAltOutlinedIcon />}
      onClickIcon1={handleFilterClick}
    >
      <FilterMenuBeta
        open={openFilter}
        setOpen={setOpenFilter}
        type="Counter"
      />

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
          <IconButton onClick={(e) => setAnchorElOngoing(e.currentTarget)}>
            <SortIcon style={{ transform: "scaleX(-1)" }} />
          </IconButton>
          <SortMenu
            open={openSortOngoing}
            anchorEl={anchorElOngoing}
            setAnchorEl={setAnchorElOngoing}
            cookie={"sortCountersOngoing"}
            options={["game", "pokedexNo", "date", "encounters", "abc"]}
          />
        </Box>
      </Box>
      <Grid
        container
        spacing={window.innerWidth < 600 ? "10px" : "20px"}
        mb={"20px"}
      >
        {ongoingCountersData?.data.map((item) => {
          return (
            <LoadingComponent
              loadingCondition={ongoingCountersLoading}
              key={item._id}
            >
              <Grid item lg={6} xs={12}>
                <CounterCard
                  id={item._id}
                  name={item.name}
                  gameSprite={item.sprite.game}
                  count={item.totalEncounters}
                  trainer={item.trainer}
                  query={""}
                />
              </Grid>
            </LoadingComponent>
          );
        })}
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
          <IconButton onClick={(e) => setAnchorElCompleted(e.currentTarget)}>
            <SortIcon style={{ transform: "scaleX(-1)" }} />
          </IconButton>
          <SortMenu
            open={openSortCompleted}
            anchorEl={anchorElCompleted}
            setAnchorEl={setAnchorElCompleted}
            cookie={"sortCountersCompleted"}
            options={["game", "pokedexNo", "date", "encounters", "abc"]}
          />
        </Box>
      </Box>
      <Grid container spacing={window.innerWidth < 600 ? "10px" : "20px"}>
        {completedCountersData?.data.map((item) => {
          return (
            <LoadingComponent
              loadingCondition={completedCountersLoading}
              key={item._id}
            >
              <Grid item lg={6} xs={12}>
                <CounterCard
                  id={item._id}
                  name={item.name}
                  gameSprite={item.sprite.game}
                  count={item.totalEncounters}
                  trainer={item.trainer}
                  query={"?completed=true"}
                />
              </Grid>
            </LoadingComponent>
          );
        })}
      </Grid>
    </PageComponent>
  );
}
