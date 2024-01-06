import { useState, useEffect } from "react";
import { medalImgPaths } from "../assets/imgExporter";

// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Skeleton,
  Divider,
} from "@mui/material";
import { tokens } from "../theme";

// Components imports
import GeneralSelect from "./GeneralSelect";

// Hooks
import { useCounter } from "../hooks/useData";

const optionList = ["Today", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last Year"];


export default function CounterLeaderboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [period, setPeriod] = useState("Today");
  const [query, setQuery] = useState(1);
  const [medalPaths, setMedalPaths] = useState([]);

  useEffect(() => {
    const loadMedalImages = async () => {
      const paths = await Promise.all(medalImgPaths);
      setMedalPaths(paths);
    };

    loadMedalImages();
  }, []);

  const { isLoading: counterStatsLoading, data: counterStatsData } = useCounter(
    `?statsPeriodTotal=${query}`
  );
  const counterStats = counterStatsData?.data;

  const handleChange = (e) => {
    setPeriod(e.target.value);
    if (e.target.value === "Last 7 Days") {
      setQuery(7);
    } else if (e.target.value === "Last 30 Days") {
      setQuery(30);
    } else if (e.target.value === "Last 90 Days") {
      setQuery(90);
    } else if (e.target.value === "Last Year") {
      setQuery(365);
    } else {
      setQuery(1);
    }
  };

  const StatsDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
          <Skeleton
            sx={{
              bgcolor: colors.primary[500],
              height: {
                xs: "190.4px",
              },
            }}
            variant="rounded"
            width={"100%"}
          />
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Box
            py="10px"
            px="20px"
            width="100%"
            backgroundColor={colors.primary[500]}
            borderRadius="5px"
          >
            {data?.map((item, index) => {
              return (
                <Box key={index}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems="center" gap={"20px"}>
                      <Box
                        display="inline-flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img height={"30px"} alt="" src={medalPaths[index]} />
                      </Box>
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
                        {item.trainer}
                      </Typography>
                    </Box>
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
                      {item.totalEncounters}
                    </Typography>
                  </Box>
                  {index !== data.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              );
            })}
          </Box>
        </Grid>
      );
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          TOTAL #ENCOUNTERS
        </Typography>
        <GeneralSelect
          label={"Period"}
          handleChange={handleChange}
          list={optionList}
          value={period}
        />
      </Box>
      <Grid container spacing={"12px"}>
        <StatsDisplay
          data={counterStats}
          loading={counterStatsLoading && true}
        />
      </Grid>
    </Box>
  );
}
