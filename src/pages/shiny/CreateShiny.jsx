import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../../utils/atoms";

// Mui
import { Box, Button, Grid } from "@mui/material";

// Components
import Header from "../../components/Header";
import RadarGroupForm from "../../components/Forms/RadarGroupForm";
import RadarForm from "../../components/Forms/RadarForm";
import DexNavForm from "../../components/Forms/DexNavForm";
import LetsGoForm from "../../components/Forms/LetsGoForm";
import SosForm from "../../components/Forms/SosForm";
import LaForm from "../../components/Forms/LaForm";
import WormholeForm from "../../components/Forms/WormholeForm";
import SvForm from "../../components/Forms/SvForm";
import SvOutbreakForm from "../../components/Forms/SvOutbreakForm";
import GameForm from "../../components/Forms/GameForm";
import PokemonForm from "../../components/Forms/PokemonForm";
import GenderForm from "../../components/Forms/GenderForm";
import LocationsForm from "../../components/Forms/LocationForm";
import ShinyCharmForm from "../../components/Forms/ShinyCharmForm";
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
  calculateDateDifference,
} from "../../functions/statFunctions";
import methodHunts from "../../functions/methodHunts";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useMakeRequest } from "../../hooks/useAxios";

export default function CreateShiny() {
  const { username } = useAuth();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const makeRequest = useMakeRequest();

  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

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
  const [shinyCharmCheck, setShinyCharmCheck] = useState(false);
  const [locationsList, setLocationsList] = useState(undefined);
  const [methodsList, setMethodsList] = useState(undefined);
  const [methodCatList, setMethodCatList] = useState(undefined);
  const [pokemonsList, setPokemonsList] = useState(undefined);
  const [ballList, setBallList] = useState(undefined);
  const [ballCheck, setBallCheck] = useState(false);
  const [natureCheck, setNatureCheck] = useState(false);
  const [groupList, setGroupList] = useState(undefined);

  const [clearMethod, setClearMethod] = useState("method");
  const [genderCheck, setGenderCheck] = useState(false);

  console.log(data);

  useEffect(() => {
    setData((prevState) => {
      return { ...prevState, ...{ trainer: username } };
    });
  }, [username]);

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
      } else {
        navigateRef.current(`/shiny/${id}`);
      }
    };

    const handleSubmit = async () => {
      if (!data.stats) {
        return;
      }

      const response = await makeRequest("post", `/shiny`, data, "creation");
      endFunction(response._id);
    };

    handleSubmit();
  }, [data, genderCheck]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAlertSeverity("info");
    setAlertMessage("Loading...");
    setAlertOpen(true);

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
        daysHunting: calculateDateDifference(data.endDate, data.startDate),
      };

      if (data.method.function) {
        switch (data.method.function) {
          case "dexnav":
            setData((prevState) => ({
              ...prevState,
              stats: {
                ...newStats,
                probability: calculateProb(
                  data.method.odds,
                  data.method.rolls,
                  data.method.shinyCharm,
                  data.method?.charmRolls,
                  data.totalEncounters,
                  data.method?.function,
                  data.method?.searchLevel
                ),
              },
            }));
            break;
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
            setAlertSeverity("error");
            setAlertMessage("Something went wrong calculating the method stats.");
            setAlertOpen(true);
        }
      } else {
        setData((prevState) => ({
          ...prevState,
          stats: newStats,
        }));
      }
    } else if (!data.gender) {
      setAlertSeverity("warning");
      setAlertMessage("You forgot to fill in the gender.");
      setAlertOpen(true);
    } else if (
      data.geoLocation.name === "" &&
      data.geoLocation.displayName === ""
    ) {
      setAlertSeverity("warning");
      setAlertMessage("You forgot to fill in the geo location.");
      setAlertOpen(true);
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
          <GameForm
            setData={setData}
            initialState={initialState}
            setShinyCharmCheck={setShinyCharmCheck}
            setPokemonsList={setPokemonsList}
            setGenderCheck={setGenderCheck}
            setMethodsList={setMethodsList}
            setMethodCatList={setMethodCatList}
            setLocationsList={setLocationsList}
            setClearMethod={setClearMethod}
            setBallList={setBallList}
          />

          {/* POKEMONS */}
          <PokemonForm
            setData={setData}
            pokemonsList={pokemonsList}
            setGenderCheck={setGenderCheck}
          />

          {/* GENDER */}
          <GenderForm data={data} setData={setData} genderCheck={genderCheck} />

          {/* LOCATIONS */}
          <LocationsForm setData={setData} locationsList={locationsList} />

          {/* SHINYCHARM */}
          {shinyCharmCheck && (
            <ShinyCharmForm
              data={data}
              setData={setData}
              setClearMethod={setClearMethod}
              setMethodCatList={setMethodCatList}
            />
          )}

          {/* METHODS */}
          <MethodForm
            setData={setData}
            methodsList={methodsList}
            setMethodCatList={setMethodCatList}
            setGroupList={setGroupList}
            clearMethod={clearMethod}
          />

          {/* METHODS SUBCATEGORY*/}
          {methodCatList && (
            <SubMethodForm setData={setData} methodCatList={methodCatList} />
          )}

          {/* RADAR FORM*/}
          {data.method.function === "pokeradar-gen4" ||
          data.method.function === "pokeradar-gen6" ||
          data.method.function === "pokeradar-gen8" ? (
            <RadarForm setData={setData} />
          ) : null}

          {/* DEXNAV FORM*/}
          {data.method.function === "dexnav" ? (
            <DexNavForm data={data} setData={setData} />
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

          <Grid container spacing={"10px"}>
            {/* BALL */}
            <Grid item xs={6}>
              <BallForm
                setData={setData}
                ballList={ballList}
                ballCheck={ballCheck}
              />
            </Grid>

            {/* NATURE */}
            <Grid item xs={6}>
              <NatureForm setData={setData} natureCheck={natureCheck} />
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
            <Grid item xs={12}>
              <StartDateForm data={data} setData={setData} />
            </Grid>
          </Grid>

          {/* END DATE */}
          <EndDateForm data={data} setData={setData} />

          {/* NICKNAME */}
          <NicknameForm data={data} setData={setData} />

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
      </Box>
    </Box>
  );
}
