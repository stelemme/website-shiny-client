// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Kalos Champion Ribbon",
    sprite: "gen-6/kalos-champion-ribbon",
    description: "A Ribbon awarded for beating the Kalos Champion and entering the Kalos Hall of Fame.",
  },
  {
    name: "Hoenn Champion Ribbon",
    sprite: "gen-6/hoenn-champion-ribbon",
    description: "A Ribbon awarded for beating the Hoenn Champion and entering the Hoenn Hall of Fame.",
  },
  {
    name: "Coolness Master Ribbon",
    sprite: "gen-6/coolness-master-ribbon",
    description: "Contest Spectacular Coolness Category Master Rank winner!",
  },
  {
    name: "Beauty Master Ribbon",
    sprite: "gen-6/beauty-master-ribbon",
    description: "Contest Spectacular Beauty Category Master Rank winner!",
  },
  {
    name: "Cuteness Master Ribbon",
    sprite: "gen-6/cuteness-master-ribbon",
    description: "Contest Spectacular Cuteness Category Master Rank winner!",
  },
  {
    name: "Cleverness Master Ribbon",
    sprite: "gen-6/cleverness-master-ribbon",
    description: "Contest Spectacular Cleverness Category Master Rank winner!",
  },
  {
    name: "Toughness Master Ribbon",
    sprite: "gen-6/toughness-master-ribbon",
    description: "Contest Spectacular Toughness Category Master Rank winner!",    
  },
  {
    name: "Contest Star Ribbon",
    sprite: "gen-6/contest-star-ribbon",
    description: "A Ribbon awarded to a Pokémon that has won the Contest Spectacular in all 5 categories.", 
  },
  {
    name: "Contest Memory Ribbon",
    sprite: "gen-6/contest-memory-ribbon",
    description: "A Ribbon replacing all Contest Ribbons from previous generations.",
  },
  {
    name: "Contest Memory Ribbon (Gold)",
    sprite: "gen-6/contest-memory-ribbon-2",
    description: "A Ribbon awarded for obtaining all 20 Contest Ribbons and all 20 Super Contest Ribbons from previous generations.",
  },
  {
    name: "Skillful Battler Ribbon",
    sprite: "gen-6/skillful-battler-ribbon",
    description: "A Ribbon that can be given to a Pokémon that has defeated a Battle Chatelaine in battle 20 in any battle style.",
  },
  {
    name: "Expert Battler Ribbon",
    sprite: "gen-6/expert-battler-ribbon",
    description: "A Ribbon that can be given to a Pokémon that has defeated a Battle Chatelaine in battle 50 of super battle in any battle style.",
  },
  {
    name: "Battle Memory Ribbon",
    sprite: "gen-6/battle-memory-ribbon",
    description: "A Ribbon replacing all Tower ribbons from previous generations.",
  },
  {
    name: "Battle Memory Ribbon (Gold)",
    sprite: "gen-6/battle-memory-ribbon-2",
    description: "A Ribbon awarded for obtaining all 8 Tower Ribbons from previous generations.",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-6/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-6/alert-ribbon",
    description: "A Ribbon given out on Mondays."
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-6/shock-ribbon",
    description: "A Ribbon given out on Tuesdays.",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-6/downcast-ribbon",
    description: "A Ribbon given out on Wednesdays.",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-6/careless-ribbon",
    description: "A Ribbon given out on Thursdays.",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-6/relax-ribbon",
    description: "A Ribbon given out on Fridays.",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-6/snooze-ribbon",
    description: "A Ribbon given out on Saturdays.",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-6/smile-ribbon",
    description: "A Ribbon given out on Sundays.",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-6/gorgeous-ribbon",
    description: "An extraordinarily gorgeous and extravagant Ribbon costing $10,000.",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-6/royal-ribbon",
    description: "An incredibly regal Ribbon with an air of nobility costing $100,000.",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-6/gorgeous-royal-ribbon",
    description: "A gorgeous and regal Ribbon that is the peak of fabulous costing $999,999.",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-6/footprint-ribbon",
    description: "A Ribbon awarded to a Pokémon which has increased in level by over 30 levels.",
  },
  {
    name: "Best Friend Ribbon",
    sprite: "gen-6/best-friend-ribbon",
    description: "A Ribbon that can be given to a Pokémon which has maximum friendship.",
  },
  {
    name: "Training Ribbon",
    sprite: "gen-6/training-ribbon",
    description: "A Ribbon that can be given to a Supremeley Trained Pokémon that has achieved the target time in all Super Training and Secret Super-Training Regimens.",

  },
];

const unobtainableRibbonsGen6 = [
  {
    name: "Classic Ribbon",
    sprite: "gen-6/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-6/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Event Ribbon",
    sprite: "gen-6/event-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Birthday Ribbon",
    sprite: "gen-6/birthday-ribbon",
    description: "A Ribbon that indicates a Birthday Event Pokémon.",
  },
  {
    name: "Special Ribbon",
    sprite: "gen-6/special-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Souvenir Ribbon",
    sprite: "gen-6/souvenir-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Battle Champion Ribbon",
    sprite: "gen-6/battle-champion-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
];

export function RibbonsGen6() {
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
      unobtainableList={unobtainableRibbonsGen6}
    />
  );
}

export function RibbonsGen6Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 6"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 6"}
    />
  );
}
