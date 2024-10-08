// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const flabebes = [
  {
    name: "Red Flower Flabébé",
    sprite: "flabebe",
  },
  {
    name: "Red Flower Floette",
    sprite: "floette",
  },
  {
    name: "Red Flower Florges",
    sprite: "florges",
  },
  {
    name: "Yellow Flower Flabébé",
    sprite: "flabebe-yellow",
  },
  {
    name: "Yellow Flower Floette",
    sprite: "floette-yellow",
  },
  {
    name: "Yellow Flower Florges",
    sprite: "florges-yellow",
  },
  {
    name: "Orange Flower Flabébé",
    sprite: "flabebe-orange",
  },
  {
    name: "Orange Flower Floette",
    sprite: "floette-orange",
  },
  {
    name: "Orange Flower Florges",
    sprite: "florges-orange",
  },
  {
    name: "Blue Flower Flabébé",
    sprite: "flabebe-blue",
  },
  {
    name: "Blue Flower Floette",
    sprite: "floette-blue",
  },
  {
    name: "Blue Flower Florges",
    sprite: "florges-blue",
  },
  {
    name: "White Flower Flabébé",
    sprite: "flabebe-white",
  },
  {
    name: "White Flower Floette",
    sprite: "floette-white",
  },
  {
    name: "White Flower Florges",
    sprite: "florges-white",
  },

];

export function Flabebes() {
  return (
    <CollectionCard
      placeholdList={flabebes}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Flabébé, Floette & Florges"}
      collectionStr={"flabebe"}
      lg={2}
      sm={2}
      xs={4}
      numbers={false}
    />
  );
}

export function FlabebesStats() {
  return (
    <CollectionStatsCard
      placeholdList={flabebes}
      title={"Flabébé, Floette & Florges"}
      collectionStr={"flabebe"}
    />
  );
}
