// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const gmax = [
  {
    name: "Gigantamax Charizard",
    sprite: "charizard-gmax",
  },
  {
    name: "Gigantamax Venusaur",
    sprite: "venusaur-gmax",
  },
  {
    name: "Gigantamax Blastoise",
    sprite: "blastoise-gmax",
  },
  {
    name: "Gigantamax Butterfree",
    sprite: "butterfree-gmax",
  },
  {
    name: "Gigantamax Pikachu",
    sprite: "pikachu-gmax",
  },
  {
    name: "Gigantamax Meowth",
    sprite: "meowth-gmax",
  },
  {
    name: "Gigantamax Machamp",
    sprite: "machamp-gmax",
  },
  {
    name: "Gigantamax Gengar",
    sprite: "gengar-gmax",
  },
  {
    name: "Gigantamax Kingler",
    sprite: "kingler-gmax",
  },
  {
    name: "Gigantamax Lapras",
    sprite: "lapras-gmax",
  },
  {
    name: "Gigantamax Eevee",
    sprite: "eevee-gmax",
  },
  {
    name: "Gigantamax Snorlax",
    sprite: "snorlax-gmax",
  },
  {
    name: "Gigantamax Garbodor",
    sprite: "garbodor-gmax",
  },
  {
    name: "Gigantamax Melmetal",
    sprite: "melmetal-gmax",
  },
  {
    name: "Gigantamax Rillaboom",
    sprite: "rillaboom-gmax",
  },
  {
    name: "Gigantamax Cinderace",
    sprite: "cinderace-gmax",
  },
  {
    name: "Gigantamax Inteleon",
    sprite: "inteleon-gmax",
  },
  {
    name: "Gigantamax Corviknight",
    sprite: "corviknight-gmax",
  },
  {
    name: "Gigantamax Orbeetle",
    sprite: "orbeetle-gmax",
  },
  {
    name: "Gigantamax Drednaw",
    sprite: "drednaw-gmax",
  },
  {
    name: "Gigantamax Coalossal",
    sprite: "coalossal-gmax",
  },
  {
    name: "Gigantamax Flapple",
    sprite: "flapple-gmax",
  },
  {
    name: "Gigantamax Appletun",
    sprite: "appletun-gmax",
  },
  {
    name: "Gigantamax Sandaconda",
    sprite: "sandaconda-gmax",
  },
  {
    name: "Gigantamax Toxtricity",
    sprite: "toxtricity-gmax",
  },
  {
    name: "Gigantamax Centiskorch",
    sprite: "centiskorch-gmax",
  },
  {
    name: "Gigantamax Hatterene",
    sprite: "hatterene-gmax",
  },
  {
    name: "Gigantamax Grimmsnarl",
    sprite: "grimmsnarl-gmax",
  },
  {
    name: "Gigantamax Alcremie",
    sprite: "alcremie-gmax",
  },
  {
    name: "Gigantamax Copperajah",
    sprite: "copperajah-gmax",
  },
  {
    name: "Gigantamax Duraludon",
    sprite: "duraludon-gmax",
  },
  {
    name: "Gigantamax Single Strike Urshifu",
    sprite: "urshifu-single-strike-gmax",
  },
  {
    name: "Gigantamax Rapid Strike Urshifu",
    sprite: "urshifu-rapid-strike-gmax",
  },
];

export function Gigantamax() {
  return (
    <CollectionCard
      placeholdList={gmax}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Gigantamax Pokémon"}
      collectionStr={"gmax"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function GigantamaxStats() {
  return (
    <CollectionStatsCard
      placeholdList={gmax}
      title={"Gigantamax Pokémon"}
      collectionStr={"gmax"}
    />
  );
}
