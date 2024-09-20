import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

// Images
import { gameImages } from "../../assets/imgExporter";

export default function GameCard({ id, gen, name, sprite, bgColor = 400 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/pokedex/regional/${id}`);
  };

  return (
    <BoxComponent
      p="15px"
      onClick={onCardClick}
      noContrastColor={bgColor === 400 ? false : true}
    >
      <Box>
        {/* GAME IMAGE */}
        <Box
          display="inline-flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
          height={window.innerWidth < 600 ? "100px" : "150px"}
        >
          <img
            height={window.innerWidth < 600 ? "100px" : "150px"}
            alt=""
            src={gameImages[`${sprite}.png`]}
          />
        </Box>
        {/* POKEDEX NO */}
        <Typography fontWeight={"bold"} color={colors.grey[400]}>
          {gen}
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
    </BoxComponent>
  );
}
