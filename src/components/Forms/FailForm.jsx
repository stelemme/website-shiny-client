// Mui
import { TextField, Autocomplete } from "@mui/material";

const failMethods = [
    "Despawn",
    "Fled",
    "Killed",
    "Soft Reset",
    "Suicide",
    "Uncatchable",
    "-",
  ];

export default function FailForm({setData}) {
  return (
    <Autocomplete
      autoHighlight
      onChange={(e, value, reason) => {
        setData((prevState) => {
          const { failMethod, ...updatedData } = prevState;

          return {
            ...updatedData,
          };
        });
        if (reason === "selectOption") {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                failMethod: value,
              },
            };
          });
        }
      }}
      sx={{ mb: "10px" }}
      options={failMethods}
      renderInput={(params) => (
        <TextField required color="secondary" {...params} label="Fail Method" />
      )}
    />
  );
}
