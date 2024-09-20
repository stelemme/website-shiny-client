// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const futureParadoxes = [
  {
      "name": "Iron Treads",
      "sprite": "iron-treads"
  },
  {
      "name": "Iron Bundle",
      "sprite": "iron-bundle"
  },
  {
      "name": "Iron Hands",
      "sprite": "iron-hands"
  },
  {
      "name": "Iron Jugulis",
      "sprite": "iron-jugulis"
  },
  {
      "name": "Iron Moth",
      "sprite": "iron-moth"
  },
  {
      "name": "Iron Thorns",
      "sprite": "iron-thorns"
  },
  {
      "name": "Iron Valiant",
      "sprite": "iron-valiant"
  },
  {
      "name": "Iron Leaves",
      "sprite": "iron-leaves"
  },
  {
      "name": "Iron Boulder",
      "sprite": "iron-boulder"
  },
  {
      "name": "Iron Crown",
      "sprite": "iron-crown"
  }
]

export function FutureParadoxes() {
  return (
    <CollectionCard
      placeholdList={futureParadoxes}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Future Paradox Pokémon"}
      collectionStr={"futureParadox"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function FutureParadoxesStats() {
    return (
      <CollectionStatsCard
        placeholdList={futureParadoxes}
        title={"Future Paradox Pokémon"}
        collectionStr={"futureParadox"}
      />
    );
  }