import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mui
import { Box, Button, Grid } from "@mui/material";

// Components
import Header from "../../components/Header";
import GameForm from "../../components/Forms/GameForm";
import PokemonForm from "../../components/Forms/PokemonForm";
import LocationsForm from "../../components/Forms/LocationForm";
import ShinyCharmForm from "../../components/Forms/ShinyCharmForm";
import MethodForm from "../../components/Forms/MethodForm";
import SubMethodForm from "../../components/Forms/SubMethodForm";
import IncrementForm from "../../components/Forms/IncrementForm";
import ThresholdForm from "../../components/Forms/ThresholdForm";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function CreateCounter() {
  const { username } = useAuth();
  const navigate = useNavigate();

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
    endDate: new Date(),
  };

  const [data, setData] = useState(initialState);
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
          <GameForm
            setData={setData}
            initialState={initialState}
            setShinyCharmCheck={setShinyCharmCheck}
            setPokemonsList={setPokemonsList}
            setMethodsList={setMethodsList}
            setMethodCatList={setMethodCatList}
            setLocationsList={setLocationsList}
            setClearMethod={setClearMethod}
          />

          {/* POKEMONS */}
          <PokemonForm
            setData={setData}
            pokemonsList={pokemonsList}
            isAsCounter
          />

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
            clearMethod={clearMethod}
          />

          {/* METHODS SUBCATEGORY*/}
          {methodCatList && (
            <SubMethodForm setData={setData} methodCatList={methodCatList} />
          )}

          <Grid container spacing={"10px"}>
            <Grid item xs={4}>
              {/* INCREMENT */}
              <IncrementForm data={data} setData={setData} />
            </Grid>
            <Grid item xs={4}>
              {/* LOWER THRESHOLD */}
              <ThresholdForm data={data} setData={setData} type={"lower"} />
            </Grid>
            <Grid item xs={4}>
              <ThresholdForm data={data} setData={setData} type={"upper"} />
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
