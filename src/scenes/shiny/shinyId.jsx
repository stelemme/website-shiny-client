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
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

// Components
import CustomDialog from "../../components/CustomDialog";

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import useAxios from "axios-hooks";

export default function ShinyId() {
  const { shinyId } = useParams();
  const { username } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);

  const [{ data }] = useAxios(`/shiny/${shinyId}?action=noEncounters`);

  console.log(data);

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
              {data.shiny.name.toUpperCase()}
            </Typography>
            {username === data.shiny.trainer && (
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
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.shiny.sprite.dir}/${data.shiny.sprite.pokemon}.png`}
                  width="100%"
                  style={{ imageRendering: "pixelated" }}
                />
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${data.shiny.sprite.ball}.png`}
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
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon/${data.shiny.sprite.dir}/${data.shiny.sprite.pokemon}.png`}
                width="100%"
                style={{ imageRendering: "pixelated" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box width={"100%"} display="flex" justifyContent="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.shiny.sprite.game}.png`}
                  height="50px"
                />
              </Box>
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
                infoName={`#${data.shiny.pokedexNo}`}
              />
              <InfoDisplay infoCat={"Pokémon"} infoName={data.shiny.name} />
              <InfoDisplay infoCat={"Nature"} infoName={data.shiny.nature} />
              <InfoDisplay
                infoCat={"Gender"}
                infoName={
                  data.shiny.gender === "male"
                    ? "♂"
                    : data.shiny.gender === "female"
                    ? "♀"
                    : "-"
                }
              />
              <InfoDisplay
                infoCat={"Level Caught"}
                infoName={`lvl. ${data.shiny.level}`}
              />
              <InfoDisplay
                infoCat={"Nickname"}
                infoName={data.shiny.nickname ? data.shiny.nickname : "-"}
              />
            </Grid>
            <Grid item xs={6}>
              <InfoDisplay
                infoCat={"Encounters"}
                infoName={data.shiny.totalEncounters}
              />
              <InfoDisplay
                infoCat={"Probability"}
                infoName={`1/${data.shiny.stats.probability}`}
              />
              <InfoDisplay
                infoCat={"Percentage"}
                infoName={
                  data.shiny.stats.percentage
                    ? `${data.shiny.stats.percentage}%`
                    : "-"
                }
              />
              <InfoDisplay
                infoCat={"Date Caught"}
                infoName={new Date(data.shiny.endDate).toLocaleDateString()}
              />
            </Grid>

            <Grid item xs={12}>
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Game"}
                infoName={data.shiny.game}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Generation"}
                infoName={data.shiny.gen}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Method"}
                infoName={data.shiny.method.name}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Category"}
                infoName={
                  data.shiny.method.catergory
                    ? data.shiny.method.catergory
                    : "-"
                }
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"Location"}
                infoName={data.shiny.location}
              />
              <InfoDisplay
                xs1={2.75}
                xs2={9.25}
                infoCat={"IRL Location"}
                infoName={data.shiny.IRLLocation}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {data.shiny.stats.meanEncounterTime && (
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" fontWeight={"bold"}>
                    COUNTER STATS
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <InfoDisplay
                    infoCat={"Start Date"}
                    infoName={new Date(
                      data.shiny.startDate
                    ).toLocaleDateString()}
                  />
                  <InfoDisplay
                    infoCat={"End Date"}
                    infoName={new Date(data.shiny.endDate).toLocaleDateString()}
                  />
                  <InfoDisplay
                    infoCat={"Days Hunted"}
                    infoName={`${data.shiny.stats.daysHunting} days`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InfoDisplay
                    infoCat={"Mean Enc. Time"}
                    infoName={new Date(
                      data.shiny.stats.meanEncounterTime * 1000
                    )
                      .toISOString()
                      .slice(11, 19)}
                  />
                  <InfoDisplay
                    infoCat={"Total Time"}
                    infoName={formatTime(
                      Math.round(data.shiny.stats.totalHuntTime)
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
