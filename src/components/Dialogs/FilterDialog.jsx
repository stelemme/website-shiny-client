import { useCookies } from "react-cookie";

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
  const [cookies, setCookies] = useCookies([cookieTrainer, cookieGen]);

  const foreverDate = new Date('9999-12-31T23:59:59');
  const handleTrainerChange = (e) => {
    setCookies(cookieTrainer, e.target.value, { expires: foreverDate });
    setOpen(false);
  };

  const handleGenChange = (e) => {
    setCookies(cookieGen, e.target.value, { expires: foreverDate });
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
            defaultValue={cookies[cookieTrainer]}
          />
        </Box>}
        {options.includes("gen") && <Box mt="15px">
          <GenSelect
            size="normal"
            label="Generation"
            handleChange={handleGenChange}
            width={180}
            defaultValue={cookies[cookieGen]}
          />
        </Box>}
      </DialogContent>
    </Dialog>
  );
}
