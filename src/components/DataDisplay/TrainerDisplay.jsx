import { useState, useEffect } from "react";

// mui imports
import { Grid, Skeleton, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../../components/General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import PokemonSelect from "../Selects/PokemonSpriteSelect";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const makeRequest = useMakeRequest();

  const boxHeight = Math.min(window.innerWidth * 0.35, 220)

  const [sprite, setSprite] = useState("");
  const [spriteLoading, setSpriteLoading] = useState(true);

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
    setSpriteLoading(true);
  }, [users, trainerChoice]);

  const handleValueChange = async (value) => {
    console.log(value);
    if (!value) return;
    try {
      await makeRequest(
        "patch",
        `/user/${trainer}?action=updatePokemon`,
        { newPokemon: value.sprite },
        null,
        true
      );
      setSprite(value.sprite);
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
        <LoadingComponent
          loadingCondition={userLoading}
          skeleton={
            <Skeleton
              sx={{
                bgcolor: colors.primary[500],
                height: {
                  xs: `${boxHeight}px`,
                },
              }}
              variant="rounded"
              width={"100%"}
            />
          }
        >
          <Grid container>
            {Object.keys(trainerImages).map((item) => {
              if (
                item.includes(imageCheck[trainerChoice]) &&
                item.includes("Avatar")
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
                        minHeight: `${boxHeight}px`
                      }}
                    >
                      <img
                        alt=""
                        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-5-b2w2/animated/${sprite}.png`}
                        onLoad={() => setSpriteLoading(false)}
                        style={{
                          height: "auto",
                          width: "60%",
                          imageRendering: "pixelated",
                          marginLeft: "-20%",
                        }}
                      />
                      {!spriteLoading && (
                        <img
                          alt="Trainer"
                          src={trainerImages[item]}
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            left: "45%",
                            height: "auto",
                            width: "50%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            imageRendering: "pixelated",
                          }}
                        />
                      )}
                    </div>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </LoadingComponent>
      </BoxComponent>
    </BoxComponent>
  );
}
