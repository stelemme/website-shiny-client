// mui imports
import { Typography, Box, CircularProgress } from "@mui/material";

export default function LoadingComponent({
  loadingCondition,
  children,
  errorCondition = false,
  errorText = "",
  skeleton = null,
}) {
  return (
    <>
      {loadingCondition && !skeleton && (
        <Box display="flex" gap="10px">
          <CircularProgress color="inherit" size="1rem" />
          <Typography>Loading ...</Typography>
        </Box>
      )}
      {loadingCondition && skeleton}
      {!loadingCondition && errorCondition && (
        <Typography>{errorText}</Typography>
      )}
      {!loadingCondition && !errorCondition && children}
    </>
  );
}
