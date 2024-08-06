import { useRecoilState, useRecoilValue } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../../utils/atoms";

// mui imports
import { Snackbar, Alert, Portal } from "@mui/material";

export default function CustomAlert() {
  const [open, setOpen] = useRecoilState(alertOpen);
  const severity = useRecoilValue(alertSeverity);
  const message = useRecoilValue(alertMessage);

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}
