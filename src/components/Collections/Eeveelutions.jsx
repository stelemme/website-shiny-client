// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const eeveelutions = [
  {
    name: "Vaporeon",
    sprite: "vaporeon",
  },
  {
    name: "Jolteon",
    sprite: "jolteon",
  },
  {
    name: "Flareon",
    sprite: "flareon",
  },
  {
    name: "Espeon",
    sprite: "espeon",
  },
  {
    name: "Umbreon",
    sprite: "umbreon",
  },
  {
    name: "Leafeon",
    sprite: "leafeon",
  },
  {
    name: "Glaceon",
    sprite: "glaceon",
  },
  {
    name: "Sylveon",
    sprite: "sylveon",
  },
];

export function Eeveelutions() {
  return (
    <CollectionCard
      placeholdList={eeveelutions}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Eeveelutions"}
      collectionStr={"eevee"}
      lg={3}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function EeveelutionsStats() {
  return (
    <CollectionStatsCard
      placeholdList={eeveelutions}
      title={"Eeveelutions"}
      collectionStr={"eevee"}
    />
  );
}