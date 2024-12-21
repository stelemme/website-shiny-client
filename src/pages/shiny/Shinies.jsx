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
import FilterMenu from "../../components/Menus/FilterMenu";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function Shinies() {
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);
  const [openFilter, setOpenFilter] = useState(false);
  const [cookie] = useCookies(["displayEvolutionSprites", "sortShiny"]);

  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `preview=shiny&sort=${cookie.sortShiny}`,
    true
  );

  const data = shinyData?.data;

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
      widthSnaps={cookie.displayEvolutionSprites === "false" ? 2 : 4}
      icon1={<FilterAltOutlinedIcon />}
      onClickIcon1={handleFilterClick}
      icon2={<SortIcon style={{ transform: "scaleX(-1)" }} />}
      onClickIcon2={handleSortClick}
    >
      <FilterMenu open={openFilter} setOpen={setOpenFilter} />
      <SortMenu
        open={openSort}
        anchorEl={anchorElSort}
        setAnchorEl={setAnchorElSort}
        cookie={"sortShiny"}
        options={["game", "pokedexNo", "date", "abc"]}
      />

      {/* CARDS */}
      <LoadingComponent loadingCondition={shinyLoading}>
        {data?.map((item) => (
          <div
            style={{
              marginBottom: window.innerWidth < 600 ? "10px" : "20px",
            }}
            key={item._id}
          >
            {!cookie.displayEvolutionSprites ? (
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
        ))}
      </LoadingComponent>
    </PageComponent>
  );
}
