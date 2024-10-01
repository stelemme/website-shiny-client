import { useState } from "react";

// Mui
import { Grid, IconButton } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";

// Components
import PokemonImage from "../General/PokemonImage";

export default function ImageDisplay({
  directory,
  sprite,
  gameSort,
  genderDifference,
  back = false,
  ball = null,
}) {
  const [backToggle, setBackToggle] = useState(false);

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
            back={backToggle}
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
        <div style={{ position: "relative" }}>
          <PokemonImage
            directory={directory}
            initSprite={sprite}
            gameSort={gameSort}
            genderDifference={genderDifference}
            backBool={backToggle}
          />
          {back && (
            <IconButton
              style={{
                imageRendering: "pixelated",
                position: "absolute",
                top: 0,
                right: 0,
              }}
              size="small"
              onClick={() => setBackToggle((prevStat) => !prevStat)}
            >
              <LoopIcon />
            </IconButton>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
