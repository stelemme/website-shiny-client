import { useState } from "react";

// Components imports
import CollectionCard from "./CollectionCard";

const vivillons = [
  {
    name: "Archipelago Pattern Vivillon",
    sprite: "vivillon-archipelago",
  },
  {
    name: "Continental Pattern Vivillon",
    sprite: "vivillon-continental",
  },
  {
    name: "Elegant Pattern Vivillon",
    sprite: "vivillon-elegant",
  },
  {
    name: "Fancy Pattern Vivillon",
    sprite: "vivillon-fancy",
  },
  {
    name: "Garden Pattern Vivillon",
    sprite: "vivillon-garden",
  },
  {
    name: "High Plains Pattern Vivillon",
    sprite: "vivillon-high-plains",
  },
  {
    name: "Icy Snow Pattern Vivillon",
    sprite: "vivillon-icy-snow",
  },
  {
    name: "Jungle Pattern Vivillon",
    sprite: "vivillon-jungle",
  },
  {
    name: "Marine Pattern Vivillon",
    sprite: "vivillon-marine",
  },
  {
    name: "Meadow Pattern Vivillon",
    sprite: "vivillon",
  },
  {
    name: "Modern Pattern Vivillon",
    sprite: "vivillon-modern",
  },
  {
    name: "Monsoon Pattern Vivillon",
    sprite: "vivillon-monsoon",
  },
  {
    name: "Ocean Pattern Vivillon",
    sprite: "vivillon-ocean",
  },
  {
    name: "Poké Ball Pattern Vivillon",
    sprite: "vivillon-poke-ball",
  },
  {
    name: "Polar Pattern Vivillon",
    sprite: "vivillon-polar",
  },
  {
    name: "River Pattern Vivillon",
    sprite: "vivillon-river",
  },
  {
    name: "Sandstorm Pattern Vivillon",
    sprite: "vivillon-sandstorm",
  },
  {
    name: "Savanna Pattern Vivillon",
    sprite: "vivillon-savanna",
  },
  {
    name: "Sun Pattern Vivillon",
    sprite: "vivillon-sun",
  },
  {
    name: "Tundra Pattern Vivillon",
    sprite: "vivillon-tundra",
  },
];

export default function Vivillons() {
  const [trainer, setTrainer] = useState("All");

  return (
    <CollectionCard
      placeholdList={vivillons}
      trainer={trainer}
      setTrainer={setTrainer}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Vivillons"}
      collectionStr={"vivillon"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
