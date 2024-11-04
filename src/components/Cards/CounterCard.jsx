import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

export default function CounterCard({
  id,
  gameSprite,
  name,
  count,
  trainer,
  query = null,
  bgColor = 400,
  additionalAction = () => {},
  imgSize = window.innerWidth < 600 ? "40px" : "52px",
  pokemonTextSize = "h5",
  countTextSize = "h5",
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }

  const onCardClick = () => {
    additionalAction();

    if (query) {
      navigate(`/counters/${id}${query}`);
    } else {
      navigate(`/counters/${id}`);
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
          width={window.innerWidth < 600 ? "60px" : "90px"}
          minWidth={window.innerWidth < 600 ? "60px" : "90px"}
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${gameSprite}.png`}
            height={window.innerWidth < 600 ? "22px" : "33px"}
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
              variant={pokemonTextSize}
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
        {/* COUNT */}
        <Box
          height={imgSize}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="5px"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderRadius="4px"
            width="65px"
            minWidth="65px"
            height="100%"
          >
            <Typography fontWeight={"bold"} variant={countTextSize}>
              {count}
            </Typography>
          </Box>
        </Box>
      </Box>
    </BoxComponent>
  );
}
