import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

// Mui
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import CounterEncounterGraph from "../../components/Graphs/CounterEncounterGraph";
import IncrementForm from "../../components/Forms/IncrementForm";
import CounterRanking from "../../components/Stats/CounterRanking";
import CounterInfoDialog from "../../components/Dialogs/CounterInfoDialog";
import EncTableDialog from "../../components/Dialogs/EncTableDialog";
import MeanEncTimeEditDialog from "../../components/Dialogs/MeanEncTimeEditDialog";
import SearchLevelEditDialog from "../../components/Dialogs/SearchLevelEditDialog";

// Functions
import {
  calculateMeanEncounterTime,
  calculateProb,
  calculatePercentage,
  calculateEncountersPerDay,
} from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function Counter() {
  const { counterId } = useParams();
  const [searchParams] = useSearchParams();
  const [completed, setCompleted] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { username } = useAuth();
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const [backgroundColor, setBackgroundColor] = useState(colors.primary[400]);
  const [backgroundColorSearchLevel, setBackgroundColorSearchLevel] = useState(
    colors.primary[400]
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [openShiny, setOpenShiny] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEncTable, setOpenEncTable] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  const [openRanking, setOpenRanking] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSearchLevelEdit, setOpenSearchLevelEdit] = useState(false);
  const [openIncrementEdit, setOpenIncrementEdit] = useState(false);
  const [openThresholdEdit, setOpenThresholdEdit] = useState(false);

  const [data, setData] = useState(undefined);
  const [hasData, setHasData] = useState(false);
  const [count, setCount] = useState(undefined);
  const [countEdit, setCountEdit] = useState(undefined);
  const [countAdd, setCountAdd] = useState(0);
  const [odds, setOdds] = useState(undefined);
  const [percentage, setPercentage] = useState(undefined);
  const [timeDifference, setTimeDifference] = useState(undefined);
  const [increment, setIncrement] = useState(undefined);
  const [incrementEdit, setIncrementEdit] = useState(undefined);

  const [searchLevel, setSearchLevel] = useState(0);
  const [searchLevelEdit, setSearchLevelEdit] = useState(0);
  const [encountersToday, setEncountersToday] = useState(0);

  console.log(data);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const completedValue = searchParams.get("completed");
    setCompleted(completedValue);
    if (searchParams.get("completed") === "true") {
      const fetchCounterData = async () => {
        try {
          const response = await getRequest(`/shiny/${counterId}`);
          setData(response);
          setHasData(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCounterData();
    } else if (!searchParams.get("completed")) {
      const fetchCounterData = async () => {
        try {
          const response = await getRequest(`/counters/${counterId}`);
          setData(response);
          setHasData(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCounterData();
    }
  }, [completed, counterId, searchParams]);

  /* DATA FETCHING */
  useEffect(() => {
    if (data) {
      if (!hasData) {
        setCount(data.totalEncounters);
        setCountEdit(data.totalEncounters);
        setEncountersToday(calculateEncountersPerDay(data.encounters));
        setHasData(true);
        if (data.method.function === "dexnav") {
          setSearchLevel(data.method.searchLevel ? data.method.searchLevel : 0);
          setSearchLevelEdit(
            data.method.searchLevel ? data.method.searchLevel : 0
          );
        }
      }
      setOdds(
        calculateProb(
          data.method.odds,
          data.method.rolls,
          data.method.shinyCharm,
          data.method?.charmRolls,
          data.totalEncounters,
          data.method?.function,
          data.method?.searchLevel
        )
      );
      let chainLimit = 0;
      switch (data.method.function) {
        case "pokeradar-gen4":
          chainLimit = 40;
          break;
        case "pokeradar-gen6":
          chainLimit = 40;
          break;
        case "pokeradar-gen8":
          chainLimit = 40;
          break;
        case "chainfishing":
          chainLimit = 20;
          break;
        case "sos-chain-sm":
          chainLimit = 30;
          break;
        case "sos-chain":
          chainLimit = 30;
          break;
        default:
          chainLimit = 0;
      }
      if (data.totalEncounters >= chainLimit) {
        setPercentage(
          calculatePercentage(
            data.totalEncounters - chainLimit,
            data.method.odds,
            data.method.rolls,
            data.method.shinyCharm,
            data.method?.charmRolls,
            data.method?.function,
            data.method?.searchLevel
          )
        );
      } else {
        setPercentage(
          calculatePercentage(
            data.totalEncounters,
            data.method.odds,
            data.method.rolls,
            data.method.shinyCharm,
            data.method?.charmRolls,
            data.method?.function,
            data.method?.searchLevel
          )
        );
      }
      setTimeDifference(
        data.stats.manualMeanEncounterTime
          ? data.stats.meanEncounterTime
          : calculateMeanEncounterTime(
              data.encounters,
              data.upperTimeThreshold,
              data.lowerTimeThreshold,
              data.increment
            )
      );
      setIncrement(data.increment);
      setIncrementEdit({ increment: data.increment });
    }
  }, [data, hasData]);

  /* COUNTER CLICK */
  const handleCountClick = async () => {
    setBackgroundColor(colors.primary[900]);
    setCount((prevState) => {
      return prevState + increment;
    });
    setCountEdit((prevState) => {
      return prevState + increment;
    });
    setEncountersToday((prevState) => {
      return prevState + increment;
    });

    if (data.method.function === "dexnav") {
      setSearchLevel((prevState) => {
        return prevState + 1;
      });
      setSearchLevelEdit((prevState) => {
        return prevState + 1;
      });

      try {
        const response = await makeRequest(
          "patch",
          `/counters/${counterId}?action=addSearchLevel`,
          null,
          null,
          true
        );
        setData(response);
      } catch {
        return;
      }
    }

    setTimeout(() => {
      setBackgroundColor(colors.primary[400]);
    }, 200);

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=add`,
        {
          meanEncounterTime: timeDifference,
          percentage: percentage,
          totalHuntTime: Math.round(timeDifference * (count + data.increment)),
        },
        null,
        true
      );
      setData(response);
    } catch {
      return;
    }
  };

  /* COUNTER UNDO */
  const handleUndoClick = async () => {
    setCount((prevState) => {
      return prevState - increment;
    });
    setCountEdit((prevState) => {
      return prevState - increment;
    });
    setEncountersToday((prevState) => {
      return prevState - increment;
    });

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=undo`,
        null,
        "undo"
      );
      setData(response);
    } catch {
      return;
    }
  };

  /* COMPLETE THE COUNTER */
  const handleShinyClick = () => {
    navigate(`/shiny/create/${counterId}`);
  };

  const handleDeadClick = () => {
    navigate(`/shiny/dead/create/${counterId}`);
  };

  /* DELETE THE COUNTER */
  const handleDeleteClick = async () => {
    if (completed) {
      try {
        await makeRequest("delete", `/shiny/${counterId}`);
        navigate("/counters");
      } catch {
        return;
      }
    } else {
      try {
        await makeRequest("delete", `/counters/${counterId}`);
        navigate("/counters");
      } catch {
        return;
      }
    }
  };

  /* EDIT THE COUNTER */
  const handleEditClick = async () => {
    if (countEdit !== count) {
      let data = { count: countEdit };

      try {
        await makeRequest(
          "patch",
          `/counters/${counterId}?action=encounterEdit`,
          data,
          "edit"
        );
        setCount(countEdit);
        setOpenEdit(false);
      } catch {
        return;
      }
    } else if (countAdd !== 0) {
      let data = { add: countAdd };

      try {
        await makeRequest(
          "patch",
          `/counters/${counterId}?action=encounterAdd`,
          data,
          "edit"
        );
        setCount(count + countAdd);
        setOpenEdit(false);
        setCountAdd(0);
      } catch {
        return;
      }
    }
  };

  const handleIncrementEditClick = async () => {
    let data = { increment: incrementEdit.increment };

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=incrementEdit`,
        data,
        "edit"
      );
      setIncrement(response.increment);
      setOpenIncrementEdit(false);
    } catch {
      return;
    }
  };

  /* SEARCH LEVEL CLICK */
  const handleSearchLevelClick = async () => {
    setBackgroundColorSearchLevel(colors.primary[900]);
    setSearchLevel((prevState) => {
      return prevState + 1;
    });
    setSearchLevelEdit((prevState) => {
      return prevState + 1;
    });

    setTimeout(() => {
      setBackgroundColorSearchLevel(colors.primary[400]);
    }, 200);

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=addSearchLevel`,
        null,
        null,
        true
      );
      setData(response);
    } catch {
      return;
    }
  };

  const encountersTodayDisplay = () => {
    if (!completed) {
      return (
        <Box>
          <Typography>
            <Box sx={{ fontWeight: "bold" }} component="span">
              Encounters Today:
            </Box>{" "}
            {encountersToday}
          </Typography>
        </Box>
      );
    } else {
      return null;
    }
  };

  const dexnavDisplay = () => {
    if (data.method.function === "dexnav") {
      return (
        <Box
          display="flex"
          gap="10px"
          alignContent="center"
          height="40px"
          mb={"20px"}
        >
          <Box
            width="100%"
            minHeight="40px"
            borderRadius="10px"
            backgroundColor={backgroundColorSearchLevel}
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={
              username === data.trainer && !completed
                ? handleSearchLevelClick
                : undefined
            }
            sx={{
              "@media (min-width: 768px)": {
                ...(username === data.trainer &&
                  !completed && {
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: colors.primary[900],
                    },
                  }),
              },
            }}
          >
            <Typography fontSize={20} fontWeight={"bold"}>
              {`Search Level: ${searchLevel}`}
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenSearchLevelEdit(true)}>
            <EditRoundedIcon></EditRoundedIcon>
          </IconButton>
          <SearchLevelEditDialog
            open={openSearchLevelEdit}
            setOpen={setOpenSearchLevelEdit}
            setSearchLevel={setSearchLevel}
            searchLevelEdit={searchLevelEdit}
            setSearchLevelEdit={setSearchLevelEdit}
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      {data && (
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            mb="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              {data.name.toUpperCase()}
            </Typography>

            <Box ml="10px" display="flex">
              {completed && (
                <IconButton onClick={() => navigate(`/shiny/${counterId}`)}>
                  <AutoAwesomeIcon />
                </IconButton>
              )}
              {username === data.trainer && (
                <>
                  {!completed && (
                    <IconButton onClick={() => setOpenShiny(true)}>
                      <AutoAwesomeIcon />
                    </IconButton>
                  )}
                  <CustomDialog
                    open={openShiny}
                    handleClick={handleShinyClick}
                    handleClick2={handleDeadClick}
                    handleClose={() => setOpenShiny(false)}
                    title={"Shiny Encounter"}
                    content={"Did you get a Shiny Pokémon?"}
                    action={"Caught"}
                    action2={"Killed"}
                  />
                  {!completed && (
                    <IconButton onClick={() => setOpenEdit(true)}>
                      <EditRoundedIcon />
                    </IconButton>
                  )}
                  <CustomDialog
                    open={openEdit}
                    handleClick={handleEditClick}
                    handleClose={() => {
                      setOpenEdit(false);
                      setCountEdit(count);
                    }}
                    title={"Edit Encounters"}
                    content={
                      <Box>
                        <Typography mb="15px">
                          Edit the total amount of encounters in the input field
                          below. (These changes are NOT added to the Encounters
                          List)
                        </Typography>
                        <TextField
                          color="secondary"
                          fullWidth
                          label="Total Encounters"
                          type="number"
                          value={countEdit}
                          onChange={(e) =>
                            setCountEdit(parseInt(e.target.value))
                          }
                        />
                        <Typography my="15px">
                          Add a certain amount of Encounters. (These changes are
                          added to the Encounters List)
                        </Typography>
                        <TextField
                          color="secondary"
                          fullWidth
                          label="Add Encounters"
                          type="number"
                          value={countAdd}
                          onChange={(e) =>
                            setCountAdd(parseInt(e.target.value))
                          }
                        />
                      </Box>
                    }
                    action={"Edit"}
                  />
                  <IconButton onClick={() => setOpenDelete(true)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                  {!completed && (
                    <IconButton onClick={handleUndoClick}>
                      <ReplyTwoToneIcon />
                    </IconButton>
                  )}
                  <CustomDialog
                    open={openDelete}
                    handleClick={handleDeleteClick}
                    handleClose={() => setOpenDelete(false)}
                    title={"Delete Counter"}
                    content={"Do you want to delete this Counter?"}
                    warning={
                      "Deleting this counter will delete ALL the counter data forever!"
                    }
                    action={"Delete"}
                  />
                </>
              )}
            </Box>
          </Box>
          {/* IMAGES + COUNT */}
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Box display="flex" gap="20px">
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.sprite.game}.png`}
                  height="40px"
                />
              </Box>
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${data.sprite.pokemon}.png`}
                  height="40px"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius="4px"
              width="125px"
              minWidth="125px"
              mx="10px"
              onClick={
                username === data.trainer && !completed
                  ? () => setOpenIncrementEdit(true)
                  : undefined
              }
              sx={{
                "@media (min-width: 768px)": {
                  ...(username === data.trainer &&
                    !completed && {
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: backgroundColor,
                      },
                    }),
                },
              }}
            >
              <Typography fontWeight={"bold"} variant="h2">
                +{increment}
              </Typography>
            </Box>
            <CustomDialog
              open={openIncrementEdit}
              handleClick={handleIncrementEditClick}
              handleClose={() => setOpenIncrementEdit(false)}
              title={"Edit Increment"}
              content={
                <Box mt={2}>
                  <IncrementForm
                    data={incrementEdit}
                    setData={setIncrementEdit}
                  />
                </Box>
              }
              action={"Edit"}
            />
          </Box>

          {/* COUNT BUTTON */}
          <Box
            minHeight="300px"
            borderRadius="30px"
            backgroundColor={backgroundColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="20px"
            onClick={
              username === data.trainer && !completed
                ? handleCountClick
                : undefined
            }
            sx={{
              "@media (min-width: 768px)": {
                ...(username === data.trainer &&
                  !completed && {
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: colors.primary[900],
                    },
                  }),
              },
            }}
          >
            <Typography fontSize={80} fontWeight={"bold"}>
              {count}
            </Typography>
          </Box>
          {dexnavDisplay()}

          {/* STATS */}
          <Grid container>
            <Grid item xs={6}>
              <Typography fontWeight={"bold"}>Shiny Hunting Method</Typography>
              <Box display="flex" alignItems="center" height="21px">
                <Typography>{data.method.name}</Typography>
                <IconButton size="small" onClick={() => setOpenInfo(true)}>
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>

                {/* DIALOG */}
                <CounterInfoDialog
                  open={openInfo}
                  setOpen={setOpenInfo}
                  count={count}
                  odds={odds}
                  timeDifference={timeDifference}
                  data={data}
                  completed={completed}
                />
              </Box>
              <Typography fontStyle={"italic"}>
                {data.method.category}
              </Typography>
              {encountersTodayDisplay()}

              <Box display="flex" alignItems="center" height="21px">
                <Typography fontWeight={"bold"}>Encounter Graph</Typography>
                <IconButton size="small" onClick={() => setOpenGraph(true)}>
                  <AssessmentOutlinedIcon fontSize="inherit" />
                </IconButton>

                {/* Counter Graph */}
                <CounterEncounterGraph
                  open={openGraph}
                  setOpen={setOpenGraph}
                  data={data}
                  trainer={data.trainer}
                  timeDifference={timeDifference}
                />
              </Box>
              <Box display="flex" alignItems="center" height="21px">
                <Typography fontWeight={"bold"}>Counter Ranking</Typography>
                <IconButton size="small" onClick={() => setOpenRanking(true)}>
                  <ListAltRoundedIcon fontSize="inherit" />
                </IconButton>

                {/* DIALOG */}
                <Dialog
                  open={openRanking}
                  onClose={() => setOpenRanking(false)}
                  fullWidth
                >
                  <DialogContent width="100%">
                    <CounterRanking
                      id={counterId}
                      data={{
                        rankingEnc: count,
                        rankingPercentage: percentage,
                        rankingTime: data?.stats?.totalHuntTime,
                      }}
                      setClose={setOpenRanking}
                      name={data.name}
                      trainer={data.trainer}
                      completed={completed}
                      method={data.method}
                    />
                  </DialogContent>
                </Dialog>
              </Box>
              <Box display="flex" alignItems="center" height="21px">
                <Typography fontWeight={"bold"}>Encounter Table</Typography>
                <IconButton size="small" onClick={() => setOpenEncTable(true)}>
                  <TableChartOutlinedIcon fontSize="inherit" />
                </IconButton>
                <EncTableDialog
                  open={openEncTable}
                  setOpen={setOpenEncTable}
                  game={data.game}
                  name={data.name}
                  totalEncounters={count}
                  editCondition={username === data.trainer}
                  encounterTable={data.encounterTable}
                  completed={completed}
                  counterId={counterId}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={"bold"} textAlign={"right"}>
                Shiny Probability
              </Typography>
              <Typography textAlign={"right"}>1/{odds}</Typography>
              <Typography textAlign={"right"}>{percentage}%</Typography>
              {odds !== 8192 && (
                <Typography textAlign={"right"}>
                  {Math.round((8192 / odds) * count)} : 8192
                </Typography>
              )}
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                {username === data.trainer && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setOpenThresholdEdit(true);
                      }}
                    >
                      <EditRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                )}
                <Typography fontWeight={"bold"} textAlign={"right"}>
                  Mean Encounter Time
                </Typography>
                <MeanEncTimeEditDialog
                  data={data}
                  setData={setData}
                  open={openThresholdEdit}
                  setOpen={setOpenThresholdEdit}
                  count={count}
                  timeDifference={timeDifference}
                  setTimeDifference={setTimeDifference}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap="10px"
              >
                {data.stats.manualMeanEncounterTime && (
                  <Tooltip title="Mean Encounter Time is manually changed">
                    <WarningAmberRoundedIcon />
                  </Tooltip>
                )}
                <Typography textAlign="right">
                  {timeDifference
                    ? (() => {
                        const totalMs = timeDifference * 1000; // timeDifference is in seconds
                        const minutes = Math.floor(totalMs / 60000);
                        const seconds = Math.floor((totalMs % 60000) / 1000);
                        const hundredths = Math.round((totalMs % 1000) / 10);
                        return `${minutes.toString().padStart(2, "0")}:${seconds
                          .toString()
                          .padStart(2, "0")}.${hundredths
                          .toString()
                          .padStart(2, "0")}`;
                      })()
                    : "Undefined"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
