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
} from "recharts";

// Components imports
import BoxComponent from "../General/BoxComponent";
import GeneralSelect from "../Selects/GeneralSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

const currentYear = new Date().getFullYear();
const yearsList = [];
for (let year = 2014; year <= currentYear; year++) {
  yearsList.push(year);
}
yearsList.sort((a, b) => b - a);

export default function DateGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [year, setYear] = useState(currentYear);

  const { data: shinyData } = useShiny(`stats=yearAmount&year=${year}`);

  const handleChange = (e) => {
    setYear(e.target.value);
  };

  console.log(shinyData);

  return (
    <BoxComponent
      title={"SHINY DATE GRAPH"}
      select={
        <GeneralSelect
          label={"Year"}
          handleChange={handleChange}
          list={yearsList}
          value={year}
        />
      }
    >
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <ComposedChart
          data={shinyData?.data}
          margin={{
            top: 0,
            right: 0,
            bottom: 50,
            left: 0,
          }}
          barGap={1}
        >
          <CartesianGrid stroke={colors.primary[500]} />
          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "bottom",
              offset: 35,
              fill: colors.grey[100],
            }}
            angle={-70}
            interval={0}
            tick={{ dy: 30, dx: -10, fill: colors.grey[100] }}
          />
          <YAxis
            allowDecimals={false}
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
            width={window.innerWidth > 500 ? 60 : 25}
          />
          <Tooltip
            labelStyle={{ color: "black" }}
            labelFormatter={(value) => {
              return `${value}`;
            }}
          />
          <Bar dataKey="Joaquin" fill={colors.redAccent[500]} />
          <Bar dataKey="Korneel" fill={colors.yellowAccent[500]} />
          <Bar dataKey="Simon" fill={colors.greenAccent[500]} />
          <Bar dataKey="Stef" fill={colors.blueAccent[500]} />
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
