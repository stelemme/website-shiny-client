import { useCookies } from "react-cookie";

// mui imports
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Recharts
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Components imports
import BoxComponent from "../General/BoxComponent";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function CountryGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cookies] = useCookies(["travelFilter", "mapOnGent"]);

  const { data: shinyData } = useShiny(
    `geoLocation=differentCountries&filter=${cookies.travelFilter}`
  );

  return (
    <BoxComponent noContrastColor title={"COUNTRY GRAPH"}>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 600 ? 300 : 450}
      >
        <ComposedChart
          data={shinyData?.data}
          margin={{
            top: 0,
            right: 0,
            bottom: 70,
            left: 0,
          }}
          barGap={1}
        >
          <XAxis
            dataKey="country"
            angle={-70}
            interval={0}
            tick={{
              dy: 10,
              fill: colors.grey[100],
              fontSize: window.innerWidth > 600 ? 12 : 10,
              textAnchor: "end",
            }}
          />
          <YAxis
            allowDecimals={false}
            label={
              window.innerWidth > 600
                ? {
                    value: "Shinies",
                    angle: -90,
                    position: "insideLeft",
                    fill: colors.grey[100],
                  }
                : null
            }
            tick={{ fill: colors.grey[100] }}
            width={window.innerWidth > 600 ? 60 : 25}
          />
          <Tooltip
            labelStyle={{ color: "black" }}
            labelFormatter={(value) => {
              return `${value}`;
            }}
          />
          <Bar
            dataKey="Joaquin"
            fill={colors.redAccent[500]}
            background={{ fill: colors.primary[400] }}
          />
          <Bar
            dataKey="Korneel"
            fill={colors.yellowAccent[500]}
            background={{ fill: colors.primary[400] }}
          />
          <Bar
            dataKey="Simon"
            fill={colors.greenAccent[500]}
            background={{ fill: colors.primary[400] }}
          />
          <Bar
            dataKey="Stef"
            fill={colors.blueAccent[500]}
            background={{ fill: colors.primary[400] }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </BoxComponent>
  );
}
