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

export default function FilterMenu({ open, setOpen, type = "Shiny" }) {
  const [cookies, setCookies] = useCookies([
    `filter${type}Trainer`,
    `filter${type}Gen`,
    `filter${type}Game`,
    `filter${type}Date`,
    `filter${type}PokedexNrLower`,
    `filter${type}PokedexNrUpper`,
  ]);
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleClearAll = () => {
    setCookies(`filter${type}Trainer`, [], { expires: foreverDate });
    setCookies(`filter${type}Gen`, [], { expires: foreverDate });
    setCookies(`filter${type}Game`, [], { expires: foreverDate });
    setCookies(`filter${type}Date`, [], { expires: foreverDate });
    setDates([]);
    setCookies(`filter${type}PokedexNrLower`, "", { expires: foreverDate });
    setCookies(`filter${type}PokedexNrUpper`, "", { expires: foreverDate });
  };
  const handleTrainerChange = (e, newValue) => {
    setCookies(`filter${type}Trainer`, newValue, { expires: foreverDate });
  };
  const handleGenChange = (e, newValue) => {
    setCookies(`filter${type}Gen`, newValue, { expires: foreverDate });
  };
  const handleGameChange = (e, newValue) => {
    setCookies(`filter${type}Game`, newValue, { expires: foreverDate });
  };
  const handlePokedexNrLowerChange = (newValue) => {
    setCookies(`filter${type}PokedexNrLower`, newValue, {
      expires: foreverDate,
    });
  };
  const handlePokedexNrUpperChange = (newValue) => {
    setCookies(`filter${type}PokedexNrUpper`, newValue, {
      expires: foreverDate,
    });
  };

  const [dates, setDates] = useState({
    startDate: cookies[`filter${type}Date`][0]
      ? new Date(cookies[`filter${type}Date`][0])
      : null,
    endDate: cookies[`filter${type}Date`][1]
      ? new Date(cookies[`filter${type}Date`][1])
      : null,
  });

  useEffect(() => {
    setCookies(`filter${type}Date`, [dates.startDate, dates.endDate], {
      expires: new Date("9999-12-31T23:59:59"),
    });
  }, [dates, setCookies, type]);

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
                value={cookies[`filter${type}Trainer`]}
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
                value={cookies[`filter${type}Gen`]}
                disabled={cookies[`filter${type}Game`].length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <GameMultipleSelect
                size="normal"
                label="Game"
                handleChange={handleGameChange}
                fullwidth
                value={cookies[`filter${type}Game`]}
                disabled={cookies[`filter${type}Gen`].length > 0}
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
                data={cookies[`filter${type}PokedexNrLower`]}
                onChange={handlePokedexNrLowerChange}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <PokedexNrForm
                label="Upper Pokedex Nr."
                data={cookies[`filter${type}PokedexNrUpper`]}
                onChange={handlePokedexNrUpperChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
