import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

// Recoil
import { useSetRecoilState } from "recoil";
import { backToggle } from "../../utils/atoms";

// Mui
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import PokemonImageDisplay from "../../components/DataDisplay/PokemonImageDisplay";
import AllSpritesDisplay from "../../components/DataDisplay/AllSpritesDisplay";
import ShinySearchDisplay from "../../components/DataDisplay/ShinySearchDisplay";
import CounterSearchDisplay from "../../components/DataDisplay/CounterSearchDisplay";
import EvolutionsDisplay from "../../components/DataDisplay/EvolutionsDisplay";
import FormDisplay from "../../components/DataDisplay/FormDisplay";

// Hooks
import { usePokemonId, usePokedex } from "../../hooks/useData";
import { useGetRequest } from "../../hooks/useAxios";

// Functions
import { findPrevNextById } from "../../functions/statFunctions";

export default function Pokemon() {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const getRequest = useGetRequest();
  const setBackToggle = useSetRecoilState(backToggle);
  setBackToggle(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: pokemon } = usePokemonId(pokemonId);
  const pokemonData = pokemon?.data;

  const { isLoading: pokemonIdsLoading, data: pokemonIdData } = usePokedex("&preview=onlyId");

  const [imageDir, setImageDir] = useState("gan-all-home");
  const [gameSort, setGameSort] = useState(100);

  const [evolutions, setEvolutions] = useState([]);
  const [forms, setForms] = useState([]);

  const [previousId, setPreviousId] = useState(null);
  const [nextId, setNextId] = useState(null);

  useEffect(() => {
      if (!pokemonIdsLoading && pokemonIdData?.data) {
        const IdResult = findPrevNextById(pokemonIdData.data, pokemonId);
        setPreviousId(IdResult.prev);
        setNextId(IdResult.next);
      }
    }, [pokemonIdsLoading, pokemonIdData, pokemonId]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const dirValue = searchParams.get("dir");
    const sortValue = searchParams.get("sort");
    setImageDir(dirValue);
    setGameSort(sortValue);

    const handleGetEvolutions = async () => {
      try {
        const response = await getRequest(
          `/pokedex?filter=evolutions&filterName=${pokemonData.name}`
        );
        setEvolutions(response[0].evolutionNames);
        setForms(response[0].formNames);
      } catch {
        return;
      }
    };

    handleGetEvolutions();
  }, [searchParams, pokemonData]);

  return (
    <Box maxWidth={{ sm: "420px" }} mx="auto" my="20px">
      <Box mx="20px" display="flex" justifyContent="space-between">
          <Button
            variant="secondary"
            startIcon={<ArrowBackIosIcon />}
            disabled={!previousId}
            onClick={() => {
              if (previousId) {
                navigate(`/pokedex/${previousId._id}?dir=${imageDir}&sort=${gameSort}`);
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            endIcon={<ArrowForwardIosIcon />}
            disabled={!nextId}
            onClick={() => {
              if (nextId) {
                navigate(`/pokedex/${nextId._id}?dir=${imageDir}&sort=${gameSort}`);
              }
            }}
          >
            Next
          </Button>
        </Box>
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
            <Box ml="10px" display="flex">
              <IconButton
                size="small"
                onClick={() => setBackToggle((prevState) => !prevState)}
              >
                <AutorenewIcon />
              </IconButton>
            </Box>
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
              <ShinySearchDisplay pokemon={pokemonData.name} searchType={"pokedex"} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <CounterSearchDisplay pokemon={pokemonData.name} searchType={"pokedex"}/>
            </Grid>

            {evolutions.length !== 0 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}

            {/* EVOLUTIONS DISPLAY */}
            <Grid item xs={12}>
              <EvolutionsDisplay
                evolutions={evolutions}
                directory={imageDir}
                sprite={pokemonData.sprite}
                gameSort={gameSort}
                genderDifference={false}
              />
            </Grid>

            {forms.length !== 0 && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}

            {/* FORMS DISPLAY */}
            <Grid item xs={12}>
              <FormDisplay
                forms={forms}
                directory={imageDir}
                sprite={pokemonData.sprite}
                gameSort={gameSort}
              />
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
