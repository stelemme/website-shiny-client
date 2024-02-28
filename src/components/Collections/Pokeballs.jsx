import { useState } from "react";

// mui imports
import { Box, useTheme, Typography, Grid } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny, useGame } from "../../hooks/useData";

const ballsData = [
  "Poké Ball",
  "Great Ball",
  "Ultra Ball",
  "Master Ball",
  "Safari Ball",
  "Fast Ball",
  "Level Ball",
  "Lure Ball",
  "Heavy Ball",
  "Love Ball",
  "Friend Ball",
  "Moon Ball",
  "Sport Ball",
  "Net Ball",
  "Dive Ball",
  "Nest Ball",
  "Repeat Ball",
  "Timer Ball",
  "Luxury Ball",
  "Premier Ball",
  "Dusk Ball",
  "Heal Ball",
  "Quick Ball",
  "Dream Ball",
  "Beast Ball",
  "Poké Ball (Hisui)",
  "Great Ball (Hisui)",
  "Ultra Ball (Hisui)",
  "Feather Ball",
  "Wing Ball",
  "Jet Ball",
  "Heavy Ball (Hisui)",
  "Leaden Ball",
  "Gigaton Ball",
];

export default function Pokeballs() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { data: shinyData } = useShiny(`ballCollection=true${query}`);
  const ballTotalData = shinyData?.data[0]?.ballCount;

  const { data: gameData } = useGame(`?ballList=true`);
  const ballSprites = gameData?.data[0]?.ballsprites;

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
    }
  };

  return (
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
          POKEBALLS
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      </Box>
      <Grid container spacing={"12px"}>
        {ballSprites && ballsData?.map((ball) => {
          return (
            <Grid item key={ball} lg={2} sm={2.4} xs={4}>
              <Box
                py="10px"
                px="20px"
                height="100%"
                backgroundColor={colors.primary[500]}
                borderRadius="5px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/balls/pixel/${ballSprites[ball]}.png`}
                  style={{
                    imageRendering: "pixelated",
                    height: "30px",
                  }}
                />
                <Typography variant="h6" fontWeight={"bold"} align="center">
                  {ball}
                </Typography>
                <Typography variant="h6">
                  {ballTotalData && ballTotalData[ball]
                    ? ballTotalData[ball]
                    : 0}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
