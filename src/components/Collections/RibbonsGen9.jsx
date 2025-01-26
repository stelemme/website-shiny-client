// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Paldea Champion Ribbon",
    sprite: "gen-9/paldea-champion-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-9/effort-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-9/best-friend-ribbon",
  },
  {
    name: "Master Rank Ribbon",
    sprite: "gen-9/master-rank-ribbon",
  },
];

const unobtainableRibbonsGen9 = [
  {
    name: "Once-in-a-Lifetime Ribbon",
    sprite: "gen-9/once-in-a-lifetime-ribbon",
  },
  {
    name: "Partner Ribbon",
    sprite: "gen-9/partner-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-9/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-9/premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-9/event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-9/birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-9/special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-9/souvenir-ribbon",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-9/wishing-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-9/battle-champion-ribbon",
  },
];

export function RibbonsGen9() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 9"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 9"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
      unobtainableList={unobtainableRibbonsGen9}
    />
  );
}

export function RibbonsGen9Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 9"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 9"}
    />
  );
}
