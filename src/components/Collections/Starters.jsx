// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const starters = [
  {
    name: "Bulbasaur",
    sprite: "bulbasaur",
  },
  {
    name: "Ivysaur",
    sprite: "ivysaur",
  },
  {
    name: "Venusaur",
    sprite: "venusaur",
  },
  {
    name: "Charmander",
    sprite: "charmander",
  },
  {
    name: "Charmeleon",
    sprite: "charmeleon",
  },
  {
    name: "Charizard",
    sprite: "charizard",
  },
  {
    name: "Chikorita",
    sprite: "chikorita",
  },
  {
    name: "Bayleef",
    sprite: "bayleef",
  },
    {
    name: "Meganium",
    sprite: "meganium",
  },
  {
    name: "Cyndaquil",
    sprite: "cyndaquil",
  },
  {
    name: "Quilava",
    sprite: "quilava",
  },
  {
    name: "Typhlosion",
    sprite: "typhlosion",
  },
  {
    name: "Totodile",
    sprite: "totodile",
  },
  {
    name: "Croconaw",
    sprite: "croconaw",
  },
  {
    name: "Feraligatr",
    sprite: "feraligatr",
  },
  {
    name: "Treecko",
    sprite: "treecko",
  },
  {
    name: "Grovyle",
    sprite: "grovyle",
  },
  {
    name: "Sceptile",
    sprite: "sceptile",
  },
  {
    name: "Torchic",
    sprite: "torchic",
  },
  {
    name: "Combusken",
    sprite: "combusken",
  },
  {
    name: "Blaziken",
    sprite: "blaziken",
  },
  {
    name: "Mudkip",
    sprite: "mudkip",
  },
  {
    name: "Marshtomp",
    sprite: "marshtomp",
  },
  {
    name: "Swampert",
    sprite: "swampert",
  },
  {
    name: "Turtwig",
    sprite: "turtwig",
  },
  {
    name: "Grotle",
    sprite: "grotle",
  },
  {
    name: "Torterra",
    sprite: "torterra",
  },
  {
    name: "Chimchar",
    sprite: "chimchar",
  },
  {
    name: "Monferno",
    sprite: "monferno",
  },
  {
    name: "Infernape",
    sprite: "infernape",
  },
  {
    name: "Piplup",
    sprite: "piplup",
  },
  {
    name: "Prinplup",
    sprite: "prinplup",
  },
  {
    name: "Empoleon",
    sprite: "empoleon",
  },
  {
    name: "Snivy",
    sprite: "snivy",
  },
  {
    name: "Servine",
    sprite: "servine",
  },
  {
    name: "Serperior",
    sprite: "serperior",
  },
  {
    name: "Tepig",
    sprite: "tepig",
  },
  {
    name: "Pignite",
    sprite: "pignite",
  },
  {
    name: "Emboar",
    sprite: "emboar",
  },
  {
    name: "Oshawott",
    sprite: "oshawott",
  },
  {
    name: "Dewott",
    sprite: "dewott",
  },
  {
    name: "Samurott",
    sprite: "samurott",
  },
  {
    name: "Chespin",
    sprite: "chespin",
  },
  {
    name: "Quilladin",
    sprite: "quilladin",
  },
  {
    name: "Chesnaught",
    sprite: "chesnaught",
  },
  {
    name: "Fennekin",
    sprite: "fennekin",
  },
  {
    name: "Braixen",
    sprite: "braixen",
  },
  {
    name: "Delphox",
    sprite: "delphox",
  },
  {
    name: "Froakie",
    sprite: "froakie",
  },
  {
    name: "Frogadier",
    sprite: "frogadier",
  },
  {
    name: "Greninja",
    sprite: "greninja",
  },
  {
    name: "Rowlet",
    sprite: "rowlet",
  },
  {
    name: "Dartrix",
    sprite: "dartrix",
  },
  {
    name: "Decidueye",
    sprite: "decidueye",
  },
  {
    name: "Litten",
    sprite: "litten",
  },
  {
    name: "Torracat",
    sprite: "torracat",
  },
  {
    name: "Incineroar",
    sprite: "incineroar",
  },
  {
    name: "Popplio",
    sprite: "popplio",
  },
  {
    name: "Brionne",
    sprite: "brionne",
  },
  {
    name: "Primarina",
    sprite: "primarina",
  },
  {
    name: "Grookey",
    sprite: "grookey",
  },
  {
    name: "Thwackey",
    sprite: "thwackey",
  },
  {
    name: "Rillaboom",
    sprite: "rillaboom",
  },
  {
    name: "Scorbunny",
    sprite: "scorbunny",
  },
  {
    name: "Raboot",
    sprite: "raboot",
  },
  {
    name: "Cinderace",
    sprite: "cinderace",
  },
  {
    name: "Sobble",
    sprite: "sobble",
  },
  {
    name: "Drizzile",
    sprite: "drizzile",
  },
  {
    name: "Inteleon",
    sprite: "inteleon",
  },
  {
    name: "Sprigatito",
    sprite: "sprigatito",
  },
  {
    name: "Floragato",
    sprite: "floragato",
  },
  {
    name: "Meowscarada",
    sprite: "meowscarada",
  },
  {
    name: "Fuecoco",
    sprite: "fuecoco",
  },
  {
    name: "Crocalor",
    sprite: "crocalor",
  },
  {
    name: "Skeledirge",
    sprite: "skeledirge",
  },
  {
    name: "Quaxly",
    sprite: "quaxly",
  },
  {
    name: "Quaxwell",
    sprite: "quaxwell",
  },
  {
    name: "Quaquaval",
    sprite: "quaquaval",
  },
];

export function Starters() {
  return (
    <CollectionCard
      placeholdList={starters}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Starters"}
      collectionStr={"starters"}
      lg={3}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function StarterStats() {
  return (
    <CollectionStatsCard
      placeholdList={starters}
      title={"Starters"}
      collectionStr={"starters"}
    />
  );
}