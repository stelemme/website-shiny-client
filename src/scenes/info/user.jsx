import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

// mui imports
import {
  Box,
  Grid,
  Typography,
  useTheme,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import Header from "../../components/Header";
import UserSelect from "../../components/Selects/UserSelect";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function User() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { trainer } = useParams();
  const { username } = useAuth();
  const [trainerChoice, setTrainerChoice] = useState(trainer);

  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  const groupShinies = Cookies.get("groupShinies")
    ? Cookies.get("groupShinies")
    : false;

  const gameSpriteDisplay = Cookies.get("gameSpriteDisplay")
    ? Cookies.get("gameSpriteDisplay")
    : false;

  const [groupCheck, setGroupCheck] = useState(groupShinies === "true")
  const [spriteCheck, setSpriteCheck] = useState(gameSpriteDisplay === "true")
  const [trainerCheck, setTrainerCheck] = useState(trainerChoice !== username)

  
  useEffect(() => {
    setTrainerCheck(trainerChoice !== username)
  }, [trainerChoice, username])

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleGroupChange = (e) => {
    setGroupCheck(e.target.checked)
    Cookies.set("groupShinies", e.target.checked, { expires: foreverDate });
  };

  const handleSpriteChange = (e) => {
    setSpriteCheck(e.target.checked)
    Cookies.set("gameSpriteDisplay", e.target.checked, { expires: foreverDate });
  };

  const handleTrainerChange = (e) => {
    setTrainerChoice(e.target.value);
  };

  return (
    <Box maxWidth={{ md: "630px", sm: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          mb={{ xs: "20px", md: "0px" }}
        >
          <Header
            title={`${trainerChoice.toLocaleUpperCase()}'S TRAINER PAGE`}
            subtitle={`Here you can view and change trainer specific data.`}
          />
          <UserSelect
            label={"User"}
            handleChange={handleTrainerChange}
            defaultValue={trainerChoice}
            addAll={false}
          />
        </Box>

        <Grid container spacing={"20px"}>
          <Grid item xs={12}>
            <Box
              p="20px"
              width="100%"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              height="100%"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={"14px"}
                height={"28px"}
              >
                <Typography variant="h4" fontWeight={"bold"}>
                  TRAINER SPRITES
                </Typography>
              </Box>
              <Box
                p="10px"
                width="100%"
                backgroundColor={colors.primary[500]}
                borderRadius="5px"
              >
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
              </Box>
            </Box>
          </Grid>
          {!trainerCheck && (<Grid item xs={12}>
            <Box
              p="20px"
              width="100%"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
              height="100%"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={"14px"}
                height={"28px"}
              >
                <Typography variant="h4" fontWeight={"bold"}>
                  TRAINER SETTINGS
                </Typography>
              </Box>
              <Box
                p="10px"
                width="100%"
                backgroundColor={colors.primary[500]}
                borderRadius="5px"
              >
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
                      <Typography variant="h6" fontWeight={"bold"}>
                        GROUP THE RADAR SHINIES
                      </Typography>
                    }
                  />
                </FormGroup>
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
                      <Typography variant="h6" fontWeight={"bold"}>
                        DISPLAY GAMESPRITE ON SHINY PAGE
                      </Typography>
                    }
                  />
                </FormGroup>
              </Box>
            </Box>
          </Grid>)}
        </Grid>
      </Box>
    </Box>
  );
}
