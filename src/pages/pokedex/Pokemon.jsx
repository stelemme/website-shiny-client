import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// Mui
import { Box, Typography, useTheme, Grid, Divider } from "@mui/material";
import { tokens } from "../../theme";

// Components
import PokemonImageDisplay from "../../components/DataDisplay/PokemonImageDisplay";

// Hooks
import { usePokemonId } from "../../hooks/useData";

export default function Pokemon() {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: pokemon } = usePokemonId(pokemonId);
  const data = pokemon?.data;

  const [imageDir, setImageDir] = useState("gan-all-home");
  const [gameSort, setGameSort] = useState(100);

  console.log(data);

  useEffect(() => {
    const dirValue = searchParams.get("dir");
    const sortValue = searchParams.get("sort");
    setImageDir(dirValue);
    setGameSort(sortValue);
  }, [searchParams]);

  return (
    <Box maxWidth={{ sm: "420px" }} mx="auto" my="20px">
      {data && (
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            mb="5px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              {data.name}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* POKEMON SPRITES */}
            <Grid item xs={12}>
              <PokemonImageDisplay data={data} pokedex imageDir={imageDir} sort={gameSort} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
