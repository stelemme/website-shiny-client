// mui imports
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// leaflet imports
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Components imports
import Header from "../../components/Header";
import MarkerGraph from "../../components/Map/MarkerGraph";

export default function Map() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const positions = [
    [51.09367751050823, 3.7150299371700846],
    [51.09075080123518, 3.696881086713136],
    [51.07544829685432, 3.7708830499475208],
    [51.04310834431113, 3.723888864589091],
    [51.11537424031271, 3.7118685769438855],
    [51.0468296465177, 3.7386690335568953],
    [51.044659034999604, 3.7267207734836907],
    [51.04386044408767, 3.726018542393129],
  ];

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="IRL LOCATION MAP"
            subtitle="On the map you can find all the location where shinies have been caught."
          />
        </Box>

        <Grid container>
          <Grid item xs={12} height={"100%"}>
            <MapContainer
              center={[50.080158037454105, 3.7204157561604343]}
              zoom={12}
              style={{ height: "calc(100vh - 200px)", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              <MarkerClusterGroup>
                {positions.map((position) => {
                  return <MarkerGraph position={position} key={position} />;
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
