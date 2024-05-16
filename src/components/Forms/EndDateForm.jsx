import { format } from "date-fns";

// Mui
import { TextField } from "@mui/material";

export default function EndDateForm({ data, setData }) {
  return (
    <TextField
      required
      color="secondary"
      label="End Date"
      type="date"
      fullWidth
      value={
        data.endDate instanceof Date ? format(data.endDate, "yyyy-MM-dd") : ""
      }
      sx={{ mb: "20px" }}
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
