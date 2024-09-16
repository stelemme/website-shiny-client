// mui imports
import { Grid, Typography } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import PokedexCard from "../../components/Cards/PokedexCard";

// Hooks
import { usePokedex } from "../../hooks/useData";

export default function Pokédex() {
  const { isLoading: pokedexLoading, data: pokedex } = usePokedex(``);

  if (pokedexLoading) {
    return (
      <PageComponent
        title="POKEDEX"
        subtitle="Welcome to the national Pokédex!"
        widthSnaps={3}
      >
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      </PageComponent>
    );
  }

  return (
    <PageComponent
      title="POKEDEX"
      subtitle="Welcome to the national Pokédex!"
      widthSnaps={3}
    >
      {/* CARDS */}
      <Grid container spacing={"20px"}>
        {pokedex?.data.map((pokemon) => {
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
    </PageComponent>
  );
}
