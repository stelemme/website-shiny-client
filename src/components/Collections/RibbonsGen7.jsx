// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Alola Champion Ribbon",
    sprite: "gen-7/alola-champion-ribbon",
    description: "A Ribbon awarded for becoming the Alola Champion and entering the Alola Hall of Fame.",
  },
  {
    name: "Battle Royal Master Ribbon",
    sprite: "gen-7/battle-royal-master-ribbon",
    description: "A Ribbon that can be given to a Pokémon that has achieved victory in the Battle Royal Master Rank.",
  },
  {
    name: "Battle Tree Great Ribbon",
    sprite: "gen-7/battle-tree-great-ribbon",
    description: "A Ribbon awarded for winning against a Battle Legend in the Battle Tree.",
  },
  {
    name: "Battle Tree Master Ribbon",
    sprite: "gen-7/battle-tree-master-ribbon",
    description: "A Ribbon awarded for winning against a Battle Legend in super battles in the Battle Tree.",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-7/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-7/footprint-ribbon",
    description: "A Ribbon awarded to a Pokémon which has increased in level by over 30 levels.",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-7/best-friend-ribbon",
    description: "A Ribbon that can be given to a Pokémon which has maximum friendship.",
  },
];

const unobtainableRibbonsGen7 = [
  {
    name: "Classic Ribbon",
    sprite: "gen-7/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-7/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-7/event-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-7/birthday-ribbon",
    description: "A Ribbon that indicates a Birthday Event Pokémon.",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-7/special-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-7/souvenir-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-7/wishing-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-7/battle-champion-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
];

export function RibbonsGen7() {
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
      unobtainableList={unobtainableRibbonsGen7}
    />
  );
}

export function RibbonsGen7Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 7"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 7"}
    />
  );
}
