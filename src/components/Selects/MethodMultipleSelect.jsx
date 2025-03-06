import { useState, useEffect } from "react";

// mui imports
import { Autocomplete, TextField } from "@mui/material";

// Hooks
import { useGame } from "../../hooks/useData";

export default function MethodMultipleSelect({
  label,
  handleChange,
  size = "small",
  value = [],
  fullWidth = false,
  disabled = false,
}) {
  const [methodsList, setMethodsList] = useState([]);

  const { isLoading: methodsLoading, data: methods } = useGame("list=methods");

  const methodListData = methods?.data[0].methodNames;

  useEffect(() => {
    if (!methodsLoading) {
      setMethodsList(methodListData);
    }
  }, [methodListData, methodsLoading]);

  return (
    <Autocomplete
      autoHighlight
      multiple
      disableCloseOnSelect
      disabled={disabled}
      value={value}
      onChange={handleChange}
      options={methodsList}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          size={size}
          fullWidth={fullWidth}
          color="secondary"
          {...params}
          label={label}
        />
      )}
    />
  );
}
