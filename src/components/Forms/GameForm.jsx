import { useState, useEffect } from "react";
import axios from "axios";

// Mui
import { TextField, Autocomplete } from "@mui/material";

// Hooks
import { useGame } from "../../hooks/useData";

export default function GameForm({
  data,
  setData,
  initialState,
  setShinyCharmCheck,
  setPokemonsList,
  setGenderCheck,
  setMethodsList,
  setMethodCatList,
  setLocationsList,
  setClearMethod,
  setBallList,
  isForCounter = false
}) {
  const [gameId, setGameId] = useState(undefined);

  const { data: games } = useGame("?action=form");

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
  }, [gameId, setPokemonsList]);

  if (!isForCounter) {
    return (
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
          setGenderCheck(false);
          if (setBallList) {
            setBallList(undefined);
          }

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
            if (setBallList) {
                setBallList(value.balls);
            }
          }
        }}
        sx={{ mb: "20px" }}
        options={games ? games.data : []}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField required color="secondary" {...params} label="Game" />
        )}
      />
    );
  } else {
    return (
      <TextField
        sx={{ mb: "20px" }}
        color="secondary"
        fullWidth
        disabled
        value={data.game}
        key={data.game}
        label="Game"
        required
      />
    );
  }
}