import { useCookies } from "react-cookie";

// mui imports
import { useTheme, Grid, Skeleton } from "@mui/material";
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
  const [cookies] = useCookies(["travelFilter", "planeFilter"]);

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(
    `geoLocation=leaderboard&filter=${cookies.travelFilter}&filter=${cookies.planeFilter}`
  );
  const userStats = userStatsData?.data[0];

  const { isLoading: columbusLoading, data: columbusData } =
    useShiny(`geoLocation=columbus&filter=${cookies.travelFilter}&filter=${cookies.planeFilter}`);
  const columbus = columbusData?.data[0];

  const stats = [
    {
      data: columbus?.trainer,
      dataStat: (columbus?.distance / 1000).toFixed(0) + " km",
      statName: "Columbus",
      nav: "columbus",
    },
    {
      data: userStats?.toerist.name,
      dataStat: userStats?.toerist.data,
      statName: "Toerist",
      nav: "toerist",
    },
    {
      data: userStats?.kolonist.name,
      dataStat: userStats?.kolonist.data,
      statName: "Kolonist",
      nav: "kolonist",
    },
    {
      data: userStats?.seekerHunter.name,
      dataStat: userStats?.seekerHunter.data,
      statName: "Seeker-Hunter",
      nav: "seekerHunter",
    },
    {
      data: userStats?.couchPotato.name,
      dataStat: userStats?.couchPotato.data,
      statName: "Couch Potato",
      nav: "couchPotato",
    },
    {
      data: userStats?.danaidesBarrel.name,
      dataStat: userStats?.danaidesBarrel.data,
      statName: "Danaïd’s barrel",
      nav: "danaidesBarrel",
    },
    {
      data: userStats?.passengerPrincess?.name
        ? userStats?.passengerPrincess.name
        : "-",
      dataStat: userStats?.passengerPrincess?.data
        ? userStats?.passengerPrincess.data
        : "-",
      statName: "Passenger Princess",
      nav: "passengerPrincess",
    },
    {
      data: userStats?.polarBear.name,
      dataStat:
        "N " +
        userStats?.polarBear.data.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      statName: "Polar Bear",
      nav: "polarBear",
    },
    {
      data: userStats?.penguin.name,
      dataStat:
        "N " +
        userStats?.penguin.data.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      statName: "Penguin",
      nav: "penguin",
    },
  ];

  return (
    <BoxComponent p="12px" noContrastColor title={"MAP RECORDS"}>
      <Grid container spacing={"8px"}>
        {/* Left side grid - first half */}
        <Grid item xs={12} container spacing={"8px"}>
          {stats.map((stat) => {
            return (
              <Grid item xs={12} key={stat.statName}>
                <LoadingComponent
                  loadingCondition={userStatsLoading && columbusLoading}
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
