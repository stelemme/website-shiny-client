// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ultraBeasts = [
  {
    name: "Nihilego",
    sprite: "nihilego",
  },
  {
    name: "Buzzwole",
    sprite: "buzzwole",
  },
  {
    name: "Pheromosa",
    sprite: "pheromosa",
  },
  {
    name: "Xurkitree",
    sprite: "xurkitree",
  },
  {
    name: "Celesteela",
    sprite: "celesteela",
  },
  {
    name: "Kartana",
    sprite: "kartana",
  },
  {
    name: "Guzzlord",
    sprite: "guzzlord",
  },
  {
    name: "Poipole",
    sprite: "poipole",
  },
  {
    name: "Naganadel",
    sprite: "naganadel",
  },
  {
    name: "Stakataka",
    sprite: "stakataka",
  },
  {
    name: "Blacephalon",
    sprite: "blacephalon",
  },
];

export function UltraBeasts() {
  return (
    <CollectionCard
      placeholdList={ultraBeasts}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Ultra Beasts"}
      collectionStr={"ultraBeast"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
export function UltraBeastsStats() {
  return (
    <CollectionStatsCard
      placeholdList={ultraBeasts}
      title={"Ultra Beasts"}
      collectionStr={"ultraBeast"}
    />
  );
}
