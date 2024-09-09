// Mui
import { Typography, Box, Grid } from "@mui/material";

// Components
import PokedexCard from "../Cards/PokedexCard";

// Hooks
import { usePokedex } from "../../hooks/useData";

export default function PokedexSearchDisplay({ pokemon }) {
  const { isLoading: pokemonLoading, data: pokemonData } = usePokedex(
    `search=${pokemon}`
  );

  const ShinyDisplay = ({ data, loading, error, text }) => {
    if (loading) {
      return (
        <Grid item>
          <Typography variant="h5" mt={"20px"}>
            Loading ...
          </Typography>
        </Grid>
      );
    } else if (error) {
      return (
        <Grid item>
          <Typography variant="h5" mt={"20px"}>
            No {text} Found
          </Typography>
        </Grid>
      );
    } else {
      const uniqueData = data?.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, []);

      return uniqueData?.map((item) => {
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
      });
    }
  };

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
        <ShinyDisplay
          data={pokemonData?.data}
          loading={pokemonLoading}
          error={!pokemonData?.data.length}
          text={"Pokémons"}
        />
      </Grid>
    </>
  );
}
