import { useState } from "react";
import Cookies from "js-cookie";
import LazyLoad from "react-lazy-load";

// Mui
import { Box, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/Cards/ShinyCard";
import ShinyCardEvolutions from "../../components/Cards/ShinyCardEvolutions";
import SortMenu from "../../components/Menus/SortMenu";
import FilterMenu from "../../components/Dialogs/FilterDialog";

// Functions
import sortData from "../../functions/sortData";

// Hooks
import { useShiny } from "../../hooks/useData";


export default function Shiny() {
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);
  const [openFilter, setOpenFilter] = useState(false);

  const shinySort = Cookies.get("shinySort")
    ? Cookies.get("shinySort")
    : "newest";
  const shinyTrainerFilter = Cookies.get("shinyTrainerFilter")
    ? Cookies.get("shinyTrainerFilter")
    : "All";
  const shinyGenFilter = Cookies.get("shinyGenFilter")
    ? Cookies.get("shinyGenFilter")
    : "All";
  const evolutionSpriteDisplay = Cookies.get("evolutionSpriteDisplay")
    ? Cookies.get("evolutionSpriteDisplay")
    : false;

  const { isLoading: shinyLoading, data: shinyData } =
    useShiny("preview=shiny");

  const ShinyDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return data?.reduce(function (filtered, item) {
        if (
          (shinyTrainerFilter === "All" ||
            item.trainer === shinyTrainerFilter) &&
          (shinyGenFilter === "All" || item.gen === shinyGenFilter)
        ) {
          filtered.push(
            <div style={{ marginBottom: "20px" }} key={item._id}>
              {evolutionSpriteDisplay === "false" ? (
                <LazyLoad height={100}>
                  <ShinyCard
                    id={item._id}
                    name={item.name}
                    gameSprite={item.sprite.game}
                    dir={item.sprite.dir}
                    monSprite={item.sprite.pokemon}
                    trainer={item.trainer}
                    IRLLocation={item.IRLLocation}
                  />
                </LazyLoad>
              ) : (
                  <ShinyCardEvolutions
                    id={item._id}
                    name={item.name}
                    gameSprite={item.sprite.game}
                    dir={item.sprite.dir}
                    monSprite={item.sprite.pokemon}
                    trainer={item.trainer}
                    evolutions={item.evolutions}
                    forms={item.forms}
                    group={item.group}
                    IRLLocation={item.IRLLocation}
                  />
              )}
            </div>
          );
        }
        return filtered;
      }, []);
    }
  };

  return (
    <Box
      maxWidth={
        evolutionSpriteDisplay === "false"
          ? { md: "630px", sm: "420px" }
          : { lg: "920px" }
      }
      mx="auto"
      my="20px"
    >
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY POKEMON"
            subtitle="Here you can find all shinies."
          />
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={(e) => setOpenFilter(true)}>
              <FilterAltOutlinedIcon />
            </IconButton>
            <FilterMenu
              open={openFilter}
              setOpen={setOpenFilter}
              cookieTrainer={"shinyTrainerFilter"}
              cookieGen={"shinyGenFilter"}
              options={["trainer", "gen"]}
            />
            <IconButton onClick={(e) => setAnchorElSort(e.currentTarget)}>
              <SortIcon style={{ transform: "scaleX(-1)" }} />
            </IconButton>
            <SortMenu
              open={openSort}
              anchorEl={anchorElSort}
              setAnchorEl={setAnchorElSort}
              cookie={"shinySort"}
              options={["game", "pokedexNo", "date", "abc"]}
            />
          </Box>
        </Box>

        {/* CARDS */}
        <ShinyDisplay
          data={sortData(shinyData?.data, shinySort)}
          loading={shinyLoading}
        />
      </Box>
    </Box>
  );
}
