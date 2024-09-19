import { useState } from "react";
import { useCookies } from "react-cookie";
import LazyLoad from "react-lazyload";

// Mui
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import ShinyCard from "../../components/Cards/ShinyCard";
import ShinyCardEvolutions from "../../components/Cards/ShinyCardEvolutions";
import SortMenu from "../../components/Menus/SortMenu";
import FilterMenu from "../../components/Dialogs/FilterDialog";

// Functions
import sortData from "../../functions/sortData";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function Shinies() {
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);
  const [openFilter, setOpenFilter] = useState(false);
  const [cookie] = useCookies([
    "shinySort",
    "shinyTrainerFilter",
    "shinyGenFilter",
    "evolutionSpriteDisplay",
  ]);

  const { isLoading: shinyLoading, data: shinyData } =
    useShiny("preview=shiny");

  const data = sortData(shinyData?.data, cookie.shinySort);

  const handleFilterClick = () => {
    setOpenFilter(true);
  };

  const handleSortClick = (e) => {
    setAnchorElSort(e.currentTarget);
  };

  return (
    <PageComponent
      title="SHINY POKEMON"
      subtitle="Here you can find all shinies."
      widthSnaps={cookie.evolutionSpriteDisplay === "false" ? 2 : 4}
      icon1={<FilterAltOutlinedIcon />}
      onClickIcon1={handleFilterClick}
      icon2={<SortIcon style={{ transform: "scaleX(-1)" }} />}
      onClickIcon2={handleSortClick}
    >
      <FilterMenu
        open={openFilter}
        setOpen={setOpenFilter}
        cookieTrainer={"shinyTrainerFilter"}
        cookieGen={"shinyGenFilter"}
        options={["trainer", "gen"]}
      />
      <SortMenu
        open={openSort}
        anchorEl={anchorElSort}
        setAnchorEl={setAnchorElSort}
        cookie={"shinySort"}
        options={["game", "pokedexNo", "date", "abc"]}
      />

      {/* CARDS */}
      <LoadingComponent loadingCondition={shinyLoading}>
        {data?.reduce((filtered, item) => {
          if (
            (cookie.shinyTrainerFilter === "All" ||
              item.trainer === cookie.shinyTrainerFilter) &&
            (cookie.shinyGenFilter === "All" ||
              item.gen === cookie.shinyGenFilter)
          ) {
            filtered.push(
              <div
                style={{
                  marginBottom: window.innerWidth < 600 ? "10px" : "20px",
                }}
                key={item._id}
              >
                {!cookie.evolutionSpriteDisplay ? (
                  <LazyLoad height={window.innerWidth < 600 ? 50 : 100}>
                    <ShinyCard
                      id={item._id}
                      name={item.name}
                      gameSprite={item.sprite.game}
                      dir={item.sprite.dir}
                      monSprite={item.sprite.pokemon}
                      trainer={item.trainer}
                    />
                  </LazyLoad>
                ) : (
                  <LazyLoad height={window.innerWidth < 600 ? 50 : 100}>
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
                    />
                  </LazyLoad>
                )}
              </div>
            );
          }
          return filtered;
        }, [])}
      </LoadingComponent>
    </PageComponent>
  );
}
