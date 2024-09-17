// mui imports
import { Typography, CircularProgress } from "@mui/material";

export default function LoadingComponent({
  loadingCondition,
  errorCondition,
  children,
}) {
  return (
    <>
      {loadingCondition && <CircularProgress />}
      {errorCondition && <Typography>Error!</Typography>}
      {children}
    </>
  );
}
