import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

export default function StatsCard({
  id,
  name,
  statName,
  stat,
  trainer,
  navigateString = "shiny",
  query = null,
  bgColor = 400,
  additionalAction = () => {},
  imgSize = window.innerWidth < 600 ? "40px" : "52px",
  nameWidth = window.innerWidth < 400 ? "80px" : "200px",
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onCardClick = () => {
    additionalAction();

    if (query) {
      navigate(`/${navigateString}/${id}${query}`);
    } else {
      navigate(`/${navigateString}/${id}`);
    }
  };

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }

  return (
    <BoxComponent
      p="10px"
      noContrastColor={bgColor === 400 ? false : true}
      onClick={onCardClick}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="inline-flex"
          width={nameWidth}
          minWidth={nameWidth}
          alignItems="center"
          pl="5px"
        >
          <Typography
            fontWeight={"bold"}
            align="left"
            sx={{
              whiteSpace: "normal",
              overflow: "visible",
              wordWrap: "break-word",
            }}
            variant="s3"
          >
            {statName}
          </Typography>
        </Box>
        <Box flexGrow={1} mx="15px" overflow="hidden">
          <Typography fontWeight={"bold"} color={colors.grey[400]} variant="s3">
            {trainer}
          </Typography>
          <Box display="flex" alignItems="center" height={trainerHeight}>
            <Typography
              fontWeight={"bold"}
              variant="s3"
              align="left"
              sx={{
              whiteSpace: "normal",
              overflow: "visible",
              wordWrap: "break-word",
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>

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
            minWidth={window.innerWidth < 600 ? "65px" : "90px"}
            height="100%"
          >
            <Typography fontWeight={"bold"} variant="s1">
              {stat}
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Grid container spacing={"15px"} alignItems="center">
        <Grid item xs={8} container alignItems="center">
          <Grid item xl={8} sm={7} xs={12}>
            <Typography
              fontWeight={"bold"}
              align="left"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              variant="s1"
            >
              {statName}
            </Typography>
          </Grid>
          <Grid item xl={4} sm={5} xs={12}>
            <Box
              display="flex"
              gap={{ md: "0px", xs: "10px" }}
              justifyContent={{
                xs: "start",
              }}
              flexDirection={{ xs: "row", md: "column" }}
            >
              {trainer && (
                <Typography
                  fontWeight={"bold"}
                  color={colors.grey[400]}
                  variant="s2"
                >
                  {trainer}
                </Typography>
              )}
              <Typography
                fontWeight={"bold"}
                align="left"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                variant="s2"
              >
                {name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="flex-end">
            <Box
              display="flex"
              justifyContent="center"
              border="1px solid"
              borderRadius="4px"
              width="105px"
              minWidth="80px"
            >
              <Typography fontWeight={"bold"} variant="h6">
                {stat}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid> */}
    </BoxComponent>
  );
}
