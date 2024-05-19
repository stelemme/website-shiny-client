// Mui
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

export default function LaForm({ data, setData }) {
  return (
    <FormControl sx={{ mb: "5px", mr: "5px" }}>
      <FormLabel focused={false}>Research Level</FormLabel>
      <RadioGroup
        row
        value={data.method.researchLevel}
        onChange={(e, value) => {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                method: {
                  ...prevState.method,
                  researchLevel: value,
                },
              },
            };
          });
        }}
      >
        <FormControlLabel
          value={"0"}
          control={<Radio color="secondary" />}
          label="Level 0-9"
        />
        <FormControlLabel
          value={"10"}
          control={<Radio color="secondary" />}
          label="Level 10"
        />
        <FormControlLabel
          value={"perfect"}
          control={<Radio color="secondary" />}
          label="Perfect Level"
        />
      </RadioGroup>
    </FormControl>
  );
}
