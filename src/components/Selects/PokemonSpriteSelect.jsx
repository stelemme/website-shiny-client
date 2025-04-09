import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { usePokedex } from "../../hooks/useData";

export default function PokemonSelect({
  label,
  handleChange,
  size = "small",
  width = "150px",
  disabled = false,
}) {
  const [value, setValue] = useState(null);

  const { data: pokemons } = usePokedex(
    "preview=sprites&filter=complex&filterGame=Pokémon Black 2"
  );

  const pokemonList = pokemons?.data;

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
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          sx={{ width: width }}
          color="secondary"
          {...params}
          label={label}
        />
      )}
    />
  );
}
