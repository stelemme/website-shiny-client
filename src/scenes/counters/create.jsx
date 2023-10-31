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
import { useAuth } from "../../hooks/useAuth";
import { useGame } from "../../hooks/useData";

export default function CreateCounters() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const { data: games } = useGame("?action=form");

  const initialState = {
    trainer: username,
    encounters: [],
    totalEncounters: 0,
    increment: 1,
    lowerTimeThreshold: 0,
    upperTimeThreshold: 200,
    method: {
      shinyCharm: false,
    },
    startDate: new Date(),
    endDate: new Date()
  };

  const [data, setData] = useState(initialState);
  const [gameId, setGameId] = useState(undefined);
  const [shinyCharmCheck, setShinyCharmCheck] = useState(false);
  const [locationsList, setLocationsList] = useState(undefined);
  const [methodsList, setMethodsList] = useState(undefined);
  const [methodCatList, setMethodCatList] = useState(undefined);
  const [pokemonsList, setPokemonsList] = useState(undefined);

  const [clearMethod, setClearMethod] = useState("method");

  console.log(data)

  useEffect(() => {
    setData((prevState) => {
      return { ...prevState, ...{ trainer: username } };
    });
  }, [username]);

  useEffect(() => {
    if (gameId) {
      axios["get"](`/game/${gameId}?action=pokemons`)
        .then((res) => {
          setPokemonsList(res.data.pokemons);
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
        navigate(`/counters/${res.data._id}`);
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
        <form autoComplete="off" onSubmit={handleSubmit}>
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
                  console.log(value)
                  return {
                    ...prevState,
                    ...{
                      game: value.name,
                      gen: value.gen,
                      gameSort: value.sort,
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
            sx={{ mb: "20px" }}
            options={games ? games.data : []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField required color="secondary" {...params} label="Game" />
            )}
          />

          {/* POKEMONS */}
          <Autocomplete
            key={pokemonsList}
            disabled={!pokemonsList}
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
              <TextField
                required
                color="secondary"
                {...params}
                label="Pokémon"
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
              <FormLabel focused={false}>ShinyCharm</FormLabel>
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
                  console.log(value.categories?.length)
                  if (value.categories?.length > 0) {
                    setMethodCatList(value.categories);
                  }

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
            options={methodsList ? methodsList.filter(option => option.countable !== false) : []}
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
          {methodCatList && <Autocomplete
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
                color="secondary"
                {...params}
                label="Method Category"
              />
            )}
          />}

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
