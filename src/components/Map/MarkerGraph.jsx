// mui imports
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import { JSXMarker } from "../../components/Map/CustomMarker";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
const data = [
  { name: "Joaquin", value: 25 },
  { name: "Korneel", value: 25 },
  { name: "Simon", value: 25 },
  { name: "Stef", value: 50 },
];

export default function MarkerGraph({ position }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  const colorsList = [
    colors.redAccent[500],
    colors.yellowAccent[500],
    colors.greenAccent[500],
    colors.blueAccent[500],
  ];

  return (
    <JSXMarker
      position={position}
      iconOptions={{
        className: "jsx-marker",
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      }}
    >
      <Box
        style={{
          height: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={50}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={15}
              outerRadius={20}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorsList[index % colorsList.length]}
                />
              ))}
            </Pie>
            <text
              x={25}
              y={25}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontWeight: "bold" }}
            >
              {totalValue}
            </text>
        <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </JSXMarker>
  );
}
