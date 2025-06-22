// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const fossils = [
  {
    name: "Omanyte",
    sprite: "omanyte",
  },
  {
    name: "Omastar",
    sprite: "omastar",
  },
  {
    name: "Kabuto",
    sprite: "kabuto",
  },
  {
    name: "Kabutops",
    sprite: "kabutops",
  },
  {
    name: "Aerodactyl",
    sprite: "aerodactyl",
  },
  {
    name: "Lileep",
    sprite: "lileep",
  },
  {
    name: "Cradily",
    sprite: "cradily",
  },
  {
    name: "Anorith",
    sprite: "anorith",
  },
  {
    name: "Armaldo",
    sprite: "armaldo",
  },
  {
    name: "Cranidos",
    sprite: "cranidos",
  },
  {
    name: "Rampardos",
    sprite: "rampardos",
  },
  {
    name: "Shieldon",
    sprite: "shieldon",
  },
  {
    name: "Bastiodon",
    sprite: "bastiodon",
  },
  {
    name: "Tirtouga",
    sprite: "tirtouga",
  },
  {
    name: "Carracosta",
    sprite: "carracosta",
  },
  {
    name: "Archen",
    sprite: "archen",
  },
  {
    name: "Archeops",
    sprite: "archeops",
  },
  {
    name: "Tyrunt",
    sprite: "tyrunt",
  },
  {
    name: "Tyrantrum",
    sprite: "tyrantrum",
  },
  {
    name: "Amaura",
    sprite: "amaura",
  },
  {
    name: "Aurorus",
    sprite: "aurorus",
  },
  {
    name: "Dracozolt",
    sprite: "dracozolt",
  },
  {
    name: "Arctozolt",
    sprite: "arctozolt",
  },
  {
    name: "Dracovish",
    sprite: "dracovish",
  },
  {
    name: "Arctovish",
    sprite: "arctovish",
  },
];

export function Fossils() {
  return (
    <CollectionCard
      placeholdList={fossils}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Fossil Pokémon"}
      collectionStr={"fossil"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function FossilStats() {
  return (
    <CollectionStatsCard
      placeholdList={fossils}
      title={"Fossil Pokémon"}
      collectionStr={"fossil"}
    />
  );
}
