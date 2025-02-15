// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import ShinyCardEvolutions from "../Cards/ShinyCardEvolutions";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function EvolutionList({ trainer }) {
  const { isLoading: pokemonLoading, data: pokemonData } = useShiny(
    `trainer=${trainer}&list=evolution`
  );

  const evolutions = pokemonData?.data;

  return (
    <BoxComponent title={"POKEMONS TO EVOLVE"}>
      <BoxComponent p="10px" noContrastColor height={500}>
        <LoadingComponent loadingCondition={pokemonLoading}>
          {evolutions?.map((item) => (
            <div
              style={{
                marginBottom: "10px",
              }}
              key={item._id}
            >
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
                imgSize="40px"
                gameImgSize="22px"
              />
            </div>
          ))}
        </LoadingComponent>
      </BoxComponent>
    </BoxComponent>
  );
}
