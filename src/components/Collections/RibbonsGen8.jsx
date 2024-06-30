// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    "name": "Sinnoh Champion Ribbon",
    "sprite": "sinnoh-champion-ribbon"
  },
  {
    "name": "Galar Champion Ribbon",
    "sprite": "galar-champion-ribbon"
  },
  {
    "name": "Coolness Master Ribbon",
    "sprite": "coolness-master-ribbon"
  },
  {
    "name": "Beauty Master Ribbon",
    "sprite": "beauty-master-ribbon"
  },
  {
    "name": "Cuteness Master Ribbon",
    "sprite": "cuteness-master-ribbon"
  },
  {
    "name": "Cleverness Master Ribbon",
    "sprite": "cleverness-master-ribbon"
  },
  {
    "name": "Toughness Master Ribbon",
    "sprite": "toughness-master-ribbon"
  },
  {
    "name": "Contest Star Ribbon",
    "sprite": "contest-star-ribbon"
  },
  {
    "name": "Twinkling Star Ribbon",
    "sprite": "twinkling-star-ribbon"
  },
  {
    "name": "Tower Master Ribbon",
    "sprite": "tower-master-ribbon"
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
    "name": "Best Friend Ribbon",
    "sprite": "best-friend-ribbon"
  },
  {
    "name": "Master Rank Ribbon",
    "sprite": "master-rank-ribbon"
  },
  {
    "name": "Hisui Ribbon",
    "sprite": "hisui-ribbon"
  },
  {
    "name": "Classic Ribbon",
    "sprite": "classic-ribbon"
  },
  {
    "name": "Premier Ribbon",
    "sprite": "premier-ribbon"
  },
  {
    "name": "Event Ribbon",
    "sprite": "event-ribbon"
  },
  {
    "name": "Birthday Ribbon",
    "sprite": "birthday-ribbon"
  },
  {
    "name": "Special Ribbon",
    "sprite": "special-ribbon"
  },
  {
    "name": "Souvenir Ribbon",
    "sprite": "souvenir-ribbon"
  },
  {
    "name": "Wishing Ribbon",
    "sprite": "wishing-ribbon"
  },
  {
    "name": "Battle Champion Ribbon",
    "sprite": "battle-champion-ribbon"
  }
]

export default function RibbonsGen8() {
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
