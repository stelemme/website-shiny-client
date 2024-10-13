import { Fragment, useState } from "react";

// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Autocomplete,
  Divider,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

// Hooks
import { useGame, useShiny } from "../../hooks/useData";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function GenderStats() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [game, setGame] = useState("");

  const { data: games } = useGame("action=select");

  const { isLoading: gameStatsLoading, data: gameStatsData } = useShiny(
    `stats=gender&gameFilter=${game?.name}`
  );
  const gameStats = gameStatsData?.data[0];

  const { isLoading: gameStatsTotalLoading, data: gameStatsTotalData } =
    useShiny(`stats=genderTotal&gameFilter=${game?.name}`);

  const gameStatsTotal = gameStatsTotalData?.data[0]?.genders;

  const data = ["Joaquin", "Korneel", "Simon", "Stef"];

  return (
    <BoxComponent
      title={"GENDER STATS"}
      select={
        <Autocomplete
          size="small"
          autoHighlight
          onChange={(e, value, reason) => {
            if (reason === "selectOption") {
              setGame(value);
            } else {
              setGame("");
            }
          }}
          options={games ? games.data : []}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              sx={{ width: "200px" }}
              color="secondary"
              {...params}
              label="Game"
            />
          )}
        />
      }
    >
      <Grid container spacing={"12px"}>
        <Grid item xs={12}>
          <BoxComponent py="10px" px="20px" noContrastColor>
            <Grid container>
              <Grid item md={1.98} xs={5.9} container spacing={"12px"}>
                <Grid item xs={12}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"40px"}
                    mt={"12px"}
                  >
                    {game?.sprite ? (
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${game?.sprite}.png`}
                        height={"40px"}
                      />
                    ) : (
                      <Typography
                        fontWeight={"bold"}
                        fontSize={14}
                        align="left"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ALL GAMES
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    MALE
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    FEMALE
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    GENDERLESS
                  </Typography>
                </Grid>

                {window.innerWidth < 500 && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Divider orientation="vertical" />
              </Grid>
              {data?.map((trainer) => {
                let trainerSprite = "";
                let bgColor = "";
                if (trainer === "Korneel") {
                  trainerSprite = "chorneef";
                  bgColor = colors.yellowAccent[200];
                } else if (trainer === "Joaquin") {
                  trainerSprite = "kwakquin";
                  bgColor = colors.redAccent[200];
                } else if (trainer === "Simon") {
                  trainerSprite = "siwob";
                  bgColor = colors.greenAccent[200];
                } else if (trainer === "Stef") {
                  trainerSprite = "t-loc";
                  bgColor = colors.blueAccent[200];
                }
                return (
                  <Fragment key={trainer}>
                    <Grid item md={1.98} xs={5.9} container spacing={"12px"}>
                      <Grid item xs={12}>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          mx={"12px"}
                          mt={"12px"}
                          backgroundColor={bgColor}
                        >
                          <img
                            alt=""
                            src={trainerImages[`Gen 6 - ${trainerSprite}.png`]}
                            style={{ imageRendering: "pixelated" }}
                            height={"40px"}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={14}
                          align="right"
                          sx={{
                            mr: "10px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {gameStatsLoading
                            ? 0
                            : gameStats && gameStats[trainer]
                            ? gameStats[trainer].male
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={14}
                          align="right"
                          sx={{
                            mr: "10px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {gameStatsLoading
                            ? 0
                            : gameStats && gameStats[trainer]
                            ? gameStats[trainer].female
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={14}
                          align="right"
                          sx={{
                            mr: "10px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {gameStatsLoading
                            ? 0
                            : gameStats && gameStats[trainer]
                            ? gameStats[trainer].genderless
                            : 0}
                        </Typography>
                      </Grid>

                      {window.innerWidth < 500 && (
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      )}
                    </Grid>
                    <Grid item>
                      <Divider orientation="vertical" />
                    </Grid>
                  </Fragment>
                );
              })}
              <Grid item md={1.98} xs={5.9} container spacing={"12px"}>
                <Grid item xs={12}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"40px"}
                    mx={"12px"}
                    mt={"12px"}
                    backgroundColor={colors.purpleAccent[200]}
                  >
                    <Typography
                      fontWeight={"bold"}
                      fontSize={14}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      TOTAL
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="right"
                    sx={{
                      mr: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {gameStatsTotalLoading
                      ? 0
                      : gameStatsTotal?.male
                      ? gameStatsTotal?.male
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="right"
                    sx={{
                      mr: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {gameStatsTotalLoading
                      ? 0
                      : gameStatsTotal?.female
                      ? gameStatsTotal?.female
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="right"
                    sx={{
                      mr: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {gameStatsTotalLoading
                      ? 0
                      : gameStatsTotal?.genderless
                      ? gameStatsTotal?.genderless
                      : 0}
                  </Typography>
                </Grid>

                {window.innerWidth < 500 && (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                )}
              </Grid>
              {window.innerWidth < 900 && (
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
              )}
            </Grid>
          </BoxComponent>
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
