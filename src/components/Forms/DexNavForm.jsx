// Mui
import {
  Box,
  TextField
} from "@mui/material";

export default function DexNavForm({ data, setData }) {
  return (
    <Box>
      <TextField
        fullWidth
        sx={{ mb: "20px" }}
        label="Search Level"
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
                    searchLevel: parseInt(e.target.value),
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
