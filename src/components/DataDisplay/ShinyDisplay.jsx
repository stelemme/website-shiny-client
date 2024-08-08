import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import PokemonImageDisplay from "./PokemonImageDisplay";
import GameImageDisplay from "./GameImageDisplay";
import EvolutionsDisplay from "./EvolutionsDisplay";
import FormDisplay from "./FormDisplay";
import InfoDisplay from "./InfoDisplay";
import GeoLocationDisplay from "./GeoLocationDisplay";
import IconsDisplay from "./IconsDisplay";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function CompleteShinyCard({ data: initialData, refetch }) {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const [data, setData] = useState(initialData);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEvolutionEdit, setOpenEvolutionEdit] = useState(false);
  const [evolutions, setEvolutions] = useState(undefined);
  const [evolutionsEdit, setEvolutionsEdit] = useState([]);
  const [forms, setForms] = useState(undefined);
  const [formsEdit, setFormsEdit] = useState([]);

  console.log(evolutionsEdit);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /* DELETE THE SHINY */
  const handleDeleteClick = async () => {
    try {
      await makeRequest("delete", `/shiny/${data._id}`);
      navigate("/shiny");
    } catch {
      return;
    }
  };

  /* EDIT THE SHINY */
  const handleEvolutionsEdit = async () => {
    let evolutionData = {
      evolutions: evolutionsEdit,
      forms: formsEdit,
    };

    try {
      const res = await makeRequest(
        "patch",
        `/shiny/${data._id}?action=evolutionsEdit`,
        evolutionData,
        "edit"
      );

      setData(res);
      setOpenEvolutionEdit(false);
      setEvolutionsEdit([]);
      setFormsEdit([]);
    } catch (error) {
      return;
    }
  };

  /* GET THE EVOLUTIONS & FORMS */
  const handleEvolutionOpen = async () => {
    try {
      const response = await getRequest(
        `/pokedex?name=${data.name}&evolutions=true&game=${data.game}`
      );
      setEvolutions(response.evolutions);
      setForms(response.forms);
      setOpenEvolutionEdit(true);
    } catch {
      return;
    }
  };

  const CheckboxDisplay = ({ data, name, state, setState }) => {
    if (!data) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography mt="9px" mb="19px">{`Loading ...`}</Typography>
        </Grid>
      );
    } else if (Array.isArray(data) && data.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography mt="9px" mb="19px">{`No ${name} Found`}</Typography>
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
            <Box ml="10px" display="flex">
              {username === data.trainer && (
                <IconButton size="small" onClick={handleEvolutionOpen}>
                  <FileUploadIcon />
                </IconButton>
              )}
              <CustomDialog
                open={openEvolutionEdit}
                handleClick={handleEvolutionsEdit}
                handleClose={() => setOpenEvolutionEdit(false)}
                title={"Edit Evolutions & Forms"}
                content={
                  <>
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
                  </>
                }
                action={"Edit"}
              />
              {data.stats.meanEncounterTime && (
                <IconButton
                  onClick={() =>
                    navigate(`/counters/${data?._id}?completed=true`)
                  }
                >
                  <CalculateOutlinedIcon />
                </IconButton>
              )}
              {username === data.trainer && (
                <IconButton onClick={() => setOpenDelete(true)}>
                  <DeleteRoundedIcon />
                </IconButton>
              )}
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
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* POKEMON SPRITES */}
            <Grid item xs={12}>
              <PokemonImageDisplay
                directory={data.sprite.dir}
                sprite={data.sprite.pokemon}
                gameSort={data.gameSort}
                genderDifference={data.genderDifference}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* GAME SPRITE */}
            <Grid item xs={12}>
              <GameImageDisplay data={data} />
            </Grid>

            {/* EVOLUTION SPRITES */}
            {data.evolutions.length > 0 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
            {data.evolutions.length > 0 && (
              <Grid item xs={12}>
                <EvolutionsDisplay data={data} />
              </Grid>
            )}

            {/* FORM SPRITES */}
            {data.forms.length > 0 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
            {data.forms.length > 0 && (
              <Grid item xs={12}>
                <FormDisplay data={data} />
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* INFORMATION */}
            <Grid item xs={12}>
              <InfoDisplay data={data} username={username} refetch={refetch} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* GEO LOCATION */}
            <Grid item xs={12}>
              <GeoLocationDisplay
                data={data}
                username={username}
                refetch={refetch}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* SPECS */}
            {(username === data.trainer || data?.specs) && (
              <Grid item xs={12}>
                <IconsDisplay
                  data={data}
                  username={username}
                  refetch={refetch}
                  type="specs"
                  exisitingData={data?.specs}
                />
              </Grid>
            )}

            {/* RIBBONS */}
            {(username === data.trainer || data?.ribbons) &&
              parseInt(data.gen.slice(-2).trim()) > 2 && (
                <Grid item xs={12}>
                  <IconsDisplay
                    data={data}
                    username={username}
                    refetch={refetch}
                    type="ribbons"
                    exisitingData={data?.ribbons}
                  />
                </Grid>
              )}

            {/* MARKS */}
            {(username === data.trainer || data?.marks) &&
              parseInt(data.gen.slice(-2).trim()) > 7 && (
                <Grid item xs={12}>
                  <IconsDisplay
                    data={data}
                    username={username}
                    refetch={refetch}
                    type="marks"
                    exisitingData={data?.marks}
                  />
                </Grid>
              )}

            {(username === data.trainer || data?.specs) && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
