import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Mui
import { Box, Typography, useTheme, IconButton, Grid } from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";

// Components
import CustomDialog from "../../components/CustomDialog";

// Functions
import meanTimeDifference from "../../functions/meanTimeDifference";

// Hooks
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

const calculateOdds = (odds, rolls, shinyCharm, charmRolls) => {
  return Math.round(
    (1 - ((odds - 1) / odds) ** (rolls + (shinyCharm ? charmRolls : 0))) ** -1
  );
};

const calculatePercentage = (
  encounters,
  odds,
  rolls,
  shinyCharm,
  charmRolls
) => {
  const newOdds = calculateOdds(odds, rolls, shinyCharm, charmRolls);
  return ((1 - ((newOdds - 1) / newOdds) ** encounters) * 100).toFixed(2);
};

export default function Counter() {
  const { counterId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { username } = useAuth();
  const [backgroundColor, setBackgroundColor] = useState(colors.primary[400]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openShiny, setOpenShiny] = useState(false);

  const { response: data } = useAxios({
    method: "get",
    url: `/counters/${counterId}`,
  });

  const [count, setCount] = useState(undefined);
  const [odds, setOdds] = useState(undefined);
  const [percentage, setPercentage] = useState(undefined);
  const [timeDifference, setTimeDifference] = useState(undefined);

  useEffect(() => {
    if (data) {
      setCount(data.counter.totalEncounters);
      setOdds(
        calculateOdds(
          data.counter.method.odds,
          data.counter.method.rolls,
          data.counter.method.shinyCharm,
          data.counter.method?.charmRolls
        )
      );
      setPercentage(
        calculatePercentage(
          data.counter.totalEncounters,
          data.counter.method.odds,
          data.counter.method.rolls,
          data.counter.method.shinyCharm,
          data.counter.method?.charmRolls
        )
      );
      setTimeDifference(
        data.counter.encounters.length > 1
          ? meanTimeDifference(
              data.counter.encounters,
              data.counter.upperTimeThreshold,
              data.counter.lowerTimeThreshold
            )
          : "00:00:00"
      );
    }
  }, [data]);

  const handleCountClick = () => {
    setBackgroundColor(colors.primary[900]);

    axios["patch"](`/counters/${counterId}?action=add`)
      .then((res) => {
        setCount(res.data.counter.totalEncounters);
        setOdds(
          calculateOdds(
            res.data.counter.method.odds,
            res.data.counter.method.rolls,
            res.data.counter.method.shinyCharm,
            res.data.counter.method?.charmRolls
          )
        );
        setPercentage(
          calculatePercentage(
            res.data.counter.totalEncounters,
            res.data.counter.method.odds,
            res.data.counter.method.rolls,
            res.data.counter.method.shinyCharm,
            res.data.counter.method?.charmRolls
          )
        );
        setTimeDifference(
          res.data.counter.encounters.length > 1
            ? meanTimeDifference(
                res.data.counter.encounters,
                res.data.counter.upperTimeThreshold,
                res.data.counter.lowerTimeThreshold
              )
            : "00:00:00"
        );
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setBackgroundColor(colors.primary[400]);
    }, 200);
  };

  const handleUndoClick = () => {
    axios["patch"](`/counters/${counterId}?action=undo`)
      .then((res) => {
        setCount(res.data.counter.totalEncounters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShinyClick = () => {
    axios["patch"](`/counters/${counterId}?action=shiny`)
      .then((res) => {
        console.log(res.data);
        navigate("/counters");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShinyClose = () => {
    setOpenShiny(false);
  };

  const handleShinyOpen = () => {
    setOpenShiny(true);
  };

  const handleDeleteClick = () => {
    axios["delete"](`/counters/${counterId}`)
      .then((res) => {
        console.log(res.data);
        navigate("/counters");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
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
              {data.counter.name.toUpperCase()}
            </Typography>
            {username === data.counter.trainer && (
              <Box ml="10px" display="flex">
                {!data.counter.completed && (
                  <IconButton onClick={handleShinyOpen}>
                    <AutoAwesomeIcon />
                  </IconButton>
                )}
                <CustomDialog
                  open={openShiny}
                  handleClick={handleShinyClick}
                  handleClose={handleShinyClose}
                  title={"Did you get a Shiny Pokémon?"}
                  action={"Caught"}
                />
                {!data.counter.completed && (
                  <IconButton onClick={() => console.log("edit button")}>
                    <EditRoundedIcon />
                  </IconButton>
                )}

                <IconButton onClick={handleDeleteOpen}>
                  <DeleteRoundedIcon />
                </IconButton>
                {!data.counter.completed && (
                  <IconButton onClick={handleUndoClick}>
                    <ReplyTwoToneIcon />
                  </IconButton>
                )}
                <CustomDialog
                  open={openDelete}
                  handleClick={handleDeleteClick}
                  handleClose={handleDeleteClose}
                  title={"Do you want to delete this Counter?"}
                  action={"Delete"}
                />
              </Box>
            )}
          </Box>
          {/* CONTENT */}
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Box display="flex" gap="20px">
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.counter.sprite.game}.png`}
                  height="40px"
                />
              </Box>
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.counter.sprite.dir}/${data.counter.sprite.pokemon}.png`}
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
                {count}
              </Typography>
            </Box>
          </Box>
          <Box
            minHeight="300px"
            borderRadius="30px"
            backgroundColor={backgroundColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="20px"
            onClick={
              username === data.counter.trainer && !data.counter.completed
                ? handleCountClick
                : undefined
            }
            sx={{
              "@media (hover: hover)": {
                ...(username === data.counter.trainer &&
                  !data.counter.completed && {
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: colors.primary[900],
                    },
                  }),
              },
            }}
          >
            <Typography fontSize={80} fontWeight={"bold"}>
              +{data.counter.increment}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Typography fontWeight={"bold"}>Shiny Hunting Method</Typography>
              <Typography>{data.counter.method.name}</Typography>
              <Typography fontStyle={"italic"}>
                {data.counter.method.category}
              </Typography>
              <Typography fontWeight={"bold"}>Trainer</Typography>
              <Typography>{data.counter.trainer}</Typography>
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
              <Typography textAlign={"right"}>{timeDifference}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
