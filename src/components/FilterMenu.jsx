import Cookies from "js-cookie"

// Mui
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

// Components imports
import UserSelect from "./UserSelect";

export default function SortMenu({ open, setOpen, cookie }) {
  const shinyTrainerFilter = Cookies.get(cookie) ? Cookies.get(cookie) : "All"

  const handleTrainerChange = (e) => {
    Cookies.set(cookie, e.target.value)
    setOpen(false)
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h4">Filter Menu</DialogTitle>
      <DialogContent>
        <Box mt="5px">
          <UserSelect size="normal" label="User" handleChange={handleTrainerChange} width={180} defaultValue={shinyTrainerFilter}/>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
