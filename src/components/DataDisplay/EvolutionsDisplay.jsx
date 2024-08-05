// Mui
import { Box, Typography, Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function EvolutionsDisplay({ data }) {
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
        {data.evolutions.map((item) => {
          return (
            <Grid item xs={6} key={item._id}>
              <PokemonImage
                directory={data.sprite.dir}
                sprite={item.sprite}
                gameSort={data.gameSort}
                shiny
                width="50%"
              />
              <PokemonImage
                directory={data.sprite.dir}
                sprite={item.sprite}
                gameSort={data.gameSort}
                width="50%"
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
