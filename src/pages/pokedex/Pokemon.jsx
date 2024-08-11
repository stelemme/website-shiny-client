import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// Mui
import { Box, Typography, useTheme, Grid, Divider } from "@mui/material";
import { tokens } from "../../theme";

// Components
import PokemonImageDisplay from "../../components/DataDisplay/PokemonImageDisplay";
import AllSpritesDisplay from "../../components/DataDisplay/AllSpritesDisplay";
import ShinySearchDisplay from "../../components/DataDisplay/ShinySearchDisplay";
import CounterSearchDisplay from "../../components/DataDisplay/CounterSearchDisplay";

// Hooks
import { usePokemonId, useGame } from "../../hooks/useData";

export default function Pokemon() {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: pokemon } = usePokemonId(pokemonId);
  const pokemonData = pokemon?.data;

  const { data: games } = useGame(
    `?pokemonFilter=${pokemonData?.name}`,
    pokemonData
  );
  const gamesList = games?.data;

  console.log(gamesList);

  const [imageDir, setImageDir] = useState("gan-all-home");
  const [gameSort, setGameSort] = useState(100);

  useEffect(() => {
    const dirValue = searchParams.get("dir");
    const sortValue = searchParams.get("sort");
    setImageDir(dirValue);
    setGameSort(sortValue);
  }, [searchParams]);

  return (
    <Box maxWidth={{ sm: "420px" }} mx="auto" my="20px">
      {pokemonData && (
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            mb="5px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              {pokemonData.name}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* POKEMON SPRITES */}
            <Grid item xs={12}>
              <PokemonImageDisplay
                directory={imageDir}
                sprite={pokemonData.sprite}
                gameSort={gameSort}
                genderDifference={false}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* SEARCH DISPLAY */}
            <Grid item xs={12}>
              <ShinySearchDisplay pokemon={pokemonData.name} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <CounterSearchDisplay pokemon={pokemonData.name} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* ALL GAME SPRITES */}
            <Grid item xs={12}>
              <AllSpritesDisplay
                pokemon={pokemonData.name}
                sprite={pokemonData.sprite}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
