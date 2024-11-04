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

// Functions
import { formatTime } from "../../functions/statFunctions";

// Hooks
import { useGame, useShiny } from "../../hooks/useData";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function GameStats() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [game, setGame] = useState("");

  const { data: games } = useGame("action=select");

  const { isLoading: gameStatsLoading, data: gameStatsData } = useShiny(
    `stats=gameUser&gameFilter=${game?.name}`
  );
  const gameStats = gameStatsData?.data[0];

  const { isLoading: gameStatsTotalLoading, data: gameStatsTotalData } =
    useShiny(`stats=gameTotal&gameFilter=${game?.name}`);
  const gameStatsTotal = gameStatsTotalData?.data[0];

  const data = ["Joaquin", "Korneel", "Simon", "Stef"];

  return (
    <BoxComponent
      title={"GAME STATS"}
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
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #SHINY POKEMON
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #COUNTED SHINIES
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #OVER ODDS
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #UNDER ODDS
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    AVERAGE #ENC.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    TOTAL #ENC.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    TOTAL TIME
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
              {data.map((trainer) => {
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
                            ? gameStats[trainer].shinyAmount
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
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
                            ? gameStats[trainer].countedShinyAmount
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
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
                            ? gameStats[trainer].overOdds
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
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
                            ? gameStats[trainer].underOdds
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
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
                            ? gameStats[trainer].totalEncountersAvg
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
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
                            ? gameStats[trainer].totalEncountersSum
                            : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          fontWeight={"bold"}
                          align="right"
                          sx={{
                            mr: "10px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {gameStatsLoading
                            ? formatTime(0, false)
                            : gameStats && gameStats[trainer]
                            ? formatTime(gameStats[trainer].totalTimeSum, false)
                            : formatTime(0, false)}
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
                      : gameStatsTotal
                      ? gameStatsTotal.shinyAmount
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
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
                      : gameStatsTotal
                      ? gameStatsTotal.countedShinyAmount
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
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
                      : gameStatsTotal
                      ? gameStatsTotal.overOdds
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
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
                      : gameStatsTotal
                      ? gameStatsTotal.underOdds
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
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
                      : gameStatsTotal
                      ? gameStatsTotal.totalEncountersAvg
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
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
                      : gameStatsTotal
                      ? gameStatsTotal.totalEncountersSum
                      : 0}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={"bold"}
                    align="right"
                    sx={{
                      mr: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {gameStatsTotalLoading
                      ? formatTime(0, false)
                      : gameStatsTotal
                      ? formatTime(gameStatsTotal.totalTimeSum, false)
                      : formatTime(0, false)}
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
