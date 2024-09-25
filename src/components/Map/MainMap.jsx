import { useState, useMemo, useCallback } from "react";
import { useCookies } from "react-cookie";

// mui imports
import { Typography, IconButton } from "@mui/material";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Components imports
import BoxComponent from "../General/BoxComponent";

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

export default function MainMap() {
  const [cookies] = useCookies(["travelFilter", "mapOnGent"]);

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

  const [map, setMap] = useState(null);
  const center = [51.080158037454105, 3.7204157561604343];

  /* eslint-disable react-hooks/exhaustive-deps */
  const onZoomInClick = useCallback(() => {
    if (map) map.setView(center, 12);
  }, [map]);

  const onZoomOutClick = useCallback(() => {
    if (map) map.setView(center, 3);
  }, [map]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={cookies.mapOnGent ? 12 : 3}
        style={{ height: "calc(100vh - 275px)", width: "100%" }}
        ref={setMap}
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
                    <Typography fontWeight="bold" style={{ marginBottom: 0 }}>
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
                    <Typography fontWeight="bold" style={{ marginBottom: 0 }}>
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
                    <Typography fontWeight="bold" style={{ marginBottom: 0 }}>
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
                    <Typography fontWeight="bold" style={{ marginBottom: 0 }}>
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
        <div className="button-container">
          <div className="zoom-button">
            <IconButton
              onClick={onZoomInClick}
              style={{ color: "black" }}
              size="small"
            >
              <ZoomInMapIcon />
            </IconButton>
          </div>
          <div className="zoom-button">
            <IconButton
              onClick={onZoomOutClick}
              style={{ color: "black" }}
              size="small"
            >
              <ZoomOutMapIcon />
            </IconButton>
          </div>
        </div>
      </MapContainer>
    ),
    [loadingMarkers, cookies]
  );

  return (
    <BoxComponent p="0px" tabs>
      {displayMap}
    </BoxComponent>
  );
}
