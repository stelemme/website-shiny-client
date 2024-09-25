import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

// mui imports
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import BoxComponent from "../../components/General/BoxComponent";
import UserSelect from "../../components/Selects/UserSelect";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function User() {
  const { trainer } = useParams();
  const { username } = useAuth();
  const [trainerChoice, setTrainerChoice] = useState(trainer);
  const [cookies, setCookies] = useCookies([
    "groupShinies",
    "gameSpriteDisplay",
    "evolutionSpriteDisplay",
    "animatedSpriteDisplayPreGen8",
    "animatedSpriteDisplayPostGen8",
    "mapOnGent",
  ]);

  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  const [groupCheck, setGroupCheck] = useState(cookies.groupShinies);
  const [spriteCheck, setSpriteCheck] = useState(cookies.gameSpriteDisplay);
  const [evolutionSpriteCheck, setEvolutionSpriteCheck] = useState(
    cookies.evolutionSpriteDisplay
  );
  const [animatedPreGen8Check, setAnimatedPreGen8Check] = useState(
    cookies.animatedSpriteDisplayPreGen8
  );
  const [animatedPostGen8Check, setAnimatedPostGen8Check] = useState(
    cookies.animatedSpriteDisplayPostGen8
  );
  const [trainerCheck, setTrainerCheck] = useState(trainerChoice !== username);
  const [mapOnGentCheck, setMapOnGentCheck] = useState(cookies.mapOnGent);

  useEffect(() => {
    setTrainerCheck(trainerChoice !== username);
  }, [trainerChoice, username]);

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleGroupChange = (e) => {
    setGroupCheck(e.target.checked);
    setCookies("groupShinies", e.target.checked, { expires: foreverDate });
  };

  const handleSpriteChange = (e) => {
    setSpriteCheck(e.target.checked);
    setCookies("gameSpriteDisplay", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleEvolutionSpriteChange = (e) => {
    setEvolutionSpriteCheck(e.target.checked);
    setCookies("evolutionSpriteDisplay", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleAnimatedPreGen8Change = (e) => {
    setAnimatedPreGen8Check(e.target.checked);
    setCookies("animatedSpriteDisplayPreGen8", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleAnimatedPostGen8Change = (e) => {
    setAnimatedPostGen8Check(e.target.checked);
    setCookies("animatedSpriteDisplayPostGen8", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleMapOnGentChange = (e) => {
    setMapOnGentCheck(e.target.checked);
    setCookies("mapOnGent", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleTrainerChange = (e) => {
    setTrainerChoice(e.target.value);
  };

  return (
    <PageComponent
      title={`${trainerChoice.toLocaleUpperCase()}'S TRAINER PAGE`}
      subtitle={`Here you can view and change trainer specific data.`}
      widthSnaps={2}
      select={
        <UserSelect
          label={"User"}
          handleChange={handleTrainerChange}
          defaultValue={trainerChoice}
          addAll={false}
          fullWidth
        />
      }
    >
      <Grid container spacing={"20px"}>
        <Grid item xs={12}>
          <BoxComponent title={"TRAINER SPRITES"}>
            <BoxComponent p="10px" noContrastColor>
              <Grid container>
                {Object.keys(trainerImages).map((item) => {
                  if (item.includes(imageCheck[trainerChoice])) {
                    return (
                      <Grid item sm={2.4} xs={4} key={item}>
                        <img
                          height={"100px"}
                          alt=""
                          src={trainerImages[item]}
                          title={item.slice(0, -4)}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            imageRendering: "pixelated",
                          }}
                        />
                      </Grid>
                    );
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </BoxComponent>
          </BoxComponent>
        </Grid>
        {!trainerCheck && (
          <Grid item xs={12}>
            <BoxComponent title={"TRAINER SETTINGS"}>
              <BoxComponent p="10px" noContrastColor>
                <Typography variant="h6" fontWeight={"bold"}>
                  DATA FILTERING
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={groupCheck}
                        onChange={handleGroupChange}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Group the radar shinies
                      </Typography>
                    }
                  />
                </FormGroup>
                <Typography variant="h6" fontWeight={"bold"}>
                  SHINY SPRITE PREVIEW SETTINGS
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={spriteCheck}
                        onChange={handleSpriteChange}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Display as Pokémon Home sprites
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={evolutionSpriteCheck}
                        onChange={handleEvolutionSpriteChange}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Display evolutions and forms
                      </Typography>
                    }
                  />
                </FormGroup>
                <Typography variant="h6" fontWeight={"bold"}>
                  SHINY SPRITE SETTINGS
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={animatedPreGen8Check}
                        onChange={handleAnimatedPreGen8Change}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Animate sprites before Pokémon Sword and Shield
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={animatedPostGen8Check}
                        onChange={handleAnimatedPostGen8Change}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">
                        Animate sprites after Pokémon Sword and Shield
                      </Typography>
                    }
                  />
                </FormGroup>
                <Typography variant="h6" fontWeight={"bold"}>
                  MAP SETTINGS
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={mapOnGentCheck}
                        onChange={handleMapOnGentChange}
                        inputProps={{ "aria-label": "controlled" }}
                        disabled={trainerCheck}
                      />
                    }
                    label={
                      <Typography variant="h6">Map opens on Gent</Typography>
                    }
                  />
                </FormGroup>
              </BoxComponent>
            </BoxComponent>
          </Grid>
        )}
      </Grid>
    </PageComponent>
  );
}
