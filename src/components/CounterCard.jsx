// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function CounterCard({ gameSprite, name, count }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      p="15px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      onClick={() => console.log("test")}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: colors.primary[900],
        },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        {/* GAME IMAGE */}
        <Box
          display="inline-flex"
          width="90px"
          minWidth="90px"
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${gameSprite}.png`}
            height="33px"
          />
        </Box>
        {/* COUNTER NAME */}
        <Box flexGrow={1} display="flex" alignItems="center" ml="15px">
          <Typography fontWeight={"bold"} variant="h5" align="left">
            {name}
          </Typography>
        </Box>
        {/* COUNT */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderRadius="4px"
          width="65px"
          minWidth="65px"
        >
          <Typography fontWeight={"bold"} variant="h5">
            {count}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
