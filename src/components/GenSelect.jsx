import { useState, useEffect } from "react";

// mui imports
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Hooks
import { useGame } from "../hooks/useData";

export default function GenSelect({ label, handleChange, width=120, size="small", defaultValue="All" }) {
  const [genList, setGenList] = useState(["All"]);

  const { isLoading: genLoading, data: genData } = useGame("?genList=true");

  useEffect(() => {
    if (!genLoading) {
      setGenList(["All", ...genData.data]);
    }
  }, [genLoading, genData]);

  return (
    <FormControl size={size} style={{ minWidth: width }} color="secondary">
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
