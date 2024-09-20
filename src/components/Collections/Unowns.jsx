// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const unowns = [
  {
    name: "Unown A",
    sprite: "unown",
  },
  {
    name: "Unown B",
    sprite: "unown-b",
  },
  {
    name: "Unown C",
    sprite: "unown-c",
  },
  {
    name: "Unown D",
    sprite: "unown-d",
  },
  {
    name: "Unown E",
    sprite: "unown-e",
  },
  {
    name: "Unown F",
    sprite: "unown-f",
  },
  {
    name: "Unown G",
    sprite: "unown-g",
  },
  {
    name: "Unown H",
    sprite: "unown-h",
  },
  {
    name: "Unown I",
    sprite: "unown-i",
  },
  {
    name: "Unown J",
    sprite: "unown-j",
  },
  {
    name: "Unown K",
    sprite: "unown-k",
  },
  {
    name: "Unown L",
    sprite: "unown-l",
  },
  {
    name: "Unown M",
    sprite: "unown-m",
  },
  {
    name: "Unown N",
    sprite: "unown-n",
  },
  {
    name: "Unown O",
    sprite: "unown-o",
  },
  {
    name: "Unown P",
    sprite: "unown-p",
  },
  {
    name: "Unown Q",
    sprite: "unown-q",
  },
  {
    name: "Unown R",
    sprite: "unown-r",
  },
  {
    name: "Unown S",
    sprite: "unown-s",
  },
  {
    name: "Unown T",
    sprite: "unown-t",
  },
  {
    name: "Unown U",
    sprite: "unown-u",
  },
  {
    name: "Unown V",
    sprite: "unown-v",
  },
  {
    name: "Unown W",
    sprite: "unown-w",
  },
  {
    name: "Unown X",
    sprite: "unown-x",
  },
  {
    name: "Unown Y",
    sprite: "unown-y",
  },
  {
    name: "Unown Z",
    sprite: "unown-z",
  },
  {
    name: "Unown !",
    sprite: "unown-exclamation",
  },
  {
    name: "Unown ?",
    sprite: "unown-question",
  },
];

export function Unowns() {
  return (
    <CollectionCard
      placeholdList={unowns}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Unowns"}
      collectionStr={"unown"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function UnownsStats() {
  return (
    <CollectionStatsCard
      placeholdList={unowns}
      title={"Unowns"}
      collectionStr={"unown"}
    />
  );
}
