// Mui
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Recharts
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";

export default function CounterEncounterGraph({
  formatEncounterData,
  data,
  trainer,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let color = "";

  if (trainer === "Joaquin") {
    color = colors.redAccent[500];
  } else if (trainer === "Korneel") {
    color = colors.yellowAccent[500];
  } else if (trainer === "Simon") {
    color = colors.greenAccent[500];
  } else if (trainer === "Stef") {
    color = colors.blueAccent[500];
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={window.innerWidth < 500 ? 300 : 400}
    >
      <BarChart
        data={formatEncounterData(data.encounters)}
        margin={{
          top: 0,
          right: 0,
          bottom: -15,
          left: 10,
        }}
      >
        <XAxis
          dataKey="date"
          scale="time"
          type="number"
          domain={[
            (dataMin) => {
              const previousDay = new Date(dataMin);
              previousDay.setDate(previousDay.getDate() - 1);
              return previousDay;
            },
            () => new Date(data.endDate).getTime(),
          ]}
          tick={false}
          axisLine={{ stroke: colors.primary[200] }}
          tickLine={{ stroke: colors.primary[200] }}
        />
        <YAxis
          dataKey="value"
          width={25}
          tick={{ fill: colors.grey[100] }}
          axisLine={{ stroke: colors.primary[200] }}
          tickLine={{ stroke: colors.primary[200] }}
        />
        <CartesianGrid stroke={colors.primary[200]} />
        <Tooltip
          labelStyle={{ color: "black" }}
          labelFormatter={(value) => {
            return `${new Date(value).toLocaleDateString()}`;
          }}
        />
        <Bar dataKey="value" fill={color} maxBarSize={200} />
      </BarChart>
    </ResponsiveContainer>
  );
}
