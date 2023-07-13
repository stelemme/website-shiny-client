// Mui
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function CustomDialog({
  open,
  handleClick,
  handleClose,
  title,
  action,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog"
      sx={{
        maxWidth: "440px",
        mx: "auto",
      }}
    >
      <DialogTitle
        id="alert-dialog"
        variant="h4"
        color="secondary"
        sx={{ mt: "10px" }}
      >
        {title}
      </DialogTitle>
      <DialogActions
        style={{ justifyContent: "center", gap: "20px" }}
        sx={{ mb: "20px" }}
      >
        <Button
          variant="contained"
          color="neutral"
          style={{ color: "white" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="neutral"
          style={{ color: "white" }}
          onClick={handleClick}
          autoFocus
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
