import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Components
import CustomDialog from "../../components/CustomDialog";

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useShinyId } from "../../hooks/useData";

export default function ShinyId() {
  const { shinyId } = useParams();
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [evolutions, setEvolutions] = useState(undefined);
  const [evolutionsEdit, setEvolutionsEdit] = useState([]);
  const [forms, setForms] = useState(undefined);
  const [formsEdit, setFormsEdit] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEvolutionEdit, setOpenEvolutionEdit] = useState(false);

  const { data: shiny } = useShinyId(shinyId);
  const data = shiny?.data.shiny

  /* DELETE THE SHINY */
  const handleDeleteClick = () => {
    axios["delete"](`/shiny/${shinyId}`)
      .then((res) => {
        navigate("/shiny");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* EDIT THE SHINY */
  const handleEvolutionsEdit = () => {
    let data = JSON.stringify({
      evolutions: evolutionsEdit,
      forms: formsEdit,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `/shiny/${shinyId}?action=evolutionsEdit`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res.data.shiny);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenEvolutionEdit(false);
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

  const CheckboxDisplay = ({ data, name, state, setState }) => {
    if (!data || data.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography>{`No ${name} Found`}</Typography>
        </Grid>
      );
    } else {
      return (
        <Box mb="10px">
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <FormGroup>
            {data?.map((item) => {
              return (
                <FormControlLabel
                  key={item._id}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={state.some(
                        (checkedItem) => checkedItem._id === item._id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setState((prevState) => [...prevState, item]);
                        } else {
                          setState((prevState) =>
                            prevState.filter((value) => value._id !== item._id)
                          );
                        }
                      }}
                    />
                  }
                  label={item.name}
                />
              );
            })}
          </FormGroup>
        </Box>
      );
    }
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
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${data.sprite.ball}.png`}
                  style={{
                    imageRendering: "pixelated",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30px",
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="21px"
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  EVOLUTIONS & FORMS
                </Typography>
                {username === data.trainer && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      axios["get"](
                        `/pokedex?name=${data.name}&evolutions=true&game=${data.game}`
                      ).then((res) => {
                        setEvolutions(res.data.evolutions);
                        setForms(res.data.forms);
                      });
                      setOpenEvolutionEdit(true);
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                )}
                <Dialog
                  open={openEvolutionEdit}
                  onClose={() => setOpenEvolutionEdit(false)}
                >
                  <DialogTitle fontWeight={"bold"} variant="h4">
                    Edit Evolutions & Forms
                  </DialogTitle>
                  <DialogContent>
                    <CheckboxDisplay
                      data={evolutions}
                      name={"Evolutions"}
                      state={evolutionsEdit}
                      setState={setEvolutionsEdit}
                    />
                    <CheckboxDisplay
                      data={forms}
                      name={"Forms"}
                      state={formsEdit}
                      setState={setFormsEdit}
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
                      onClick={() => setOpenEvolutionEdit(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="neutral"
                      style={{ color: "white" }}
                      onClick={handleEvolutionsEdit}
                      autoFocus
                    >
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
            {data.evolutions.length > 0 && (
              <Grid item xs={12} container>
                {data.evolutions.map((item) => {
                  return (
                    <Grid item xs={6} key={item._id}>
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${item.sprite}.png`}
                        width="50%"
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => {
                          e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${item.sprite}.png`;
                        }}
                      />
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.sprite.dir}/${item.sprite}.png`}
                        width="50%"
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => {
                          e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/gen-all-home/${item.sprite}.png`;
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
            {data.forms.length > 0 && (
              <Grid item xs={12} container>
                {data.forms.map((item) => {
                  return (
                    <Grid item xs={6} key={item._id}>
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${item.sprite}.png`}
                        width="50%"
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => {
                          e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${item.sprite}.png`;
                        }}
                      />
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.sprite.dir}/${item.sprite}.png`}
                        width="50%"
                        style={{ imageRendering: "pixelated" }}
                        onError={(e) => {
                          e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/gen-all-home/${item.sprite}.png`;
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
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
              <InfoDisplay infoCat={"Nature"} infoName={data.nature} />
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
                infoCat={"Level Caught"}
                infoName={`lvl. ${data.level}`}
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
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"IRL Location"}
                infoName={data.IRLLocation}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {data.stats.meanEncounterTime && (
              <Grid item xs={12} container spacing={2}>
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
          </Grid>
        </Box>
      )}
    </Box>
  );
}
