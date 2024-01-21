import { useParams } from "react-router-dom";

// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import PokedexCard from "../../components/Cards/PokedexCard";

//Hooks
import { usePokedex, useGame } from "../../hooks/useData";

export default function GameId() {
  const { gameId } = useParams();

  const { isLoading: pokedexLoading, data: pokedex } =
    usePokedex(`?game=${gameId}`, gameId);

  const { isLoading: gameLoading, data: game } =
    useGame(`/${gameId}?action=dir`, gameId);

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
              title={`${game.data.name.toUpperCase()} POKEDEX`}
              subtitle={`Welcome to the ${game.data.name} Regional Pokédex!`}
            />
          ) : (
            <Header />
          )}
        </Box>

        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {pokedex?.data.length > 0 ? (
            pokedex?.data.map((pokemon) => {
              return (
                <Grid key={pokemon._id} item lg={3} md={4} sm={6} xs={6}>
                    <PokedexCard
                      id={pokemon._id}
                      name={pokemon.name}
                      pokedexNo={pokemon.pokedexNo}
                      sprite={pokemon.sprite}
                      dir={game.data.dir}
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
