import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import PokemonImageDisplay from "./PokemonImageDisplay";
import GameImageDisplay from "./GameImageDisplay";
import InfoDisplay from "./InfoDisplay";
import GeoLocationDisplay from "./GeoLocationDisplay";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest } from "../../hooks/useAxios";

export default function CompleteDeadDisplay({ data, refetch }) {
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const makeRequest = useMakeRequest();

  const [openDelete, setOpenDelete] = useState(false);

  console.log(data);

  /* DELETE THE SHINY */
  const handleDeleteClick = async () => {
    try {
      await makeRequest("delete", `/deadshiny/${data._id}`);
      navigate("/shiny/dead");
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

            {/* INFORMATION */}
            <Grid item xs={12}>
              <InfoDisplay
                data={data}
                username={username}
                refetch={refetch}
                isDead
              />
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
                isDead
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
