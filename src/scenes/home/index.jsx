import { useState, useEffect } from "react";
import axios from "axios";

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
import useAxios from "axios-hooks";

export default function Home() {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [generalLatestCounter, setGeneralLatestCounter] = useState(undefined)
  const [generalLatestCounterLoading, setGeneralLatestCounterLoading] = useState(true)
  const [generalLatestShiny, setGeneralLatestShiny] = useState(undefined)
  const [generalLatestShinyLoading, setGeneralLatestShinyLoading] = useState(true)

  const [{ data: userData, loading: userDataLoading }] = useAxios(
    `/user?user=${username}&userList=true`
  );

  const [{ data: latestCounter, loading: latestCounterLoading }] = useAxios(
    `/counters?trainer=${username}&preview=true&action=latest&amount=1`
  );

  const [{ data: latestShiny, loading: latestShinyLoading }] = useAxios(
    `/shiny?trainer=${username}&preview=true&action=latest&amount=1`
  );

  useEffect(() => {
    if (!userDataLoading) {
      const filteredUserList = userData.userList.filter((item) => item !== username);

      axios.get(`/counters?trainers=${filteredUserList[0]},${filteredUserList[1]},${filteredUserList[2]}&preview=true&amount=1`)
        .then(response => {
          setGeneralLatestCounter(response.data)
          setGeneralLatestCounterLoading(false)
        })
        .catch(error => {
          console.log(error)
        });
      axios.get(`/shiny?trainers=${filteredUserList[0]},${filteredUserList[1]},${filteredUserList[2]}&preview=true&amount=1`)
        .then(response => {
          setGeneralLatestShiny(response.data)
          setGeneralLatestShinyLoading(false)
        })
        .catch(error => {
          console.log(error)
        });
    }
  }, [userData, userDataLoading, username]);



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
                  data={latestCounter?.counters}
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
                  data={generalLatestCounter?.counters}
                  loading={generalLatestCounterLoading}
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
                  data={latestShiny?.shinies}
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
                  data={generalLatestShiny?.shinies}
                  loading={generalLatestShinyLoading}
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
