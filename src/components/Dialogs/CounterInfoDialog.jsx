import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Mui
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import StartDateForm from "../../components/Forms/StartDateForm";
import EndDateForm from "../../components/Forms/EndDateForm";
import PokemonImage from "../../components/General/PokemonImage";

// Functions
import {
  formatTime,
  calculateDateDifference,
} from "../../functions/statFunctions";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest } from "../../hooks/useAxios";

export default function CounterInfoDialog({
  open,
  setOpen,
  count,
  odds,
  timeDifference,
  data,
  completed,
}) {
  const { counterId } = useParams();
  const { username } = useAuth();
  const makeRequest = useMakeRequest();

  const [openDateEdit, setOpenDateEdit] = useState(false);
  const [dateDifference, setDateDifference] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [startDateEdit, setStartDateEdit] = useState(undefined);
  const [endDateEdit, setEndDateEdit] = useState({});

  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastCount, setLastCount] = useState(undefined);

  /* TIMER */
  const intervalRef = useRef(null);

  useEffect(() => {
    if (data) {
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
  }, [data]);

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

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
          initSprite={data.sprite.pokemon}
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
              <Typography fontWeight={"bold"}>Trainer</Typography>
              <Typography>{data.trainer} </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontWeight={"bold"} textAlign={"right"}>
                Shiny Hunting Method
              </Typography>
              <Typography textAlign={"right"}>{data.method.name}</Typography>
              <Typography fontStyle={"italic"} textAlign={"right"}>
                {data.method.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={"5px"}>
            <Divider />
          </Grid>
          <Grid item xs={6.5} display="flex" alignItems="center" height="21px">
            <Typography fontWeight={"bold"}>Start & End Date</Typography>
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
                        Edit the start & end date in the inputfields below.
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
            <Typography fontWeight={"bold"} textAlign={"right"}>
              Total Hunt Time
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{startDate ? startDate : "Undefined"}</Typography>
            <Typography>{endDate ? endDate : "Undefined"}</Typography>
            <Typography fontWeight={"bold"}>
              {completed ? "Days Hunted" : "Days Hunting"}
            </Typography>
            <Typography>
              {dateDifference} {dateDifference === 1 ? "day" : "days"}{" "}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography textAlign={"right"}>
              {timeDifference
                ? formatTime(Math.round(timeDifference * count), false)
                : "Undefined"}
            </Typography>
            <Typography fontWeight={"bold"} textAlign={"right"}>
              Time to reach Odds
            </Typography>
            <Typography textAlign={"right"}>
              {timeDifference
                ? formatTime(Math.round(timeDifference * odds), false)
                : "Undefined"}
            </Typography>
            <Typography fontWeight={"bold"} textAlign={"right"}>
              Enc./Hour
            </Typography>
          </Grid>
          <Grid item xs={7}>
            {timeDisplay()}
          </Grid>
          <Grid item xs={5}>
            <Typography textAlign={"right"}>
              {timeDifference ? Math.round(3600 / timeDifference) : "Undefined"}
            </Typography>
            <Typography fontWeight={"bold"} textAlign={"right"}>
              Times Odds
            </Typography>
            <Typography textAlign={"right"}>
              {(count / odds).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
