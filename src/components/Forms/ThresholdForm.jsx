// Mui
import { TextField, InputAdornment } from "@mui/material";

export default function ThresholdForm({ data, setData, type }) {
  return (
    <TextField
      InputProps={{
        endAdornment: <InputAdornment position="start">sec</InputAdornment>,
        inputProps: {
          style: { overflow: 'hidden' }, // Disables scrolling
        },
      }}
      sx={{ mb: "20px" }}
      value={
        type === "lower" ? data.lowerTimeThreshold : data.upperTimeThreshold
      }
      type="number"
      fullWidth
      required
      color="secondary"
      label={type === "lower" ? "Lower Threshold" : "Upper Threshold"}
      onChange={(e) => {
        console.log(typeof(e.target.value))
        if (e.target.value >= 0 || e.target.value === "") {
          setData((prevState) => {
            return {
              ...prevState,
              ...(type === "lower" && { lowerTimeThreshold: e.target.value }),
              ...(type === "upper" && { upperTimeThreshold: e.target.value }),
            };
          });
        }
      }}
    />
  );
}
