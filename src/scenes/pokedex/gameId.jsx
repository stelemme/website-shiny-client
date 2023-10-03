import { useParams } from "react-router-dom";

// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import PokedexCard from "../../components/PokedexCard";

// Hooks
import useAxios from "../../hooks/useAxios";

export default function GameId() {
  const { gameId } = useParams();

  const { response: pokedex } = useAxios({
    method: "get",
    url: `/pokedex?game=${gameId}`,
  });

  const { response: game } = useAxios({
    method: "get",
    url: `/game/${gameId}?action=dir`,
  });

  return (
    <Box
      maxWidth={{ lg: "840px", md: "630px", sm: "420px", xs: "310px" }}
      mx="auto"
      my="20px"
    >
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {game ? (
            <Header
              title={`${game.game.name.toUpperCase()} POKEDEX`}
              subtitle={`Welcome to the ${game.game.name} Regional Pokédex!`}
            />
          ) : (
            <Header />
          )}
        </Box>

        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {pokedex?.pokedex.length > 0 ? (
            pokedex?.pokedex.map((pokemon) => {
              return (
                <Grid key={pokemon._id} item lg={3} md={4} sm={6} xs={6}>
                    <PokedexCard
                      id={pokemon._id}
                      name={pokemon.name}
                      pokedexNo={pokemon.pokedexNo}
                      sprite={pokemon.sprite}
                      dir={game.game.dir}
                    />
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
