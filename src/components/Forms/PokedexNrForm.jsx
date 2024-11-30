// Mui
import { TextField } from "@mui/material";

export default function PokedexNrForm({ data, onChange, label }) {
  return (
    <TextField
      id={label}
      color="secondary"
      label={label}
      type="number"
      fullWidth
      value={data ? data : ""}
      onChange={(e) => {
        if (parseInt(e.target.value) > 0 || e.target.value === "") {
          onChange(parseInt(e.target.value));
        }
      }}
    />
  );
}
