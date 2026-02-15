// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

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
    name: "Mega Raichu X",
    sprite: "raichu-mega-x",
  },
    {
    name: "Mega Raichu Y",
    sprite: "raichu-mega-y",
  },
    {
    name: "Mega Clefable",
    sprite: "clefable-mega",
  },
  {
    name: "Mega Alakazam",
    sprite: "alakazam-mega",
  },
  {
    name: "Mega Victreebel",
    sprite: "victreebel-mega",
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
    name: "Mega Starmie",
    sprite: "starmie-mega",
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
    name: "Mega Dragonite",
    sprite: "dragonite-mega",
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
    name: "Mega Meganium",
    sprite: "meganium-mega",
  },
   {
    name: "Mega Feraligatr",
    sprite: "feraligatr-mega",
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
    name: "Mega Skarmory",
    sprite: "skarmory-mega",
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
    name: "Mega Chimeco",
    sprite: "chimeco-mega",
  },
  {
    name: "Mega Absol",
    sprite: "absol-mega",
  },
  {
    name: "Mega Absol Z",
    sprite: "absol-mega-z",
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
    name: "Mega Staraptor",
    sprite: "staraptor-mega",
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
    name: "Mega Garchomp Z",
    sprite: "garchomp-mega-z",
  },
  {
    name: "Mega Lucario",
    sprite: "lucario-mega",
  },
  {
    name: "Mega Lucario Z",
    sprite: "lucario-mega-z",
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
    name: "Mega Froslass",
    sprite: "froslass-mega",
  },
  {
    name: "Mega Heatran",
    sprite: "heatran-mega",
  },
  {
    name: "Mega Darkrai",
    sprite: "darkrai-mega",
  },
  {
    name: "Mega Emboar",
    sprite: "emboar-mega",
  },
  {
    name: "Mega Excadrill",
    sprite: "excadrill-mega",
  },
  {
    name: "Mega Audino",
    sprite: "audino-mega",
  },
  {
    name: "Mega Scolipede",
    sprite: "scolipede-mega",
  },
  {
    name: "Mega Scrafty",
    sprite: "scrafty-mega",
  },
  {
    name: "Mega Eelektross",
    sprite: "eelektross-mega",
  },
  {
    name: "Mega Chandelure",
    sprite: "chandelure-mega",
  },
  {
    name: "Mega Golurk",
    sprite: "golurk-mega",
  },
  {
    name: "Mega Chesnaught",
    sprite: "chesnaught-mega",
  },
  {
    name: "Mega Delphox",
    sprite: "delphox-mega",
  },
  {
    name: "Mega Greninja",
    sprite: "greninja-mega",
  },
  {
    name: "Mega Pyroar",
    sprite: "pyroar-mega",
  },
  {
    name: "Mega Floette",
    sprite: "floette-mega",
  },
  {
    name: "Mega Meowstic",
    sprite: "meowstic-mega",
  },
  {
    name: "Mega Malamar",
    sprite: "malamar-mega",
  },
  {
    name: "Mega Barbaracle",
    sprite: "barbaracle-mega",
  },
  {
    name: "Mega Dragalge",
    sprite: "dragalge-mega",
  },
  {
    name: "Mega Hawlucha",
    sprite: "hawlucha-mega",
  },
  {
    name: "Mega Zygarde",
    sprite: "zygarde-mega",
  },
  {
    name: "Mega Diancie",
    sprite: "diancie-mega",
  },
  {
    name: "Mega Crabominable",
    sprite: "crabominable-mega",
  },
  {
    name: "Mega Golisopod",
    sprite: "golisopod-mega",
  },
  {
    name: "Mega Drampa",
    sprite: "drampa-mega",
  },
  {
    name: "Mega Magearna",
    sprite: "magearna-mega",
  },
  {
    name: "Mega Magearna Original Form",
    sprite: "magearna-mega-original",
  },
  {
    name: "Mega Zeraora",
    sprite: "zeraora-mega",
  },
  {
    name: "Mega Falinks",
    sprite: "falinks-mega",
  },
  {
    name: "Mega Scovillain",
    sprite: "scovillain-mega",
  },
  {
    name: "Mega Glimmora",
    sprite: "glimmora-mega",
  },
  {
    name: "Mega Tatsugiri Curly Form",
    sprite: "tatsugiri-mega-curly",
  },
  {
    name: "Mega Tatsugiri Droopy Form",
    sprite: "tatsugiri-mega-droopy",
  },
  {
    name: "Mega Tatsugiri Stretchy Form",
    sprite: "tatsugiri-mega-stretchy",
  },
  {
    name: "Mega Baxcalibur",
    sprite: "baxcalibur-mega",
  },
];

export function Megas() {
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

export function MegasStats() {
  return (
    <CollectionStatsCard
      placeholdList={megas}
      title={"Mega Evolutions"}
      collectionStr={"mega"}
    />
  );
}
