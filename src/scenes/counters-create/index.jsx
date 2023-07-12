import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Mui
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";

// Components
import Header from "../../components/Header";

// Hooks
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

export default function CreateCounters() {
  const { username } = useAuth();
  const navigate = useNavigate();
  const { response: games } = useAxios({
    method: "get",
    url: `/game?action=form`,
  });

  const initialState = {
    trainer: username,
    completed: false,
    encounters: [],
    totalEncounters: 0,
    increment: 1,
    pokemonCheck: true,
  };

  const [data, setData] = useState(initialState);
  const [gameId, setGameId] = useState(undefined);
  const [locationsList, setLocationsList] = useState(undefined);
  const [methodsList, setMethodsList] = useState(undefined);
  const [methodCatList, setMethodCatList] = useState(undefined);
  const [pokemonsList, setPokemonsList] = useState(undefined);

  useEffect(() => {
    setData((prevState) => {
      return { ...prevState, ...{ trainer: username } };
    });
  }, [username]);

  useEffect(() => {
    if (gameId) {
      axios["get"](`/game/${gameId}?action=pokemons`)
        .then((res) => {
          setPokemonsList(res.data.game.pokemons);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gameId]);

  const handleSubmit = (event) => {
    event.preventDefault()

    axios["post"](`/counters`, data)
        .then((res) => {
          console.log(res.data)
          navigate(`/counters/${res.data.counter._id}`)
        })
        .catch((err) => {
          console.log(err);
        });
  };

  console.log(data)


  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CREATE COUNTER"
            subtitle="Here you can create a new counter."
          />
        </Box>

        {/* FORM */}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* GAMES */}
          <Autocomplete
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "clear") {
                setData(initialState);
                setGameId(undefined);
                setLocationsList(undefined);
                setMethodsList(undefined);
                setMethodCatList(undefined);
                setPokemonsList(undefined);
              } else if (reason === "selectOption") {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      game: value.name,
                      gen: value.gen,
                      sprite: {
                        game: value.sprite,
                        dir: value.dir,
                      },
                    },
                  };
                });
                setGameId(value._id);
                setLocationsList(value.locations);
                setMethodsList(value.methods);
              }
            }}
            sx={{ mb: "10px" }}
            options={games ? games.game : []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField required color="secondary" {...params} label="Game" />
            )}
          />

          {/* RADIO BUTTONS */}
          <FormControl sx={{ mb: "5px" }}>
            <RadioGroup
              row
              value={data.pokemonCheck}
              onChange={(e, value) => {
                setData((prevState) => {
                  const { name, pokedexNo, types, sprite, ...updatedData } =
                    prevState;
                  const updatedSprites = { ...sprite };
                  delete updatedSprites.pokemon;

                  return {
                    ...updatedData,
                    sprite: updatedSprites,
                    pokemonCheck: JSON.parse(value),
                  };
                });
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="secondary" />}
                label="Specific Pokémon Hunt"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="Other Type of Hunt"
              />
            </RadioGroup>
          </FormControl>

          {/* ALTERNATIVE NAME */}
          {!data.pokemonCheck && (
            <TextField
              sx={{ mb: "20px" }}
              fullWidth
              required
              color="secondary"
              label="Alternative Name"
              onChange={(e) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{ name: e.target.value },
                  };
                });
              }}
            />
          )}

          {/* POKEMONS */}
          <Autocomplete
            key={pokemonsList && data.pokemonCheck}
            disabled={!pokemonsList || !data.pokemonCheck}
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "clear") {
                setData((prevState) => {
                  const { name, pokedexNo, types, sprite, ...updatedData } =
                    prevState;
                  const updatedSprites = { ...sprite };
                  delete updatedSprites.pokemon;

                  return {
                    ...updatedData,
                    sprite: updatedSprites,
                  };
                });
              } else if (reason === "selectOption") {
                axios["get"](`/pokedex?name=${value}`)
                  .then((res) => {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          name: value,
                          pokedexNo: res.data.pokedex[0].pokedexNo,
                          types: res.data.pokedex[0].types,
                          sprite: {
                            ...prevState.sprite,
                            pokemon: res.data.pokedex[0].sprite,
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
              <TextField
                required
                color="secondary"
                {...params}
                label="Pokémons"
              />
            )}
          />

          {/* LOCATIONS */}
          <Autocomplete
            key={locationsList}
            disabled={!locationsList}
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "clear") {
                setData((prevState) => {
                  const { location, ...rest } = prevState;
                  return rest;
                });
              } else if (reason === "selectOption") {
                setData((prevState) => {
                  return { ...prevState, ...{ location: value } };
                });
              }
            }}
            sx={{ mb: "20px" }}
            options={locationsList ? locationsList : []}
            renderInput={(params) => (
              <TextField
                required
                color="secondary"
                {...params}
                label="Location"
              />
            )}
          />

          {/* METHODS */}
          <Autocomplete
            key={methodsList}
            disabled={!methodsList}
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "clear") {
                setMethodCatList(undefined);
                setData((prevState) => {
                  const { method, ...rest } = prevState;
                  return rest;
                });
              } else if (reason === "selectOption") {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        name: value.name,
                        odds: value.odds,
                      },
                    },
                  };
                });
                if (value.subCategories.length > 0) {
                  setMethodCatList(value.subCategories);
                }
              }
            }}
            sx={{ mb: "20px" }}
            options={methodsList ? methodsList : []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                required
                color="secondary"
                {...params}
                label="Method"
              />
            )}
          />

          {/* METHODS SUBCATEGORY*/}
          <Autocomplete
            key={methodCatList}
            disabled={!methodCatList}
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "clear") {
              } else if (reason === "selectOption") {
              }
            }}
            sx={{ mb: "20px" }}
            options={methodCatList ? methodCatList : []}
            renderInput={(params) => (
              <TextField
                required
                color="secondary"
                {...params}
                label="Method Category"
              />
            )}
          />

          {/* INCREMENT */}
          <TextField
            sx={{ mb: "20px" }}
            value={data.increment}
            type="number"
            fullWidth
            required
            color="secondary"
            label="Increment"
            onChange={(e) => {
              if (e.target.value > 0) {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{ increment: e.target.value },
                  };
                });
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ mb: "10px" }}
            style={{ color: 'white' }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
