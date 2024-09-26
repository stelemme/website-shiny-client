import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

// Mui
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import CounterEncounterGraph from "../../components/Graphs/CounterEncounterGraph";
import StartDateForm from "../../components/Forms/StartDateForm";
import EndDateForm from "../../components/Forms/EndDateForm";
import IncrementForm from "../../components/Forms/IncrementForm";
import ThresholdForm from "../../components/Forms/ThresholdForm";
import PokemonImage from "../../components/General/PokemonImage";

// Functions
import {
  calculateMeanEncounterTime,
  calculateProb,
  calculatePercentage,
  calculateDateDifference,
  calculateEncountersPerDay,
  formatTime,
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
  const [openGraph, setOpenGraph] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDateEdit, setOpenDateEdit] = useState(false);
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
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [startDateEdit, setStartDateEdit] = useState(undefined);
  const [endDateEdit, setEndDateEdit] = useState({});
  const [increment, setIncrement] = useState(undefined);
  const [incrementEdit, setIncrementEdit] = useState(undefined);
  const [thresholdEdit, setThresholdEdit] = useState(undefined);
  const [dateDifference, setDateDifference] = useState(undefined);

  const [searchLevel, setSearchLevel] = useState(0);
  const [searchLevelEdit, setSearchLevelEdit] = useState(0);

  const [lastCount, setLastCount] = useState(undefined);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [encountersToday, setEncountersToday] = useState(0);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const completedValue = searchParams.get("completed");
    setCompleted(completedValue);
    if (searchParams.get("completed") === "true") {
      const fetchCounterData = async () => {
        try {
          const response = await getRequest(`/shiny/${counterId}`);
          setData(response);
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
      setTimeDifference(
        calculateMeanEncounterTime(
          data.encounters,
          data.upperTimeThreshold,
          data.lowerTimeThreshold,
          data.increment
        )
      );
      setIncrement(data.increment);
      setIncrementEdit({ increment: data.increment });
      setThresholdEdit({
        lowerTimeThreshold: data.lowerTimeThreshold,
        upperTimeThreshold: data.upperTimeThreshold,
      });
      if (data.startDate) {
        setStartDate(new Date(data.startDate).toLocaleDateString("nl-BE"));
        setStartDateEdit({ startDate: new Date(data.startDate) });
      }
      if (data.endDate) {
        setEndDate(new Date(data.endDate).toLocaleDateString("nl-BE"));
        setEndDateEdit({ endDate: new Date(data.endDate) });
      }
      if (data.startDate && data.endDate) {
        setDateDifference(
          calculateDateDifference(
            new Date(data.endDate),
            new Date(data.startDate)
          )
        );
      }
      setLastCount(new Date(data.encounters[data.encounters.length - 1]));
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
        { meanEncounterTime: timeDifference, percentage: percentage },
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

  const handleDateEditClick = async () => {
    let data = {
      startDate: startDateEdit.startDate,
      endDate: endDateEdit.endDate,
    };

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=dateEdit`,
        data,
        "edit"
      );
      setStartDate(new Date(response.startDate).toLocaleDateString("nl-BE"));
      setEndDate(new Date(response.endDate).toLocaleDateString("nl-BE"));
      setOpenDateEdit(false);
    } catch {
      return;
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

  const handleThresholdEdit = async () => {
    let data = {
      lowerTimeThreshold: thresholdEdit.lowerTimeThreshold,
      upperTimeThreshold: thresholdEdit.upperTimeThreshold,
    };
    let database = "counters";

    if (searchParams.get("completed") === "true") {
      database = "shiny";
    }

    try {
      await makeRequest(
        "patch",
        `/${database}/${counterId}?action=thresholdEdit`,
        data,
        "edit"
      );
      setOpenThresholdEdit(false);
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

  const handleSearchLevelEditClick = async () => {
    let data = { searchLevel: searchLevelEdit };

    try {
      await makeRequest(
        "patch",
        `/counters/${counterId}?action=searchLevelEdit`,
        data,
        "edit"
      );
      setSearchLevel(searchLevelEdit);
      setOpenSearchLevelEdit(false);
    } catch {
      return;
    }
  };

  /* TIMER */
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateElapsedTime = () => {
      const difference = Math.floor((new Date() - lastCount) / 1000);
      setElapsedTime(difference);
    };

    intervalRef.current = setInterval(updateElapsedTime, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [lastCount]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const timeDisplay = () => {
    if (!completed) {
      return (
        <Box>
          <Typography
            fontWeight={"bold"}
            fontSize={window.innerWidth < 600 ? 12 : 14}
          >
            Last Encounter Time
          </Typography>
          <Typography fontSize={window.innerWidth < 600 ? 12 : 14}>
            {lastCount ? lastCount.toLocaleTimeString() : undefined}
          </Typography>
          <Typography fontSize={window.innerWidth < 600 ? 12 : 14}>
            {elapsedTime ? formatTime(elapsedTime) : "Undefined"}
          </Typography>
        </Box>
      );
    } else {
      return null;
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
          <CustomDialog
            open={openSearchLevelEdit}
            handleClick={handleSearchLevelEditClick}
            handleClose={() => {
              setOpenSearchLevelEdit(false);
            }}
            title={"Edit Search Level"}
            content={
              <Box>
                <Typography mb="15px">
                  Edit the Search Level in the field below.
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  label="Search Level"
                  type="number"
                  value={searchLevelEdit}
                  onChange={(e) => setSearchLevelEdit(parseInt(e.target.value))}
                />
              </Box>
            }
            action={"Edit"}
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
            {username === data.trainer && (
              <Box ml="10px" display="flex">
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
                        Edit the total amount of encounters in the inputfield
                        below. (These changes are NOT added to the Encounters
                        List)
                      </Typography>
                      <TextField
                        color="secondary"
                        fullWidth
                        label="Total Encounters"
                        type="number"
                        value={countEdit}
                        onChange={(e) => setCountEdit(parseInt(e.target.value))}
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
                        onChange={(e) => setCountAdd(parseInt(e.target.value))}
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
              </Box>
            )}
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
                <Dialog
                  open={openInfo}
                  onClose={() => setOpenInfo(false)}
                  sx={{
                    "& .MuiDialog-paper": { width: "300px", maxWidth: "90%" },
                  }}
                >
                  <DialogTitle fontWeight={"bold"} variant="h4">
                    Counter Information
                  </DialogTitle>
                  <DialogContent>
                    <PokemonImage
                      directory={data.sprite.dir}
                      sprite={data.sprite.pokemon}
                      gameSort={data.gameSort}
                      genderDifference={false}
                      shiny
                    />
                    <Grid container>
                      <Grid item xs={12} mb={"5px"}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} container>
                        <Grid item xs={4}>
                          <Typography
                            fontWeight={"bold"}
                            fontSize={window.innerWidth < 600 ? 12 : 14}
                          >
                            Trainer
                          </Typography>
                          <Typography
                            fontSize={window.innerWidth < 600 ? 12 : 14}
                          >
                            {data.trainer}{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            fontWeight={"bold"}
                            textAlign={"right"}
                            fontSize={window.innerWidth < 600 ? 12 : 14}
                          >
                            Shiny Hunting Method
                          </Typography>
                          <Typography
                            textAlign={"right"}
                            fontSize={window.innerWidth < 600 ? 12 : 14}
                          >
                            {data.method.name}
                          </Typography>
                          <Typography
                            fontStyle={"italic"}
                            textAlign={"right"}
                            fontSize={window.innerWidth < 600 ? 12 : 14}
                          >
                            {data.method.category}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} mb={"5px"}>
                        <Divider />
                      </Grid>
                      <Grid
                        item
                        xs={6.5}
                        display="flex"
                        alignItems="center"
                        height="21px"
                      >
                        <Typography
                          fontWeight={"bold"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          Start & End Date
                        </Typography>
                        {username === data.trainer && (
                          <Box>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setOpenDateEdit(true);
                              }}
                            >
                              <EditRoundedIcon fontSize="inherit" />
                            </IconButton>
                            <CustomDialog
                              open={openDateEdit}
                              handleClick={handleDateEditClick}
                              handleClose={() => {
                                setOpenDateEdit(false);
                                setStartDateEdit({
                                  startDate: new Date(data.startDate),
                                });
                                setEndDateEdit({
                                  endDate: new Date(data.endDate),
                                });
                              }}
                              title={"Edit Start & End Date"}
                              content={
                                <Box>
                                  <Typography mb={"15px"}>
                                    Edit the start & end date in the inputfields
                                    below.
                                  </Typography>
                                  <StartDateForm
                                    data={startDateEdit}
                                    setData={setStartDateEdit}
                                    isForCounter
                                  />
                                  <EndDateForm
                                    data={endDateEdit}
                                    setData={setEndDateEdit}
                                  />
                                </Box>
                              }
                              action={"Edit"}
                            />
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={5.5}>
                        <Typography
                          fontWeight={"bold"}
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          Total Hunt Time
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {startDate ? startDate : "Undefined"}
                        </Typography>
                        <Typography
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {endDate ? endDate : "Undefined"}
                        </Typography>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {completed ? "Days Hunted" : "Days Hunting"}
                        </Typography>
                        <Typography
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {dateDifference}{" "}
                          {dateDifference === 1 ? "day" : "days"}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {timeDifference
                            ? formatTime(
                                Math.round(timeDifference * count),
                                false
                              )
                            : "Undefined"}
                        </Typography>
                        <Typography
                          fontWeight={"bold"}
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          Mean Encounter Time
                        </Typography>
                        <Typography
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {timeDifference
                            ? new Date(timeDifference * 1000)
                                .toISOString()
                                .slice(11, 19)
                            : "Undefined"}
                        </Typography>
                        <Typography
                          fontWeight={"bold"}
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          Enc./Hour
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {timeDisplay()}
                      </Grid>
                      <Grid item xs={5}>
                        <Typography
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {timeDifference
                            ? Math.round(3600 / timeDifference)
                            : "Undefined"}
                        </Typography>
                        <Typography
                          fontWeight={"bold"}
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          Times Odds
                        </Typography>
                        <Typography
                          textAlign={"right"}
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                        >
                          {(count / odds).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
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

                {/* DIALOG */}
                <Dialog
                  open={openGraph}
                  onClose={() => setOpenGraph(false)}
                  fullWidth
                >
                  <DialogTitle fontWeight={"bold"} variant="h4">
                    Encounter Graph
                  </DialogTitle>
                  <DialogContent width="100%">
                    <CounterEncounterGraph
                      data={data}
                      trainer={data.trainer}
                      timeDifference={timeDifference}
                    />
                  </DialogContent>
                </Dialog>
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
                <CustomDialog
                  open={openThresholdEdit}
                  handleClick={handleThresholdEdit}
                  handleClose={() => {
                    setOpenThresholdEdit(false);
                  }}
                  title={"Edit the Thresholds"}
                  content={
                    <Grid container mt={1} spacing={2}>
                      <Grid item md={6} xs={12}>
                        <ThresholdForm
                          data={thresholdEdit}
                          setData={setThresholdEdit}
                          type="lower"
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <ThresholdForm
                          data={thresholdEdit}
                          setData={setThresholdEdit}
                          type="upper"
                        />
                      </Grid>
                    </Grid>
                  }
                  action={"Edit"}
                />
              </Box>
              <Typography textAlign={"right"}>
                {timeDifference
                  ? new Date(timeDifference * 1000).toISOString().slice(11, 19)
                  : "Undefined"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
