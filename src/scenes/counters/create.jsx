import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FormLabel,
  Grid,
  InputAdornment,
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
    lowerTimeThreshold: 0,
    upperTimeThreshold: 200,
    pokemonCheck: true,
    method: {
      shinyCharm: false,
    },
  };

  const [data, setData] = useState(initialState);
  const [gameId, setGameId] = useState(undefined);
  const [shinyCharmCheck, setShinyCharmCheck] = useState(false);
  const [locationsList, setLocationsList] = useState(undefined);
  const [methodsList, setMethodsList] = useState(undefined);
  const [methodCatList, setMethodCatList] = useState(undefined);
  const [pokemonsList, setPokemonsList] = useState(undefined);

  const [clearMethod, setClearMethod] = useState("method");

  console.log(data);

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
    event.preventDefault();

    axios["post"](`/counters`, data)
      .then((res) => {
        console.log(res.data);
        navigate(`/counters/${res.data.counter._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CREATE A COUNTER"
            subtitle="Here you can create a new counter."
          />
        </Box>

        {/* FORM */}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* GAMES */}
          <Autocomplete
            autoHighlight
            onChange={(e, value, reason) => {
              setData(initialState);
              setGameId(undefined);
              setShinyCharmCheck(false);
              setLocationsList(undefined);
              setMethodsList(undefined);
              setMethodCatList(undefined);
              setPokemonsList(undefined);

              setClearMethod((prevState) =>
                prevState === "method" ? "clearMethod" : "method"
              );
              if (reason === "selectOption") {
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
                setShinyCharmCheck(value.shinyCharm);
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
              if (reason === "selectOption") {
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
              setData((prevState) => {
                const { location, ...rest } = prevState;
                return rest;
              });
              if (reason === "selectOption") {
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

          {/* SHINYCHARM */}
          {shinyCharmCheck && (
            <FormControl sx={{ mb: "5px" }}>
              <FormLabel>ShinyCharm</FormLabel>
              <RadioGroup
                row
                value={data.method.shinyCharm}
                onChange={(e, value) => {
                  setClearMethod((prevState) =>
                    prevState === "method" ? "clearMethod" : "method"
                  );
                  setMethodCatList(undefined);
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          shinyCharm: JSON.parse(value),
                        },
                      },
                    };
                  });
                }}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio color="secondary" />}
                  label="Not Obtained"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio color="secondary" />}
                  label="Obtained"
                />
              </RadioGroup>
            </FormControl>
          )}

          {/* METHODS */}
          <Autocomplete
            key={clearMethod}
            disabled={!methodsList}
            autoHighlight
            onChange={(e, value, reason) => {
              setMethodCatList(undefined);
              setData((prevState) => {
                const { method, ...updatedData } = prevState;
                const updatedMethod = { ...method };
                delete updatedMethod.name;
                delete updatedMethod.function;
                delete updatedMethod.odds;
                delete updatedMethod.rolls;
                delete updatedMethod.charmRolls;
                delete updatedMethod.category;

                return {
                  ...updatedData,
                  method: updatedMethod,
                };
              });
              if (reason === "selectOption") {
                setData((prevState) => {
                  if (value.categories.length > 0) {
                    setMethodCatList(value.categories);
                  }

                  delete value._id;
                  delete value.categories;

                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        ...value,
                      },
                    },
                  };
                });
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
              if (reason === "selectOption") {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        category: value,
                      },
                    },
                  };
                });
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
          <Grid container spacing={"10px"}>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">sec</InputAdornment>
                  ),
                }}
                sx={{ mb: "20px" }}
                value={data.lowerTimeThreshold}
                type="number"
                fullWidth
                required
                color="secondary"
                label="Lower Threshold"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{ lowerTimeThreshold: e.target.value },
                      };
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">sec</InputAdornment>
                  ),
                }}
                sx={{ mb: "20px" }}
                value={data.upperTimeThreshold}
                type="number"
                fullWidth
                required
                color="secondary"
                label="Upper Threshold"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{ upperTimeThreshold: e.target.value },
                      };
                    });
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* SUBMIT */}
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ mb: "10px" }}
            style={{ color: "white" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
