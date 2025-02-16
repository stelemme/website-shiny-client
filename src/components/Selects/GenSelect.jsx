import { useState, useEffect } from "react";

// mui imports
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Hooks
import { useGame } from "../../hooks/useData";

export default function GenSelect({
  label,
  handleChange,
  fullwidth = false,
  width = 120,
  size = "small",
  defaultValue = "All",
  disabled = false,
}) {
  const [genList, setGenList] = useState(["All"]);

  const { isLoading: genLoading, data: genData } = useGame("list=gen");

  useEffect(() => {
    if (!genLoading) {
      setGenList(["All", ...genData.data[0].gens]);
    }
  }, [genLoading, genData]);

  return (
    <FormControl
      size={size}
      style={{ minWidth: width }}
      color="secondary"
      fullWidth={fullwidth}
      disabled={disabled}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        color="secondary"
        label={label}
        onChange={handleChange}
        value={defaultValue}
      >
        {genList.map((gen, index) => (
          <MenuItem key={index} value={gen}>
            {gen}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
