import { useState, useEffect } from "react";
import axios from "axios";

// mui imports
import {
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "../theme";

// Recharts
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Components imports
import UserSelect from "./UserSelect";

// Hooks
import useAxios from "axios-hooks";

export default function EncountersGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userStats, setUserStats] = useState(null);
  const [ticks, setTicks] = useState([0, 5, 10, 15, 20, 25, 30, 35, 40]);
  const [graphColor, setGraphColor] = useState(colors.purpleAccent[500]);

  const [{ data: userStatsData, loading: userStatsDataLoading }] = useAxios(
    `/shiny?encountersList=true`
  );

  useEffect(() => {
    if (!userStatsDataLoading) {
      setUserStats(userStatsData);
    }
  }, [userStatsData, userStatsDataLoading]);

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setUserStats(userStatsData);
      setTicks([0, 5, 10, 15, 20, 25, 30, 35, 40]);
      setGraphColor(colors.purpleAccent[500]);
    } else {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/shiny?encountersList=true&trainer=${e.target.value}`,
      };

      axios
        .request(config)
        .then((response) => {
          setTicks([0, 5, 10, 15, 20]);
          setUserStats(response.data);
          if (e.target.value === "Joaquin") {
            setGraphColor(colors.redAccent[500]);
          } else if (e.target.value === "Korneel") {
            setGraphColor(colors.yellowAccent[500]);
          } else if (e.target.value === "Simon") {
            setGraphColor(colors.greenAccent[500]);
          } else if (e.target.value === "Stef") {
            setGraphColor(colors.blueAccent[500]);
          }
        })
        .catch((error) => {
          console.log(error);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          ENCOUNTERS GRAPH
        </Typography>
        <UserSelect label={"User"} handleChange={handleChange}/>
      </Box>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <ComposedChart
          data={userStats?.result}
          margin={{
            top: 0,
            right: 0,
            bottom: 30,
            left: 0,
          }}
        >
          <CartesianGrid stroke={colors.primary[500]} />
          <XAxis
            dataKey="name"
            label={{
              value: "Encounters",
              position: "bottom",
              offset: 20,
              fill: colors.grey[100],
            }}
            angle={-70}
            interval={window.innerWidth < 800 ? null : 0}
            tick={{ dy: 15, dx: -10, fill: colors.grey[100] }}
          />
          <YAxis
            label={
              window.innerWidth > 500
                ? {
                    value: "Amount of Shinies",
                    angle: -90,
                    position: "insideLeft",
                    fill: colors.grey[100],
                  }
                : null
            }
            tick={{ fill: colors.grey[100] }}
            ticks={ticks}
            width={window.innerWidth > 500 ? 60 : 25}
          />
          <Tooltip
            labelStyle={{ color: "black" }}
            labelFormatter={(value) => {
              return `${Number(value) - 999}-${value}`;
            }}
          />
          <Bar dataKey="amount" fill={graphColor} />
          <Line
            type="basis"
            dataKey="expected"
            stroke={colors.primary[100]}
            dot={false}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
