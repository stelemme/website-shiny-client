// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const legends = [
  {
    name: "Articuno",
    sprite: "articuno",
  },
  {
    name: "Galarian Articuno",
    sprite: "articuno-galar",
  },
  {
    name: "Zapdos",
    sprite: "zapdos",
  },
  {
    name: "Galarian Zapdos",
    sprite: "zapdos-galar",
  },
  {
    name: "Moltres",
    sprite: "moltres",
  },
  {
    name: "Galarian Moltres",
    sprite: "moltres-galar",
  },
  {
    name: "Mewtwo",
    sprite: "mewtwo",
  },
  {
    name: "Raikou",
    sprite: "raikou",
  },
  {
    name: "Entei",
    sprite: "entei",
  },
  {
    name: "Suicune",
    sprite: "suicune",
  },
  {
    name: "Lugia",
    sprite: "lugia",
  },
  {
    name: "Ho-Oh",
    sprite: "ho-oh",
  },
  {
    name: "Regirock",
    sprite: "regirock",
  },
  {
    name: "Regice",
    sprite: "regice",
  },
  {
    name: "Registeel",
    sprite: "registeel",
  },
  {
    name: "Latias",
    sprite: "latias",
  },
  {
    name: "Latios",
    sprite: "latios",
  },
  {
    name: "Kyogre",
    sprite: "kyogre",
  },
  {
    name: "Groudon",
    sprite: "groudon",
  },
  {
    name: "Rayquaza",
    sprite: "rayquaza",
  },
  {
    name: "Uxie",
    sprite: "uxie",
  },
  {
    name: "Mesprit",
    sprite: "mesprit",
  },
  {
    name: "Azelf",
    sprite: "azelf",
  },
  {
    name: "Dialga",
    sprite: "dialga",
  },
  {
    name: "Palkia",
    sprite: "palkia",
  },
  {
    name: "Heatran",
    sprite: "heatran",
  },
  {
    name: "Regigigas",
    sprite: "regigigas",
  },
  {
    name: "Giratina",
    sprite: "giratina",
  },
  {
    name: "Cresselia",
    sprite: "cresselia",
  },
  {
    name: "Cobalion",
    sprite: "cobalion",
  },
  {
    name: "Terrakion",
    sprite: "terrakion",
  },
  {
    name: "Virizion",
    sprite: "virizion",
  },
  {
    name: "Tornadus",
    sprite: "tornadus",
  },
  {
    name: "Thundurus",
    sprite: "thundurus",
  },
  {
    name: "Reshiram",
    sprite: "reshiram",
  },
  {
    name: "Zekrom",
    sprite: "zekrom",
  },
  {
    name: "Landorus",
    sprite: "landorus",
  },
  {
    name: "Kyurem",
    sprite: "kyurem",
  },
  {
    name: "Xerneas",
    sprite: "xerneas",
  },
  {
    name: "Yveltal",
    sprite: "yveltal",
  },
  {
    name: "Zygarde",
    sprite: "zygarde",
  },
  {
    name: "Type: Null",
    sprite: "type-null",
  },
  {
    name: "Silvally",
    sprite: "silvally",
  },
  {
    name: "Tapu Koko",
    sprite: "tapu-koko",
  },
  {
    name: "Tapu Lele",
    sprite: "tapu-lele",
  },
  {
    name: "Tapu Bulu",
    sprite: "tapu-bulu",
  },
  {
    name: "Tapu Fini",
    sprite: "tapu-fini",
  },
  {
    name: "Cosmog",
    sprite: "cosmog",
  },
  {
    name: "Cosmoem",
    sprite: "cosmoem",
  },
  {
    name: "Solgaleo",
    sprite: "solgaleo",
  },
  {
    name: "Lunala",
    sprite: "lunala",
  },
  {
    name: "Necrozma",
    sprite: "necrozma",
  },
  {
    name: "Zacian",
    sprite: "zacian",
  },
  {
    name: "Zamazenta",
    sprite: "zamazenta",
  },
  {
    name: "Eternatus",
    sprite: "eternatus",
  },
  {
    name: "Kubfu",
    sprite: "kubfu",
  },
  {
    name: "Rapid Strike Urshifu",
    sprite: "urshifu-rapid-strike",
  },
  {
    name: "Single Strike Urshifu",
    sprite: "urshifu-single-strike",
  },
  {
    name: "Regieleki",
    sprite: "regieleki",
  },
  {
    name: "Regidrago",
    sprite: "regidrago",
  },
  {
    name: "Glastrier",
    sprite: "glastrier",
  },
  {
    name: "Spectrier",
    sprite: "spectrier",
  },
  {
    name: "Calyrex",
    sprite: "calyrex",
  },
  {
    name: "Enamorus",
    sprite: "enamorus",
  },
  {
    name: "Wo-Chien",
    sprite: "wo-chien",
  },
  {
    name: "Chien-Pao",
    sprite: "chien-pao",
  },
  {
    name: "Ting-Lu",
    sprite: "ting-lu",
  },
  {
    name: "Chi-Yu",
    sprite: "chi-yu",
  },
  {
    name: "Koraidon",
    sprite: "koraidon",
  },
  {
    name: "Miraidon",
    sprite: "miraidon",
  },
  {
    name: "Okidogi",
    sprite: "okidogi",
  },
  {
    name: "Munkidori",
    sprite: "munkidori",
  },
  {
    name: "Fezandipiti",
    sprite: "fezandipiti",
  },
  {
    name: "Ogerpon",
    sprite: "ogerpon",
  },
  {
    name: "Terapagos",
    sprite: "terapagos",
  },
];

export function Legends() {
  return (
    <CollectionCard
      placeholdList={legends}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Legendary Pokémon"}
      collectionStr={"legend"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function LegendsStats() {
  return (
    <CollectionStatsCard
      placeholdList={legends}
      title={"Legendary Pokémon"}
      collectionStr={"legend"}
    />
  );
}
