// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    "name": "Sinnoh Champion Ribbon",
    "sprite": "sinnoh-champion-ribbon"
  },
  {
    "name": "Cool Ribbon",
    "sprite": "cool-ribbon"
  },
  {
    "name": "Cool Ribbon Great",
    "sprite": "cool-ribbon-great"
  },
  {
    "name": "Cool Ribbon Ultra",
    "sprite": "cool-ribbon-ultra"
  },
  {
    "name": "Cool Ribbon Master",
    "sprite": "cool-ribbon-master"
  },
  {
    "name": "Beauty Ribbon",
    "sprite": "beauty-ribbon"
  },
  {
    "name": "Beauty Ribbon Great",
    "sprite": "beauty-ribbon-great"
  },
  {
    "name": "Beauty Ribbon Ultra",
    "sprite": "beauty-ribbon-ultra"
  },
  {
    "name": "Beauty Ribbon Master",
    "sprite": "beauty-ribbon-master"
  },
  {
    "name": "Cute Ribbon",
    "sprite": "cute-ribbon"
  },
  {
    "name": "Cute Ribbon Great",
    "sprite": "cute-ribbon-great"
  },
  {
    "name": "Cute Ribbon Ultra",
    "sprite": "cute-ribbon-ultra"
  },
  {
    "name": "Cute Ribbon Master",
    "sprite": "cute-ribbon-master"
  },
  {
    "name": "Smart Ribbon",
    "sprite": "smart-ribbon"
  },
  {
    "name": "Smart Ribbon Great",
    "sprite": "smart-ribbon-great"
  },
  {
    "name": "Smart Ribbon Ultra",
    "sprite": "smart-ribbon-ultra"
  },
  {
    "name": "Smart Ribbon Master",
    "sprite": "smart-ribbon-master"
  },
  {
    "name": "Tough Ribbon",
    "sprite": "tough-ribbon"
  },
  {
    "name": "Tough Ribbon Great",
    "sprite": "tough-ribbon-great"
  },
  {
    "name": "Tough Ribbon Ultra",
    "sprite": "tough-ribbon-ultra"
  },
  {
    "name": "Tough Ribbon Master",
    "sprite": "tough-ribbon-master"
  },
  {
    "name": "Tough Ribbon Master",
    "sprite": "tough-ribbon-master"
  },
  {
    "name": "Ability Ribbon",
    "sprite": "ability-ribbon"
  },
  {
    "name": "Great Ability Ribbon",
    "sprite": "great-ability-ribbon"
  },
  {
    "name": "Double Ability Ribbon",
    "sprite": "double-ability-ribbon"
  },
  {
    "name": "Multi Ability Ribbon",
    "sprite": "multi-ability-ribbon"
  },
  {
    "name": "Pair Ability Ribbon",
    "sprite": "pair-ability-ribbon"
  },
  {
    "name": "World Ability Ribbon",
    "sprite": "world-ability-ribbon"
  },
  {
    "name": "Effort Ribbon",
    "sprite": "effort-ribbon"
  },
  {
    "name": "Alert Ribbon",
    "sprite": "alert-ribbon"
  },
  {
    "name": "Shock Ribbon",
    "sprite": "shock-ribbon"
  },
  {
    "name": "Downcast Ribbon",
    "sprite": "downcast-ribbon"
  },
  {
    "name": "Careless Ribbon",
    "sprite": "careless-ribbon"
  },
  {
    "name": "Relax Ribbon",
    "sprite": "relax-ribbon"
  },
  {
    "name": "Snooze Ribbon",
    "sprite": "snooze-ribbon"
  },
  {
    "name": "Smile Ribbon",
    "sprite": "smile-ribbon"
  },
  {
    "name": "Gorgeous Ribbon",
    "sprite": "gorgeous-ribbon"
  },
  {
    "name": "Royal Ribbon",
    "sprite": "royal-ribbon"
  },
  {
    "name": "Gorgeous Royal Ribbon",
    "sprite": "gorgeous-royal-ribbon"
  },
  {
    "name": "Footprint Ribbon",
    "sprite": "footprint-ribbon"
  },
  {
    "name": "Record Ribbon",
    "sprite": "record-ribbon"
  },
  {
    "name": "Legend Ribbon",
    "sprite": "legend-ribbon"
  },
  {
    "name": "Classic Ribbon",
    "sprite": "classic-ribbon"
  },
  {
    "name": "Premier Ribbon",
    "sprite": "premier-ribbon"
  }
]

export default function RibbonsGen4() {
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
