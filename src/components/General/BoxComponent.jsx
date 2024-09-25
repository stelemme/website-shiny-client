// mui imports
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

export default function BoxComponent({
  children,
  title = null,
  select = null,
  noContrastColor = false,
  tabs = false,
  p = "20px",
  px = null,
  py = null,
  height = "100%",
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
      height={height}
      borderRadius={tabs ? "" : "5px"}
      backgroundColor={
        noContrastColor ? colors.primary[500] : colors.primary[400]
      }
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={sx}
    >
      {title && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
          mb={"14px"}
        >
          <Typography
            variant={window.innerWidth < 600 ? "h5" : "h4"}
            fontWeight={"bold"}
          >
            {title}
          </Typography>
          {select}
        </Box>
      )}
      {children}
    </Box>
  );
}
