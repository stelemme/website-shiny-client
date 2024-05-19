import { format } from "date-fns";

// Mui
import {
  Box,
  TextField,
  FormControlLabel,
  Grid,
  FormGroup,
  Checkbox,
} from "@mui/material";

export default function StartDateForm({ data, setData, isForCounter = false }) {
  return (
    <Grid container>
      <Grid item xs={isForCounter ? 12 : 8}>
        <TextField
          disabled={!data.startDate}
          required
          color="secondary"
          label="Start Date"
          type={data.startDate ? "date" : "text"}
          fullWidth
          value={
            data.startDate instanceof Date
              ? format(data.startDate, "yyyy-MM-dd")
              : ""
          }
          sx={{ mb: "20px" }}
          onChange={(e) => {
            if (!isNaN(new Date(e.target.value))) {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    startDate: new Date(e.target.value),
                  },
                };
              });
            }
          }}
        />
      </Grid>
      {!isForCounter ? (
        <Grid item xs={4}>
          <Box mt="8px" ml="2px">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    defaultChecked
                    onChange={(e) => {
                      if (e.target.checked) {
                        setData((prevState) => {
                          return {
                            ...prevState,
                            ...{
                              startDate: undefined,
                            },
                          };
                        });
                      } else {
                        setData((prevState) => {
                          return {
                            ...prevState,
                            ...{
                              startDate: new Date(),
                            },
                          };
                        });
                      }
                    }}
                  />
                }
                label={"Undefined"}
              />
            </FormGroup>
          </Box>
        </Grid>
      ) : null}
    </Grid>
  );
}
