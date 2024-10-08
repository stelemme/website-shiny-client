// Mui
import { Grid } from "@mui/material";

// Components
import PokemonImage from "../General/PokemonImage";

export default function ImageDisplay({
  directory,
  sprite,
  gameSort,
  genderDifference,
  ball = null,
}) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ position: "relative" }}>
          <PokemonImage
            directory={directory}
            initSprite={sprite}
            gameSort={gameSort}
            genderDifference={genderDifference}
            shiny
          />
          {ball && (
            <img
              alt={ball}
              src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${ball}.png`}
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
          directory={directory}
          initSprite={sprite}
          gameSort={gameSort}
          genderDifference={genderDifference}
        />
      </Grid>
    </Grid>
  );
}
