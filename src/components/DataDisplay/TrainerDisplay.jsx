import { useState, useEffect } from "react";

// mui imports
import { Grid } from "@mui/material";

// Components imports
import BoxComponent from "../../components/General/BoxComponent";
import PokemonSelect from "../Selects/PokemonSelect";

// Images
import { trainerImages } from "../../assets/imgExporter";

// Hooks
import { useUser } from "../../hooks/useData";
import { useMakeRequest } from "../../hooks/useAxios";

function getFavoritePokemon(people, targetName) {
  const person = people?.find((p) => p.user === targetName);
  return person ? person.favoritePokemon : null;
}

export default function TrainerDisplay({ trainerChoice, trainer }) {
  const makeRequest = useMakeRequest();
  const [sprite, setSprite] = useState("");
  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  const { isLoading: userLoading, data: userData } = useUser("all=true");

  const users = userData?.data;

  useEffect(() => {
    setSprite(getFavoritePokemon(users, trainerChoice));
  }, [users, trainerChoice]);

  const handleValueChange = async (value) => {
    console.log(value)
    if (!value) return
    try {
      await makeRequest(
        "patch",
        `/user/${trainer}?action=updatePokemon`,
        { newPokemon: value },
        null,
        true
      );
      setSprite(value);
    } catch {
      return;
    }
  };

  return (
    <BoxComponent
      title={"TRAINER SPRITE"}
      select={
        trainerChoice === trainer ? (
          <PokemonSelect
            label="Pokémon"
            handleChange={handleValueChange}
            size="small"
          />
        ) : null
      }
    >
      <BoxComponent p="10px" noContrastColor height={null}>
        <Grid container>
          {Object.keys(trainerImages).map((item) => {
            if (
              item.includes(imageCheck[trainerChoice]) &&
              item.includes("Avatar") &&
              !userLoading
            ) {
              return (
                <Grid
                  item
                  xs={12}
                  key={item}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      alt=""
                      src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-5/animated/${sprite}.png`}
                      style={{
                        height: "auto",
                        width: "50%",
                        imageRendering: "pixelated",
                        marginLeft: "-20%",
                      }}
                    />
                    <img
                      alt="Trainer"
                      src={trainerImages[item]}
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left: "40%",
                        bottom: "0px",
                        height: "auto",
                        width: "50%",
                        imageRendering: "pixelated",
                      }}
                    />
                  </div>
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </BoxComponent>
    </BoxComponent>
  );
}
