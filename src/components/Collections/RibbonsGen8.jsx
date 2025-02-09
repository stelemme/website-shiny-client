// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Sinnoh Champion Ribbon",
    sprite: "gen-8/sinnoh-champion-ribbon",
    description: "A Ribbon awarded for beating the Sinnoh Champion and entering the Sinnoh Hall of Fame.",
  },
  {
    name: "Galar Champion Ribbon",
    sprite: "gen-8/galar-champion-ribbon",
    description: "A Ribbon awarded for becoming the Galar Champion and entering the Galar Hall of Fame.",
  },
  {
    name: "Coolness Master Ribbon",
    sprite: "gen-8/coolness-master-ribbon",
    description: "Super Contest Show Coolness Category Master Rank winner!",
  },
  {
    name: "Beauty Master Ribbon",
    sprite: "gen-8/beauty-master-ribbon",
    description: "Super Contest Show Beauty Category Master Rank winner!",
  },
  {
    name: "Cuteness Master Ribbon",
    sprite: "gen-8/cuteness-master-ribbon",
    description: "Super Contest Show Cuteness Category Master Rank winner!",
  },
  {
    name: "Cleverness Master Ribbon",
    sprite: "gen-8/cleverness-master-ribbon",
    description: "Super Contest Show Cleverness Category Master Rank winner!",
  },
  {
    name: "Toughness Master Ribbon",
    sprite: "gen-8/toughness-master-ribbon",
    description: "Super Contest Show Toughness Category Master Rank winner!",
  },
  {
    name: "Contest Star Ribbon",
    sprite: "gen-8/contest-star-ribbon",
    description: "A Ribbon awarded to a Pokémon that has won the Super Contest Shows in all 5 categories.", 
  },
  {
    name: "Twinkling Star Ribbon",
    sprite: "gen-8/twinkling-star-ribbon",
    description: "A Ribbon awarded to a Pokémon that has won the the Master Rank Brilliant or Shining Contest of the Super Contest Shows and has obtained the Contest Star Ribbon.", 
  },
  {
    name: "Tower Master Ribbon",
    sprite: "gen-8/tower-master-ribbon",
    description: "A Ribbon awarded for winning against the champion in the Battle Tower",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-8/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-8/alert-ribbon",
    description: "A Ribbon given out on Mondays.",
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-8/shock-ribbon",
    description: "A Ribbon given out on Tuesdays.",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-8/downcast-ribbon",
    description: "A Ribbon given out on Wednesdays.",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-8/careless-ribbon",
    description: "A Ribbon given out on Thursdays.",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-8/relax-ribbon",
    description: "A Ribbon given out on Fridays.",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-8/snooze-ribbon",
    description: "A Ribbon given out on Saturdays.",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-8/smile-ribbon",
    description: "A Ribbon given out on Sundays.",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-8/gorgeous-ribbon",
    description: "An extraordinarily gorgeous and extravagant Ribbon costing $10,000.",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-8/royal-ribbon",
    description: "An incredibly regal Ribbon with an air of nobility costing $100,000.",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-8/gorgeous-royal-ribbon",
    description: "A gorgeous and regal Ribbon that is the peak of fabulous costing $999,999.",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-8/footprint-ribbon",
    description: "A Ribbon awarded to a Pokémon which has increased in level by over 30 levels.",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-8/best-friend-ribbon",
    description: "A Ribbon that can be given to a Pokémon which has maximum friendship.",
  },
  {
    name: "Master Rank Ribbon",
    sprite: "gen-8/master-rank-ribbon",
    description: "A Ribbon awarded for winning against a Trainer in the Master Ball Tier of Ranked Online Battles.",
  },
  {
    name: "Hisui Ribbon",
    sprite: "gen-8/hisui-ribbon",
    description: "A Ribbon awarded to a Pokémon that posed for a photograph in Dagero's photo studio in Hisui.",
  },
];

const unobtainableRibbonsGen8 = [
  {
    name: "Classic Ribbon",
    sprite: "gen-8/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-8/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-8/event-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-8/birthday-ribbon",
    description: "A Ribbon that indicates a Birthday Event Pokémon.",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-8/special-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-8/souvenir-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Wishing Ribbon",
    sprite: "gen-8/wishing-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-8/battle-champion-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
];

export function RibbonsGen8() {
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
      unobtainableList={unobtainableRibbonsGen8}
    />
  );
}

export function RibbonsGen8Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 8"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 8"}
    />
  );
}
