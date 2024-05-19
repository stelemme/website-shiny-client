import { useState } from "react";
import axios from "axios";

// Mui
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Components
import GeoLocationForm from "../Forms/GeoLocationForm";

export default function GeoLocationDisplay({ data, username, refetch }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openGeoLocationEdit, setOpenGeoLocationEdit] = useState(false);
  const [geoLocationData, setGeoLocationData] = useState({});

  /* EDIT THE GEOLOCATION */
  const handleGeoLocationEdit = () => {
    let fetchData = false;
    if (
      geoLocationData.geoLocation.name !== "" &&
      geoLocationData.geoLocation.displayName !== ""
    ) {
      fetchData = JSON.stringify(geoLocationData.geoLocation);
    }

    if (fetchData) {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `/shiny/${data._id}?action=geoLocationsEdit`,
        headers: {
          "Content-Type": "application/json",
        },
        data: fetchData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          refetch();
          setOpenGeoLocationEdit(false);
        })
        .catch((error) => {
          console.log(error);
        });
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
                <EditRoundedIcon />
              </IconButton>
              <Dialog
                open={openGeoLocationEdit}
                onClose={() => setOpenGeoLocationEdit(false)}
              >
                <DialogTitle fontWeight="bold" variant="h4">
                  Edit the Geo Location
                </DialogTitle>
                <DialogContent>
                  <GeoLocationForm
                    data={geoLocationData}
                    setData={setGeoLocationData}
                  />
                </DialogContent>
                <DialogActions
                  style={{ justifyContent: "right", gap: "10px" }}
                  sx={{ mb: "15px", mr: "15px" }}
                >
                  <Button
                    variant="contained"
                    color="neutral"
                    style={{ color: "white" }}
                    onClick={() => setOpenGeoLocationEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="neutral"
                    style={{ color: "white" }}
                    onClick={handleGeoLocationEdit}
                    autoFocus
                  >
                    Edit
                  </Button>
                </DialogActions>
              </Dialog>
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
