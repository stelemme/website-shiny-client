import "./map.css";

// mui imports
import { Box, Grid } from "@mui/material";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Components imports
import Header from "../../components/Header";

var joaquinLocations = [
  {
    id: 1,
    position: [51.07544829685432, 3.7708830499475208],
    trainer: "Joaquin",
    name: "Huis Korneel",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Joaquin",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Joaquin",
    name: "Huis Joaquin",
  },
];
var korneelLocations = [
  {
    id: 1,
    position: [51.07544829685432, 3.7708830499475208],
    trainer: "Korneel",
    name: "Huis Korneel",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Korneel",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Korneel",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
];
var simonLocations = [
  {
    id: 1,
    position: [51.07544829685432, 3.7708830499475208],
    trainer: "Simon",
    name: "Huis Korneel",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Simon",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Simon",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09367751050823, 3.7150299371700846],
    trainer: "Simon",
    name: "Huis Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
  {
    id: 1,
    position: [51.04310834431113, 3.723888864589091],
    trainer: "Simon",
    name: "Kot Simon 2",
  },
];
var stefLocations = [
  {
    id: 1,
    position: [51.07544829685432, 3.7708830499475208],
    trainer: "Stef",
    name: "Huis Korneel",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Stef",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09075080123518, 3.696881086713136],
    trainer: "Stef",
    name: "Huis Joaquin",
  },
  {
    id: 1,
    position: [51.09367751050823, 3.7150299371700846],
    trainer: "Stef",
    name: "Huis Stef",
  },
  {
    id: 1,
    position: [51.09367751050823, 3.7150299371700846],
    trainer: "Stef",
    name: "Huis Stef",
  },
  {
    id: 1,
    position: [51.09367751050823, 3.7150299371700846],
    trainer: "Stef",
    name: "Huis Stef",
  },
  {
    id: 1,
    position: [51.09367751050823, 3.7150299371700846],
    trainer: "Stef",
    name: "Huis Stef",
  },
  {
    id: 1,
    position: [51.044659034999604, 3.7267207734836907],
    trainer: "Stef",
    name: "Technicum",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.11537424031271, 3.7118685769438855],
    trainer: "Stef",
    name: "Huis Léonie",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
  {
    id: 1,
    position: [51.0468296465177, 3.7386690335568953],
    trainer: "Joaquin",
    name: "Kot Stef",
  },
];

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
    iconSize = 30;
  } else if (totalMarkers < 100) {
    iconSize = 35;
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
            <div class="text">${totalMarkers}</div>`,
    className: "marker_cluster_wrapper",
    iconSize: L.point(iconSize, iconSize, true),
  });
};

export default function Map() {
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
              <MarkerClusterGroup
                iconCreateFunction={createClusterCustomIcon}
                maxClusterRadius={50}
              >
                {joaquinLocations.map((location) => {
                  return (
                    <Marker
                      key={location.position}
                      alt="joaquin"
                      position={location.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_joaquin",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_booking">
                        <div className="popup__title">{location.name}</div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {korneelLocations.map((location) => {
                  return (
                    <Marker
                      key={location.position}
                      alt="korneel"
                      position={location.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_korneel",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">{location.name}</div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {simonLocations.map((location) => {
                  return (
                    <Marker
                      key={location.position}
                      alt="simon"
                      position={location.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_simon",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">{location.name}</div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
                {stefLocations.map((location) => {
                  return (
                    <Marker
                      key={location.position}
                      alt="stef"
                      position={location.position}
                      icon={L.divIcon({
                        html: ``,
                        className: "marker marker_stef",
                        iconSize: L.point(15, 15, true),
                      })}
                    >
                      <Popup className="popup popup_supplier">
                        <div className="popup__title">{location.name}</div>
                        <div className="popup__info">{location.trainer}</div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
