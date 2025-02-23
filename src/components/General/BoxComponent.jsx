// mui imports
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

export default function BoxComponent({
  children,
  title = null,
  select = null,
  colored = true,
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

  let sx = {
    overflow: "auto",
  };

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
        colored ? noContrastColor ? colors.primary[500] : colors.primary[400] : "inherit"
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
            variant="h3"
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
