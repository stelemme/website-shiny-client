import { useState, useEffect } from "react";

// mui imports
import { Autocomplete, TextField } from "@mui/material";

// Hooks
import { useGame } from "../../hooks/useData";

export default function GameMultipleSelect({
  label,
  handleChange,
  size = "small",
  value = [],
  fullWidth = false,
  disabled = false,
}) {
  const [gamesList, setGamesList] = useState([]);

  const { isLoading: gamesLoading, data: games } = useGame("preview=selectNames");

  const gameListData = games?.data[0].names;

  useEffect(() => {
    if (!gamesLoading) {
      setGamesList(gameListData);
    }
  }, [gameListData, gamesLoading]);

  return (
    <Autocomplete
      autoHighlight
      multiple
      disableCloseOnSelect
      disabled={disabled}
      value={value}
      onChange={handleChange}
      options={gamesList}
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
