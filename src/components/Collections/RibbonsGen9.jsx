// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
  {
    name: "Paldea Champion Ribbon",
    sprite: "paldea-champion-ribbon",
  },
  {
    name: "Effort Ribbon",
    sprite: "effort-ribbon",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "best-friend-ribbon",
  },
  {
    name: "Master Rank Ribbon",
    sprite: "master-rank-ribbon",
  },
  {
    name: "Once-in-a-Lifetime Ribbon",
    sprite: "once-in-a-lifetime-ribbon",
  },
  {
    name: "Partner Ribbon",
    sprite: "partner-ribbon",
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

export default function RibbonsGen9() {
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
    />
  );
}
