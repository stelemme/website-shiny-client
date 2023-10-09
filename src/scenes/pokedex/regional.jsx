// mui imports
import { Box, Grid, Typography } from "@mui/material";

// Components imports
import Header from "../../components/Header"
import GameCard from "../../components/GameCard"

// Hooks
import useAxios from "axios-hooks";

export default function PokedexRegional() {
  const [{ data: games, loading: gamesLoading, error: gamesError }] =
    useAxios(`/game?action=select`);

    if (gamesLoading) {
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
    <Box maxWidth={{ lg: "840px", md: "630px", sm: "420px", xs: "310px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="REGIONAL POKEDEX" subtitle="Select a game to view its Regional Pokedex!" />
        </Box>

        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {games?.game.length > 0 ? (
            games?.game.map((game) => {
              return (
                <Grid key={game._id} item lg={3} md={4} sm={6} xs={6}>
                    <GameCard id={game._id} name={game.name} gen={game.gen} sprite={game.sprite}/>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography>No Games Found</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
