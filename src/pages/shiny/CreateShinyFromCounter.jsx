import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Mui
import { Box, Button, Grid } from "@mui/material";

// Components
import Header from "../../components/Header";
import GameForm from "../../components/Forms/GameForm";
import PokemonForm from "../../components/Forms/PokemonForm";
import GenderForm from "../../components/Forms/GenderForm";
import LocationsForm from "../../components/Forms/LocationForm";
import MethodForm from "../../components/Forms/MethodForm";
import SubMethodForm from "../../components/Forms/SubMethodForm";
import BallForm from "../../components/Forms/BallForm";
import NatureForm from "../../components/Forms/NatureForm";
import LevelForm from "../../components/Forms/LevelForm";
import GeoLocationForm from "../../components/Forms/GeoLocationForm";
import StartDateForm from "../../components/Forms/StartDateForm";
import EndDateForm from "../../components/Forms/EndDateForm";
import NicknameForm from "../../components/Forms/NicknameForm";

// Functions
import {
  calculateMeanEncounterTime,
  calculateProb,
  calculatePercentage,
  calculateDateDifference,
} from "../../functions/statFunctions";

export default function CreateShinyFromCounter() {
  const { counterId } = useParams();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

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
                    gender: undefined,
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
    const endFunction = (id) => {
      navigateRef.current(`/shiny/${id}`);
    };

    if (data.stats) {
      axios
        .post(`/shiny`, data)
        .then((res) => {
          console.log("test", res.data);
          axios["delete"](`/counters/${counterId}`).catch((err) => {
            console.log(err);
          });
          endFunction(res.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data, counterId]);

  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();

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
          <GameForm data={data} isForCounter />

          {/* POKEMONS */}
          <PokemonForm
            data={data}
            setData={setData}
            pokemonsList={pokemonsList}
            setGenderCheck={setGenderCheck}
            isForCounter
          />

          {/* GENDER */}
          <GenderForm data={data} setData={setData} genderCheck={genderCheck} />

          {/* LOCATIONS */}
          <LocationsForm setData={setData} locationsList={locationsList} />

          {/* METHODS */}
          <MethodForm data={data} isForCounter />

          {/* METHODS SUBCATEGORY*/}
          <SubMethodForm data={data} isForCounter />

          <Grid container spacing={"10px"}>
            {/* BALL */}
            <Grid item xs={6}>
              <BallForm setData={setData} ballList={ballList} />
            </Grid>

            {/* NATURE */}
            <Grid item xs={6}>
              <NatureForm setData={setData} />
            </Grid>

            {/* LEVEL */}
            <Grid item xs={12}>
              <LevelForm data={data} setData={setData} />
            </Grid>

            {/* GEO LOCATION */}
            <Grid item xs={12}>
              <GeoLocationForm data={data} setData={setData} />
            </Grid>

            {/* START DATE */}
            <Grid item xs={6}>
              <StartDateForm data={data} setData={setData} />
            </Grid>

            {/* END DATE */}
            <Grid item xs={6}>
              <EndDateForm data={data} setData={setData} />
            </Grid>
          </Grid>

          {/* NICKNAME */}
          <NicknameForm data={data} setData={setData} />

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
