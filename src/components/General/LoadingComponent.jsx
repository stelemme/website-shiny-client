// mui imports
import { Typography, Box, CircularProgress, Grid } from "@mui/material";

export default function LoadingComponent({
  loadingCondition,
  children,
  errorCondition = false,
  errorText = "",
  skeleton = null,
  grid = false,
  m = ""
}) {
  return (
    <>
      {loadingCondition && !skeleton && (
        <>
          {grid ? (
            <Grid item xs={12} m={m}>
              <CircularProgress color="inherit" size="1rem" />
              <Typography>Loading ...</Typography>
            </Grid>
          ) : (
            <Box display="flex" gap="10px">
              <CircularProgress color="inherit" size="1rem" />
              <Typography>Loading ...</Typography>
            </Box>
          )}
        </>
      )}

      {loadingCondition && skeleton}
      {!loadingCondition && errorCondition && (
        <Typography>{errorText}</Typography>
      )}
      {!loadingCondition && !errorCondition && children}
    </>
  );
}
