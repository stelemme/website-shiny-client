import { useParams } from "react-router-dom";

// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import PokedexCard from "../../components/Cards/PokedexCard";

//Hooks
import { usePokedex, useGameId } from "../../hooks/useData";

export default function GamePokedex() {
  const { gameId } = useParams();

  const { isLoading: pokedexLoading, data: pokedex } = usePokedex(
    `filter=complex&filterGameId=${gameId}`
  );

  const { isLoading: gameLoading, data: game } = useGameId(
    gameId,
    "action=dir"
  );

  const pokedexData = pokedex?.data;
  const gameData = game?.data;

  return (
    <PageComponent
      title={`${gameData ? gameData.name.toUpperCase() : "..."} POKEDEX`}
      subtitle={`Welcome to the ${gameData?.name} Regional Pokédex!`}
      widthSnaps={3}
    >
      <LoadingComponent loadingCondition={pokedexLoading && gameLoading}>
        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {pokedexData?.map((pokemon) => {
            return (
              <Grid key={pokemon._id} item lg={3} md={4} sm={6} xs={6}>
                <PokedexCard
                  id={pokemon._id}
                  name={pokemon.name}
                  pokedexNo={pokemon.pokedexNo}
                  sprite={pokemon.sprite}
                  dir={gameData.dir}
                  sort={gameData.sort}
                />
              </Grid>
            );
          })}
        </Grid>
      </LoadingComponent>
    </PageComponent>
  );
}
