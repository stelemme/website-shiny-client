import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Recoil
import { useSetRecoilState } from "recoil";
import { backToggle } from "../../utils/atoms";

// Mui
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import PokemonImageDisplay from "./PokemonImageDisplay";
import GameImageDisplay from "./GameImageDisplay";
import EvolutionsDisplay from "./EvolutionsDisplay";
import FormDisplay from "./FormDisplay";
import InfoDisplay from "./InfoDisplay";
import GeoLocationDisplay from "./GeoLocationDisplay";
import IconsDisplay from "./IconsDisplay";
import CheckboxDisplay from "../General/CheckboxDisplay";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function CompleteShinyCard({
  data: initialData,
  refetch,
  count = false,
  index = false,
}) {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();
  const setBackToggle = useSetRecoilState(backToggle);

  const [data, setData] = useState(initialData);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEvolutionEdit, setOpenEvolutionEdit] = useState(false);
  const [evolutions, setEvolutions] = useState(undefined);
  const [evolutionsEdit, setEvolutionsEdit] = useState([]);
  const [forms, setForms] = useState(undefined);
  const [formsEdit, setFormsEdit] = useState([]);

  useEffect(() => {
    setBackToggle(false);
  }, [setBackToggle]);

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
              {data.name.toUpperCase()} {count ? `(${index + 1}/${count})` : ""}
            </Typography>
            <Box ml="10px" display="flex">
              {data.gameSort <= 20 && (
                <IconButton
                  size="small"
                  onClick={() => setBackToggle((prevState) => !prevState)}
                >
                  <AutorenewIcon />
                </IconButton>
              )}
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
              {data.totalEncounters > 0 && (
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
                ball={data.sprite.ball}
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
            <Grid item xs={12}>
              <EvolutionsDisplay
                evolutions={data.evolutions}
                directory={data.sprite.dir}
                gameSort={data.gameSort}
              />
            </Grid>

            {/* FORM SPRITES */}
            {data.forms.length > 0 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormDisplay
                forms={data.forms}
                directory={data.sprite.dir}
                gameSort={data.gameSort}
              />
            </Grid>

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
