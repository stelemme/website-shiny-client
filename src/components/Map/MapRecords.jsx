// mui imports
import { Box, useTheme, Typography, Grid, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import StatsCard from "../Cards/StatsCard";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function MapRecords() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(
    `geoLocation=leaderboard`
  );
  const userStats = userStatsData?.data[0];

  const stats = [
    {
      data: userStats?.toerist.name,
      dataStat: userStats?.toerist.data,
      statName: "Toerist",
    },
    {
      data: userStats?.kolonist.name,
      dataStat: userStats?.kolonist.data,
      statName: "Kolonist",
    },
    {
      data: userStats?.seekerHunter.name,
      dataStat: userStats?.seekerHunter.data,
      statName: "Seeker-Hunter",
    },
    {
      data: userStats?.couchPotato.name,
      dataStat: userStats?.couchPotato.data,
      statName: "Couch Potato",
    },
    {
      data: userStats?.danaidesBarrel.name,
      dataStat: userStats?.danaidesBarrel.data,
      statName: "Danaïd’s barrel",
    },
    {
      data: userStats?.passengerPrincess.name,
      dataStat: userStats?.passengerPrincess.data,
      statName: "Passenger Princess",
    },
    {
      data: userStats?.polarBear.name,
      dataStat: userStats?.polarBear.data,
      statName: "Polar Bear",
    },
    {
      data: userStats?.penguin.name,
      dataStat: userStats?.penguin.data,
      statName: "Penguin",
    },
  ];

  return (
    <BoxComponent noContrastColor>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          MAP RECORDS
        </Typography>
      </Box>
      <Grid container spacing={"8px"}>
        {/* Left side grid - first half */}
        <Grid item xs={12} container spacing={"8px"}>
          {stats.map((stat) => {
            return (
              <Grid item xs={12} key={stat.statName}>
                <LoadingComponent
                  loadingCondition={userStatsLoading}
                  skeleton={
                    <Skeleton
                      sx={{
                        bgcolor: colors.primary[500],
                        height: {
                          xs: "56px",
                          md: "44px",
                        },
                      }}
                      variant="rounded"
                      width={"100%"}
                    />
                  }
                >
                  <StatsCard
                    id={""}
                    name={stat.data}
                    stat={stat.dataStat}
                    statName={stat.statName}
                  />
                </LoadingComponent>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
