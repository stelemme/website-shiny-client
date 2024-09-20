// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const mythicals = [
  {
    name: "Mew",
    sprite: "mew",
  },
  {
    name: "Celebi",
    sprite: "celebi",
  },
  {
    name: "Jirachi",
    sprite: "jirachi",
  },
  {
    name: "Deoxys",
    sprite: "deoxys",
  },
  {
    name: "Phione",
    sprite: "phione",
  },
  {
    name: "Manaphy",
    sprite: "manaphy",
  },
  {
    name: "Darkrai",
    sprite: "darkrai",
  },
  {
    name: "Shaymin",
    sprite: "shaymin",
  },
  {
    name: "Arceus",
    sprite: "arceus",
  },
  {
    name: "Victini",
    sprite: "victini",
  },
  {
    name: "Keldeo",
    sprite: "keldeo",
  },
  {
    name: "Meloetta",
    sprite: "meloetta",
  },
  {
    name: "Genesect",
    sprite: "genesect",
  },
  {
    name: "Diancie",
    sprite: "diancie",
  },
  {
    name: "Hoopa",
    sprite: "hoopa",
  },
  {
    name: "Volcanion",
    sprite: "volcanion",
  },
  {
    name: "Magearna",
    sprite: "magearna",
  },
  {
    name: "Marshadow",
    sprite: "marshadow",
  },
  {
    name: "Zeraora",
    sprite: "zeraora",
  },
  {
    name: "Meltan",
    sprite: "meltan",
  },
  {
    name: "Melmetal",
    sprite: "melmetal",
  },
  {
    name: "Zarude",
    sprite: "zarude",
  },
  {
    name: "Pecharunt",
    sprite: "pecharunt",
  },
];

export function Mythicals() {
  return (
    <CollectionCard
      placeholdList={mythicals}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Mythical Pokémon"}
      collectionStr={"mythical"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function MythicalsStats() {
  return (
    <CollectionStatsCard
      placeholdList={mythicals}
      title={"Mythical Pokémon"}
      collectionStr={"mythical"}
    />
  );
}
