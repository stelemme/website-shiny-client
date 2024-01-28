// mui imports
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Components imports
import Header from "../../components/Header";

export default function Map() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const position = [51.505, -0.09];

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="HOMEPAGE" subtitle="Welcome to the Homepage" />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xs={12}>
            <MapContainer
              center={position}
              zoom={50}
              style={{ height: '100vh', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
