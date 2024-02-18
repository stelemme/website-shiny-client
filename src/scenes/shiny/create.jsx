import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

// Mui
import {
  Box,
  TextField,
  Typography,
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
  calculateProb,
  calculateDateDifference,
} from "../../functions/statFunctions";
import methodHunts from "../../functions/methodHunts";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useGame } from "../../hooks/useData";

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

export default function CreateShiny() {
  const { username } = useAuth();
  const navigate = useNavigate();

  const { data: games } = useGame("?action=form");

  let initialLocationState = {
    name: "",
    displayName: "",
    position: [],
  };

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
    startDate: null,
    endDate: new Date(),
    evolutions: [],
    forms: [],
    nickname: "",
    geoLocation: initialLocationState,
    level: null,
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
  const [groupList, setGroupList] = useState(undefined);
  const [geoLocationsList, setGeoLocationsList] = useState(undefined);
  const [newGeoLocation, setNewGeoLocation] = useState(false);

  const [clearMethod, setClearMethod] = useState("method");
  const [genderCheck, setGenderCheck] = useState(false);

  console.log(data);

  useEffect(() => {
    axios["get"](`/shiny?geoLocationList=true`).then((res) => {
      const geoLocationsData = res.data[0]["geoLocation"];
      setGeoLocationsList(geoLocationsData);
    });
  }, []);

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

  useEffect(() => {
    if (data.stats) {
      axios
        .post(`/shiny`, data)
        .then((res) => {
          console.log(res.data);
          navigate(`/shiny/${res.data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

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
          data.method?.function
        ),
        daysHunting: calculateDateDifference(data.endDate, data.startDate),
      };

      if (data.method.function) {
        switch (data.method.function) {
          case "letsgospawn":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  0,
                  data.method.shinyCharm,
                  data.method.lure,
                  data.method.chainMatters,
                  data.method.letsGoChain
                ),
              },
            }));
            break;
          case "sos-chain":
          case "sos-chain-sm":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  data.method.sosChain,
                  data.method.shinyCharm
                ),
              },
            }));
            break;
          case "ultra-wormhole":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  0,
                  data.method.shinyCharm,
                  false,
                  false,
                  0,
                  null,
                  null,
                  null,
                  data.method.wormholeType,
                  data.method.wormholeDistance
                ),
              },
            }));
            break;
          case "pokeradar-gen4":
          case "pokeradar-gen6":
          case "pokeradar-gen8":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  data.method.radarChain,
                  data.method.shinyCharm
                ),
              },
            }));
            break;
          case "arceus-spawn":
          case "arceus-mass-outbreak":
          case "arceus-massive-mass-outbreak":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  0,
                  data.method.shinyCharm,
                  false,
                  false,
                  0,
                  data.method.researchLevel
                ),
              },
            }));
            break;
          case "sv-spawn":
          case "sv-outbreak":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: methodHunts(
                  data.method.function,
                  0,
                  data.method.shinyCharm,
                  false,
                  false,
                  0,
                  null,
                  data.method?.svOutbreak,
                  data.method.svSparklingPower
                ),
              },
            }));
            break;
          default:
            console.log("Failed");
        }
      } else {
        setData((prevState) => ({
          ...prevState,
          stats: newStats,
        }));
      }
    }
  };

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

  const groupDisplay = () => {
    if (
      data.method.function === "pokeradar-gen4" ||
      data.method.function === "pokeradar-gen6" ||
      data.method.function === "pokeradar-gen8"
    ) {
      return (
        <Box>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Caught Multiple Shinies?</FormLabel>
            <RadioGroup
              row
              value={data.method.group}
              onChange={(e, value) => {
                if (JSON.parse(value)) {
                  axios["get"](`shiny?group=true`)
                    .then((res) => {
                      setGroupList(["New Group", ...res.data]);
                      setData((prevState) => {
                        return {
                          ...prevState,
                          ...{
                            method: {
                              ...prevState.method,
                              group: JSON.parse(value),
                            },
                            group: `${username}-${
                              data.name
                            }-${data.endDate.toLocaleDateString()}`,
                          },
                        };
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  setGroupList(undefined);
                  setData((prevState) => {
                    delete prevState.group;
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          group: JSON.parse(value),
                        },
                      },
                    };
                  });
                }
              }}
            >
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="No"
              />
              <FormControlLabel
                value={true}
                control={<Radio color="secondary" />}
                label="Yes"
              />
            </RadioGroup>
          </FormControl>
          <Autocomplete
            required
            key={groupList}
            disabled={!groupList}
            autoHighlight
            onChange={(e, value, reason) => {
              if (reason === "selectOption") {
                if (value === "New Group") {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        group: `${username}-${
                          data.name
                        }-${data.endDate.toLocaleDateString()}`,
                      },
                    };
                  });
                } else {
                  setData((prevState) => {
                    return {
                      ...prevState,
                      ...{
                        group: value,
                      },
                    };
                  });
                }
              }
            }}
            sx={{ mb: "20px" }}
            options={groupList ? groupList : []}
            renderInput={(params) => (
              <TextField required color="secondary" {...params} label="Group" />
            )}
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  const pokeradarDisplay = () => {
    if (
      data.method.function === "pokeradar-gen4" ||
      data.method.function === "pokeradar-gen6" ||
      data.method.function === "pokeradar-gen8"
    ) {
      return (
        <TextField
          fullWidth
          sx={{ mb: "20px" }}
          label="Chain Length"
          required
          type="number"
          color="secondary"
          onChange={(e) => {
            if (parseInt(e.target.value) > 0) {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      radarChain: parseInt(e.target.value),
                    },
                  },
                };
              });
            }
          }}
        ></TextField>
      );
    } else {
      return null;
    }
  };

  const letsGoSpawnDisplay = () => {
    if (data.method.function === "letsgospawn") {
      return (
        <Box>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Lure</FormLabel>
            <RadioGroup
              row
              value={data.method.lure}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        lure: JSON.parse(value),
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="secondary" />}
                label="Active"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="Not Active"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mb: "5px" }}>
            <FormLabel focused={false}>Chain Matters?</FormLabel>
            <RadioGroup
              row
              value={data.method.chainMatters}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        chainMatters: JSON.parse(value),
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={false}
                control={<Radio color="secondary" />}
                label="False"
              />
              <FormControlLabel
                value={true}
                control={<Radio color="secondary" />}
                label="True"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            sx={{ mb: "20px" }}
            label="Chain Length"
            required
            disabled={!data.method.chainMatters}
            type="number"
            color="secondary"
            onChange={(e) => {
              if (parseInt(e.target.value) > 0) {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        letsGoChain: parseInt(e.target.value),
                      },
                    },
                  };
                });
              }
            }}
          ></TextField>
        </Box>
      );
    } else {
      return null;
    }
  };

  const sosDisplay = () => {
    if (
      data.method.function === "sos-chain" ||
      data.method.function === "sos-chain-sm"
    ) {
      return (
        <Box>
          {data.method.category === "Random SOS Chain" && <Typography>Fill in Chain Length 31, if the Chain Length is unknown.</Typography>}
          <TextField
            fullWidth
            sx={{ mb: "20px" }}
            label="Chain Length"
            required
            type="number"
            color="secondary"
            onChange={(e) => {
              if (parseInt(e.target.value) > 0) {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        sosChain: parseInt(e.target.value),
                      },
                    },
                  };
                });
              }
            }}
          ></TextField>
        </Box>
      );
    } else {
      return null;
    }
  };

  const ultraWormholeDisplay = () => {
    if (data.method.function === "ultra-wormhole") {
      return (
        <Box>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Wormhole Type</FormLabel>
            <RadioGroup
              row
              value={data.method.wormholeType}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        wormholeType: JSON.parse(value),
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={0}
                control={<Radio color="secondary" />}
                label="Type 1"
              />
              <FormControlLabel
                value={1}
                control={<Radio color="secondary" />}
                label="Type 2"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="secondary" />}
                label="Type 3"
              />
              <FormControlLabel
                value={3}
                control={<Radio color="secondary" />}
                label="Type 4"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            sx={{ mb: "20px" }}
            label="Light Years"
            required
            type="number"
            color="secondary"
            onChange={(e) => {
              if (parseInt(e.target.value) > 0) {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        wormholeDistance: parseInt(e.target.value),
                      },
                    },
                  };
                });
              }
            }}
          ></TextField>
        </Box>
      );
    } else {
      return null;
    }
  };

  const laDisplay = () => {
    if (
      data.method.function === "arceus-spawn" ||
      data.method.function === "arceus-mass-outbreak" ||
      data.method.function === "arceus-massive-mass-outbreak"
    ) {
      return (
        <FormControl sx={{ mb: "5px", mr: "5px" }}>
          <FormLabel focused={false}>Research Level</FormLabel>
          <RadioGroup
            row
            value={data.method.researchLevel}
            onChange={(e, value) => {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      researchLevel: value,
                    },
                  },
                };
              });
            }}
          >
            <FormControlLabel
              value={"0"}
              control={<Radio color="secondary" />}
              label="Level 0-9"
            />
            <FormControlLabel
              value={"10"}
              control={<Radio color="secondary" />}
              label="Level 10"
            />
            <FormControlLabel
              value={"perfect"}
              control={<Radio color="secondary" />}
              label="Perfect Level"
            />
          </RadioGroup>
        </FormControl>
      );
    } else {
      return null;
    }
  };

  const svSpawnDisplay = () => {
    if (data.method.function === "sv-spawn") {
      return (
        <Box>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Sparkling Power</FormLabel>
            <RadioGroup
              row
              value={data.method.svSparklingPower}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        svSparklingPower: value,
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={"0"}
                control={<Radio color="secondary" />}
                label="Level 0"
              />
              <FormControlLabel
                value={"1"}
                control={<Radio color="secondary" />}
                label="Level 1"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="secondary" />}
                label="Level 2"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="secondary" />}
                label="Level 3"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      );
    } else {
      return null;
    }
  };

  const svOutbreakDisplay = () => {
    if (data.method.function === "sv-outbreak") {
      return (
        <Box>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Outbreak</FormLabel>
            <RadioGroup
              row
              value={data.method.svOutbreak}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        svOutbreak: value,
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={"0"}
                control={<Radio color="secondary" />}
                label="No Outbreak"
              />
              <FormControlLabel
                value={"30"}
                control={<Radio color="secondary" />}
                label="30-59 Cleared"
              />
              <FormControlLabel
                value={"60"}
                control={<Radio color="secondary" />}
                label="60+ Cleared"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ mb: "5px", mr: "5px" }}>
            <FormLabel focused={false}>Sparkling Power</FormLabel>
            <RadioGroup
              row
              value={data.method.svSparklingPower}
              onChange={(e, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      method: {
                        ...prevState.method,
                        svSparklingPower: value,
                      },
                    },
                  };
                });
              }}
            >
              <FormControlLabel
                value={"0"}
                control={<Radio color="secondary" />}
                label="Level 0"
              />
              <FormControlLabel
                value={"1"}
                control={<Radio color="secondary" />}
                label="Level 1"
              />
              <FormControlLabel
                value={"2"}
                control={<Radio color="secondary" />}
                label="Level 2"
              />
              <FormControlLabel
                value={"3"}
                control={<Radio color="secondary" />}
                label="Level 3"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      );
    } else {
      return null;
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
            options={games ? games.data : []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField required color="secondary" {...params} label="Game" />
            )}
          />

          {/* POKEMONS */}
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
              setGroupList(undefined);
              setData((prevState) => {
                const { method, ...updatedData } = prevState;
                const updatedMethod = { ...method };
                delete updatedMethod.name;
                delete updatedMethod.function;
                delete updatedMethod.odds;
                delete updatedMethod.rolls;
                delete updatedMethod.charmRolls;
                delete updatedMethod.category;
                delete updatedMethod.lure;
                delete updatedMethod.chainMatters;
                delete updatedMethod.letsGoChain;
                delete updatedMethod.sosChain;
                delete updatedMethod.radarChain;
                delete updatedMethod.researchLevel;
                delete updatedMethod.svOutbreak;
                delete updatedMethod.svSparklingPower;
                delete updatedMethod.group;
                delete updatedMethod.wormholeDistance;
                delete updatedMethod.wormholeType;

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
                  if (value?.function === "letsgospawn") {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          lure: true,
                          chainMatters: false,
                          letsGoChain: 0,
                        },
                      },
                    };
                  } else if (
                    value?.function === "sos-chain" ||
                    value?.function === "sos-chain-sm"
                  ) {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          sosChain: 0,
                        },
                      },
                    };
                  } else if (value?.function === "ultra-wormhole") {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          wormholeDistance: null,
                          wormholeType: 0,
                        },
                      },
                    };
                  } else if (
                    value?.function === "pokeradar-gen4" ||
                    value?.function === "pokeradar-gen6" ||
                    value?.function === "pokeradar-gen8"
                  ) {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          radarChain: 0,
                          group: false,
                        },
                      },
                    };
                  } else if (
                    value?.function === "arceus-spawn" ||
                    value?.function === "arceus-mass-outbreak" ||
                    value?.function === "arceus-massive-mass-outbreak"
                  ) {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          researchLevel: "10",
                        },
                      },
                    };
                  } else if (value?.function === "sv-spawn") {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          svSparklingPower: "0",
                        },
                      },
                    };
                  } else if (value?.function === "sv-outbreak") {
                    return {
                      ...prevState,
                      ...{
                        method: {
                          ...prevState.method,
                          ...value,
                          svOutbreak: "0",
                          svSparklingPower: "0",
                        },
                      },
                    };
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
          {methodCatList && (
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
                  color="secondary"
                  {...params}
                  label="Method Category"
                />
              )}
            />
          )}

          {/* METHODS EXTRA DATA*/}
          {pokeradarDisplay()}
          {letsGoSpawnDisplay()}
          {sosDisplay()}
          {laDisplay()}
          {svSpawnDisplay()}
          {svOutbreakDisplay()}
          {ultraWormholeDisplay()}

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
            <Grid item xs={8}>
              <TextField
                disabled={!data.startDate}
                required
                color="secondary"
                label="Start Date"
                type={data.startDate ? "date" : "text"}
                fullWidth
                value={
                  data.startDate instanceof Date
                    ? format(data.startDate, "yyyy-MM-dd")
                    : ""
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
            <Grid item xs={4}>
              <Box mt="8px" ml="2px">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        defaultChecked
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
            value={
              data.endDate instanceof Date
                ? format(data.endDate, "yyyy-MM-dd")
                : ""
            }
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

          {groupDisplay()}

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
