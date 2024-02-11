// mui imports
import { Box, Grid } from "@mui/material";

// leaflet imports
import { MapContainer, TileLayer } from "react-leaflet";

// Components imports
import Header from "../../components/Header";
import MarkerGraph from "../../components/Map/MarkerGraph";

export default function Map() {
  const positions = [
    {
      position: [51.09367751050823, 3.7150299371700846],
      name: "Huis Stef",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.09075080123518, 3.696881086713136],
      name: "Huis Joaquin",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.07544829685432, 3.7708830499475208],
      name: "Huis Korneel",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.04310834431113, 3.723888864589091],
      name: "Kot Simon 2",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.11537424031271, 3.7118685769438855],
      name: "Huis Léonie",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.0468296465177, 3.7386690335568953],
      name: "Kot Stef",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
    {
      position: [51.044659034999604, 3.7267207734836907],
      name: "Technicum",
      displayName: "",
      data: [
        { name: "Joaquin", value: 0 },
        { name: "Korneel", value: 0 },
        { name: "Simon", value: 0 },
        { name: "Stef", value: 1 },
      ],
    },
    {
      position: [51.04386044408767, 3.726018542393129],
      name: "Kot Simon 1",
      displayName: "",
      data: [
        { name: "Joaquin", value: 25 },
        { name: "Korneel", value: 25 },
        { name: "Simon", value: 25 },
        { name: "Stef", value: 50 },
      ],
    },
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
              center={[51.080158037454105, 3.7204157561604343]}
              zoom={12}
              style={{ height: "calc(100vh - 200px)", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              {positions.map((location) => {
                return (
                  <MarkerGraph
                    position={location.position}
                    data={location.data}
                    name={location.name}
                    key={location.position}
                  />
                );
              })}
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
