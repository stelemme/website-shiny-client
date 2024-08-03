import { useCookies } from "react-cookie";

// mui imports
import { Box, Grid, Typography, IconButton } from "@mui/material";
import NoTransferIcon from "@mui/icons-material/NoTransfer";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Components imports
import Header from "../../components/Header";

// Hooks
import { useShiny } from "../../hooks/useData";

const createClusterCustomIcon = function (cluster) {
  const allMarkers = cluster.getAllChildMarkers();

  const altCounts = {};
  allMarkers.forEach((marker) => {
    const alt = marker.options.alt;
    altCounts[alt] = (altCounts[alt] || 0) + 1;
  });

  const totalMarkers = cluster.getChildCount();

  const trainerlist = ["joaquin", "korneel", "simon", "stef"];

  const altData = {};
  trainerlist.forEach((trainer) => {
    const count = altCounts[trainer] || 0;
    const percentage = Math.round((count / totalMarkers) * 100);
    altData[trainer] = {
      percentage: percentage,
      count: count,
    };
  });

  const joaquinPercentage = altData?.joaquin?.percentage
    ? altData?.joaquin?.percentage
    : 0;
  const korneelPercentage = altData?.korneel?.percentage
    ? joaquinPercentage + altData?.korneel?.percentage
    : joaquinPercentage;
  const simonPercentage = altData?.simon?.percentage
    ? korneelPercentage + altData?.simon?.percentage
    : korneelPercentage;
  const stefPercentage = altData?.stef?.percentage
    ? simonPercentage + altData?.stef?.percentage
    : simonPercentage;

  let iconSize;
  if (totalMarkers < 10) {
    iconSize = 25;
  } else if (totalMarkers < 100) {
    iconSize = 30;
  } else {
    iconSize = 40;
  }
  return L.divIcon({
    html: ` <div title="Joaquin: ${altData?.joaquin?.count}, Korneel: ${
      altData?.korneel?.count
    }, Simon: ${altData?.simon?.count}, Stef: ${
      altData?.stef?.count
    }" class="donut-chart-container">
              <div class="donut-chart" style="--percentage1: ${
                joaquinPercentage + "%"
              }; --percentage2: ${korneelPercentage + "%"}; --percentage3: ${
      simonPercentage + "%"
    }; --percentage4: ${stefPercentage + "%"};"></div>
              <div class="donut-chart-center"></div>
            <div class="marker-text">${totalMarkers}</div>`,
    className: "marker_cluster_wrapper",
    iconSize: L.point(iconSize, iconSize, true),
  });
};

export default function Map() {
  const [cookies, setCookies] = useCookies(["travelFilter"]);
  const foreverDate = new Date("9999-12-31T23:59:59");

  const { data: joaquinLocationsData, isLoading: loadingJoaquin } = useShiny(
    `geoLocation=map&trainer=Joaquin&filter=${cookies.travelFilter}`
  );
  const { data: korneelLocationsData, isLoading: loadingKorneel } = useShiny(
    `geoLocation=map&trainer=Korneel&filter=${cookies.travelFilter}`
  );
  const { data: simonLocationsData, isLoading: loadingSimon } = useShiny(
    `geoLocation=map&trainer=Simon&filter=${cookies.travelFilter}`
  );
  const { data: stefLocationsData, isLoading: loadingStef } = useShiny(
    `geoLocation=map&trainer=Stef&filter=${cookies.travelFilter}`
  );

  const joaquinLocations = joaquinLocationsData?.data;
  const korneelLocations = korneelLocationsData?.data;
  const simonLocations = simonLocationsData?.data;
  const stefLocations = stefLocationsData?.data;

  const loadingMarkers =
    !loadingJoaquin && !loadingKorneel && !loadingSimon && !loadingStef;

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="GEO LOCATION MAP"
            subtitle="On the map you can find all the location where shinies have been caught."
          />
          <Box style={{ display: "flex", alignItems: "center" }}>
            {cookies.travelFilter === "transport" ? (
              <IconButton
                onClick={(e) =>
                  setCookies("travelFilter", "no transport", {
                    expires: foreverDate,
                  })
                }
              >
                <NoTransferIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={(e) =>
                  setCookies("travelFilter", "transport", {
                    expires: foreverDate,
                  })
                }
              >
                <DirectionsBusIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <Grid container>
          <Grid item xs={12} height={"100%"}>
            <MapContainer
              center={[51.080158037454105, 3.7204157561604343]}
              zoom={3}
              style={{ height: "calc(100vh - 200px)", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                detectRetina={true}
              />
              {loadingMarkers && (
                <MarkerClusterGroup
                  iconCreateFunction={createClusterCustomIcon}
                  maxClusterRadius={30}
                >
                  {joaquinLocations?.map((location) => {
                    return (
                      <Marker
                        key={location._id}
                        alt="joaquin"
                        position={location.geoLocation.position}
                        icon={L.divIcon({
                          html: `<div  class="donut-chart-container">
                                  <div class="donut-chart" style="--percentage1: 100%; --percentage2: 0%; --percentage3: 0%; --percentage4: 0%;"></div>
                                  <div class="donut-chart-center"></div>
                                <div class="marker-text">1</div>`,
                          className: "marker_1",
                          iconSize: L.point(20, 20, true),
                        })}
                      >
                        <Popup>
                          <Typography
                            fontWeight="bold"
                            style={{ marginBottom: 0 }}
                          >
                            {location.geoLocation.name}
                          </Typography>
                          <Typography gutterBottom style={{ marginTop: 0 }}>
                            {location.trainer + " - " + location.name}
                          </Typography>
                        </Popup>
                      </Marker>
                    );
                  })}
                  {korneelLocations?.map((location) => {
                    return (
                      <Marker
                        key={location._id}
                        alt="korneel"
                        position={location.geoLocation.position}
                        icon={L.divIcon({
                          html: `<div  class="donut-chart-container">
                                  <div class="donut-chart" style="--percentage1: 0%; --percentage2: 100%; --percentage3: 0%; --percentage4: 0%;"></div>
                                  <div class="donut-chart-center"></div>
                                <div class="marker-text">1</div>`,
                          className: "marker_1",
                          iconSize: L.point(20, 20, true),
                        })}
                      >
                        <Popup>
                          <Typography
                            fontWeight="bold"
                            style={{ marginBottom: 0 }}
                          >
                            {location.geoLocation.name}
                          </Typography>
                          <Typography gutterBottom style={{ marginTop: 0 }}>
                            {location.trainer + " - " + location.name}
                          </Typography>
                        </Popup>
                      </Marker>
                    );
                  })}
                  {simonLocations?.map((location) => {
                    return (
                      <Marker
                        key={location._id}
                        alt="simon"
                        position={location.geoLocation.position}
                        icon={L.divIcon({
                          html: `<div  class="donut-chart-container">
                                  <div class="donut-chart" style="--percentage1: 0%; --percentage2: 0%; --percentage3: 100%; --percentage4: 0%;"></div>
                                  <div class="donut-chart-center"></div>
                                <div class="marker-text">1</div>`,
                          className: "marker_1",
                          iconSize: L.point(20, 20, true),
                        })}
                      >
                        <Popup>
                          <Typography
                            fontWeight="bold"
                            style={{ marginBottom: 0 }}
                          >
                            {location.geoLocation.name}
                          </Typography>
                          <Typography gutterBottom style={{ marginTop: 0 }}>
                            {location.trainer + " - " + location.name}
                          </Typography>
                        </Popup>
                      </Marker>
                    );
                  })}
                  {stefLocations?.map((location) => {
                    return (
                      <Marker
                        key={location._id}
                        alt="stef"
                        position={location.geoLocation.position}
                        icon={L.divIcon({
                          html: `<div  class="donut-chart-container">
                                  <div class="donut-chart" style="--percentage1: 0%; --percentage2: 0%; --percentage3: 0%; --percentage4: 100%;"></div>
                                  <div class="donut-chart-center"></div>
                                <div class="marker-text">1</div>`,
                          className: "marker_1",
                          iconSize: L.point(20, 20, true),
                        })}
                      >
                        <Popup>
                          <Typography
                            fontWeight="bold"
                            style={{ marginBottom: 0 }}
                          >
                            {location.geoLocation.name}
                          </Typography>
                          <Typography gutterBottom style={{ marginTop: 0 }}>
                            {location.trainer + " - " + location.name}
                          </Typography>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MarkerClusterGroup>
              )}
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
