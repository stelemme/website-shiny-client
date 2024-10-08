// Mui
import { Box, Typography, Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function EvolutionsDisplay({ evolutions, directory, gameSort }) {
  if (evolutions.length === 0) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="21px"
        >
          <Typography variant="h5" fontWeight={"bold"}>
            EVOLUTIONS
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} container>
        {evolutions.map((item) => {
          return (
            <Grid item xs={6} key={item?._id} container>
              <Grid item xs={6}>
                <PokemonImage
                  directory={directory}
                  initSprite={item.sprite}
                  gameSort={gameSort}
                  genderDifference={item.genderDifference}
                  shiny
                />
              </Grid>
              <Grid item xs={6}>
                <PokemonImage
                  directory={directory}
                  initSprite={item.sprite}
                  gameSort={gameSort}
                  genderDifference={item.genderDifference}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
