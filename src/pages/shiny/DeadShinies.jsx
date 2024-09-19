import LazyLoad from "react-lazyload";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import ShinyCard from "../../components/Cards/ShinyCard";

// Functions
import sortData from "../../functions/sortData";

// Hooks
import { useDeadShiny } from "../../hooks/useData";

export default function DeadShinies() {
  const { isLoading: shinyLoading, data: shinyData } =
    useDeadShiny("preview=shiny");

  const data = sortData(shinyData?.data, "gameAsc");

  return (
    <PageComponent
      title="Dead Shinies"
      subtitle="Here you can find the last resting place of all fallen Shiny Pokémon."
    >
      <LoadingComponent loadingCondition={shinyLoading}>
        {/* CARDS */}
        {data?.reduce(function (filtered, item) {
          filtered.push(
            <div
              style={{
                marginBottom: window.innerWidth < 600 ? "10px" : "20px",
              }}
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
        }, [])}
      </LoadingComponent>
    </PageComponent>
  );
}
