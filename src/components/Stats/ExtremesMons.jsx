import { useState } from "react";

// mui imports
import { Box, useTheme, Typography, Grid, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import StatsCard from "../Cards/StatsCard";
import UserSelect from "../Selects/UserSelect";

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function ExtremesMons() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { isLoading: userStatsLoading, data: userStatsData } = useShiny(
    `stats=extremesMons${query}`
  );
  const userStats = userStatsData?.data[0];

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
    }
  };

  const stats = [
    {
      data: userStats?.first,
      dataStat: new Date(userStats?.first.endDate).toLocaleDateString(),
      statName: "First Shiny Caught",
    },
    {
      data: userStats?.lowestEncounters,
      dataStat: userStats?.lowestEncounters.totalEncounters,
      statName: "Lowest #Encounters",
    },
    {
      data: userStats?.mostEncounters,
      dataStat: userStats?.mostEncounters.totalEncounters,
      statName: "Highest #Encounters",
    },
    {
      data: userStats?.shortestHunt,
      dataStat: formatTime(userStats?.shortestHunt.stats.totalHuntTime, false),
      statName: "Shortest Hunt",
    },
    {
      data: userStats?.mostDays,
      dataStat: `${userStats?.mostDays.stats.daysHunting} days`,
      statName: "Most Days Hunted",
    },
  ];

  return (
    <BoxComponent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          USER RECORDS
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      </Box>
      <Grid container spacing={"12px"}>
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
                        xs: "53px",
                        sm: "44px",
                        md: "56px",
                      },
                    }}
                    variant="rounded"
                    width={"100%"}
                  />
                }
              >
                <StatsCard
                  id={stat.data?._id}
                  name={stat.data?.name}
                  stat={stat.dataStat}
                  statName={stat.statName}
                  trainer={stat.data?.trainer}
                  bgColor={500}
                />
              </LoadingComponent>
            </Grid>
          );
        })}
      </Grid>
    </BoxComponent>
  );
}
