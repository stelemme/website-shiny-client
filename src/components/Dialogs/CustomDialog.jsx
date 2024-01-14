// Mui
import {
  Box,
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function CustomDialog({
  open,
  handleClick,
  handleClose,
  title,
  action,
  content,
  warning,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog"
        variant="h3"
        color="secondary"
        sx={{ mt: "10px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box mb="10px">{content}</Box>
        {warning && (
          <Alert severity="error">
            <AlertTitle>ATTENTION</AlertTitle>
            {warning}
          </Alert>
        )}
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "right", gap: "10px" }}
        sx={{ mb: "15px", mr: "15px" }}
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
