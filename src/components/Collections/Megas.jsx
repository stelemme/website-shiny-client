// Components imports
import CollectionCard from "./CollectionCard";

const megas = [
  {
    name: "Mega Venusaur",
    sprite: "venusaur-mega",
  },
  {
    name: "Mega Charizard X",
    sprite: "charizard-mega-x",
  },
  {
    name: "Mega Charizard Y",
    sprite: "charizard-mega-y",
  },
  {
    name: "Mega Blastoise",
    sprite: "blastoise-mega",
  },
  {
    name: "Mega Beedrill",
    sprite: "beedrill-mega",
  },
  {
    name: "Mega Pidgeot",
    sprite: "pidgeot-mega",
  },
  {
    name: "Mega Alakazam",
    sprite: "alakazam-mega",
  },
  {
    name: "Mega Slowbro",
    sprite: "slowbro-mega",
  },
  {
    name: "Mega Gengar",
    sprite: "gengar-mega",
  },
  {
    name: "Mega Kangaskhan",
    sprite: "kangaskhan-mega",
  },
  {
    name: "Mega Pinsir",
    sprite: "pinsir-mega",
  },
  {
    name: "Mega Gyarados",
    sprite: "gyarados-mega",
  },
  {
    name: "Mega Aerodactyl",
    sprite: "aerodactyl-mega",
  },
  {
    name: "Mega Mewtwo X",
    sprite: "mewtwo-mega-x",
  },
  {
    name: "Mega Mewtwo Y",
    sprite: "mewtwo-mega-y",
  },
  {
    name: "Mega Ampharos",
    sprite: "ampharos-mega",
  },
  {
    name: "Mega Steelix",
    sprite: "steelix-mega",
  },
  {
    name: "Mega Scizor",
    sprite: "scizor-mega",
  },
  {
    name: "Mega Heracross",
    sprite: "heracross-mega",
  },
  {
    name: "Mega Houndoom",
    sprite: "houndoom-mega",
  },
  {
    name: "Mega Tyranitar",
    sprite: "tyranitar-mega",
  },
  {
    name: "Mega Sceptile",
    sprite: "sceptile-mega",
  },
  {
    name: "Mega Blaziken",
    sprite: "blaziken-mega",
  },
  {
    name: "Mega Swampert",
    sprite: "swampert-mega",
  },
  {
    name: "Mega Gardevoir",
    sprite: "gardevoir-mega",
  },
  {
    name: "Mega Sableye",
    sprite: "sableye-mega",
  },
  {
    name: "Mega Mawile",
    sprite: "mawile-mega",
  },
  {
    name: "Mega Aggron",
    sprite: "aggron-mega",
  },
  {
    name: "Mega Medicham",
    sprite: "medicham-mega",
  },
  {
    name: "Mega Manectric",
    sprite: "manectric-mega",
  },
  {
    name: "Mega Sharpedo",
    sprite: "sharpedo-mega",
  },
  {
    name: "Mega Camerupt",
    sprite: "camerupt-mega",
  },
  {
    name: "Mega Altaria",
    sprite: "altaria-mega",
  },
  {
    name: "Mega Banette",
    sprite: "banette-mega",
  },
  {
    name: "Mega Absol",
    sprite: "absol-mega",
  },
  {
    name: "Mega Glalie",
    sprite: "glalie-mega",
  },
  {
    name: "Mega Salamence",
    sprite: "salamence-mega",
  },
  {
    name: "Mega Metagross",
    sprite: "metagross-mega",
  },
  {
    name: "Mega Latias",
    sprite: "latias-mega",
  },
  {
    name: "Mega Latios",
    sprite: "latios-mega",
  },
  {
    name: "Primal Kyogre",
    sprite: "kyogre-primal",
  },
  {
    name: "Primal Groudon",
    sprite: "groudon-primal",
  },
  {
    name: "Mega Rayquaza",
    sprite: "rayquaza-mega",
  },
  {
    name: "Mega Lopunny",
    sprite: "lopunny-mega",
  },
  {
    name: "Mega Garchomp",
    sprite: "garchomp-mega",
  },
  {
    name: "Mega Lucario",
    sprite: "lucario-mega",
  },
  {
    name: "Mega Abomasnow",
    sprite: "abomasnow-mega",
  },
  {
    name: "Mega Gallade",
    sprite: "gallade-mega",
  },
  {
    name: "Mega Audino",
    sprite: "audino-mega",
  },
  {
    name: "Mega Diancie",
    sprite: "diancie-mega",
  },
];

export default function Megas() {
  return (
    <CollectionCard
      placeholdList={megas}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Mega Evolutions"}
      collectionStr={"mega"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
