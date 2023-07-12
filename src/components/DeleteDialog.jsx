// Mui
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function DeleteDialog({
  open,
  handleDeleteClick,
  handleDeleteClose,
  title,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleDeleteClose}
      aria-labelledby="alert-dialog-delete"
      sx={{
        maxWidth: "440px",
        mx: "auto"
      }}
    >
      <DialogTitle
        id="alert-dialog-delete"
        variant="h4"
        color="secondary"
        sx={{ mt: "10px" }}
      >
        {`Do you want to delete this ${title}?`}
      </DialogTitle>
      <DialogActions
        style={{ justifyContent: "center", gap: "30px" }}
        sx={{ mb: "20px" }}
      >
        <Button
          variant="contained"
          color="neutral"
          style={{ color: "white" }}
          onClick={handleDeleteClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="neutral"
          style={{ color: "white" }}
          onClick={handleDeleteClick}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
