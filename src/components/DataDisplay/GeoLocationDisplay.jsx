import { useState } from "react";

// Mui
import {
  Box,
  Typography,
  IconButton,
  Grid,
  useTheme,
  Alert,
} from "@mui/material";
import { tokens } from "../../theme";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Components
import GeoLocationForm from "../Forms/GeoLocationForm";
import CustomDialog from "../Dialogs/CustomDialog";

// Functions
import { makeRequest } from "../../functions/requestFunctions";

export default function GeoLocationDisplay({
  data,
  username,
  refetch,
  isDead = false,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openGeoLocationEdit, setOpenGeoLocationEdit] = useState(false);
  const [geoLocationData, setGeoLocationData] = useState({});

  const [alertShown, setAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");

  /* EDIT THE GEOLOCATION */
  const handleGeoLocationEdit = async () => {
    setAlertShown(false);

    if (
      !geoLocationData.geoLocation?.name ||
      !geoLocationData.geoLocation?.displayName
    ) {
      setAlertSeverity("warning");
      setAlertMessage("Data is not filled in correctly.");
      setAlertShown(true);
      return;
    }

    const url = !isDead
      ? `/shiny/${data._id}?action=geoLocationsEdit`
      : `/deadshiny/${data._id}?action=geoLocationsEdit`;

    try {
      await makeRequest("patch", url, geoLocationData.geoLocation);

      refetch();
      setOpenGeoLocationEdit(false);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.message);
      setAlertShown(true);
    }
  };

  const alertDisplay = () => {
    if (alertShown) {
      return (
        <Alert variant="filled" severity={alertSeverity}>
          {alertMessage}
        </Alert>
      );
    } else {
      return null;
    }
  };

  return (
    <Grid item xs={12} container spacing={2}>
      <Grid item xs={12}>
        <Box
          mb="5px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" color={colors.grey[100]} fontWeight="bold">
            GEO LOCATION
          </Typography>
          {username === data.trainer && (
            <Box ml="10px" display="flex">
              <IconButton
                size="small"
                onClick={() => setOpenGeoLocationEdit(true)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
              <CustomDialog
                open={openGeoLocationEdit}
                handleClick={handleGeoLocationEdit}
                handleClose={() => setOpenGeoLocationEdit(false)}
                title={"Edit the Geo Location"}
                content={
                  <>
                    <GeoLocationForm
                      data={geoLocationData}
                      setData={setGeoLocationData}
                    />
                    {alertDisplay()}
                  </>
                }
                action={"Edit"}
              />
            </Box>
          )}
        </Box>
      </Grid>
      {data.geoLocation.name && (
        <Grid item xs={12}>
          <MapContainer
            center={data.geoLocation.position}
            zoom={16}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
            doubleClickZoom={false}
            style={{ height: "200px", width: "100%", zIndex: 1 }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              detectRetina={true}
            />
            <Marker
              position={data.geoLocation.position}
              icon={L.divIcon({
                html: ``,
                className: "marker marker_all",
                iconSize: L.point(15, 15, true),
              })}
            >
              <Popup>
                <Typography fontWeight="bold" style={{ marginBottom: 0 }}>
                  {data.geoLocation.name}
                </Typography>
                <Typography gutterBottom style={{ marginTop: 0 }}>
                  {data.geoLocation.displayName}
                </Typography>
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
      )}
    </Grid>
  );
}
