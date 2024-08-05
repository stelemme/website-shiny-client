// Mui
import { Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function ImageDisplay({ data }) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ position: "relative" }}>
          <PokemonImage
            directory={data.sprite.dir}
            sprite={data.sprite.pokemon}
            gameSort={data.gameSort}
            shiny
          />
          {data.ball && (
            <img
              alt={data.sprite.ball}
              src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${data.sprite.ball}.png`}
              style={{
                imageRendering: "pixelated",
                position: "absolute",
                top: 0,
                left: 0,
                width: "30px",
              }}
            />
          )}
        </div>
      </Grid>
      <Grid item xs={6}>
        <PokemonImage
          directory={data.sprite.dir}
          sprite={data.sprite.pokemon}
          gameSort={data.gameSort}
        />
      </Grid>
    </Grid>
  );
}
