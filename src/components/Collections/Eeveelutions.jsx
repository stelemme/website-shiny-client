// Components imports
import CollectionCard from "./CollectionCard";

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

export default function Eeveelutions() {
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
