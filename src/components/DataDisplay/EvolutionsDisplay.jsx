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
            <Grid item xs={6} key={item?._id}>
              <PokemonImage
                directory={directory}
                sprite={item.sprite}
                gameSort={gameSort}
                genderDifference={item.genderDifference}
                shiny
                width="50%"
              />
              <PokemonImage
                directory={directory}
                sprite={item.sprite}
                gameSort={gameSort}
                genderDifference={item.genderDifference}
                width="50%"
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
