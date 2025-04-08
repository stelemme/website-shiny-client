import { useParams } from "react-router-dom";

// Mui
import { Box, Typography, TextField } from "@mui/material";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

export default function SearchLevelEditDialog({
  open,
  setOpen,
  setSearchLevel,
  searchLevelEdit,
  setSearchLevelEdit,
}) {
  const { counterId } = useParams();
  const makeRequest = useMakeRequest();

  const handleSearchLevelEditClick = async () => {
    let data = { searchLevel: searchLevelEdit };

    try {
      await makeRequest(
        "patch",
        `/counters/${counterId}?action=searchLevelEdit`,
        data,
        "edit"
      );
      setSearchLevel(searchLevelEdit);
      setOpen(false);
    } catch {
      return;
    }
  };

  return (
    <CustomDialog
      open={open}
      handleClick={handleSearchLevelEditClick}
      handleClose={() => {
        setOpen(false);
      }}
      title={"Edit Search Level"}
      content={
        <Box>
          <Typography mb="15px">
            Edit the Search Level in the field below.
          </Typography>
          <TextField
            color="secondary"
            fullWidth
            label="Search Level"
            type="number"
            value={searchLevelEdit}
            onChange={(e) => setSearchLevelEdit(parseInt(e.target.value))}
          />
        </Box>
      }
      action={"Edit"}
    />
  );
}
