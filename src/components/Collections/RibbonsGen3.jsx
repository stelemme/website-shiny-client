// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Champion Ribbon",
    sprite: "gen-3/champion-ribbon",
  },
  {
    name: "Cool Ribbon",
    sprite: "gen-3/cool-ribbon-gen3",
  },
  {
    name: "Cool Ribbon Super",
    sprite: "gen-3/cool-ribbon-super",
  },
  {
    name: "Cool Ribbon Hyper",
    sprite: "gen-3/cool-ribbon-hyper",
  },
  {
    name: "Cool Ribbon Master",
    sprite: "gen-3/cool-ribbon-master-gen3",
  },
  {
    name: "Beauty Ribbon",
    sprite: "gen-3/beauty-ribbon-gen3",
  },
  {
    name: "Beauty Ribbon Super",
    sprite: "gen-3/beauty-ribbon-super",
  },
  {
    name: "Beauty Ribbon Hyper",
    sprite: "gen-3/beauty-ribbon-hyper",
  },
  {
    name: "Beauty Ribbon Master",
    sprite: "gen-3/beauty-ribbon-master-gen3",
  },
  {
    name: "Cute Ribbon",
    sprite: "gen-3/cute-ribbon-gen3",
  },
  {
    name: "Cute Ribbon Super",
    sprite: "gen-3/cute-ribbon-super",
  },
  {
    name: "Cute Ribbon Hyper",
    sprite: "gen-3/cute-ribbon-hyper",
  },
  {
    name: "Cute Ribbon Master",
    sprite: "gen-3/cute-ribbon-master-gen3",
  },
  {
    name: "Smart Ribbon",
    sprite: "gen-3/smart-ribbon-gen3",
  },
  {
    name: "Smart Ribbon Super",
    sprite: "gen-3/smart-ribbon-super",
  },
  {
    name: "Smart Ribbon Hyper",
    sprite: "gen-3/smart-ribbon-hyper",
  },
  {
    name: "Smart Ribbon Master",
    sprite: "gen-3/smart-ribbon-master-gen3",
  },
  {
    name: "Tough Ribbon",
    sprite: "gen-3/tough-ribbon-gen3",
  },
  {
    name: "Tough Ribbon Super",
    sprite: "gen-3/tough-ribbon-super",
  },
  {
    name: "Tough Ribbon Hyper",
    sprite: "gen-3/tough-ribbon-hyper",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "gen-3/tough-ribbon-master-gen3",
  },
  {
    name: "Winning Ribbon",
    sprite: "gen-3/winning-ribbon",
  },
  {
    name: "Victory Ribbon",
    sprite: "gen-3/victory-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-3/effort-ribbon",
  },
  {
    name: "Artist Ribbon",
    sprite: "gen-3/artist-ribbon",
  },
  {
    name: "Country Ribbon",
    sprite: "gen-3/country-ribbon",
  },
  {
    name: "National Ribbon",
    sprite: "gen-3/national-ribbon",
  },
  {
    name: "Earth Ribbon",
    sprite: "gen-3/earth-ribbon",
  },
  {
    name: "World Ribbon",
    sprite: "gen-3/world-ribbon",
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
