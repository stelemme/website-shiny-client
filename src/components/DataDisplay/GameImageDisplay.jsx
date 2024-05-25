// Mui
import { Box } from "@mui/material";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function GameImageDisplay({ data }) {
  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  const genCheck = {
    "Gen 1": "Gen 1",
    "Gen 2": "Gen 1",
    "Gen 3": "Gen 3",
    "Gen 4": "Gen 4",
    "Gen 5": "Gen 5",
    "Gen 6": "Gen 6",
    "Gen 7": "Gen 6",
    "Gen 8": "Gen 6",
    "Gen 9": "Gen 6",
  };

  return (
    <Box width={"100%"} display="flex" justifyContent="center">
      <img
        alt=""
        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.sprite.game}.png`}
        height="50px"
      />
      {Object.keys(trainerImages).map((item) => {
        if (
          item.includes(imageCheck[data.trainer]) &&
          item.includes(genCheck[data.gen])
        ) {
          return (
            <img
              key={item}
              height="50px"
              alt=""
              src={trainerImages[item]}
              title={item.slice(0, -4)}
              style={{ imageRendering: "pixelated" }}
            />
          );
        } else {
          return null;
        }
      })}
    </Box>
  );
}
