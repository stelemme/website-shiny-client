import { useState } from "react";

// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
} from "@mui/material";
import { tokens } from "../../theme";

// Images
import { natureImages } from "../../assets/imgExporter";

// Components imports
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

const natures = [
  "Hardy",
  "Lonely",
  "Adamant",
  "Naughty",
  "Brave",
  "Bold",
  "Docile",
  "Impish",
  "Lax",
  "Relaxed",
  "Modest",
  "Mild",
  "Bashful",
  "Rash",
  "Quiet",
  "Calm",
  "Gentle",
  "Careful",
  "Quirky",
  "Sassy",
  "Timid",
  "Hasty",
  "Jolly",
  "Naive",
  "Serious",
];

export default function Natures() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [trainer, setTrainer] = useState("All");

  const { data: shinyData } = useShiny(`natureCollection=true${query}`);
  const natureData = shinyData?.data[0]?.natureCount
  
  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All")
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value)
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
          NATURES
        </Typography>
        <UserSelect label={"User"} handleChange={handleChange} defaultValue={trainer} />
      </Box>
      <Grid container spacing={"12px"}>
        {natures.map((nature) => {
          return (
            <Grid item key={nature} sm={2.4} xs={4}>
              <Box
                py="10px"
                px="20px"
                backgroundColor={colors.primary[500]}
                borderRadius="5px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyItems="center"
              >
                <img height={"50px"} alt="" src={natureImages[`${nature.toLocaleLowerCase()}.png`]} />
                <Typography variant="h6" fontWeight={"bold"}>{nature}</Typography>
                <Typography variant="h6">{natureData && natureData[nature] ? natureData[nature] : 0}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
