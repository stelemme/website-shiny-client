// mui imports
import { Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";
import CounterCard from "../Cards/CounterCard";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useCounter } from "../../hooks/useData";

export default function LatestCounters() {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: latestCounterLoading, data: latestCounter } =
    useCounter(`filter=latest`);

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
              query={item?.source === "shinies" ? "?completed=true" : ""}
            />
          </Grid>
        );
      });
    }
  };
  return (
    <BoxComponent>
      <Typography variant="h4" fontWeight={"bold"} mb={"10px"}>
        LATEST COUNTERS
      </Typography>
      <Typography variant="h6" fontWeight={"bold"} mb={"10px"}>
        Your Latest Counter
      </Typography>
      <Grid container spacing={"15px"}>
        <CountersDisplay
          data={latestCounter?.data.filter(
            (item) => item && item.trainer === username
          )}
          loading={latestCounterLoading}
        />
      </Grid>
      <Typography variant="h6" fontWeight={"bold"} mt={"20px"} mb={"10px"}>
        Other User's Latest Counters
      </Typography>
      <Grid container spacing={"15px"}>
        <CountersDisplay
          data={latestCounter?.data.filter(
            (item) => item && item.trainer !== username
          )}
          loading={latestCounterLoading}
          loadingArray={[1, 2, 3]}
        />
      </Grid>
    </BoxComponent>
  );
}
