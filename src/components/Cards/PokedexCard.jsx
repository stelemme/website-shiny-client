import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LazyLoad from "react-lazyload";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function PokedexCard({ id, pokedexNo, name, sprite, dir, sort = 100 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const baseUrl = isHovered
    ? "https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/"
    : "https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/";

  const imageUrl = `${baseUrl}${dir}/${sprite}.png`;

  return (
    <Box
      p="15px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      onClick={() => navigate(`/pokedex/${id}?dir=${dir}&sort=${sort}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: colors.primary[900],
        },
      }}
    >
      <Box>
        {/* GAME IMAGE */}

        <Box
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          height={window.innerWidth < 600 ? "100px" : "150px"}
          width="100%"
        >
          <LazyLoad offset={225}>
            <img
              height={window.innerWidth < 600 ? "100px" : "150px"}
              alt=""
              src={imageUrl}
              style={{ imageRendering: "pixelated" }}
            />
          </LazyLoad>
        </Box>
        {/* POKEDEX NO */}
        <Typography fontWeight={"bold"} color={colors.grey[400]}>
          #{pokedexNo}
        </Typography>

        {/* POKEMON NAME */}
        <Typography
          fontWeight={"bold"}
          variant="h5"
          sx={{
            minHeight: 24,
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
