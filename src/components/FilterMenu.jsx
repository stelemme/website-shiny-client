// Mui
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

// Components imports
import UserSelect from "./UserSelect";

export default function SortMenu({ open, setOpen, data, setData }) {
  const handleTrainerChange = (e) => {
    if (e.target.value === "all") {
      setData(data)
    } else {
      setData(data.filter(obj => obj.trainer === e.target.value))
    }
    setOpen(false)
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h4">Filter Menu</DialogTitle>
      <DialogContent>
        <Box mt="5px">
          <UserSelect size="normal" label="User" handleChange={handleTrainerChange} width={150} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
