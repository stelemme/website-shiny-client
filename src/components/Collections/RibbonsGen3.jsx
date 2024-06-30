// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    name: "Champion Ribbon",
    sprite: "champion-ribbon",
  },
  {
    name: "Cool Ribbon",
    sprite: "cool-ribbon-gen3",
  },
  {
    name: "Cool Ribbon Super",
    sprite: "cool-ribbon-super",
  },
  {
    name: "Cool Ribbon Hyper",
    sprite: "cool-ribbon-hyper",
  },
  {
    name: "Cool Ribbon Master",
    sprite: "cool-ribbon-master-gen3",
  },
  {
    name: "Beauty Ribbon",
    sprite: "beauty-ribbon-gen3",
  },
  {
    name: "Beauty Ribbon Super",
    sprite: "beauty-ribbon-super",
  },
  {
    name: "Beauty Ribbon Hyper",
    sprite: "beauty-ribbon-hyper",
  },
  {
    name: "Beauty Ribbon Master",
    sprite: "beauty-ribbon-master-gen3",
  },
  {
    name: "Cute Ribbon",
    sprite: "cute-ribbon-gen3",
  },
  {
    name: "Cute Ribbon Super",
    sprite: "cute-ribbon-super",
  },
  {
    name: "Cute Ribbon Hyper",
    sprite: "cute-ribbon-hyper",
  },
  {
    name: "Cute Ribbon Master",
    sprite: "cute-ribbon-master-gen3",
  },
  {
    name: "Smart Ribbon",
    sprite: "smart-ribbon-gen3",
  },
  {
    name: "Smart Ribbon Super",
    sprite: "smart-ribbon-super",
  },
  {
    name: "Smart Ribbon Hyper",
    sprite: "smart-ribbon-hyper",
  },
  {
    name: "Smart Ribbon Master",
    sprite: "smart-ribbon-master-gen3",
  },
  {
    name: "Tough Ribbon",
    sprite: "tough-ribbon-gen3",
  },
  {
    name: "Tough Ribbon Super",
    sprite: "tough-ribbon-super",
  },
  {
    name: "Tough Ribbon Hyper",
    sprite: "tough-ribbon-hyper",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "tough-ribbon-master-gen3",
  },
  {
    name: "Winning Ribbon",
    sprite: "winning-ribbon",
  },
  {
    name: "Victory Ribbon",
    sprite: "victory-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "effort-ribbon",
  },
  {
    name: "Artist Ribbon",
    sprite: "artist-ribbon",
  },
  {
    name: "Country Ribbon",
    sprite: "country-ribbon",
  },
  {
    name: "National Ribbon",
    sprite: "national-ribbon",
  },
  {
    name: "Earth Ribbon",
    sprite: "earth-ribbon",
  },
  {
    name: "World Ribbon",
    sprite: "world-ribbon",
  },
];

export default function RibbonsGen3() {
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
