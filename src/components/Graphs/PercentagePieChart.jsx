// mui imports
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// recharts
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Components
import BoxComponent from "../General/BoxComponent";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PercentagePieChart({ data, graphColor }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <BoxComponent noContrastColor title={"PIE CHART"}>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? graphColor : colors.grey[500]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </BoxComponent>
  );
}
