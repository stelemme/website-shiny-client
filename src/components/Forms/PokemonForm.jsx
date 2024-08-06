// Mui
import { TextField, Autocomplete } from "@mui/material";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function PokemonForm({
  data,
  setData,
  pokemonsList,
  setGenderCheck,
  isForCounter = false,
  isAsCounter = false,
}) {
  const getRequest = useGetRequest();

  if (!isForCounter) {
    return (
      <Autocomplete
        key={pokemonsList}
        autoHighlight
        onChange={async (e, value, reason) => {
          setData((prevState) => {
            const {
              name,
              pokedexNo,
              types,
              sprite,
              genderDifference,
              legendary,
              mythical,
              ultraBeast,
              pastParadox,
              futureParadox,
              ...updatedData
            } = prevState;
            const updatedSprites = { ...sprite };
            delete updatedSprites.pokemon;

            return {
              ...updatedData,
              sprite: updatedSprites,
              ...(!isAsCounter && { gender: "genderless" }),
            };
          });
          if (setGenderCheck) {
            setGenderCheck(false);
          }

          if (reason !== "selectOption" || !value) {
            return;
          }

          try {
            const response = await getRequest(`/pokedex?name=${value}`);
            const pokemonData = response[0];
            let gender = undefined;

            if (pokemonData.gender === "100:0") {
              gender = "male";
            } else if (pokemonData.gender === "0:100") {
              gender = "female";
            } else if (pokemonData.gender === "Genderless") {
              gender = "genderless";
            }

            if (setGenderCheck) {
              if (pokemonData.gender === "Genderless") {
                setGenderCheck(false);
              } else {
                setGenderCheck(true);
              }
            }

            setData((prevState) => ({
              ...prevState,
              name: value,
              pokedexNo: pokemonData.pokedexNo,
              types: pokemonData.types,
              sprite: {
                ...prevState.sprite,
                pokemon: pokemonData.sprite,
              },
              legendary: pokemonData.legendary,
              mythical: pokemonData.mythical,
              ultraBeast: pokemonData.ultraBeast,
              pastParadox: pokemonData.pastParadox,
              futureParadox: pokemonData.futureParadox,
              ...(!isAsCounter && { gender }),
            }));
          } catch {
            return;
          }
        }}
        sx={{ mb: "20px" }}
        options={pokemonsList ? pokemonsList : []}
        renderInput={(params) => (
          <TextField required color="secondary" {...params} label="Pokémon" />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        key={data.name}
        value={data.name}
        disabled={!pokemonsList}
        autoHighlight
        onChange={async (e, value, reason) => {
          if (reason !== "selectOption") {
            return;
          }

          try {
            const response = await getRequest(`/pokedex?name=${value}`);
            const pokemonData = response[0];
            let gender = undefined;

            if (pokemonData.gender === "100:0") {
              gender = "male";
            } else if (pokemonData.gender === "0:100") {
              gender = "female";
            } else if (pokemonData.gender === "Genderless") {
              gender = "genderless";
            }

            if (setGenderCheck) {
              if (pokemonData.gender === "Genderless") {
                setGenderCheck(false);
              } else {
                setGenderCheck(true);
              }
            }

            setData((prevState) => ({
              ...prevState,
              name: value,
              pokedexNo: pokemonData.pokedexNo,
              types: pokemonData.types,
              sprite: {
                ...prevState.sprite,
                pokemon: pokemonData.sprite,
              },
              legendary: pokemonData.legendary,
              mythical: pokemonData.mythical,
              ultraBeast: pokemonData.ultraBeast,
              pastParadox: pokemonData.pastParadox,
              futureParadox: pokemonData.futureParadox,
              ...(!isAsCounter && { gender }),
            }));
          } catch {
            return;
          }
        }}
        sx={{ mb: "20px" }}
        options={pokemonsList ? pokemonsList : []}
        renderInput={(params) => (
          <TextField required color="secondary" {...params} label="Pokémon" />
        )}
      />
    );
  }
}
