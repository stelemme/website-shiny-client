// Recoil
import { useSetRecoilState } from "recoil";
import { backToggle } from "../../utils/atoms";

// Mui
import { Box, Typography, Grid, IconButton } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// Components
import BoxComponent from "../General/BoxComponent";
import PokemonImageDisplay from "./PokemonImageDisplay";

// Hooks
import { useGame } from "../../hooks/useData";

const dirMapping = {
  "gen-1-rb": "Pokémon Red & Blue",
  "gen-1-y": "Pokémon Yellow",
  "gen-2-g": "Pokémon Gold",
  "gen-2-s": "Pokémon Silver",
  "gen-2-c": "Pokémon Crystal",
  "gen-3-rs": "Pokémon Ruby & Sapphire",
  "gen-3-frlg": "Pokémon FireRed & LeafGreen",
  "gen-3-e": "Pokémon Emerald",
  "gen-4-dp": "Pokémon Diamond & Pearl",
  "gen-4-pl": "Pokémon Platinum",
  "gen-4-hgss": "Pokémon HeartGold & SoulSilver",
  "gen-5": "Pokémon Black (2) & White (2)",
  "gen-7-usum": "Pokémon X, Y, OR, AS & USUM",
  "gen-7-lgpe": "Pokémon Let's Go Pikachu & Eevee",
  "gen-8-swsh": "Pokémon Sword & Shield",
  "gen-8-bdsp": "Pokémon BDSP",
  "gen-8-la": "Pokémon Legends: Arceus",
  "gen-9-sv": "Pokémon Scarlet & Violet",
};

export default function AllSpritesDisplay({ pokemon, sprite, id }) {
  const { data: games } = useGame(`filter=complex&filterPokemon=${pokemon}`);
  const gamesList = games?.data;
  const setBackToggle = useSetRecoilState(backToggle);
  setBackToggle(false)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="21px"
        >
          <Typography variant="h5" fontWeight={"bold"}>
            ALL GAME SPRITES
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
      </Grid>
      {gamesList?.map((game) => {
        return (
          <Grid item xs={6} key={game.dir}>
            <BoxComponent p="10px">
              <Box height="45px" display="flex" alignItems="center">
                <Typography variant="h6" fontWeight={"bold"}>
                  {dirMapping[game.dir]}{" "}
                </Typography>
              </Box>
              <BoxComponent p="5px" noContrastColor height={null}>
                <PokemonImageDisplay
                  directory={game.dir}
                  sprite={sprite}
                  gameSort={game.sorts[0]}
                  genderDifference={false}
                />
              </BoxComponent>
            </BoxComponent>
          </Grid>
        );
      })}
    </Grid>
  );
}
