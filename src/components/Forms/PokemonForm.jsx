import axios from "axios";

// Mui
import { TextField, Autocomplete } from "@mui/material";

export default function PokemonForm({
  data,
  setData,
  pokemonsList,
  setGenderCheck,
  isForCounter = false,
}) {
  if (!isForCounter) {
    return (
      <Autocomplete
        key={pokemonsList}
        autoHighlight
        onChange={(e, value, reason) => {
          setData((prevState) => {
            const { name, pokedexNo, types, sprite, ...updatedData } =
              prevState;
            const updatedSprites = { ...sprite };
            delete updatedSprites.pokemon;

            return {
              ...updatedData,
              sprite: updatedSprites,
              gender: "genderless",
            };
          });
          setGenderCheck(false);

          if (reason === "selectOption" && value) {
            axios
              .get(`/pokedex?name=${value}`)
              .then((res) => {
                const pokemonData = res.data[0];
                let gender = undefined;

                if (pokemonData.gender === "100:0") {
                  gender = "male";
                } else if (pokemonData.gender === "0:100") {
                  gender = "female";
                } else if (pokemonData.gender === "Genderless") {
                  gender = "genderless";
                }

                if (pokemonData.gender === "Genderless") {
                  setGenderCheck(false);
                } else {
                  setGenderCheck(true);
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
                  gender,
                }));
              })
              .catch((err) => {
                console.log(err);
              });
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
        onChange={(e, value, reason) => {
          if (reason === "selectOption") {
            axios["get"](`/pokedex?name=${value}`)
              .then((res) => {
                if (res.data[0].gender === "100:0") {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        gender: "male",
                      },
                    };
                  });
                } else if (res.data[0].gender === "0:100") {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        gender: "female",
                      },
                    };
                  });
                } else if (res.data[0].gender === "Genderless") {
                  setGenderCheck(false);
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        gender: "genderless",
                      },
                    };
                  });
                } else {
                  setGenderCheck(true);
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        gender: undefined,
                      },
                    };
                  });
                }
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      name: value,
                      pokedexNo: res.data[0].pokedexNo,
                      types: res.data[0].types,
                      sprite: {
                        ...prevState.sprite,
                        pokemon: res.data[0].sprite,
                      },
                    },
                  };
                });
              })
              .catch((err) => {
                console.log(err);
              });
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
