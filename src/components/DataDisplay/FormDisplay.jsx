// Mui
import { Box, Typography, Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function FormDisplay({ forms, directory, gameSort }) {
  if (forms.length === 0) {
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
            FORMS
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} container>
        {forms.map((item) => {
          return (
            <Grid item xs={6} key={item._id}>
              <PokemonImage
                directory={directory}
                initSprite={item.sprite}
                gameSort={gameSort}
                shiny
                width="50%"
              />
              <PokemonImage
                directory={directory}
                initSprite={item.sprite}
                gameSort={gameSort}
                width="50%"
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
