import LazyLoad from "react-lazyload";

// mui imports
import { Typography } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import ShinyCard from "../../components/Cards/ShinyCard";

// Functions
import sortData from "../../functions/sortData";

// Hooks
import { useDeadShiny } from "../../hooks/useData";

export default function DeadShinies() {
  const { isLoading: shinyLoading, data: shinyData } =
    useDeadShiny("preview=shiny");

  const ShinyDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return data?.reduce(function (filtered, item) {
        filtered.push(
          <div
            style={{ marginBottom: window.innerWidth < 600 ? "10px" : "20px" }}
            key={item._id}
          >
            <LazyLoad height={window.innerWidth < 600 ? 50 : 100}>
              <ShinyCard
                id={item._id}
                name={item.name}
                gameSprite={item.sprite.game}
                dir={item.sprite.dir}
                monSprite={item.sprite.pokemon}
                trainer={item.trainer}
                IRLLocation={item.IRLLocation}
                status="dead"
              />
            </LazyLoad>
          </div>
        );
        return filtered;
      }, []);
    }
  };

  return (
    <PageComponent
      title="Dead Shinies"
      subtitle="Here you can find the last resting place of all fallen Shiny Pokémon."
    >
      {/* CARDS */}
      <ShinyDisplay
        data={sortData(shinyData?.data, "gameAsc")}
        loading={shinyLoading}
      />
    </PageComponent>
  );
}
