// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Champion Ribbon",
    sprite: "gen-3/champion-ribbon",
    description: "Champion-beating, Hall of Fame Member Ribbon",
  },
  {
    name: "Cool Ribbon",
    sprite: "gen-3/cool-ribbon-gen3",
    description: "Cool Contest Normal Rank Winner!",
  },
  {
    name: "Cool Ribbon Super",
    sprite: "gen-3/cool-ribbon-super",
    description: "Cool Contest Super Rank Winner!",
  },
  {
    name: "Cool Ribbon Hyper",
    sprite: "gen-3/cool-ribbon-hyper",
    description: "Cool Contest Hyper Rank Winner!",
  },
  {
    name: "Cool Ribbon Master",
    sprite: "gen-3/cool-ribbon-master-gen3",
    description: "Cool Contest Master Rank Winner!",
  },
  {
    name: "Beauty Ribbon",
    sprite: "gen-3/beauty-ribbon-gen3",
    description: "Beauty Contest Normal Rank Winner!",
  },
  {
    name: "Beauty Ribbon Super",
    sprite: "gen-3/beauty-ribbon-super",
    description: "Beauty Contest Super Rank Winner!",
  },
  {
    name: "Beauty Ribbon Hyper",
    sprite: "gen-3/beauty-ribbon-hyper",
    description: "Beauty Contest Hyper Rank Winner!",
  },
  {
    name: "Beauty Ribbon Master",
    sprite: "gen-3/beauty-ribbon-master-gen3",
    description: "Beauty Contest Master Rank Winner!",
  },
  {
    name: "Cute Ribbon",
    sprite: "gen-3/cute-ribbon-gen3",
    description: "Cute Contest Normal Rank Winner!",
  },
  {
    name: "Cute Ribbon Super",
    sprite: "gen-3/cute-ribbon-super",
    description: "Cute Contest Super Rank Winner!",
  },
  {
    name: "Cute Ribbon Hyper",
    sprite: "gen-3/cute-ribbon-hyper",
    description: "Cute Contest Hyper Rank Winner!",
  },
  {
    name: "Cute Ribbon Master",
    sprite: "gen-3/cute-ribbon-master-gen3",
    description: "Cute Contest Master Rank Winner!",
  },
  {
    name: "Smart Ribbon",
    sprite: "gen-3/smart-ribbon-gen3",
    description: "Smart Contest Normal Rank Winner!",
  },
  {
    name: "Smart Ribbon Super",
    sprite: "gen-3/smart-ribbon-super",
    description: "Smart Contest Super Rank Winner!",
  },
  {
    name: "Smart Ribbon Hyper",
    sprite: "gen-3/smart-ribbon-hyper",
    description: "Smart Contest Hyper Rank Winner!",
  },
  {
    name: "Smart Ribbon Master",
    sprite: "gen-3/smart-ribbon-master-gen3",
    description: "Smart Contest Master Rank Winner!",
  },
  {
    name: "Tough Ribbon",
    sprite: "gen-3/tough-ribbon-gen3",
    description: "Tough Contest Normal Rank Winner!",
  },
  {
    name: "Tough Ribbon Super",
    sprite: "gen-3/tough-ribbon-super",
    description: "Tough Contest Super Rank Winner!",
  },
  {
    name: "Tough Ribbon Hyper",
    sprite: "gen-3/tough-ribbon-hyper",
    description: "Tough Contest Hyper Rank Winner!",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "gen-3/tough-ribbon-master-gen3",
    description: "Tough Contest Master Rank Winner!",
  },
  {
    name: "Winning Ribbon",
    sprite: "gen-3/winning-ribbon",
    description: "Ribbon for clearing the 56th battle at LV50 at the Battle Tower.",
  },
  {
    name: "Victory Ribbon",
    sprite: "gen-3/victory-ribbon",
    description: "Ribbon for clearing the 56th battle at LV100 at the Battle Tower.",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-3/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Artist Ribbon",
    sprite: "gen-3/artist-ribbon",
    description: "Ribbon obtained by winning a Master Rank or Link Contest with a high score and agreeing to have the Pokémon's portrait placed in the Lilycove Museum after being offered.",
  },
  {
    name: "National Ribbon",
    sprite: "gen-3/national-ribbon",
    description: "Ribbon awarded to a Shadow Pokémon that has been purified.",
  },
  {
    name: "Earth Ribbon",
    sprite: "gen-3/earth-ribbon",
    description: "Ribbon awarded after winning 100 battles at Mt. Battle.",
  },
];

const unobtainableRibbonsGen3 = [
  {
    name: "Country Ribbon",
    sprite: "gen-3/country-ribbon",
    description: "A ribbon awarded to the Pokémon League Champion at Pokémon Festa.",
  },
  {
    name: "World Ribbon",
    sprite: "gen-3/world-ribbon",
    description: "A ribbon awarded to the Pokémon League Champion at Pokémon Festa.",
  },
];

export function RibbonsGen3() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 3"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 3"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
      unobtainableList={unobtainableRibbonsGen3}
    />
  );
}
export function RibbonsGen3Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      dir={"ribbons"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 3"}
    />
  );
}
