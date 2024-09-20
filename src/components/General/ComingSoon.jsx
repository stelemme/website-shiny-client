// mui imports
import { Box, Typography } from "@mui/material";

// Components
import BoxComponent from "./BoxComponent";

export default function ComingSoon() {
  return (
    <BoxComponent noContrastColor>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
        height={"28px"}
      >
        <Typography
          variant={window.innerWidth < 600 ? "h6" : "h4"}
          fontWeight={"bold"}
        >
          COMMING SOON
        </Typography>
      </Box>
    </BoxComponent>
  );
}
