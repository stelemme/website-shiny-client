// Mui
import { TextField, InputAdornment } from "@mui/material";

export default function MeanEncForm({ data, setData }) {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" sx={{ ml: 1 }}>
            sec
          </InputAdornment>
        ),
        inputProps: {
          style: { overflow: "hidden" }, // Disables scrolling
        },
      }}
      sx={{ mb: "20px" }}
      value={data.meanEncounterTime}
      type="number"
      fullWidth
      required
      color="secondary"
      label={"Mean Encounter Time"}
      onChange={(e) => {
        if (e.target.value >= 0 || e.target.value === "") {
          setData((prevState) => {
            return {
              ...prevState,
              meanEncounterTime: e.target.value,
            };
          });
        }
      }}
    />
  );
}
