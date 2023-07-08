// mui imports
import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function CounterHeader({ title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="20px" display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Box ml="10px" display="flex">
        <IconButton onClick={() => console.log("shiny button")}>
          <AutoAwesomeIcon />
        </IconButton>
        <IconButton onClick={() => console.log("edit button")}>
          <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={() => console.log("delete button")}>
          <DeleteRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
