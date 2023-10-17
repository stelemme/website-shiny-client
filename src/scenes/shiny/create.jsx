import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

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
  FormGroup,
  Checkbox,
} from "@mui/material";

// Components
import Header from "../../components/Header";

// Functions
import {
  calculateMeanEncounterTime,
  calculateProb,
  calculatePercentage,
  calculateDateDifference,
} from "../../functions/statFunctions";

// Hooks
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

const natures = [
  "Adamant",
  "Bashful",
  "Bold",
  "Brave",
  "Calm",
  "Careful",
  "Docile",
  "Gentle",
  "Hardy",
  "Hasty",
  "Impish",
  "Jolly",
  "Lax",
  "Lonely",
  "Mild",
  "Modest",
  "Naive",
  "Naughty",
  "Quiet",
  "Quirky",
  "Rash",
  "Relaxed",
  "Sassy",
  "Serious",
  "Timid",
];

export default function CreateShiny() {
  const { username } = useAuth();
  const navigate = useNavigate();
  const { response: games } = useAxios({
    method: "get",
    url: `/game?action=form`,
  });

  let initialState = {
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
    endDate: new Date(),
    evolutions: [],
    forms: [],
    nickname: "",
    IRLLocation: "",
    level: 1,
    gender: "genderless",
  };

  const [data, setData] = useState(initialState);
  const [gameId, setGameId] = useState(undefined);
  const [shinyCharmCheck, setShinyCharmCheck] = useState(false);
  const [locationsList, setLocationsList] = useState(undefined);
  const [methodsList, setMethodsList] = useState(undefined);
  const [methodCatList, setMethodCatList] = useState(undefined);
  const [pokemonsList, setPokemonsList] = useState(undefined);
  const [ballList, setBallList] = useState(undefined);

  const [clearMethod, setClearMethod] = useState("method");
  const [genderCheck, setGenderCheck] = useState(false);

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

  useEffect(() => {
    if (data.stats) {
      axios
        .post(`/shiny`, data)
        .then((res) => {
          console.log(res.data);
          navigate(`/shiny/${res.data.shiny._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newStats = {
      probability: calculateProb(
        data.method.odds,
        data.method.rolls,
        data.method.shinyCharm,
        data.method?.charmRolls,
        data.totalEncounters,
        data.method?.function
      ),
      percentage: calculatePercentage(
        data.totalEncounters,
        data.method.odds,
        data.method.rolls,
        data.method.shinyCharm,
        data.method?.charmRolls,
        data.method?.function
      ),
      meanEncounterTime: calculateMeanEncounterTime(
        data.encounters,
        data.upperTimeThreshold,
        data.lowerTimeThreshold,
        data.increment
      ),
      daysHunting: calculateDateDifference(data.endDate, data.startDate),
      totalHuntTime: Math.round(
        calculateMeanEncounterTime(
          data.encounters,
          data.upperTimeThreshold,
          data.lowerTimeThreshold,
          data.increment
        ) * data.totalEncounters
      ),
    };

    setData((prevState) => ({
      ...prevState,
      stats: newStats,
    }));
  };

  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="ADD A NEW SHINY"
            subtitle="Here you can add a new shiny pokémon."
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
              setBallList(undefined);
              setGenderCheck(false);

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
                setBallList(value.balls);
              }
            }}
            sx={{ mb: "20px" }}
            options={games ? games.game : []}
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
                  gender: "genderless",
                };
              });
              setGenderCheck(false);
              if (reason === "selectOption") {
                axios["get"](`/pokedex?name=${value}`)
                  .then((res) => {
                    if (res.data.pokedex[0].gender === "100:0") {
                      setData((prevState) => {
                        return {
                          ...prevState,
                          ...{
                            gender: "male",
                          },
                        };
                      });
                    } else if (res.data.pokedex[0].gender === "0:100") {
                      setData((prevState) => {
                        return {
                          ...prevState,
                          ...{
                            gender: "female",
                          },
                        };
                      });
                    } else if (res.data.pokedex[0].gender === "Genderless") {
                      setGenderCheck(false)
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
                            gender: "male",
                          },
                        };
                      });
                    }
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
                label="Pokémon"
              />
            )}
          />

          {/* GENDER */}
          <FormControl sx={{ mb: "5px" }} disabled={!genderCheck}>
            <FormLabel focused={false}>Gender</FormLabel>
            <RadioGroup
              row
              value={data.gender}
              onChange={(e) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      gender: e.target.value,
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={"male"}
                control={<Radio color="secondary" />}
                label="Male"
              />
              <FormControlLabel
                value={"female"}
                control={<Radio color="secondary" />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

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

          {/* BALL */}
          <Grid container spacing={"10px"}>
            <Grid item xs={6}>
              <Autocomplete
                key={ballList}
                disabled={!ballList}
                autoHighlight
                onChange={(e, value, reason) => {
                  setData((prevState) => {
                    const { ball, ...updatedData } = prevState;
                    delete updatedData.sprite.ball;

                    return {
                      ...updatedData,
                    };
                  });
                  if (reason === "selectOption") {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          sprite: {
                            ...prevState.sprite,
                            ball: value.sprite,
                          },
                          ball: value.name,
                        },
                      };
                    });
                  }
                }}
                sx={{ mb: "10px" }}
                options={ballList ? ballList : []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    required
                    color="secondary"
                    {...params}
                    label="Ball"
                  />
                )}
              />
            </Grid>

            {/* NATURE */}
            <Grid item xs={6}>
              <Autocomplete
                autoHighlight
                onChange={(e, value, reason) => {
                  setData((prevState) => {
                    const { nature, ...updatedData } = prevState;

                    return {
                      ...updatedData,
                    };
                  });
                  if (reason === "selectOption") {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          nature: value,
                        },
                      };
                    });
                  }
                }}
                sx={{ mb: "10px" }}
                options={natures}
                renderInput={(params) => (
                  <TextField
                    required
                    color="secondary"
                    {...params}
                    label="Nature"
                  />
                )}
              />
            </Grid>

            {/* IRL LOCATION */}
            <Grid item xs={8}>
              <TextField
                required
                color="secondary"
                label="IRL Location"
                fullWidth
                value={data.IRLLocation}
                sx={{ mb: "10px" }}
                onChange={(e) => {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        IRLLocation: e.target.value,
                      },
                    };
                  });
                }}
              />
            </Grid>

            {/* LEVEL */}
            <Grid item xs={4}>
              <TextField
                required
                color="secondary"
                label="Level"
                type="number"
                fullWidth
                value={data.level}
                sx={{ mb: "10px" }}
                onChange={(e) => {
                  if (
                    parseInt(e.target.value) <= 100 &&
                    parseInt(e.target.value) > 0
                  ) {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          level: parseInt(e.target.value),
                        },
                      };
                    });
                  }
                }}
              />
            </Grid>

            {/* START DATE */}
            <Grid item xs={8}>
              <TextField
                key={data.startDate}
                disabled={!data.startDate}
                required
                color="secondary"
                label="Start Date"
                type={data.startDate ? "date" : "text"}
                fullWidth
                value={
                  data.startDate ? format(data.startDate, "yyyy-MM-dd") : ""
                }
                sx={{ mb: "20px" }}
                onChange={(e) => {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        startDate: new Date(e.target.value),
                      },
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Box mt="8px" ml="2px">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setData((prevState) => {
                              return {
                                ...prevState,
                                ...{
                                  startDate: undefined,
                                },
                              };
                            });
                          } else {
                            setData((prevState) => {
                              return {
                                ...prevState,
                                ...{
                                  startDate: new Date(),
                                },
                              };
                            });
                          }
                        }}
                      />
                    }
                    label={"Undefined"}
                  />
                </FormGroup>
              </Box>
            </Grid>
          </Grid>

          {/* END DATE */}
          <TextField
            required
            color="secondary"
            label="End Date"
            type="date"
            fullWidth
            value={format(data.endDate, "yyyy-MM-dd")}
            sx={{ mb: "20px" }}
            onChange={(e) => {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    endDate: new Date(e.target.value),
                  },
                };
              });
            }}
          />

          {/* NICKNAME */}
          <TextField
            required
            color="secondary"
            label="Nickname"
            fullWidth
            value={data.nickname}
            sx={{ mb: "20px" }}
            onChange={(e) => {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    nickname: e.target.value,
                  },
                };
              });
            }}
          />

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