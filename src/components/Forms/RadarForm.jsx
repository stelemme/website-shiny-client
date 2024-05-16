// Mui
import { TextField } from "@mui/material";

export default function RadarForm({ setData }) {
  return (
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
                  radarChain: parseInt(e.target.value),
                },
              },
            };
          });
        }
      }}
    />
  );
}
