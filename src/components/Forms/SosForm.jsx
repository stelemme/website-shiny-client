// Mui
import { Box, TextField, Typography } from "@mui/material";

export default function SosForm({ setData }) {
  return (
    <Box>
      <Typography>
        Fill in Chain Length 31, if the Chain Length is unknown.
      </Typography>
      <TextField
        fullWidth
        sx={{ mb: "20px" }}
        label="Chain Length"
        required
        type="number"
        color="secondary"
        onChange={(e) => {
          if (parseInt(e.target.value) > 0) {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    sosChain: parseInt(e.target.value),
                  },
                },
              };
            });
          }
        }}
      ></TextField>
    </Box>
  );
}
