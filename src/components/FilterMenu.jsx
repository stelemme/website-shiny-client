import axios from "axios";

// Mui
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

// Components imports
import UserSelect from "./UserSelect";

export default function SortMenu({ open, setOpen, username, trainerFilter, setTrainerFilter }) {
  const handleTrainerChange = (e) => {
    setTrainerFilter(e.target.value)

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `/user?user=${username}&shiniesFilterTrainer=${e.target.value}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    setOpen(false)
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h4">Filter Menu</DialogTitle>
      <DialogContent>
        <Box mt="5px">
          <UserSelect size="normal" label="User" handleChange={handleTrainerChange} width={180} defaultValue={trainerFilter}/>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
