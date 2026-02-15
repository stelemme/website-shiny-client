// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const typeData = [
  {
    name: "Normal",
    sprite: "normal",
  },
  {
    name: "Fire",
    sprite: "fire",
  },
  {
    name: "Water",
    sprite: "water",
  },
  {
    name: "Grass",
    sprite: "grass",
  },
  {
    name: "Electric",
    sprite: "electric",
  },
  {
    name: "Ice",
    sprite: "ice",
  },
  {
    name: "Fighting",
    sprite: "fighting",
  },
  {
    name: "Poison",
    sprite: "poison",
  },
  {
    name: "Ground",
    sprite: "ground",
  },
  {
    name: "Flying",
    sprite: "flying",
  },
  {
    name: "Psychic",
    sprite: "psychic",
  },
  {
    name: "Bug",
    sprite: "bug",
  },
  {
    name: "Rock",
    sprite: "rock",
  },
  {
    name: "Ghost",
    sprite: "ghost",
  },
  {
    name: "Dragon",
    sprite: "dragon",
  },
  {
    name: "Dark",
    sprite: "dark",
  },
  {
    name: "Steel",
    sprite: "steel",
  },
  {
    name: "Fairy",
    sprite: "fairy",
  }
];


export function Types() {
  return (
    <CollectionCard
      placeholdList={typeData}
      dir={"types/gen-all-symbols"}
      title={"TYPES"}
      collectionStr={"type"}
      lg={2}
      sm={3}
      xs={4}
      imgHeight={40}
    />
  );
}

export function TypesStats() {
  return (
    <CollectionStatsCard
      placeholdList={typeData}
      title={"TYPES"}
      collectionStr={"type"}
    />
  );
}
