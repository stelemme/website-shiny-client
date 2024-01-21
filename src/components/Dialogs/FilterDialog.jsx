import Cookies from "js-cookie";

// Mui
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

// Components imports
import UserSelect from "../Selects/UserSelect";
import GenSelect from "../Selects/GenSelect";

export default function SortMenu({
  open,
  setOpen,
  cookieTrainer,
  cookieGen,
  options,
}) {
  const trainerFilter = Cookies.get(cookieTrainer)
    ? Cookies.get(cookieTrainer)
    : "All";
  const genFilter = Cookies.get(cookieGen) ? Cookies.get(cookieGen) : "All";

  const foreverDate = new Date('9999-12-31T23:59:59');
  const handleTrainerChange = (e) => {
    Cookies.set(cookieTrainer, e.target.value, { expires: foreverDate });
    setOpen(false);
  };

  const handleGenChange = (e) => {
    Cookies.set(cookieGen, e.target.value, { expires: foreverDate });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h4">Filter Menu</DialogTitle>
      <DialogContent>
        {options.includes("trainer") && <Box mt="15px">
          <UserSelect
            size="normal"
            label="User"
            handleChange={handleTrainerChange}
            width={180}
            defaultValue={trainerFilter}
          />
        </Box>}
        {options.includes("gen") && <Box mt="15px">
          <GenSelect
            size="normal"
            label="Generation"
            handleChange={handleGenChange}
            width={180}
            defaultValue={genFilter}
          />
        </Box>}
      </DialogContent>
    </Dialog>
  );
}
