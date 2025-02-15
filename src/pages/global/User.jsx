import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

// mui imports
import {
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
import TrainerDisplay from "../../components/DataDisplay/TrainerDisplay";
import EvolutionList from "../../components/DataDisplay/EvolutionList";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function User() {
  const { trainer } = useParams();
  const { username } = useAuth();
  const [trainerChoice, setTrainerChoice] = useState(trainer);
  const [cookies, setCookies] = useCookies([
    "filterGroups",
    "displayGameSprites",
    "displayEvolutionSprites",
    "displayAnimatedSpritesPreGen8",
    "displayAnimatedSpritesPostGen8",
    "displayMapOnGent",
  ]);

  const [groupCheck, setGroupCheck] = useState(cookies.filterGroups);
  const [spriteCheck, setSpriteCheck] = useState(cookies.displayGameSprites);
  const [evolutionSpriteCheck, setEvolutionSpriteCheck] = useState(
    cookies.displayEvolutionSprites
  );
  const [animatedPreGen8Check, setAnimatedPreGen8Check] = useState(
    cookies.displayAnimatedSpritesPreGen8
  );
  const [animatedPostGen8Check, setAnimatedPostGen8Check] = useState(
    cookies.displayAnimatedSpritesPostGen8
  );
  const [trainerCheck, setTrainerCheck] = useState(trainerChoice !== username);
  const [mapOnGentCheck, setMapOnGentCheck] = useState(
    cookies.displayMapOnGent
  );

  useEffect(() => {
    setTrainerCheck(trainerChoice !== username);
  }, [trainerChoice, username]);

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleGroupChange = (e) => {
    setGroupCheck(e.target.checked);
    setCookies("filterGroups", e.target.checked, { expires: foreverDate });
  };

  const handleSpriteChange = (e) => {
    setSpriteCheck(e.target.checked);
    setCookies("displayGameSprites", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleEvolutionSpriteChange = (e) => {
    setEvolutionSpriteCheck(e.target.checked);
    setCookies("displayEvolutionSprites", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleAnimatedPreGen8Change = (e) => {
    setAnimatedPreGen8Check(e.target.checked);
    setCookies("displayAnimatedSpritesPreGen8", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleAnimatedPostGen8Change = (e) => {
    setAnimatedPostGen8Check(e.target.checked);
    setCookies("displayAnimatedSpritesPostGen8", e.target.checked, {
      expires: foreverDate,
    });
  };

  const handleMapOnGentChange = (e) => {
    setMapOnGentCheck(e.target.checked);
    setCookies("displayMapOnGent", e.target.checked, {
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
          <TrainerDisplay trainerChoice={trainerChoice} trainer={username} />
        </Grid>
        <Grid item xs={12}>
          <EvolutionList trainer={trainerChoice} />
        </Grid>
        {!trainerCheck && (
          <Grid item xs={12}>
            <BoxComponent title={"TRAINER SETTINGS"}>
              <BoxComponent p="10px" noContrastColor height={null}>
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
