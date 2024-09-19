// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import PokedexCard from "../../components/Cards/PokedexCard";

// Hooks
import { usePokedex } from "../../hooks/useData";

export default function Pokédex() {
  const { isLoading: pokedexLoading, data: pokedex } = usePokedex(``);

  const data = pokedex?.data;

  return (
    <PageComponent
      title="POKEDEX"
      subtitle="Welcome to the national Pokédex!"
      widthSnaps={3}
    >
      <LoadingComponent loadingCondition={pokedexLoading}>
        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {data.map((pokemon) => {
            return (
              <Grid key={pokemon._id} item lg={3} md={4} sm={6} xs={6}>
                <PokedexCard
                  id={pokemon._id}
                  name={pokemon.name}
                  pokedexNo={pokemon.pokedexNo}
                  sprite={pokemon.sprite}
                  dir={"gen-all-home"}
                />
              </Grid>
            );
          })}
        </Grid>
      </LoadingComponent>
    </PageComponent>
  );
}
