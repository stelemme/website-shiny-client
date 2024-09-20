// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const pastParadoxes = [
  {
      "name": "Great Tusk",
      "sprite": "great-tusk"
  },
  {
      "name": "Scream Tail",
      "sprite": "scream-tail"
  },
  {
      "name": "Brute Bonnet",
      "sprite": "brute-bonnet"
  },
  {
      "name": "Flutter Mane",
      "sprite": "flutter-mane"
  },
  {
      "name": "Slither Wing",
      "sprite": "slither-wing"
  },
  {
      "name": "Sandy Shocks",
      "sprite": "sandy-shocks"
  },
  {
      "name": "Roaring Moon",
      "sprite": "roaring-moon"
  },
  {
      "name": "Walking Wake",
      "sprite": "walking-wake"
  },
  {
      "name": "Gouging Fire",
      "sprite": "gouging-fire"
  },
  {
      "name": "Raging Bolt",
      "sprite": "raging-bolt"
  }
]

export function PastParadoxes() {
  return (
    <CollectionCard
      placeholdList={pastParadoxes}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Past Paradox Pokémon"}
      collectionStr={"pastParadox"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function PastParadoxesStats() {
  return (
    <CollectionStatsCard
      placeholdList={pastParadoxes}
      title={"Past Paradox Pokémon"}
      collectionStr={"pastParadox"}
    />
  );
}
