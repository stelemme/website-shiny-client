// Mui
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

export default function SvForm({ data, setData }) {
  return (
    <Box>
      <FormControl sx={{ mb: "5px", mr: "5px" }}>
        <FormLabel focused={false}>Sparkling Power</FormLabel>
        <RadioGroup
          row
          value={data.method.svSparklingPower}
          onChange={(e, value) => {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    svSparklingPower: value,
                  },
                },
              };
            });
          }}
        >
          <FormControlLabel
            value={"0"}
            control={<Radio color="secondary" />}
            label="Level 0"
          />
          <FormControlLabel
            value={"1"}
            control={<Radio color="secondary" />}
            label="Level 1"
          />
          <FormControlLabel
            value={"2"}
            control={<Radio color="secondary" />}
            label="Level 2"
          />
          <FormControlLabel
            value={"3"}
            control={<Radio color="secondary" />}
            label="Level 3"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
