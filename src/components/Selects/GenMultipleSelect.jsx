import { useState, useEffect } from "react";

// mui imports
import { Autocomplete, TextField } from "@mui/material";

// Hooks
import { useGame } from "../../hooks/useData";

export default function GenMultipleSelect({
  label,
  handleChange,
  size = "small",
  value = [],
  fullWidth = false,
  disabled = false,
}) {
  const [genList, setGenList] = useState([]);

  const { isLoading: genLoading, data: genData } = useGame("genList=true");

  useEffect(() => {
    if (!genLoading) {
      setGenList(genData.data);
    }
  }, [genData, genLoading]);

  return (
    <Autocomplete
      autoHighlight
      multiple
      disableCloseOnSelect
      disabled={disabled}
      value={value}
      onChange={handleChange}
      options={genList}
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
