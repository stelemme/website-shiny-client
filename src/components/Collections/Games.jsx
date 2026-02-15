// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const gameData = [
  { name: "Pokémon Red", sprite: "red" },
  { name: "Pokémon Blue", sprite: "blue" },
  { name: "Pokémon Yellow", sprite: "yellow" },
  { name: "Pokémon Gold", sprite: "gold" },
  { name: "Pokémon Silver", sprite: "silver" },
  { name: "Pokémon Crystal", sprite: "crystal" },
  { name: "Pokémon Ruby", sprite: "ruby" },
  { name: "Pokémon Sapphire", sprite: "sapphire" },
  { name: "Pokémon FireRed", sprite: "firered" },
  { name: "Pokémon LeafGreen", sprite: "leafgreen" },
  { name: "Pokémon Emerald", sprite: "emerald" },
  { name: "Pokémon Diamond", sprite: "diamond" },
  { name: "Pokémon Pearl", sprite: "pearl" },
  { name: "Pokémon Platinum", sprite: "platinum" },
  { name: "Pokémon HeartGold", sprite: "heartgold" },
  { name: "Pokémon SoulSilver", sprite: "soulsilver" },
  { name: "Pokémon Black", sprite: "black" },
  { name: "Pokémon White", sprite: "white" },
  { name: "Pokémon Black 2", sprite: "black-2" },
  { name: "Pokémon White 2", sprite: "white-2" },
  { name: "Pokémon X", sprite: "x" },
  { name: "Pokémon Y", sprite: "y" },
  { name: "Pokémon Omega Ruby", sprite: "omega-ruby" },
  { name: "Pokémon Alpha Sapphire", sprite: "alpha-sapphire" },
  { name: "Pokémon Sun", sprite: "sun" },
  { name: "Pokémon Moon", sprite: "moon" },
  { name: "Pokémon Ultra Sun", sprite: "ultra-sun" },
  { name: "Pokémon Ultra Moon", sprite: "ultra-moon" },
  { name: "Pokémon Let's Go Pikachu", sprite: "lets-go-pikachu" },
  { name: "Pokémon Let's Go Eevee", sprite: "lets-go-eevee" },
  { name: "Pokémon Sword", sprite: "sword" },
  { name: "Pokémon Shield", sprite: "shield" },
  { name: "Pokémon Brilliant Diamond", sprite: "brilliant-diamond" },
  { name: "Pokémon Shining Pearl", sprite: "shining-pearl" },
  { name: "Pokémon Legends: Arceus", sprite: "legends-arceus" },
  { name: "Pokémon Scarlet", sprite: "scarlet" },
  { name: "Pokémon Violet", sprite: "violet" },
];

export function Games() {
  return (
    <CollectionCard
      placeholdList={gameData}
      dir={"games-square"}
      title={"GAMES"}
      collectionStr={"game"}
      lg={2}
      sm={3}
      xs={4}
      imgHeight={40}
    />
  );
}

export function GamesStats() {
  return (
    <CollectionStatsCard
      placeholdList={gameData}
      title={"GAMES"}
      collectionStr={"game"}
    />
  );
}
