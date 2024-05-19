// Mui
import { Grid } from "@mui/material";

export default function ImageDisplay({data}) {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ position: "relative" }}>
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${data.sprite.pokemon}.png`}
            width="100%"
            style={{ imageRendering: "pixelated" }}
            onError={(e) => {
              e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${data.sprite.pokemon}.png`;
            }}
          />
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${data.sprite.ball}.png`}
            style={{
              imageRendering: "pixelated",
              position: "absolute",
              top: 0,
              left: 0,
              width: "30px",
            }}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.sprite.dir}/${data.sprite.pokemon}.png`}
          width="100%"
          style={{ imageRendering: "pixelated" }}
          onError={(e) => {
            e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/gen-all-home/${data.sprite.pokemon}.png`;
          }}
        />
      </Grid>
    </Grid>
  );
}
