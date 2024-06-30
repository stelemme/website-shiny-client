// Components imports
import CollectionCard from "./CollectionCard";

const ribbons = [
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
  },
  {
    "name": "Regional Champion Ribbon",
    "sprite": "regional-champion-ribbon"
  },
  {
    "name": "National Champion Ribbon",
    "sprite": "national-champion-ribbon"
  },
  {
    "name": "World Champion Ribbon",
    "sprite": "world-champion-ribbon"
  }
]

export default function RibbonsGen5() {
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
