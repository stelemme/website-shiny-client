import { useParams } from "react-router-dom";

// Mui
import { Box, Typography } from "@mui/material";

// Components
import CustomDialog from "./CustomDialog";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

export default function ChainResetDialog({
  open,
  setOpen,
  setChain,
  setData,
}) {
  const { counterId } = useParams();
  const makeRequest = useMakeRequest();

  const handleChainEditClick = async () => {
    let data = { chain: 0 };

    try {
      const response = await makeRequest(
        "patch",
        `/counters/${counterId}?action=chainEdit`,
        data,
        "edit"
      );
      setChain(0);
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
      title={"Reset Chain"}
      content={
        <Box>
          <Typography mb="15px">
            Do you want to reset the chain to 0? This action cannot be undone.
          </Typography>
        </Box>
      }
      action={"Reset"}
    />
  );
}
