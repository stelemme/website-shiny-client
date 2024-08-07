// Mui
import { Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function ImageDisplay({
  data,
  pokedex = false,
  imageDir = null,
  gameSort = null,
}) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ position: "relative" }}>
          <PokemonImage
            directory={pokedex ? imageDir : data.sprite.dir}
            sprite={pokedex ? data.sprite : data.sprite.pokemon}
            gameSort={pokedex ? gameSort : data.gameSort}
            genderDifference={pokedex ? false : data.genderDifference}
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
          directory={pokedex ? imageDir : data.sprite.dir}
          sprite={pokedex ? data.sprite : data.sprite.pokemon}
          gameSort={pokedex ? gameSort : data.gameSort}
          genderDifference={pokedex ? false : data.genderDifference}
        />
      </Grid>
    </Grid>
  );
}
