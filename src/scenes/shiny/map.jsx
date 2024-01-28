// mui imports
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Components imports
import Header from "../../components/Header";
import { JSXMarker } from "../../components/Map/CustomMarker";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  { name: "Category 1", value: 25 },
  { name: "Category 2", value: 75 },
];

const COLORS = ["#0088FE", "#00C49F"];

export default function Map() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const position = [51.09367751050823, 3.7150299371700846];

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="IRL LOCATION MAP" subtitle="On the map you can find all the location where shinies have been caught." />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xs={12}>
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "79vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              <JSXMarker
                position={position}
                iconOptions={{
                  className: "jsx-marker",
                  iconSize: [100, 100],
                  iconAnchor: [50, 50],
                }}
              >
                <Box
                  style={{
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ResponsiveContainer width="100%" height={100}>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={40}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </JSXMarker>
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
