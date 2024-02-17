import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

// Mui
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormLabel,
  Grid,
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
  "-",
];

export default function CreateFromCounter() {
  const { counterId } = useParams();
  const navigate = useNavigate();

  let initialLocationState = {
    name: "",
    displayName: "",
    position: [],
  };

  let initialState = {
    name: "Pokémon Loading...",
    game: "Game Loading...",
    location: "Location Loading...",
    method: {
      name: "Method Loading...",
      category: "Method Category Loading...",
    },
    startDate: new Date(),
    endDate: new Date(),
    evolutions: [],
    forms: [],
    nickname: "",
    geoLocation: initialLocationState,
    level: null,
    gender: "genderless",
  };

  const [data, setData] = useState(initialState);
  const [genderCheck, setGenderCheck] = useState(false);
  const [pokemonsList, setPokemonsList] = useState(undefined);
  const [locationsList, setLocationsList] = useState(undefined);
  const [ballList, setBallList] = useState(undefined);
  const [geoLocationsList, setGeoLocationsList] = useState(undefined);
  const [newGeoLocation, setNewGeoLocation] = useState(false);

  useEffect(() => {
    axios["get"](`/shiny?geoLocationList=true`).then((res) => {
      const geoLocationsData = res.data[0]["geoLocation"];
      setGeoLocationsList(geoLocationsData);
    });
  }, []);

  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const res = await axios.get(`/counters/${counterId}`);
        res.data.startDate = new Date(res.data.startDate);
        res.data.endDate = new Date(res.data.endDate);

        setData((prevState) => {
          return {
            ...prevState,
            ...res.data,
          };
        });

        axios["get"](`/pokedex?name=${res.data.name}`)
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
          })
          .catch((err) => {
            console.log(err);
          });

        axios["get"](`/game?name=${res.data.game}`)
          .then((res) => {
            setPokemonsList(res.data[0].pokemons);
            setLocationsList(res.data[0].locations);
            setBallList(res.data[0].balls);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (counterId) {
      fetchCounterData();
    }
  }, [counterId]);

  useEffect(() => {
    if (data.stats) {
      axios
        .post(`/shiny`, data)
        .then((res) => {
          console.log("test", res.data);
          axios["delete"](`/counters/${counterId}`).catch((err) => {
            console.log(err);
          });
          navigate(`/shiny/${res.data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  console.log(data);

  const getGeoLocation = (newValues) => {
    if (newValues.length === 2) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/reverse?lat=${newValues[0]}&lon=${newValues[1]}&format=json`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                geoLocation: {
                  ...prevState.geoLocation,
                  displayName: response.data.display_name,
                },
              },
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.geoLocation.name !== "" && data.geoLocation.displayName !== "") {
      const newStats = {
        probability: calculateProb(
          data.method.odds,
          data.method.rolls,
          data.method.shinyCharm,
          data.method?.charmRolls,
          data.totalEncounters,
          data.method?.function,
          data.method?.searchLevel
        ),
        percentage: calculatePercentage(
          data.totalEncounters,
          data.method.odds,
          data.method.rolls,
          data.method.shinyCharm,
          data.method?.charmRolls,
          data.method?.function,
          data.method?.searchLevel
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

      if (data.method.function) {
        let chainLimit = 0;
        switch (data.method.function) {
          case "pokeradar-gen4":
            chainLimit = 40;
            break;
          case "pokeradar-gen6":
            chainLimit = 40;
            break;
          case "pokeradar-gen8":
            chainLimit = 40;
            break;
          case "chainfishing":
            chainLimit = 20;
            break;
          case "sos-chain-sm":
            chainLimit = 30;
            break;
          case "sos-chain":
            chainLimit = 30;
            break;
          default:
            console.log(chainLimit);
        }

        if (data.totalEncounters >= chainLimit) {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                method: {
                  ...prevState.method,
                  correctedEncounters: data.totalEncounters - chainLimit,
                },
                stats: {
                  ...newStats,
                  percentage: calculatePercentage(
                    data.totalEncounters - chainLimit,
                    data.method.odds,
                    data.method.rolls,
                    data.method.shinyCharm,
                    data.method?.charmRolls,
                    data.method?.function,
                    data.method?.searchLevel
                  ),
                },
              },
            };
          });
        } else {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                method: {
                  ...prevState.method,
                  correctedEncounters: 0,
                },
                stats: {
                  ...newStats,
                  percentage: 0,
                },
              },
            };
          });
        }
      } else {
        setData((prevState) => ({
          ...prevState,
          stats: newStats,
        }));
      }
    }
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
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* GAMES */}
          <TextField
            sx={{ mb: "20px" }}
            color="secondary"
            fullWidth
            disabled
            value={data.game}
            key={data.game}
            label="Game"
            required
          ></TextField>

          {/* POKEMONS */}
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
            key={data.location}
            value={data.location}
            disabled={!locationsList}
            autoHighlight
            onChange={(e, value, reason) => {
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

          {/* METHODS */}
          <TextField
            sx={{ mb: "20px" }}
            color="secondary"
            fullWidth
            disabled
            value={data.method.name}
            key={data.method.name}
            label="Method"
            required
          ></TextField>

          {/* METHODS SUBCATEGORY*/}
          <TextField
            sx={{ mb: "20px" }}
            color="secondary"
            fullWidth
            disabled
            value={data.method.category}
            key={data.method.category}
            label="Method Category"
          ></TextField>

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

            {/* LEVEL */}
            <Grid item xs={12}>
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

            {/* GEO LOCATION */}
            <Grid item xs={12}>
              <FormControl sx={{ mb: "5px" }}>
                <RadioGroup
                  row
                  value={newGeoLocation}
                  onChange={(e, value) => {
                    setNewGeoLocation(JSON.parse(value));
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          geoLocation: initialLocationState,
                        },
                      };
                    });
                  }}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio color="secondary" />}
                    label="Existing Location"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio color="secondary" />}
                    label="New Location"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {!newGeoLocation && (
              <Grid item xs={12}>
                <Autocomplete
                  sx={{ mb: "10px" }}
                  disabled={!geoLocationsList}
                  autoHighlight
                  onChange={(e, value) => {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          geoLocation: value,
                        },
                      };
                    });
                  }}
                  options={geoLocationsList ? geoLocationsList : []}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      color="secondary"
                      {...params}
                      label="Geo Location"
                    />
                  )}
                />
              </Grid>
            )}
            {newGeoLocation && (
              <>
                <Grid item xs={12} sx={{ mb: "10px" }}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label="Location Name"
                    value={data.geoLocation.name}
                    onChange={(e) => {
                      setData((prevState) => {
                        return {
                          ...prevState,
                          ...{
                            geoLocation: {
                              ...prevState.geoLocation,
                              name: e.target.value,
                            },
                          },
                        };
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label="Latitude, Longitude"
                    onChange={(e) => {
                      const newValues = e.target.value
                        .split(",")
                        .map((value) => Number(value.trim()));
                      setData((prevState) => {
                        return {
                          ...prevState,
                          ...{
                            geoLocation: {
                              ...prevState.geoLocation,
                              position: newValues,
                            },
                          },
                        };
                      });
                      getGeoLocation(newValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: "10px" }}>
                  <Typography>
                    Address: {data.geoLocation.displayName}
                  </Typography>
                </Grid>
              </>
            )}

            {/* START DATE */}
            <Grid item xs={6}>
              <TextField
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
                  if (!isNaN(new Date(e.target.value))) {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          startDate: new Date(e.target.value),
                        },
                      };
                    });
                  }
                }}
              />
            </Grid>

            {/* END DATE */}
            <Grid item xs={6}>
              <TextField
                required
                color="secondary"
                label="End Date"
                type="date"
                fullWidth
                value={data.endDate ? format(data.endDate, "yyyy-MM-dd") : ""}
                sx={{ mb: "20px" }}
                onChange={(e) => {
                  if (!isNaN(new Date(e.target.value))) {
                    setData((prevState) => {
                      return {
                        ...prevState,
                        ...{
                          endDate: new Date(e.target.value),
                        },
                      };
                    });
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* NICKNAME */}
          <TextField
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
