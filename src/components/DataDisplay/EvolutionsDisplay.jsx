// Mui
import { Box, Typography, Grid } from "@mui/material";

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
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${item.sprite}.png`}
                width="50%"
                style={{ imageRendering: "pixelated" }}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${item.sprite}.png`;
                }}
              />
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.sprite.dir}/${item.sprite}.png`}
                width="50%"
                style={{ imageRendering: "pixelated" }}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/gen-all-home/${item.sprite}.png`;
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
