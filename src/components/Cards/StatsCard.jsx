import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

export default function StatsCard({
  id,
  name,
  statName,
  stat,
  trainer,
  bgColor = 400,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onCardClick = () => {
    navigate(`/shiny/${id}`);
  };

  return (
    <BoxComponent
      py="10px"
      px="20px"
      noContrastColor={bgColor === 400 ? false : true}
      onClick={onCardClick}
    >
      <Grid container spacing={"15px"} alignItems="center">
        <Grid item xs={8} container alignItems="center">
          {/* GAME IMAGE */}
          <Grid item xl={8} sm={7} xs={12}>
            <Typography
              fontWeight={"bold"}
              fontSize={window.innerWidth < 600 ? 12 : 14}
              align="left"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {statName}
            </Typography>
          </Grid>
          {/* COUNTER NAME */}
          <Grid item xl={4} sm={5} xs={12}>
            {/* On screens with 'sm' or 'xs' size, display trainer and name next to each other */}
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
                  fontSize={12}
                  color={colors.grey[400]}
                >
                  {trainer}
                </Typography>
              )}
              <Typography
                fontWeight={"bold"}
                fontSize={12}
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
          </Grid>
        </Grid>
        {/* COUNT */}
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
      </Grid>
    </BoxComponent>
  );
}
