// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Sinnoh Champion Ribbon",
    sprite: "gen-8/sinnoh-champion-ribbon",
  },
  {
    name: "Galar Champion Ribbon",
    sprite: "gen-8/galar-champion-ribbon",
  },
  {
    name: "Coolness Master Ribbon",
    sprite: "gen-8/coolness-master-ribbon",
  },
  {
    name: "Beauty Master Ribbon",
    sprite: "gen-8/beauty-master-ribbon",
  },
  {
    name: "Cuteness Master Ribbon",
    sprite: "gen-8/cuteness-master-ribbon",
  },
  {
    name: "Cleverness Master Ribbon",
    sprite: "gen-8/cleverness-master-ribbon",
  },
  {
    name: "Toughness Master Ribbon",
    sprite: "gen-8/toughness-master-ribbon",
  },
  {
    name: "Contest Star Ribbon",
    sprite: "gen-8/contest-star-ribbon",
  },
  {
    name: "Twinkling Star Ribbon",
    sprite: "gen-8/twinkling-star-ribbon",
  },
  {
    name: "Tower Master Ribbon",
    sprite: "gen-8/tower-master-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-8/effort-ribbon",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-8/alert-ribbon",
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-8/shock-ribbon",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-8/downcast-ribbon",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-8/careless-ribbon",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-8/relax-ribbon",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-8/snooze-ribbon",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-8/smile-ribbon",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-8/gorgeous-ribbon",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-8/royal-ribbon",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-8/gorgeous-royal-ribbon",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-8/footprint-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-8/best-friend-ribbon",
  },
  {
    name: "Master Rank Ribbon",
    sprite: "gen-8/master-rank-ribbon",
  },
  {
    name: "Hisui Ribbon",
    sprite: "gen-8/hisui-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-8/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-8/premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-8/event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-8/birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-8/special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-8/souvenir-ribbon",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-8/wishing-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-8/battle-champion-ribbon",
  },
];

export function RibbonsGen8() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 8"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 8"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function RibbonsGen8Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 8"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 8"}
    />
  );
}
