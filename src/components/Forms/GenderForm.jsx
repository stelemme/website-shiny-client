// Mui
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

export default function GenderForm({ data, setData, genderCheck }) {
  return (
    <FormControl sx={{ mb: "5px" }} disabled={!genderCheck}>
      <FormLabel focused={false}>Gender</FormLabel>
      <RadioGroup
        row
        value={data.gender}
        onChange={(e) => {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                gender: e.target.value,
              },
            };
          });
        }}
      >
        <FormControlLabel
          value={"male"}
          control={<Radio color="secondary" />}
          label="Male"
        />
        <FormControlLabel
          value={"female"}
          control={<Radio color="secondary" />}
          label="Female"
        />
      </RadioGroup>
    </FormControl>
  );
}
