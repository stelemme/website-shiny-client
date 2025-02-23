// Mui
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function GenderForm({ data, setData, genderCheck }) {
  const getRequest = useGetRequest();

  return (
    <FormControl sx={{ mb: "5px" }} disabled={!genderCheck}>
      <FormLabel focused={false}>Gender</FormLabel>
      <RadioGroup
        row
        value={data.gender ? data.gender : ""}
        onChange={async (e) => {
          let genderDifference = false;
          if (e.target.value === "female") {
            const response = await getRequest(
              `/pokedex?filter=complex&filterName=${data.name}`
            );
            genderDifference = response[0].genderDifference;
          }

          setData((prevState) => {
            return {
              ...prevState,
              ...{
                gender: e.target.value,
                genderDifference: genderDifference,
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
