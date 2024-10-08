// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const galarians = [
  {
    name: "Galarian Meowth",
    sprite: "meowth-galar",
  },
  {
    name: "Galarian Ponyta",
    sprite: "ponyta-galar",
  },
  {
    name: "Galarian Rapidash",
    sprite: "rapidash-galar",
  },
  {
    name: "Galarian Farfetch'd",
    sprite: "farfetchd-galar",
  },
  {
    name: "Galarian Weezing",
    sprite: "weezing-galar",
  },
  {
    name: "Galarian Mr. Mime",
    sprite: "mr-mime-galar",
  },
  {
    name: "Galarian Corsola",
    sprite: "corsola-galar",
  },
  {
    name: "Galarian Zigzagoon",
    sprite: "zigzagoon-galar",
  },
  {
    name: "Galarian Linoone",
    sprite: "linoone-galar",
  },
  {
    name: "Galarian Darumaka",
    sprite: "darumaka-galar",
  },
  {
    name: "Galarian Darmanitan",
    sprite: "darmanitan-galar",
  },
  {
    name: "Galarian Zen Mode Darmanitan",
    sprite: "darmanitan-galar-zen",
  },
  {
    name: "Galarian Yamask",
    sprite: "yamask-galar",
  },
  {
    name: "Galarian Slowpoke",
    sprite: "slowpoke-galar",
  },
  {
    name: "Galarian Slowbro",
    sprite: "slowbro-galar",
  },
  {
    name: "Galarian Slowking",
    sprite: "slowking-galar",
  },
  {
    name: "Galarian Articuno",
    sprite: "articuno-galar",
  },
  {
    name: "Galarian Zapdos",
    sprite: "zapdos-galar",
  },
  {
    name: "Galarian Moltres",
    sprite: "moltres-galar",
  },
];

export function Galarians() {
  return (
    <CollectionCard
      placeholdList={galarians}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Galarian Forms"}
      collectionStr={"galar"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function GalariansStats() {
  return (
    <CollectionStatsCard
      placeholdList={galarians}
      title={"Galarian Forms"}
      collectionStr={"galar"}
    />
  );
}
