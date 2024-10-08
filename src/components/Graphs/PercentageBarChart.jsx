// Mui
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Recharts
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import BoxComponent from "../General/BoxComponent";

export default function PercentageBarChart({ graphData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const graphColors = [
    colors.redAccent[400],
    colors.yellowAccent[400],
    colors.greenAccent[400],
    colors.blueAccent[400],
    colors.purpleAccent[400],
  ];

  return (
    <BoxComponent noContrastColor title={"PERCENTAGE CHART"}>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 200 : 300}
      >
        <BarChart
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: -15,
          }}
          data={graphData}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: colors.grey[100] }}
            axisLine={{ stroke: colors.primary[200] }}
            tickLine={{ stroke: colors.primary[200] }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => {
              return `${tick}%`;
            }}
            tick={{ fill: colors.grey[100] }}
            axisLine={{ stroke: colors.primary[200] }}
            tickLine={{ stroke: colors.primary[200] }}
          />
          <Tooltip
            labelStyle={{ color: "black" }}
            formatter={(value) => {
              return `${value.toFixed(2)}%`;
            }}
            animationDuration={0}
          />
          <Bar dataKey="percentage" background={{ fill: colors.grey[800] }}>
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={graphColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </BoxComponent>
  );
}
