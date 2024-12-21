import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

export default function ShinyCard({
  id,
  name,
  gameSprite,
  dir,
  monSprite,
  trainer,
  bgColor = 400,
  imgSize = window.innerWidth < 600 ? "40px" : "80px",
  gameImgSize = window.innerWidth < 400 ? "22px" : "33px",
  status = "alive",
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [cookies] = useCookies(["displayGameSprites"]);

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }

  const onCardClick = () => {
    if (status === "alive") {
      navigate(`/shiny/${id}`);
    } else {
      navigate(`/shiny/dead/${id}`);
    }
  };

  return (
    <BoxComponent
      p="10px"
      noContrastColor={bgColor === 400 ? false : true}
      onClick={onCardClick}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* GAME IMAGE */}
        <Box
          display="inline-flex"
          width={window.innerWidth < 400 ? "60px" : "90px"}
          minWidth={window.innerWidth < 400 ? "60px" : "90px"}
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${gameSprite}.png`}
            height={gameImgSize}
          />
        </Box>
        {/* COUNTER NAME */}
        <Box flexGrow={1} mx="15px" overflow="hidden">
          <Typography fontWeight={"bold"} color={colors.grey[400]} variant="s3">
            {trainer}
          </Typography>
          <Box display="flex" alignItems="center" height={trainerHeight}>
            <Typography
              fontWeight={"bold"}
              variant="h5"
              align="left"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>

        {/* SHINY SPRITE */}
        <Box display="flex" alignItems="center" justifyContent="center">
          {cookies.displayGameSprites && (
            <img
              alt=""
              src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${monSprite}.png`}
              height={String(imgSize) + "px"}
            />
          )}
          {!cookies.displayGameSprites && (
            <img
              alt=""
              src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${dir}/${monSprite}.png`}
              height={String(imgSize) + "px"}
              style={{ imageRendering: "pixelated" }}
              onError={(e) => {
                e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${monSprite}.png`;
              }}
            />
          )}
        </Box>
      </Box>
    </BoxComponent>
  );
}
