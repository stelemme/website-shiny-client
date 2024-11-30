import { format } from "date-fns";

// Mui
import { TextField } from "@mui/material";

export default function EndDateForm({
  data,
  setData,
  required = true,
  mb = "20px",
}) {
  return (
    <TextField
      required={required}
      color="secondary"
      label="End Date"
      type="date"
      fullWidth
      value={
        data.endDate instanceof Date && !isNaN(data.endDate)
          ? format(data.endDate, "yyyy-MM-dd")
          : ""
      }
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ mb: mb }}
      onChange={(e) => {
        if (!isNaN(new Date(e.target.value))) {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                endDate: new Date(e.target.value),
              },
            };
          });
        }
      }}
    />
  );
}
