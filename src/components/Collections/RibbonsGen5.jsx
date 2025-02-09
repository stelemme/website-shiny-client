// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [];

const unobtainableRibbonsGen5 = [
  {
    name: "Classic Ribbon",
    sprite: "gen-5/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-5/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-5/event-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-5/birthday-ribbon",
    description: "A Ribbon that indicates a Birthday Event Pokémon.",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-5/special-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-5/souvenir-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-5/wishing-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-5/battle-champion-ribbon",
    description: "A Ribbon awarded to a Battle competition Champion.",
  },
  {
    name: "Regional Champion Ribbon",
    sprite: "gen-5/regional-champion-ribbon",
    description: "A Ribbon awarded to a Regional Champion in the Pokémon World Championships.",
  },
  {
    name: "National Champion Ribbon",
    sprite: "gen-5/national-champion-ribbon",
    description: "A Ribbon awarded to a National Champion in the Pokémon World Championships.",
  },
  {
    name: "World Champion Ribbon",
    sprite: "gen-5/world-champion-ribbon",
    description: "A Ribbon awarded to a World Champion in the Pokémon World Championships.",
  },
];

export function RibbonsGen5() {
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
      unobtainableList={unobtainableRibbonsGen5}
    />
  );
}

export function RibbonsGen5Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 5"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 5"}
    />
  );
}
