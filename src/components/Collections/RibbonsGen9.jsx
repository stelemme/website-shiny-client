// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Paldea Champion Ribbon",
    sprite: "gen-9/paldea-champion-ribbon",
    description: "A Ribbon awarded for becoming a Paldea Champion and entering the Paldea Hall of Fame.",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-9/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-9/best-friend-ribbon",
    description: "A Ribbon that can be given to a Pokémon which has maximum friendship.",
  },
  {
    name: "Master Rank Ribbon",
    sprite: "gen-9/master-rank-ribbon",
    description: "A Ribbon awarded for winning against a Trainer in the Master Ball Tier of Ranked Online Battles.",
  },
  {
    name: "Partner Ribbon",
    sprite: "gen-9/partner-ribbon",
    description: "A special Ribbon awarded to a Pokémon that was once partnered with a special coach.",
  },
];

const unobtainableRibbonsGen9 = [
  {
    name: "Once-in-a-Lifetime Ribbon",
    sprite: "gen-9/once-in-a-lifetime-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-9/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-9/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-9/event-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-9/birthday-ribbon",
    description: "A Ribbon that indicates a Birthday Event Pokémon.",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-9/special-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-9/souvenir-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-9/wishing-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-9/battle-champion-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
];

export function RibbonsGen9() {
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
      unobtainableList={unobtainableRibbonsGen9}
    />
  );
}

export function RibbonsGen9Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 9"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 9"}
    />
  );
}
