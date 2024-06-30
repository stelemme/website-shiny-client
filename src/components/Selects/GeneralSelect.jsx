import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function GeneralSelect({
  label,
  handleChange,
  list,
  value,
  width = 120,
  size = "small",
}) {
  const displayedItems = list.slice(0, 10);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        width: width,
      },
    },
  };

  return (
    <FormControl size={size} style={{ minWidth: width }} color="secondary">
      <InputLabel>{label}</InputLabel>
      <Select
        color="secondary"
        label={label}
        onChange={handleChange}
        value={value}
        MenuProps={MenuProps}
      >
        {displayedItems?.map((item, index) =>
          String(item).charAt(0) === "_" ? (
            <MenuItem key={index} value={item} divider>
              {item.slice(1)}
            </MenuItem>
          ) : (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          )
        )}
        {list.length > 10 && (
          list.slice(10).map((item, index) =>
            String(item).charAt(0) === "_" ? (
              <MenuItem key={index + 10} value={item} divider>
                {item.slice(1)}
              </MenuItem>
            ) : (
              <MenuItem key={index + 10} value={item}>
                {item}
              </MenuItem>
            )
          )
        )}
      </Select>
    </FormControl>
  );
}
