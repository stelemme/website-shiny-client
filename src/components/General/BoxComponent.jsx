// mui imports
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function BoxComponent({
  children,
  noContrastColor = false,
  tabs = false,
  p = "20px",
  px = null,
  py = null,
  onClick = null,
  onMouseEnter = null,
  onMouseLeave = null,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let sx = {};

  if (onClick) {
    sx = {
      ...sx,
      "&:hover": {
        cursor: "pointer",
        backgroundColor: colors.primary[900],
      },
    };
  }

  if (tabs) {
    sx = {
      ...sx,
      borderRadius: { xs: "0px 0px 5px 5px", sm: "0px 5px 5px 5px" },
    };
  }

  return (
    <Box
      px={px ? px : p}
      py={py ? py : p}
      width="100%"
      height="100%"
      borderRadius={!tabs ? "" : "5px"}
      backgroundColor={
        noContrastColor ? colors.primary[500] : colors.primary[400]
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={sx}
    >
      {children}
    </Box>
  );
}
