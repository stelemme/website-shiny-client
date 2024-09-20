// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Alola Champion Ribbon",
    sprite: "gen-7/alola-champion-ribbon",
  },
  {
    name: "Battle Royal Master Ribbon",
    sprite: "gen-7/battle-royal-master-ribbon",
  },
  {
    name: "Battle Tree Great Ribbon",
    sprite: "gen-7/battle-tree-great-ribbon",
  },
  {
    name: "Battle Tree Master Ribbon",
    sprite: "gen-7/battle-tree-master-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-7/effort-ribbon",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-7/footprint-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-7/best-friend-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-7/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-7/premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-7/event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-7/birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-7/special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-7/souvenir-ribbon",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-7/wishing-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-7/battle-champion-ribbon",
  },
];

export function RibbonsGen7() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 7"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 7"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function RibbonsGen7Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 7"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 7"}
    />
  );
}
