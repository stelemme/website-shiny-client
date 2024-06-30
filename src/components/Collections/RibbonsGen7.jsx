// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    name: "Alola Champion Ribbon",
    sprite: "alola-champion-ribbon",
  },
  {
    name: "Battle Royal Master Ribbon",
    sprite: "battle-royal-master-ribbon",
  },
  {
    name: "Battle Tree Great Ribbon",
    sprite: "battle-tree-great-ribbon",
  },
  {
    name: "Battle Tree Master Ribbon",
    sprite: "battle-tree-master-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "effort-ribbon",
  },
  {
    name: "Footprint Ribbon",
    sprite: "footprint-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "best-friend-ribbon",
  },
  {
    name: "Classic Ribbon",
    sprite: "classic-ribbon",
  },
  {
    name: "Premier Ribbon",
    sprite: "premier-ribbon",
  },
  {
    name: "Event Ribbon",
    sprite: "event-ribbon",
  },
  {
    name: "Birthday Ribbon",
    sprite: "birthday-ribbon",
  },
  {
    name: "Special Ribbon",
    sprite: "special-ribbon",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "souvenir-ribbon",
  },
  {
    name: "Wishing Ribbon",
    sprite: "wishing-ribbon",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "battle-champion-ribbon",
  },
];

export default function RibbonsGen7() {
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
