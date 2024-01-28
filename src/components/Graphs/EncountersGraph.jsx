import { useState } from "react";

// mui imports
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

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
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function EncountersGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ticks, setTicks] = useState([0, 5, 10, 15, 20, 25, 30, 35, 40]);
  const [graphColor, setGraphColor] = useState(colors.purpleAccent[500]);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { data: shinyData } = useShiny(`encountersList=true${query}`);

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTicks([0, 5, 10, 15, 20, 25, 30, 35, 40]);
      setGraphColor(colors.purpleAccent[500]);
      setTrainer("All")
    } else {
      setTicks([0, 5, 10, 15, 20]);
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value)
      if (e.target.value === "Joaquin") {
        setGraphColor(colors.redAccent[500]);
      } else if (e.target.value === "Korneel") {
        setGraphColor(colors.yellowAccent[500]);
      } else if (e.target.value === "Simon") {
        setGraphColor(colors.greenAccent[500]);
      } else if (e.target.value === "Stef") {
        setGraphColor(colors.blueAccent[500]);
      }
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
        <UserSelect label={"User"} handleChange={handleChange} defaultValue={trainer} />
      </Box>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <ComposedChart
          data={shinyData?.data}
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
