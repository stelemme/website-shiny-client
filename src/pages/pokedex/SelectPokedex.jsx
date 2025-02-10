// mui imports
import { Grid } from "@mui/material";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import GameCard from "../../components/Cards/GameCard";

// Hooks
import { useGame } from "../../hooks/useData";

export default function SelectPokedex() {
  const { isLoading: gamesLoading, data: games } = useGame(`preview=select`);

  const data = games?.data;

  return (
    <PageComponent
      title="REGIONAL POKEDEX"
      subtitle="Select a game to view its Regional Pokedex!"
      widthSnaps={3}
    >
      <LoadingComponent loadingCondition={gamesLoading}>
        {/* CARDS */}
        <Grid container spacing={"20px"}>
          {data?.map((game) => {
            return (
              <Grid key={game._id} item lg={3} md={4} sm={6} xs={6}>
                <GameCard
                  id={game._id}
                  name={game.name}
                  gen={game.gen}
                  sprite={game.sprite}
                />
              </Grid>
            );
          })}
        </Grid>
      </LoadingComponent>
    </PageComponent>
  );
}
