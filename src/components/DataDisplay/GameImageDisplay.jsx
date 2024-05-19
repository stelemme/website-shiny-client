// Mui
import { Box } from "@mui/material";

export default function GameImageDisplay({ data }) {
  return (
    <Box width={"100%"} display="flex" justifyContent="center">
      <img
        alt=""
        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.sprite.game}.png`}
        height="50px"
      />
    </Box>
  );
}
