// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Classic Ribbon",
    sprite: "gen-5/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-5/premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-5/event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-5/birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-5/special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-5/souvenir-ribbon",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-5/wishing-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-5/battle-champion-ribbon",
  },
  {
    name: "Regional Champion Ribbon",
    sprite: "gen-5/regional-champion-ribbon",
  },
  {
    name: "National Champion Ribbon",
    sprite: "gen-5/national-champion-ribbon",
  },
  {
    name: "World Champion Ribbon",
    sprite: "gen-5/world-champion-ribbon",
  },
];

export function RibbonsGen5() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 5"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 5"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function RibbonsGen5Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 5"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 5"}
    />
  );
}
