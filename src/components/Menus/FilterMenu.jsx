import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Mui
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// Components imports
import UserMultipleSelect from "../Selects/UserMultipleSelect";
import GenMultipleSelect from "../Selects/GenMultipleSelect";
import GameMultipleSelect from "../Selects/GameMultipleSelect";
import EndDateForm from "../Forms/EndDateForm";
import StartDateForm from "../Forms/StartDateForm";
import PokedexNrForm from "../Forms/PokedexNrForm";

export default function FilterMenu({ open, setOpen }) {
  const [cookies, setCookies] = useCookies([
    "filterTrainer",
    "filterGen",
    "filterGame",
    "filterDate",
  ]);
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleClearAll = () => {
    setCookies("filterTrainer", [], { expires: foreverDate });
    setCookies("filterGen", [], { expires: foreverDate });
    setCookies("filterGame", [], { expires: foreverDate });
    setCookies("filterDate", [], { expires: foreverDate });
    setDates([]);
    setCookies("filterPokedexNrLower", "", { expires: foreverDate });
    setCookies("filterPokedexNrUpper", "", { expires: foreverDate });
  };
  const handleTrainerChange = (e, newValue) => {
    setCookies("filterTrainer", newValue, { expires: foreverDate });
  };
  const handleGenChange = (e, newValue) => {
    setCookies("filterGen", newValue, { expires: foreverDate });
  };
  const handleGameChange = (e, newValue) => {
    setCookies("filterGame", newValue, { expires: foreverDate });
  };
  const handlePokedexNrLowerChange = (newValue) => {
    setCookies("filterPokedexNrLower", newValue, {
      expires: foreverDate,
    });
  };
  const handlePokedexNrUpperChange = (newValue) => {
    setCookies("filterPokedexNrUpper", newValue, {
      expires: foreverDate,
    });
  };

  const [dates, setDates] = useState({
    startDate: cookies.filterDate[0] ? new Date(cookies.filterDate[0]) : null,
    endDate: cookies.filterDate[1] ? new Date(cookies.filterDate[1]) : null,
  });

  useEffect(() => {
    setCookies("filterDate", [dates.startDate, dates.endDate], {
      expires: new Date("9999-12-31T23:59:59"),
    });
  }, [dates, setCookies]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h3" fontWeight="bold">
        Filter Menu
      </DialogTitle>
      <Button
        onClick={handleClearAll}
        variant="outlined"
        color="secondary"
        sx={(theme) => ({
          position: "absolute",
          right: 12,
          top: 12,
        })}
        startIcon={<ClearIcon />}
      >
        Clear filters
      </Button>
      <DialogContent>
        <Box width={isSmallScreen ? "100%" : "400px"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Trainer Filter
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <UserMultipleSelect
                size="normal"
                label="Trainer"
                handleChange={handleTrainerChange}
                fullWidth
                value={cookies["filterTrainer"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Gen or Game Filter
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <GenMultipleSelect
                size="normal"
                label="Gen"
                handleChange={handleGenChange}
                fullwidth
                value={cookies["filterGen"]}
                disabled={cookies["filterGame"].length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <GameMultipleSelect
                size="normal"
                label="Game"
                handleChange={handleGameChange}
                fullwidth
                value={cookies["filterGame"]}
                disabled={cookies["filterGen"].length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Date Filter
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <StartDateForm
                data={dates}
                setData={setDates}
                isForCounter
                required={false}
                emptyPossible
                mb="0px"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <EndDateForm
                data={dates}
                setData={setDates}
                required={false}
                mb="0px"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Pokedex Filter
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <PokedexNrForm
                label="Lower Pokedex Nr."
                data={cookies["filterPokedexNrLower"]}
                onChange={handlePokedexNrLowerChange}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <PokedexNrForm
                label="Upper Pokedex Nr."
                data={cookies["filterPokedexNrUpper"]}
                onChange={handlePokedexNrUpperChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
