import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../../utils/atoms";

// Mui
import { Button, Grid } from "@mui/material";

// Components
import PageComponent from "../../components/General/PageComponent";
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
  calculateProb,
  calculatePercentage,
  calculateDateDifference,
} from "../../functions/statFunctions";
import { isValidGeospatialCoordinates } from "../../functions/checks";

// Hooks
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function CreateShinyFromCounter() {
  const { counterId } = useParams();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const response = await getRequest(`/counters/${counterId}`);
        response.startDate = new Date(response.startDate);
        response.endDate = new Date(response.endDate);

        setData((prevState) => {
          return {
            ...prevState,
            ...response,
          };
        });

        const response2 = await getRequest(
          `/pokedex?filter=complex&filterName=${response.name}`
        );

        let gender = undefined;
        if (response2.gender === "100:0") {
          gender = "male";
        } else if (response2.gender === "0:100") {
          gender = "female";
        } else if (response2.gender === "Genderless") {
          gender = "genderless";
        } else {
          setGenderCheck(true);
        }

        setData((prevState) => {
          return {
            ...prevState,
            ...{
              gender: gender,
            },
          };
        });

        const response3 = await getRequest(
          `/game?filter=complex&filterName=${response.game}`
        );

        setPokemonsList(response3[0].pokemons);
        setLocationsList(response3[0].locations);
        setBallList(response3[0].balls);
      } catch {
        return;
      }
    };
    if (counterId) {
      fetchCounterData();
    }
  }, [counterId]);

  useEffect(() => {
    const handleDefSubmit = async () => {
      if (!data.stats?.daysHunting) {
        return;
      }

      const response = await makeRequest("post", `/shiny`, data, "creation");

      await makeRequest("delete", `/counters/${counterId}`);
      navigateRef.current(`/shiny/${response._id}`);
    };

    handleDefSubmit();
  }, [data, counterId]);

  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      data.geoLocation.name === "" ||
      !isValidGeospatialCoordinates(data.geoLocation.position)
    ) {
      setAlertSeverity("warning");
      setAlertMessage(
        "You forgot to fill in the geo location or it is filled in incorrectly"
      );
      setAlertOpen(true);

      return;
    } else if (!data.gender) {
      setAlertSeverity("warning");
      setAlertMessage("You forgot to fill in the gender.");
      setAlertOpen(true);

      return;
    }

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
      meanEncounterTime: data.stats.meanEncounterTime,
      daysHunting: calculateDateDifference(data.endDate, data.startDate),
      totalHuntTime: Math.round(
        data.stats.meanEncounterTime * data.totalEncounters
      ),
      manualMeanEncounterTime: data.stats.manualMeanEncounterTime,
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
  };

  return (
    <PageComponent
      title="ADD A NEW SHINY"
      subtitle="Here you can add a new shiny pokémon."
      widthSnaps={1}
    >
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
            <StartDateForm data={data} setData={setData} isForCounter />
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
    </PageComponent>
  );
}
