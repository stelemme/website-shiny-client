// Mui
import { TextField, Autocomplete } from "@mui/material";

export default function LocationsForm({ setData, locationsList }) {
  return (
    <Autocomplete
      key={locationsList}
      disabled={!locationsList}
      autoHighlight
      onChange={(e, value, reason) => {
        setData((prevState) => {
          const { location, ...rest } = prevState;
          return rest;
        });
        if (reason === "selectOption") {
          setData((prevState) => {
            return { ...prevState, ...{ location: value } };
          });
        }
      }}
      sx={{ mb: "20px" }}
      options={locationsList ? locationsList : []}
      renderInput={(params) => (
        <TextField required color="secondary" {...params} label="Location" />
      )}
    />
  );
}
