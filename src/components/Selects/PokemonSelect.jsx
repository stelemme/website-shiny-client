import { Autocomplete, TextField } from "@mui/material";
import { usePokedex } from "../../hooks/useData";

export default function PokemonSelect({
  label,
  handleChange,
  game,
  defaultValue,
  onKeyPress,
  onBlur,
  size = "small",
  width = "150px",
  disabled = false,
}) {
  const { data: pokemons } = usePokedex(
    `list=names&filter=complex&filterGame=${game}`
  );

  const pokemonList = pokemons?.data[0].pokemonList;

  const handleValueChange = (event, newValue) => {
    handleChange(newValue);
  };

  return (
    <Autocomplete
      size={size}
      autoHighlight
      value={defaultValue}
      disabled={disabled}
      onChange={handleValueChange}
      onKeyUp={onKeyPress}
      onBlur={onBlur}
      blurOnSelect
      disableClearable
      options={pokemonList ? pokemonList : []}
      getOptionLabel={(option) => option}
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
