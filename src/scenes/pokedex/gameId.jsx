import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";


// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import PokedexCard from "../../components/PokedexCard";

export default function GameId() {
  const { gameId } = useParams();

  const [{ data: pokedex, loading: pokedexLoading, error: pokedexError }] =
    useAxios(`/pokedex?game=${gameId}`);

  const [{ data: game, loading: gameLoading, error: gameError }] =
    useAxios(`/game/${gameId}?action=dir`);

    if (pokedexLoading || gameLoading) {
      return (
        <Box maxWidth={{ lg: "840px", md: "630px", sm: "420px", xs: "310px" }}
        mx="auto"
        my="20px">
          <Box display="flex" flexDirection="column" mx="20px">
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header
                title="POKEDEX"
                subtitle="Welcome to the national Pokédex!"
              />
            </Box>
            <Typography
              variant="h5"
              style={{ marginBottom: "20px" }}
            >
              Loading ...
            </Typography>
          </Box>
        </Box>
      );
    }

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
