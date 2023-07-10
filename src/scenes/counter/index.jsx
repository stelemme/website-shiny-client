import React, { useState } from "react";
import { useParams } from "react-router-dom";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import CounterHeader from "../../components/CounterHeader";

const data = {
  _id: { $oid: "64a6744a8ed915943a525921" },
  trainer: "Stef",
  name: "Bulbasaur",
  pokedexNo: 16,
  type: ["Normal", "Flying"],
  game: "Pokémon HeartGold",
  location: "Route 1 (Kanto)",
  method: {
    name: "Encounter",
    category: "Grass Encounter",
    odds: 8192,
  },
  sprite: { game: "heartgold", pokemon: "bulbasaur", dir: "gen-4-hgss" },
  totalEncounters: 10,
  encounters: [
    {
      timestamp: 1688805243896,
      encounters: 1,
    },
    {
      timestamp: 1688805303896,
      encounters: 1,
    },
    {
      timestamp: 1688805363896,
      encounters: 1,
    },
    {
      timestamp: 1688805423896,
      encounters: 1,
    },
    {
      timestamp: 1688805483896,
      encounters: 1,
    },
    {
      timestamp: 1688805543896,
      encounters: 1,
    },
    {
      timestamp: 1688805603896,
      encounters: 1,
    },
    {
      timestamp: 1688805663896,
      encounters: 1,
    },
    {
      timestamp: 1688805723896,
      encounters: 1,
    },
    {
      timestamp: 1688805783896,
      encounters: 1,
    },
  ],
};

export default function Counter() {
  const { counterId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [backgroundColor, setBackgroundColor] = useState(colors.primary[400]);

  const handleCountClick = () => {
    setBackgroundColor(colors.primary[900]);
    console.log("count")
    setTimeout(() => {
      setBackgroundColor(colors.primary[400]);
    }, 200);
  };

  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <CounterHeader title={data.name.toUpperCase()} />
        {/* CONTENT */}
        <Box display="flex" justifyContent="space-between" mb="20px">
          <Box display="flex" gap="20px">
            <Box display="inline-flex" alignItems="center">
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.sprite.game}.png`}
                height="33px"
              />
            </Box>
            <Box display="inline-flex" alignItems="center">
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.sprite.dir}/${data.sprite.pokemon}.png`}
                height="33px"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderRadius="4px"
            width="90px"
            minWidth="90px"
            mx="10px"
          >
            <Typography fontWeight={"bold"} variant="h5">
              {data.totalEncounters}
            </Typography>
          </Box>
        </Box>
        <Box
          minHeight="300px"
          borderRadius="30px"
          backgroundColor={backgroundColor}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={handleCountClick}
          sx={{
            "@media (hover: hover)": {
              "&:hover": {
                cursor: "pointer",
                backgroundColor: colors.primary[900],
              },
            },
          }}
        >
          <Typography fontSize={80} fontWeight={"bold"}>
            +1
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
