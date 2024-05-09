// Components imports
import CollectionCard from "./CollectionCard";

const paldeans = [
  {
    name: "Paldean Tauros",
    sprite: "tauros-paldea",
  },
  {
    name: "Paldean Tauros Blaze Breed",
    sprite: "tauros-paldea-blaze",
  },
  {
    name: "Paldean Tauros Aqua Breed",
    sprite: "tauros-paldea-aqua",
  },
  {
    name: "Paldean Wooper",
    sprite: "wooper-paldea",
  },
];

export default function Paldeans() {
  return (
    <CollectionCard
      placeholdList={paldeans}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Paldean Forms"}
      collectionStr={"paldea"}
      lg={3}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
