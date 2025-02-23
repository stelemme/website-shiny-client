import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useGame } from "../../hooks/useData";

export default function GameSelect({
  label,
  handleChange,
  size = "small",
  defaultValue = "All",
  addAll = true,
  fullWidth = false,
  disabled = false
}) {
  const [gamesList, setGamesList] = useState([]);
  const [value, setValue] = useState(null);

  const { isLoading: gamesLoading, data: games } = useGame("preview=select");

  useEffect(() => {
    if (!gamesLoading) {
      const updatedGamesList = addAll
        ? [{ name: "All" }, ...games.data]
        : games.data;

      setGamesList(updatedGamesList);

      setValue(updatedGamesList.find((game) => game.name === defaultValue));
    }
  }, [games, gamesLoading, addAll, defaultValue]);

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    if (handleChange) {
      handleChange(newValue); 
    }
  };

  return (
    <Autocomplete
      autoHighlight
      value={value}
      disabled={disabled}
      onChange={handleValueChange}
      options={gamesList}
      getOptionLabel={(option) => option.name || ""}
      isOptionEqualToValue={(option, value) => option.name === value?.name} // Prevent duplicate options
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
