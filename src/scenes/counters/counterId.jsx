import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

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

// Recharts
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";

// Components
import CustomDialog from "../../components/CustomDialog";

// Functions
import {
  calculateMeanEncounterTime,
  calculateProb,
  calculatePercentage,
  calculateDateDifference,
  calculateEncountersPerDay,
  formatTime,
  formatEncounterData,
} from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

export default function Counter() {
  const { counterId } = useParams();
  const [searchParams] = useSearchParams();
  const [completed, setCompleted] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { username } = useAuth();
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

  const [data, setData] = useState(undefined);
  const [hasData, setHasData] = useState(false);
  const [count, setCount] = useState(undefined);
  const [countEdit, setCountEdit] = useState(undefined);
  const [odds, setOdds] = useState(undefined);
  const [percentage, setPercentage] = useState(undefined);
  const [timeDifference, setTimeDifference] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [startDateEdit, setStartDateEdit] = useState(undefined);
  const [endDateEdit, setEndDateEdit] = useState(undefined);
  const [dateDifference, setDateDifference] = useState(undefined);

  const [searchLevel, setSearchLevel] = useState(0);
  const [searchLevelEdit, setSearchLevelEdit] = useState(0);

  const [lastCount, setLastCount] = useState(undefined);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [encountersToday, setEncountersToday] = useState(0);

  useEffect(() => {
    const completedValue = searchParams.get("completed");
    setCompleted(completedValue);
    if (completed) {
      const fetchCounterData = async () => {
        try {
          const res = await axios.get(`/shiny/${counterId}`);
          setData(res.data.shiny);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCounterData();
    } else {
      const fetchCounterData = async () => {
        try {
          const res = await axios.get(`/counters/${counterId}`);
          setData(res.data.counter);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCounterData();
    }
  }, [completed, counterId, searchParams]);

  console.log(data)

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
          data.method?.function
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
      if (data.startDate) {
        setStartDate(new Date(data.startDate).toLocaleDateString());
        setStartDateEdit(format(new Date(data.startDate), "yyyy-MM-dd"));
      }
      if (data.endDate) {
        setEndDate(new Date(data.endDate).toLocaleDateString());
        setEndDateEdit(format(new Date(data.endDate), "yyyy-MM-dd"));
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
  const handleCountClick = () => {
    setBackgroundColor(colors.primary[900]);
    setCount((prevState) => {
      return prevState + data.increment;
    });
    setCountEdit((prevState) => {
      return prevState + data.increment;
    });
    setEncountersToday((prevState) => {
      return prevState + data.increment;
    });

    setTimeout(() => {
      setBackgroundColor(colors.primary[400]);
    }, 200);

    axios["patch"](`/counters/${counterId}?action=add`)
      .then((res) => {
        setData(res.data.counter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* COUNTER UNDO */
  const handleUndoClick = () => {
    setCount((prevState) => {
      return prevState - data.increment;
    });
    setCountEdit((prevState) => {
      return prevState - data.increment;
    });
    setEncountersToday((prevState) => {
      return prevState - data.increment;
    });
    axios["patch"](`/counters/${counterId}?action=undo`)
      .then((res) => {
        setData(res.data.counter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* COMPLETE THE COUNTER */
  const handleShinyClick = () => {
    navigate(`/shiny/create/${counterId}`);
  };

  /* DELETE THE COUNTER */
  const handleDeleteClick = () => {
    if (completed) {
      axios["delete"](`/shiny/${counterId}`)
        .then((res) => {
          navigate("/counters");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios["delete"](`/counters/${counterId}`)
        .then((res) => {
          navigate("/counters");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /* EDIT THE COUNTER */
  const handleEditClick = () => {
    let data = JSON.stringify({
      count: countEdit,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `/counters/${counterId}?action=encounterEdit`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setCount(countEdit);
        setOpenEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDateEditClick = () => {
    let data = JSON.stringify({
      startDate: startDateEdit,
      endDate: endDateEdit,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `/counters/${counterId}?action=dateEdit`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        setStartDate(new Date(res.data.startDate).toLocaleDateString());
        setEndDate(new Date(res.data.endDate).toLocaleDateString());
        setOpenDateEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* SEARCH LEVEL CLICK */
  const handleSearchLevelClick = () => {
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

    axios["patch"](`/counters/${counterId}?action=addSearchLevel`)
      .then((res) => {
        setData(res.data.counter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchLevelEditClick = () => {
    let data = JSON.stringify({
      searchLevel: searchLevelEdit,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `/counters/${counterId}?action=searchLevelEdit`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
        setSearchLevel(searchLevelEdit);
        setOpenSearchLevelEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Typography fontWeight={"bold"}>Last Encounter Time</Typography>
          <Typography>
            {lastCount ? lastCount.toLocaleTimeString() : undefined}
          </Typography>
          <Typography>
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
                ></TextField>
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
                  handleClose={() => setOpenShiny(false)}
                  title={"Shiny Encounter"}
                  content={"Did you get a Shiny Pokémon?"}
                  action={"Caught"}
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
                        below.
                      </Typography>
                      <TextField
                        color="secondary"
                        fullWidth
                        label="Total Encounters"
                        type="number"
                        value={countEdit}
                        onChange={(e) => setCountEdit(parseInt(e.target.value))}
                      ></TextField>
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
            >
              <Typography fontWeight={"bold"} variant="h2">
                +{data.increment}
              </Typography>
            </Box>
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
              <Typography>{data.method.name}</Typography>
              <Typography fontStyle={"italic"}>
                {data.method.category}
              </Typography>
              {encountersTodayDisplay()}
              <Box display="flex" alignItems="center" height="21px">
                <Typography fontWeight={"bold"}>Extra Information</Typography>
                <IconButton size="small" onClick={() => setOpenInfo(true)}>
                  <InfoOutlinedIcon fontSize="inherit" />
                </IconButton>

                {/* DIALOG */}
                <Dialog open={openInfo} onClose={() => setOpenInfo(false)}>
                  <DialogTitle fontWeight={"bold"} variant="h4">
                    Counter Information
                  </DialogTitle>
                  <DialogContent>
                    <img
                      alt=""
                      src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${data.sprite.pokemon}.png`}
                      width="240px"
                      style={{ imageRendering: "pixelated" }}
                      onError={(e) => {
                        e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${data.sprite.pokemon}.png`;
                      }}
                    />
                    <Grid container width={"240px"}>
                      <Grid item xs={12} mb={"5px"}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} container>
                        <Grid item xs={4}>
                          <Typography fontWeight={"bold"}>Trainer</Typography>
                          <Typography>{data.trainer}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography fontWeight={"bold"} textAlign={"right"}>
                            Shiny Hunting Method
                          </Typography>
                          <Typography textAlign={"right"}>
                            {data.method.name}
                          </Typography>
                          <Typography fontStyle={"italic"} textAlign={"right"}>
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
                        <Typography fontWeight={"bold"}>
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
                                setStartDateEdit(
                                  format(new Date(data.startDate), "yyyy-MM-dd")
                                );
                                setEndDateEdit(
                                  format(new Date(data.endDate), "yyyy-MM-dd")
                                );
                              }}
                              title={"Edit Start & End Date"}
                              content={
                                <Box>
                                  <Typography mb={"15px"}>
                                    Edit the start & end date in the inputfields
                                    below.
                                  </Typography>
                                  <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    value={startDateEdit}
                                    onChange={(e) =>
                                      setStartDateEdit(e.target.value)
                                    }
                                    style={{ marginBottom: "15px" }}
                                  />
                                  <TextField
                                    color="secondary"
                                    fullWidth
                                    label="End Date"
                                    type="date"
                                    value={endDateEdit}
                                    onChange={(e) =>
                                      setEndDateEdit(e.target.value)
                                    }
                                  />
                                </Box>
                              }
                              action={"Edit"}
                            />
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={5.5}>
                        <Typography fontWeight={"bold"} textAlign={"right"}>
                          Shiny Probability
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography>
                          {startDate ? startDate : "Undefined"}
                        </Typography>
                        <Typography>
                          {endDate ? endDate : "Undefined"}
                        </Typography>
                        <Typography fontWeight={"bold"}>
                          {completed ? "Days Hunted" : "Days Hunting"}
                        </Typography>
                        <Typography>
                          {dateDifference}{" "}
                          {dateDifference === 1 ? "day" : "days"}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography textAlign={"right"}>1/{odds}</Typography>
                        <Typography textAlign={"right"}>
                          {percentage}%
                        </Typography>
                        <Typography fontWeight={"bold"} textAlign={"right"}>
                          Mean Encounter Time
                        </Typography>
                        <Typography textAlign={"right"}>
                          {timeDifference
                            ? new Date(timeDifference * 1000)
                                .toISOString()
                                .slice(11, 19)
                            : "Undefined"}
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        {timeDisplay()}
                      </Grid>
                      <Grid item xs={5}>
                        <Typography fontWeight={"bold"} textAlign={"right"}>
                          Total Time
                        </Typography>
                        <Typography textAlign={"right"}>
                          {timeDifference
                            ? formatTime(
                                Math.round(timeDifference * count),
                                false
                              )
                            : "Undefined"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </Box>
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
                    <ResponsiveContainer
                      width="100%"
                      height={window.innerWidth < 500 ? 300 : 400}
                    >
                      <BarChart
                        data={formatEncounterData(data.encounters)}
                        margin={{
                          top: 0,
                          right: 0,
                          bottom: -15,
                          left: 5,
                        }}
                      >
                        <XAxis
                          dataKey="date"
                          scale="time"
                          type="number"
                          domain={[dataMin => dataMin, () => new Date(data.endDate).getTime()]}
                          tick={false}
                          axisLine={{ stroke: colors.primary[200] }}
                          tickLine={{ stroke: colors.primary[200] }}
                        />
                        <YAxis
                          dataKey="value"
                          width={25}
                          tick={{ fill: colors.grey[100] }}
                          axisLine={{ stroke: colors.primary[200] }}
                          tickLine={{ stroke: colors.primary[200] }}
                        />
                        <CartesianGrid stroke={colors.primary[200]} />
                        <Tooltip
                          labelStyle={{ color: "black" }}
                          labelFormatter={(value) => {
                            return `${new Date(value).toLocaleDateString()}`;
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill={colors.redAccent[500]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
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
              <Typography fontWeight={"bold"} textAlign={"right"}>
                Mean Encounter Time
              </Typography>
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
