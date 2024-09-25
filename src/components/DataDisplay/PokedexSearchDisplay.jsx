// Mui
import { Grid } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
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
    <BoxComponent noContrastColor p="" title={"POKEMON"}>
      <LoadingComponent
        loadingCondition={pokemonLoading}
        errorCondition={!pokemonData?.data.length}
        errorText="No Pokémons Found"
      >
        <Grid container spacing={2}>
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
        </Grid>
      </LoadingComponent>
    </BoxComponent>
  );
}
