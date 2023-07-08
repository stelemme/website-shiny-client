// mui imports
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function Header({ title, subtitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
}
