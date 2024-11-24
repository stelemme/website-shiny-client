import { useCookies } from "react-cookie";

// Mui
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useMediaQuery,
} from "@mui/material";

// Components imports
import UserMultipleSelect from "../Selects/UserMultipleSelect";
import GenMultipleSelect from "../Selects/GenMultipleSelect";
import GameMultipleSelect from "../Selects/GameMultipleSelect";

export default function FilterMenu({ open, setOpen }) {
  const [cookies, setCookies] = useCookies([
    "filterTrainer",
    "filterGen",
    "filterGame",
  ]);
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const foreverDate = new Date("9999-12-31T23:59:59");

  console.log(cookies["filterGame"]);

  const handleTrainerChange = (e, newValue) => {
    setCookies("filterTrainer", newValue, { expires: foreverDate });
  };
  const handleGenChange = (e, newValue) => {
    setCookies("filterGen", newValue, { expires: foreverDate });
  };
  const handleGameChange = (e, newValue) => {
    const namesArray = newValue.map((obj) => obj.name);
    console.log(namesArray);
    setCookies("filterGame", newValue, { expires: foreverDate });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h3" fontWeight="bold">
        Filter Menu
      </DialogTitle>
      <DialogContent>
        <Box width={isSmallScreen ? "100%" : "400px"}>
          <Grid container spacing={2} mt="5px">
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
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
