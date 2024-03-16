// mui imports
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function GeneralSelect({
  label,
  handleChange,
  list,
  value,
  width = 120,
  size = "small",
}) {
  return (
    <FormControl size={size} style={{ minWidth: width }} color="secondary">
      <InputLabel>{label} </InputLabel>
      <Select
        color="secondary"
        label={label}
        onChange={handleChange}
        value={value}
      >
        {list.map((item, index) =>
          item.charAt(0) === "_" ? (
            <MenuItem key={index} value={item} divider>
              {item.slice(1)}
            </MenuItem>
          ) : (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}
