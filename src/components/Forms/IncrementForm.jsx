// Mui
import { TextField } from "@mui/material";

export default function IncrementForm({ data, setData }) {
  return (
    <TextField
      sx={{ mb: "20px" }}
      value={data.increment}
      type="number"
      fullWidth
      required
      color="secondary"
      label="Increment"
      onChange={(e) => {
        if (e.target.value > 0 || e.target.value === "") {
          setData((prevState) => {
            return {
              ...prevState,
              ...{ increment: e.target.value },
            };
          });
        }
      }}
    />
  );
}
