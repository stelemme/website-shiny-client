import { useState } from "react";
import { TextField } from "@mui/material";

export default function PercentageForm({
  defaultValue,
  handleChange,
  onKeyPress,
  onBlur,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (event) => {
    const input = event.target.value;
    // Allow only numbers and decimal, limit to 2 decimal places
    const validInput = input.match(/^(\d{0,3})(\.\d{0,2})?$/);
    if (validInput || input === "") {
      setValue(input);
    }
  };

  const handleBlur = () => {
    if (value) {
      const parsedValue = parseFloat(value);
      if (parsedValue > 100) {
        handleChange(100);
      } else {
        handleChange(parsedValue);
      }
    }
    onBlur();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (value) {
        const parsedValue = parseFloat(value);
        if (parsedValue > 100) {
          handleChange(100);
        } else {
          handleChange(parsedValue);
        }
      }
      onKeyPress(event);
    }
  };

  return (
    <TextField
      value={value}
      size="small"
      color="secondary"
      fullWidth
      onChange={handleValueChange}
      onKeyUp={handleKeyPress}
      onBlur={handleBlur}
    />
  );
}
