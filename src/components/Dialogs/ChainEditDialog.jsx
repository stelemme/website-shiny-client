import { useParams } from "react-router-dom";

// Mui
import { Box, Typography, TextField } from "@mui/material";

// Components
import CustomDialog from "./CustomDialog";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

export default function ChainEditDialog({
  open,
  setOpen,
  setChain,
  chainEdit,
  setChainEdit,
  setData,
}) {
  const { counterId } = useParams();
  const makeRequest = useMakeRequest();

  const handleChainEditClick = async () => {
    let data = { chain: chainEdit };

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=chainEdit`,
        data,
        "edit"
      );
      setChain(chainEdit);
      setOpen(false);
      setData(response);
    } catch {
      return;
    }
  };

  return (
    <CustomDialog
      open={open}
      handleClick={handleChainEditClick}
      handleClose={() => {
        setOpen(false);
      }}
      title={"Edit Chain"}
      content={
        <Box>
          <Typography mb="15px">
            Edit the Chain in the field below.
          </Typography>
          <TextField
            color="secondary"
            fullWidth
            label="Chain"
            type="number"
            value={chainEdit}
            onChange={(e) => setChainEdit(parseInt(e.target.value))}
          />
        </Box>
      }
      action={"Edit"}
    />
  );
}
