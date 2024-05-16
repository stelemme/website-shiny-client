// Mui
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

export default function ShinyCharmForm({
  data,
  setData,
  setClearMethod,
  setMethodCatList,
}) {
  return (
    <FormControl sx={{ mb: "5px" }}>
      <FormLabel focused={false}>ShinyCharm</FormLabel>
      <RadioGroup
        row
        value={data.method.shinyCharm}
        onChange={(e, value) => {
          setClearMethod((prevState) =>
            prevState === "method" ? "clearMethod" : "method"
          );
          setMethodCatList(undefined);
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                method: {
                  shinyCharm: JSON.parse(value),
                },
              },
            };
          });
        }}
      >
        <FormControlLabel
          value={false}
          control={<Radio color="secondary" />}
          label="Not Obtained"
        />
        <FormControlLabel
          value={true}
          control={<Radio color="secondary" />}
          label="Obtained"
        />
      </RadioGroup>
    </FormControl>
  );
}
