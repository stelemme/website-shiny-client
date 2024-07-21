import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../../utils/atoms";

// Mui
import { Box, Typography, IconButton, Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Components
import GeoLocationForm from "../Forms/GeoLocationForm";
import CustomDialog from "../Dialogs/CustomDialog";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

export default function GeoLocationDisplay({
  data: initialData,
  username,
  refetch,
  isDead = false,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const makeRequest = useMakeRequest();

  const [data, setData] = useState(initialData);
  const [openGeoLocationEdit, setOpenGeoLocationEdit] = useState(false);
  const [geoLocationData, setGeoLocationData] = useState({});

  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

  /* EDIT THE GEOLOCATION */
  const handleGeoLocationEdit = async () => {
    if (
      !geoLocationData.geoLocation?.name ||
      !geoLocationData.geoLocation?.displayName
    ) {
      setAlertSeverity("error");
      setAlertMessage("Data is not filled in correctly.");
      setAlertOpen(true);
      return;
    }

    const url = !isDead
      ? `/shiny/${data._id}?action=geoLocationsEdit`
      : `/deadshiny/${data._id}?action=geoLocationsEdit`;

    try {
      const response = await makeRequest(
        "patch",
        url,
        geoLocationData.geoLocation,
        "edit"
      );

      setData(response);
      refetch();
      setOpenGeoLocationEdit(false);
    } catch (error) {
      return;
    }
  };

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

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
          <Typography fontWeight="bold" mb={1}>
            {data.geoLocation.name}
          </Typography>
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
            <ChangeView center={data.geoLocation.position} zoom={16} />
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
