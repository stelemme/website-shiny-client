// mui imports
import { Box, Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import Header from "../../components/Header";
import CounterCard from "../../components/CounterCard";
import ShinyCard from "../../components/ShinyCard";
import UserStats from "../../components/UserStats";
import EncountersGraph from "../../components/EncountersGraph";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useCounter, useShiny } from "../../hooks/useData";

export default function Home() {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: latestCounterLoading, data: latestCounter } = useCounter(
    `?trainers=true&preview=true&amount=1&sort=newest`
  );

  const { isLoading: latestShinyLoading, data: latestShiny } = useShiny(
    `?trainers=true&preview=true&amount=1&sort=newest`
  );

  const CountersDisplay = ({ data, loading, loadingArray = [1] }) => {
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
            <CounterCard
              id={item?._id}
              name={item?.name}
              gameSprite={item?.sprite.game}
              count={item?.totalEncounters}
              trainer={item?.trainer}
              bgColor={500}
            />
          </Grid>
        );
      });
    }
  };

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
              imgSize={"52px"}
            />
          </Grid>
        );
      });
    }
  };

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="HOMEPAGE" subtitle="Welcome to the Homepage" />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xl={4} md={6} xs={12}>
            <Box
              p="20px"
              width="100%"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              height="100%"
            >
              <Typography variant="h4" fontWeight={"bold"} mb={"10px"}>
                LATEST COUNTERS
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} mb={"10px"}>
                Your Latest Counter
              </Typography>
              <Grid container spacing={"15px"}>
                <CountersDisplay
                  data={latestCounter?.data.filter(
                    (item) => item.trainer === username
                  )}
                  loading={latestCounterLoading}
                />
              </Grid>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                mt={"20px"}
                mb={"10px"}
              >
                Other User's Latest Counters
              </Typography>
              <Grid container spacing={"15px"}>
                <CountersDisplay
                  data={latestCounter?.data.filter(
                    (item) => item.trainer !== username
                  )}
                  loading={latestCounterLoading}
                  loadingArray={[1, 2, 3]}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
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
                  data={latestShiny?.data.filter(
                    (item) => item.trainer === username
                  )}
                  loading={latestShinyLoading}
                />
              </Grid>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                mt={"20px"}
                mb={"10px"}
              >
                Other User's Latest Shiny
              </Typography>
              <Grid container spacing={"15px"}>
                <ShinyDisplay
                  data={latestShiny?.data.filter(
                    (item) => item.trainer !== username
                  )}
                  loading={latestShinyLoading}
                  loadingArray={[1, 2, 3]}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xl={4} xs={12}>
            <UserStats />
          </Grid>
          <Grid item xs={12}>
            <EncountersGraph />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
