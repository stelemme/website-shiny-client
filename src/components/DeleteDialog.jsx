// Mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
    >
      <DialogTitle id="alert-dialog-delete" variant="h4" >
        {`Are you sure you want to delete this ${title}?`}
      </DialogTitle>
      <DialogActions style={{ justifyContent: "center" }} sx={{ mb: "10px" }} >
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
