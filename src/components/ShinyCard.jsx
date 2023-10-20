import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function ShinyCard({ id, name, gameSprite, dir, monSprite, trainer}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }


  return (
    <Box
      p="10px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      onClick={() => navigate(`/shiny/${id}`)}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: colors.primary[900],
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* GAME IMAGE */}
        <Box
          display="inline-flex"
          width="90px"
          minWidth="90px"
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${gameSprite}.png`}
            height="33px"
          />
        </Box>
        {/* COUNTER NAME */}
        <Box flexGrow={1} mx="15px">
          <Typography fontWeight={"bold"} color={colors.grey[400]}>
            {trainer}
          </Typography>
          <Box display="flex" alignItems="center" height={trainerHeight} >
            <Typography
              fontWeight={"bold"}
              variant="h5"
              align="left"
              sx={{
                minHeight: { trainerHeight },
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>

        {/* SHINY SPRITE */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${monSprite}.png`}
            height="80px"
          />
        </Box>
      </Box>
    </Box>
  )
}
