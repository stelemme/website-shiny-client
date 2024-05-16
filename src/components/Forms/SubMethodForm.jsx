// Mui
import { TextField, Autocomplete } from "@mui/material";

export default function SubMethodForm({
  data,
  setData,
  methodCatList,
  isForCounter = false,
}) {
  if (!isForCounter) {
    return (
      <Autocomplete
        key={methodCatList}
        disabled={!methodCatList}
        autoHighlight
        onChange={(e, value, reason) => {
          if (reason === "selectOption") {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    category: value,
                  },
                },
              };
            });
          }
        }}
        sx={{ mb: "20px" }}
        options={methodCatList ? methodCatList : []}
        renderInput={(params) => (
          <TextField color="secondary" {...params} label="Method Category" />
        )}
      />
    );
  } else {
    return (
      <TextField
        sx={{ mb: "20px" }}
        color="secondary"
        fullWidth
        disabled
        value={data.method.category}
        key={data.method.category}
        label="Method Category"
      />
    );
  }
}
