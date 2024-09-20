// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Sinnoh Champion Ribbon",
    sprite: "gen-4/sinnoh-champion-ribbon",
  },
  {
    name: "Cool Ribbon",
    sprite: "gen-4/cool-ribbon",
  },
  {
    name: "Cool Ribbon Great",
    sprite: "gen-4/cool-ribbon-great",
  },
  {
    name: "Cool Ribbon Ultra",
    sprite: "gen-4/cool-ribbon-ultra",
  },
  {
    name: "Cool Ribbon Master",
    sprite: "gen-4/cool-ribbon-master",
  },
  {
    name: "Beauty Ribbon",
    sprite: "gen-4/beauty-ribbon",
  },
  {
    name: "Beauty Ribbon Great",
    sprite: "gen-4/beauty-ribbon-great",
  },
  {
    name: "Beauty Ribbon Ultra",
    sprite: "gen-4/beauty-ribbon-ultra",
  },
  {
    name: "Beauty Ribbon Master",
    sprite: "gen-4/beauty-ribbon-master",
  },
  {
    name: "Cute Ribbon",
    sprite: "gen-4/cute-ribbon",
  },
  {
    name: "Cute Ribbon Great",
    sprite: "gen-4/cute-ribbon-great",
  },
  {
    name: "Cute Ribbon Ultra",
    sprite: "gen-4/cute-ribbon-ultra",
  },
  {
    name: "Cute Ribbon Master",
    sprite: "gen-4/cute-ribbon-master",
  },
  {
    name: "Smart Ribbon",
    sprite: "gen-4/smart-ribbon",
  },
  {
    name: "Smart Ribbon Great",
    sprite: "gen-4/smart-ribbon-great",
  },
  {
    name: "Smart Ribbon Ultra",
    sprite: "gen-4/smart-ribbon-ultra",
  },
  {
    name: "Smart Ribbon Master",
    sprite: "gen-4/smart-ribbon-master",
  },
  {
    name: "Tough Ribbon",
    sprite: "gen-4/tough-ribbon",
  },
  {
    name: "Tough Ribbon Great",
    sprite: "gen-4/tough-ribbon-great",
  },
  {
    name: "Tough Ribbon Ultra",
    sprite: "gen-4/tough-ribbon-ultra",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "gen-4/tough-ribbon-master",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "gen-4/tough-ribbon-master",
  },
  {
    name: "Ability Ribbon",
    sprite: "gen-4/ability-ribbon",
  },
  {
    name: "Great Ability Ribbon",
    sprite: "gen-4/great-ability-ribbon",
  },
  {
    name: "Double Ability Ribbon",
    sprite: "gen-4/double-ability-ribbon",
  },
  {
    name: "Multi Ability Ribbon",
    sprite: "gen-4/multi-ability-ribbon",
  },
  {
    name: "Pair Ability Ribbon",
    sprite: "gen-4/pair-ability-ribbon",
  },
  {
    name: "World Ability Ribbon",
    sprite: "gen-4/world-ability-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-4/effort-ribbon",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-4/alert-ribbon",
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-4/shock-ribbon",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-4/downcast-ribbon",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-4/careless-ribbon",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-4/relax-ribbon",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-4/snooze-ribbon",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-4/smile-ribbon",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-4/gorgeous-ribbon",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-4/royal-ribbon",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-4/gorgeous-royal-ribbon",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-4/footprint-ribbon",
  },
  {
    name: "Record Ribbon",
    sprite: "gen-4/record-ribbon",
  },
  {
    name: "Legend Ribbon",
    sprite: "gen-4/legend-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-4/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-4/premier-ribbon",
  },
];

export function RibbonsGen4() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 4"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 4"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}

export function RibbonsGen4Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 4"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 4"}
    />
  );
}
