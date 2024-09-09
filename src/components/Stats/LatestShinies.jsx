// mui imports
import { Box, Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components
import ShinyCard from "../Cards/ShinyCard";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useShiny } from "../../hooks/useData";

export default function LatestShinies() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { username } = useAuth();

  const { isLoading: latestShinyLoading, data: latestShiny } =
    useShiny(`filter=latest`);

  const ShinyDisplay = ({ data, loading, loadingArray = [1] }) => {
    if (loading) {
      return loadingArray.map((item) => {
        return (
          <Grid item xs={12} key={item}>
            <Skeleton
              sx={{ bgcolor: colors.primary[500] }}
              variant="rounded"
              width={"100%"}
              height={"72px"}
            />
          </Grid>
        );
      });
    } else {
      return data?.map((item) => {
        return (
          <Grid item xs={12} key={item?._id}>
            <ShinyCard
              id={item?._id}
              name={item?.name}
              gameSprite={item?.sprite.game}
              dir={item?.sprite.dir}
              monSprite={item?.sprite.pokemon}
              trainer={item?.trainer}
              bgColor={500}
              imgSize={52}
            />
          </Grid>
        );
      });
    }
  };

  return (
    <Box
      p="20px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      height="100%"
    >
      <Typography variant="h4" fontWeight={"bold"} mb={"10px"}>
        LATEST SHINY POKEMON
      </Typography>
      <Typography variant="h6" fontWeight={"bold"} mb={"10px"}>
        Your Latest Shiny
      </Typography>
      <Grid container spacing={"15px"}>
        <ShinyDisplay
          data={latestShiny?.data.filter((item) => item.trainer === username)}
          loading={latestShinyLoading}
        />
      </Grid>
      <Typography variant="h6" fontWeight={"bold"} mt={"20px"} mb={"10px"}>
        Other User's Latest Shiny
      </Typography>
      <Grid container spacing={"15px"}>
        <ShinyDisplay
          data={latestShiny?.data.filter((item) => item.trainer !== username)}
          loading={latestShinyLoading}
          loadingArray={[1, 2, 3]}
        />
      </Grid>
    </Box>
  );
}
