import { useEffect, useState, useRef } from "react";
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
  Alert,
} from "@mui/material";

// Components
import Header from "../../components/Header";
import RadarGroupForm from "../../components/Forms/RadarGroupForm";
import RadarForm from "../../components/Forms/RadarForm";
import LetsGoForm from "../../components/Forms/LetsGoForm";
import SosForm from "../../components/Forms/SosForm";
import LaForm from "../../components/Forms/LaForm";
import WormholeForm from "../../components/Forms/WormholeForm";
import SvForm from "../../components/Forms/SvForm";
import SvOutbreakForm from "../../components/Forms/SvOutbreakForm";

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
  const navigateRef = useRef(navigate);

  const { data: games } = useGame("?action=form");

  let initialLocationState = {
    name: "",
    displayName: "",
    position: [],
  };

  const initialAlert = {
    severity: undefined,
    message: undefined,
  };
  const initialAlertRef = useRef(initialAlert);

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
  const [ballCheck, setBallCheck] = useState(false);
  const [natureCheck, setNatureCheck] = useState(false);
  const [groupList, setGroupList] = useState(undefined);
  const [geoLocationsList, setGeoLocationsList] = useState(undefined);
  const [newGeoLocation, setNewGeoLocation] = useState(false);

  const [clearMethod, setClearMethod] = useState("method");
  const [genderCheck, setGenderCheck] = useState(false);

  const [alert, setAlert] = useState(initialAlert);
  const [alertSkip, setAlertSkip] = useState(false);

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const endFunction = (id) => {
      if (data.method.group) {
        setData((prevState) => {
          delete prevState.stats;
          delete prevState.ball;
          delete prevState.sprite.ball;
          delete prevState.nature;
          return {
            ...prevState,
            ...{
              gender: genderCheck ? undefined : prevState.gender,
              nickname: "",
            },
          };
        });
        setBallCheck((prevState) => !prevState);
        setNatureCheck((prevState) => !prevState);
        setAlert({
          severity: "success",
          message:
            "The shiny is succesfully added to the site. You can now add another one to the group.",
        });
        setAlertSkip(true);
      } else {
        navigateRef.current(`/shiny/${id}`);
      }
    };

    if (data.stats) {
      axios
        .post(`/shiny`, data)
        .then((res) => {
          console.log(res.data);
          endFunction(res.data._id);
        })
        .catch((err) => {
          setAlert({
            severity: "error",
            message: "Something went wrong. Refresh the site and try again.",
          });
          console.log(err);
        });
    } else if (!alertSkip) {
      setAlert(initialAlertRef);
    } else {
      setAlertSkip(false);
    }
  }, [data, genderCheck]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAlert({
      severity: "info",
      message: "Loading...",
    });

    if (
      data.geoLocation.name !== "" &&
      data.geoLocation.displayName !== "" &&
      data.gender
    ) {
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
    } else if (!data.gender) {
      setAlert({
        severity: "warning",
        message: "You forgot to fill in the gender.",
      });
    } else if (
      data.geoLocation.name === "" &&
      data.geoLocation.displayName === ""
    ) {
      setAlert({
        severity: "warning",
        message: "You forgot to fill in the geo location.",
      });
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

  const alertDisplay = () => {
    if (alert.severity) {
      return (
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
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

          {/* RADAR FORM*/}
          {data.method.function === "pokeradar-gen4" ||
          data.method.function === "pokeradar-gen6" ||
          data.method.function === "pokeradar-gen8" ? (
            <RadarForm setData={setData} />
          ) : null}

          {/* LET'S GO FORM*/}
          {data.method.function === "letsgospawn" ? (
            <LetsGoForm data={data} setData={setData} />
          ) : null}

          {/* SOS FORM*/}
          {data.method.function === "sos-chain" ||
          data.method.function === "sos-chain-sm" ? (
            <SosForm setData={setData} />
          ) : null}

          {/* WORMHOLE FORM*/}
          {data.method.function === "ultra-wormhole" ? (
            <WormholeForm data={data} setData={setData} />
          ) : null}

          {/* LEGEND ARCEUS FORM*/}
          {data.method.function === "arceus-spawn" ||
          data.method.function === "arceus-mass-outbreak" ||
          data.method.function === "arceus-massive-mass-outbreak" ? (
            <LaForm data={data} setData={setData} />
          ) : null}

          {/* SV SPAWN FORM*/}
          {data.method.function === "sv-spawn" ? (
            <SvForm data={data} setData={setData} />
          ) : null}

          {/* SV OUTBREAK FORM*/}
          {data.method.function === "sv-outbreak" ? (
            <SvOutbreakForm data={data} setData={setData} />
          ) : null}

          {/* BALL */}
          <Grid container spacing={"10px"}>
            <Grid item xs={6}>
              <Autocomplete
                key={ballList && ballCheck}
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
                key={natureCheck}
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

          {data.method.function === "pokeradar-gen4" ? (
            <RadarGroupForm
              data={data}
              setData={setData}
              groupList={groupList}
              setGroupList={setGroupList}
              username={username}
            />
          ) : null}

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
        {alertDisplay()}
      </Box>
    </Box>
  );
}
