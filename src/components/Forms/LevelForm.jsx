// Mui
import { TextField } from "@mui/material";

export default function LevelForm({ data, setData }) {
  return (
    <TextField
      required
      color="secondary"
      label="Level"
      type="number"
      fullWidth
      value={data.level ? data.level : ""}
      sx={{ mb: "10px" }}
      onChange={(e) => {
        if (
          (parseInt(e.target.value) <= 100 && parseInt(e.target.value) > 0) ||
          e.target.value === ""
        ) {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                level: parseInt(e.target.value),
              },
            };
          });
        }
      }}
    />
  );
}
