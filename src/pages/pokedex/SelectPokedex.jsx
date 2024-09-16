// mui imports
import { Grid, Typography } from "@mui/material";

// Components imports
import GameCard from "../../components/Cards/GameCard";

// Hooks
import { useGame } from "../../hooks/useData";
import PageComponent from "../../components/General/PageComponent";

export default function SelectPokedex() {
  const { isLoading: gamesLoading, data: games } = useGame(`action=select`);

  if (gamesLoading) {
    return (
      <PageComponent
        title="REGIONAL POKEDEX"
        subtitle="Select a game to view its Regional Pokedex!"
        widthSnaps={3}
      >
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      </PageComponent>
    );
  }

  return (
    <PageComponent
      title="REGIONAL POKEDEX"
      subtitle="Select a game to view its Regional Pokedex!"
      widthSnaps={3}
    >
      {/* CARDS */}
      <Grid container spacing={"20px"}>
        {games?.data.length > 0 ? (
          games?.data.map((game) => {
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
          })
        ) : (
          <Grid item xs={12}>
            <Typography>No Games Found</Typography>
          </Grid>
        )}
      </Grid>
    </PageComponent>
  );
}
