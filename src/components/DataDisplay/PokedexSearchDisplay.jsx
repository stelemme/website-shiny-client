// Mui
import { Typography, Box, Grid } from "@mui/material";

// Components
import LoadingComponent from "../General/LoadingComponent";
import PokedexCard from "../Cards/PokedexCard";

// Hooks
import { usePokedex } from "../../hooks/useData";

export default function PokedexSearchDisplay({ pokemon }) {
  const { isLoading: pokemonLoading, data: pokemonData } = usePokedex(
    `search=${pokemon}`
  );

  const data = pokemonData?.data;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="21px"
      >
        <Typography variant="h5" fontWeight={"bold"}>
          POKEMON
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <LoadingComponent
          loadingCondition={pokemonLoading}
          errorCondition={!pokemonData?.data.length}
          errorText="No Pokémons Found"
        >
          {data
            ?.reduce((acc, item) => {
              acc.push(item);
              return acc;
            }, [])
            ?.map((item) => {
              return (
                <Grid item md={4} xs={6} key={item._id} mt={"20px"}>
                  <PokedexCard
                    id={item._id}
                    pokedexNo={item.pokedexNo}
                    name={item.name}
                    sprite={item.sprite}
                    dir={"gen-all-home"}
                  />
                </Grid>
              );
            })}
        </LoadingComponent>
      </Grid>
    </>
  );
}
