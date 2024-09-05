// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    name: "Kalos Champion Ribbon",
    sprite: "gen-6/kalos-champion-ribbon",
  },
  {
    name: "Hoenn Champion Ribbon",
    sprite: "gen-6/hoenn-champion-ribbon",
  },
  {
    name: "Coolness Master Ribbon",
    sprite: "gen-6/coolness-master-ribbon",
  },
  {
    name: "Beauty Master Ribbon",
    sprite: "gen-6/beauty-master-ribbon",
  },
  {
    name: "Cuteness Master Ribbon",
    sprite: "gen-6/cuteness-master-ribbon",
  },
  {
    name: "Cleverness Master Ribbon",
    sprite: "gen-6/cleverness-master-ribbon",
  },
  {
    name: "Toughness Master Ribbon",
    sprite: "gen-6/toughness-master-ribbon",
  },
  {
    name: "Contest Star Ribbon",
    sprite: "gen-6/contest-star-ribbon",
  },
  {
    name: "Contest Memory Ribbon",
    sprite: "gen-6/contest-memory-ribbon",
  },
  {
    name: "Contest Memory Ribbon 2",
    sprite: "gen-6/contest-memory-ribbon-2",
  },
  {
    name: "Skillful Battler Ribbon",
    sprite: "gen-6/skillful-battler-ribbon",
  },
  {
    name: "Expert Battler Ribbon",
    sprite: "gen-6/expert-battler-ribbon",
  },
  {
    name: "Battle Memory Ribbon",
    sprite: "gen-6/battle-memory-ribbon",
  },
  {
    name: "Battle Memory Ribbon 2",
    sprite: "gen-6/battle-memory-ribbon-2",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-6/effort-ribbon",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-6/alert-ribbon",
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-6/shock-ribbon",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-6/downcast-ribbon",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-6/careless-ribbon",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-6/relax-ribbon",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-6/snooze-ribbon",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-6/smile-ribbon",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-6/gorgeous-ribbon",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-6/royal-ribbon",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-6/gorgeous-royal-ribbon",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-6/footprint-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-6/best-friend-ribbon",
  },
  {
    name: "Training Ribbon",
    sprite: "gen-6/training-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-6/classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-6/premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-6/event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-6/birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-6/special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-6/souvenir-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-6/battle-champion-ribbon",
  },
];

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
