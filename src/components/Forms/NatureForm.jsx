// Mui
import { TextField, Autocomplete } from "@mui/material";

const natures = [
  "Adamant",
  "Bashful",
  "Bold",
  "Brave",
  "Calm",
  "Careful",
  "Docile",
  "Gentle",
  "Hardy",
  "Hasty",
  "Impish",
  "Jolly",
  "Lax",
  "Lonely",
  "Mild",
  "Modest",
  "Naive",
  "Naughty",
  "Quiet",
  "Quirky",
  "Rash",
  "Relaxed",
  "Sassy",
  "Serious",
  "Timid",
  "-",
];

export default function NatureForm({ setData, natureCheck = true }) {
  return (
    <Autocomplete
      key={natureCheck}
      autoHighlight
      onChange={(e, value, reason) => {
        setData((prevState) => {
          const { nature, ...updatedData } = prevState;

          return {
            ...updatedData,
          };
        });
        if (reason === "selectOption") {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                nature: value,
              },
            };
          });
        }
      }}
      sx={{ mb: "10px" }}
      options={natures}
      renderInput={(params) => (
        <TextField required color="secondary" {...params} label="Nature" />
      )}
    />
  );
}
