// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    "name": "Kalos Champion Ribbon",
    "sprite": "kalos-champion-ribbon"
  },
  {
    "name": "Hoenn Champion Ribbon",
    "sprite": "hoenn-champion-ribbon"
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
    "name": "Contest Memory Ribbon",
    "sprite": "contest-memory-ribbon"
  },
  {
    "name": "Contest Memory Ribbon 2",
    "sprite": "contest-memory-ribbon-2"
  },
  {
    "name": "Skillful Battler Ribbon",
    "sprite": "skillful-battler-ribbon"
  },
  {
    "name": "Expert Battler Ribbon",
    "sprite": "expert-battler-ribbon"
  },
  {
    "name": "Battle Memory Ribbon",
    "sprite": "battle-memory-ribbon"
  },
  {
    "name": "Battle Memory Ribbon 2",
    "sprite": "battle-memory-ribbon-2"
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
    "name": "Training Ribbon",
    "sprite": "training-ribbon"
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
    "name": "Battle Champion Ribbon",
    "sprite": "battle-champion-ribbon"
  }
]

export default function RibbonsGen6() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 6"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 6"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
