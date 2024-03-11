import { useState } from "react";

// Components imports
import CollectionCard from "./CollectionCard";

const alolans = [
  {
    name: "Alolan Rattata",
    sprite: "rattata-alola",
  },
  {
    name: "Alolan Raticate",
    sprite: "raticate-alola",
  },
  {
    name: "Alolan Raichu",
    sprite: "raichu-alola",
  },
  {
    name: "Alolan Sandshrew",
    sprite: "sandshrew-alola",
  },
  {
    name: "Alolan Sandslash",
    sprite: "sandslash-alola",
  },
  {
    name: "Alolan Vulpix",
    sprite: "vulpix-alola",
  },
  {
    name: "Alolan Ninetales",
    sprite: "ninetales-alola",
  },
  {
    name: "Alolan Diglett",
    sprite: "diglett-alola",
  },
  {
    name: "Alolan Dugtrio",
    sprite: "dugtrio-alola",
  },
  {
    name: "Alolan Meowth",
    sprite: "meowth-alola",
  },
  {
    name: "Alolan Persian",
    sprite: "persian-alola",
  },
  {
    name: "Alolan Geodude",
    sprite: "geodude-alola",
  },
  {
    name: "Alolan Graveler",
    sprite: "graveler-alola",
  },
  {
    name: "Alolan Golem",
    sprite: "golem-alola",
  },
  {
    name: "Alolan Grimer",
    sprite: "grimer-alola",
  },
  {
    name: "Alolan Muk",
    sprite: "muk-alola",
  },
  {
    name: "Alolan Exeggutor",
    sprite: "exeggutor-alola",
  },
  {
    name: "Alolan Marowak",
    sprite: "marowak-alola",
  },
];

export default function Alolans() {
  const [trainer, setTrainer] = useState("All");

  return (
    <CollectionCard
      placeholdList={alolans}
      trainer={trainer}
      setTrainer={setTrainer}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Alolan Forms"}
      collectionStr={"alola"}
      lg={2}
      sm={2.4}
      xs={4}
    />
  );
}
