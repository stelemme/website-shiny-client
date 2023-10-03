// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import PokedexCard from "../../components/PokedexCard";

// Hooks
import useAxios from "../../hooks/useAxios";

export default function Pokédex() {
  const { response: pokedex } = useAxios({
    method: "get",
    url: `/pokedex?action=forms`,
  });

  return (
    <Box maxWidth={{ lg: "840px", md: "630px", sm: "420px", xs: "310px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="POKEDEX" subtitle="Welcome to the national Pokédex!" />
        </Box>

        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {pokedex?.pokedex.length > 0 ? (
            pokedex?.pokedex.map((pokemon) => {
              return (
                <Grid key={pokemon._id} item lg={3} md={4} sm={6} xs={6}>
                    <PokedexCard id={pokemon._id} name={pokemon.name} pokedexNo={pokemon.pokedexNo} sprite={pokemon.sprite} dir={"gen-all-home"} />
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography>No Pokémons Found</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
