import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { usePokedex } from "../../hooks/useData";

export default function PokemonSelect({
  label,
  handleChange,
  size = "small",
  disabled = false,
}) {
  const [value, setValue] = useState(null);

  const { data: pokemons } =
    usePokedex("preview=sprites");

  const pokemonList = pokemons?.data.pokemonList;

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    if (handleChange) {
      handleChange(newValue);
    }
  };

  return (
    <Autocomplete
      size={size}
      autoHighlight
      value={value}
      disabled={disabled}
      onChange={handleValueChange}
      options={pokemonList ? pokemonList : []}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          sx={{ width: "150px" }}
          color="secondary"
          {...params}
          label={label}
        />
      )}
    />
  );
}
