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
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }

  const onCardClick = () => {
    if (query) {
      navigate(`/counters/${id}${query}`);
    } else {
      navigate(`/counters/${id}`);
    }
  };

  return (
    <BoxComponent
      p="15px"
      noContrastColor={bgColor === 400 ? false : true}
      onClick={onCardClick}
    >
      <Box display="flex" justifyContent="space-between">
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
            height={window.innerWidth < 400 ? "22px" : "33px"}
          />
        </Box>
        {/* COUNTER NAME */}
        <Box flexGrow={1} mx="15px" overflow="hidden">
          <Typography fontWeight={"bold"} color={colors.grey[400]}>
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
        {/* COUNT */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderRadius="4px"
          width="65px"
          minWidth="65px"
        >
          <Typography fontWeight={"bold"} variant="h5">
            {count}
          </Typography>
        </Box>
      </Box>
    </BoxComponent>
  );
}
