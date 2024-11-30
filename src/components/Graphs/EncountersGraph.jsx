import { useState } from "react";

// mui imports
import { useTheme } from "@mui/material";
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
  ReferenceLine,
} from "recharts";

// Components imports
import BoxComponent from "../General/BoxComponent";
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function EncountersGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [graphColor, setGraphColor] = useState(colors.purpleAccent[500]);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { data: shinyData } = useShiny(`list=encounterGraph${query}`);

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setGraphColor(colors.purpleAccent[500]);
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
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
    <BoxComponent
      title={"ENCOUNTERS GRAPH"}
      select={
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      }
    >
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <ComposedChart
          data={shinyData?.data[0]?.ranges}
          margin={{
            top: 10,
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
            type="number"
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
            tickCount={10}
            width={window.innerWidth > 500 ? 60 : 25}
          />
          <Tooltip
            labelStyle={{ color: "black" }}
            labelFormatter={(value) => {
              return `${Number(value) - 999}-${value}`;
            }}
          />
          <ReferenceLine x="9000" stroke="black" strokeWidth={2} />
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
    </BoxComponent>
  );
}
