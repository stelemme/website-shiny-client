import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../scenes/stats/map.css";

// Mui
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// leaflet imports
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function CompleteDeadCard({ data, refetch }) {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [geoLocationsList, setGeoLocationsList] = useState(undefined);
  const [geoLocationEdit, setGeoLocationEdit] = useState([]);
  const [geoLocationClear, setGeoLocationClear] = useState(false);
  const [geoNewLocationClear, setGeoNewLocationClear] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [openGeoLocationEdit, setOpenGeoLocationEdit] = useState(false);

  let initialLocationState = {
    name: "",
    displayName: "",
    position: [],
  };

  const [geoLocationData, setGeoLocationData] = useState(initialLocationState);

  console.log(data);

  /* DELETE THE SHINY */
  const handleDeleteClick = () => {
    axios["delete"](`/deadshiny/${data._id}`)
      .then((res) => {
        navigate("/shiny/dead");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* EDIT THE GEOLOCATION */
  const handleGeoLocationEdit = () => {
    let fetchData = false;
    if (geoLocationEdit.length !== 0) {
      fetchData = JSON.stringify(geoLocationEdit);
    } else if (
      geoLocationData.name !== "" &&
      geoLocationData.displayName !== ""
    ) {
      fetchData = JSON.stringify(geoLocationData);
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
          setOpenGeoLocationEdit(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getGeoLocation = (newValues) => {
    if (newValues.length === 2) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/reverse?lat=${newValues[0]}&lon=${newValues[1]}&format=json`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setGeoLocationData((prevState) => {
            return {
              ...prevState,
              displayName: response.data.display_name,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const InfoDisplay = ({ infoCat, infoName, xs1 = 5.5, xs2 = 6.5 }) => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={xs1}>
          <Typography fontWeight={"bold"}>{infoCat}</Typography>
        </Grid>
        <Grid item xs={xs2}>
          <Typography>{infoName}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box maxWidth={{ sm: "420px" }} mx="auto" my="20px">
      {data && (
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            mb="5px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              {data.name.toUpperCase()}
            </Typography>
            {username === data.trainer && (
              <Box ml="10px" display="flex">                
                <IconButton onClick={() => setOpenDelete(true)}>
                  <DeleteRoundedIcon />
                </IconButton>
                <CustomDialog
                  open={openDelete}
                  handleClick={handleDeleteClick}
                  handleClose={() => setOpenDelete(false)}
                  title={"Delete Shiny"}
                  content={"Do you want to delete this Shiny Pokémon?"}
                  warning={
                    "Deleting this shiny will delete ALL the counter data forever!"
                  }
                  action={"Delete"}
                />
              </Box>
            )}
          </Box>

          {/* IMAGES */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <div style={{ position: "relative" }}>
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${data.sprite.pokemon}.png`}
                  width="100%"
                  style={{ imageRendering: "pixelated" }}
                  onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${data.sprite.pokemon}.png`;
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.sprite.dir}/${data.sprite.pokemon}.png`}
                width="100%"
                style={{ imageRendering: "pixelated" }}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/gen-all-home/${data.sprite.pokemon}.png`;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box width={"100%"} display="flex" justifyContent="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.sprite.game}.png`}
                  height="50px"
                />
              </Box>
            </Grid>            
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"bold"}>
                {`WAY OF DEATH: ${data.failMethod.toUpperCase()}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={"bold"}>
                SHINY INFORMATION
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <InfoDisplay
                infoCat={"Dex No."}
                infoName={`#${data.pokedexNo}`}
              />
              <InfoDisplay infoCat={"Pokémon"} infoName={data.name} />
              <InfoDisplay
                infoCat={"Gender"}
                infoName={
                  data.gender === "male"
                    ? "♂"
                    : data.gender === "female"
                    ? "♀"
                    : "-"
                }
              />
              <InfoDisplay
                infoCat={"Level Seen"}
                infoName={data.level ? `lvl. ${data.level}` : "-"}
              />
              <InfoDisplay
                infoCat={"Nickname"}
                infoName={data.nickname ? data.nickname : "-"}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoDisplay
                infoCat={"Encounters"}
                infoName={data.totalEncounters}
              />
              <InfoDisplay
                infoCat={"Probability"}
                infoName={`1/${data.stats.probability}`}
              />
              <InfoDisplay
                infoCat={"Percentage"}
                infoName={
                  data.stats.percentage ? `${data.stats.percentage}%` : "-"
                }
              />
              <InfoDisplay
                infoCat={"Date Caught"}
                infoName={new Date(data.endDate).toLocaleDateString()}
              />
            </Grid>

            <Grid item xs={12}>
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Game"}
                infoName={data.game}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Generation"}
                infoName={data.gen}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Method"}
                infoName={data.method.name}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Category"}
                infoName={data.method.category ? data.method.category : "-"}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Location"}
                infoName={data.location}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {data.stats.meanEncounterTime && (
              <Grid
                item
                xs={12}
                container
                spacing={2}
                onClick={() => {
                  navigate(`/counters/${data?._id}?completed=true`);
                }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    COUNTER STATS
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <InfoDisplay
                    infoCat={"Start Date"}
                    infoName={new Date(data.startDate).toLocaleDateString()}
                  />
                  <InfoDisplay
                    infoCat={"End Date"}
                    infoName={new Date(data.endDate).toLocaleDateString()}
                  />
                  <InfoDisplay
                    infoCat={"Days Hunted"}
                    infoName={`${data.stats.daysHunting} days`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InfoDisplay
                    infoCat={"Mean Enc. Time"}
                    infoName={new Date(data.stats.meanEncounterTime * 1000)
                      .toISOString()
                      .slice(11, 19)}
                  />
                  <InfoDisplay
                    infoCat={"Total Time"}
                    infoName={formatTime(
                      Math.round(data.stats.totalHuntTime),
                      false
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12}>
                <Box
                  mb="5px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    GEO LOCATION
                  </Typography>
                  {username === data.trainer && (
                    <Box ml="10px" display="flex">
                      <IconButton
                        size="small"
                        onClick={() => {
                          axios["get"](`/shiny?geoLocationList=true`).then(
                            (res) => {
                              const geoLocationsData =
                                res.data[0]["geoLocation"];
                              setGeoLocationsList(geoLocationsData);
                            }
                          );
                          setOpenGeoLocationEdit(true);
                        }}
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
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography fontWeight="bold">
                                Existing locations
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Autocomplete
                                key={geoLocationClear}
                                disabled={!geoLocationsList}
                                autoHighlight
                                onChange={(e, value, reason) => {
                                  if (reason === "selectOption") {
                                    setGeoLocationEdit(value);
                                    setGeoLocationData(initialLocationState);
                                    setGeoNewLocationClear(
                                      (prevState) => !prevState
                                    );
                                  }
                                }}
                                options={
                                  geoLocationsList ? geoLocationsList : []
                                }
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                  <TextField
                                    fullWidth
                                    color="secondary"
                                    {...params}
                                    label="Existing Geo Locations"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography fontWeight="bold">
                                A new location
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                color="secondary"
                                label="Location Name"
                                value={geoLocationData.name}
                                onChange={(e) => {
                                  setGeoLocationEdit([]);
                                  setGeoLocationClear(
                                    (prevState) => !prevState
                                  );
                                  setGeoLocationData((prevState) => {
                                    return {
                                      ...prevState,
                                      ...{
                                        name: e.target.value,
                                      },
                                    };
                                  });
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                color="secondary"
                                label="Latitude, Longitude"
                                key={geoNewLocationClear}
                                onChange={(e) => {
                                  setGeoLocationEdit([]);
                                  setGeoLocationClear(
                                    (prevState) => !prevState
                                  );
                                  const newValues = e.target.value
                                    .split(",")
                                    .map((value) => Number(value.trim()));
                                  setGeoLocationData((prevState) => {
                                    return {
                                      ...prevState,
                                      position: newValues,
                                    };
                                  });
                                  getGeoLocation(newValues);
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                Address: {geoLocationData.displayName}
                              </Typography>
                            </Grid>
                          </Grid>
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
                            Add
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
                      style={{ height: "200px", width: "100%",  zIndex: 1, }}
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
                          <Typography
                            fontWeight="bold"
                            style={{ marginBottom: 0 }}
                          >
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
          </Grid>
        </Box>
      )}
    </Box>
  );
}
