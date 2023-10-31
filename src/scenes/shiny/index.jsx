import { useState } from "react";
import LazyLoad from "react-lazy-load";
import Cookies from "js-cookie";

// Mui
import { Box, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/ShinyCard";
import SortMenu from "../../components/SortMenu";
import FilterMenu from "../../components/FilterMenu";

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

  const { isLoading: shinyLoading, data: shinyData } = useShiny("?preview=shiny");

  const ShinyDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      const filteredItems =
        shinyTrainerFilter !== "All"
          ? data?.filter((item) => item.trainer === shinyTrainerFilter)
          : data;

      return filteredItems?.map((item) => {
        return (
          <LazyLoad key={item._id} height={120}>
            <div style={{ marginBottom: "20px" }}>
              <ShinyCard
                id={item._id}
                name={item.name}
                gameSprite={item.sprite.game}
                dir={item.sprite.dir}
                monSprite={item.sprite.pokemon}
                trainer={item.trainer}
              />
            </div>
          </LazyLoad>
        );
      });
    }
  };

  return (
    <Box maxWidth={{ md: "630px", sm: "420px" }} mx="auto" my="20px">
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
            <FilterMenu open={openFilter} setOpen={setOpenFilter} cookie={"shinyTrainerFilter"}/>
            <IconButton onClick={(e) => setAnchorElSort(e.currentTarget)}>
              <SortIcon style={{ transform: "scaleX(-1)" }} />
            </IconButton>
            <SortMenu
              open={openSort}
              anchorEl={anchorElSort}
              setAnchorEl={setAnchorElSort}
              cookie={"shinySort"}
              options={["game", "pokedexNo", "date"]}
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
