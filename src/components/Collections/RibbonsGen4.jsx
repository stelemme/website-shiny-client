// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ribbons = [
  {
    name: "Sinnoh Champion Ribbon",
    sprite: "gen-4/sinnoh-champion-ribbon",
    description: "Ribbon awarded for beating the Sinnoh Champion and entering the Hall of Fame.",
  },
  {
    name: "Cool Ribbon",
    sprite: "gen-4/cool-ribbon",
    description: "Super Contest Cool Category Normal Rank winner!",
  },
  {
    name: "Cool Ribbon Great",
    sprite: "gen-4/cool-ribbon-great",
    description: "Super Contest Cool Category Great Rank winner!",
  },
  {
    name: "Cool Ribbon Ultra",
    sprite: "gen-4/cool-ribbon-ultra",
    description: "Super Contest Cool Category Ultra Rank winner!",
  },
  {
    name: "Cool Ribbon Master",
    sprite: "gen-4/cool-ribbon-master",
    description: "Super Contest Cool Category Master Rank winner!",
  },
  {
    name: "Beauty Ribbon",
    sprite: "gen-4/beauty-ribbon",
    description: "Super Contest Beauty Category Normal Rank winner!",
  },
  {
    name: "Beauty Ribbon Great",
    sprite: "gen-4/beauty-ribbon-great",
    description: "Super Contest Beauty Category Great Rank winner!",
  },
  {
    name: "Beauty Ribbon Ultra",
    sprite: "gen-4/beauty-ribbon-ultra",
    description: "Super Contest Beauty Category Ultra Rank winner!",
  },
  {
    name: "Beauty Ribbon Master",
    sprite: "gen-4/beauty-ribbon-master",
    description: "Super Contest Beauty Category Master Rank winner!",
  },
  {
    name: "Cute Ribbon",
    sprite: "gen-4/cute-ribbon",
    description: "Super Contest Cute Category Normal Rank winner!",
  },
  {
    name: "Cute Ribbon Great",
    sprite: "gen-4/cute-ribbon-great",
    description: "Super Contest Cute Category Great Rank winner!",
  },
  {
    name: "Cute Ribbon Ultra",
    sprite: "gen-4/cute-ribbon-ultra",
    description: "Super Contest Cute Category Ultra Rank winner!",
  },
  {
    name: "Cute Ribbon Master",
    sprite: "gen-4/cute-ribbon-master",
    description: "Super Contest Cute Category Master Rank winner!",
  },
  {
    name: "Smart Ribbon",
    sprite: "gen-4/smart-ribbon",
    description: "Super Contest Smart Category Normal Rank winner!",
  },
  {
    name: "Smart Ribbon Great",
    sprite: "gen-4/smart-ribbon-great",
    description: "Super Contest Smart Category Great Rank winner!",
  },
  {
    name: "Smart Ribbon Ultra",
    sprite: "gen-4/smart-ribbon-ultra",
    description: "Super Contest Smart Category Ultra Rank winner!",
  },
  {
    name: "Smart Ribbon Master",
    sprite: "gen-4/smart-ribbon-master",
    description: "Super Contest Smart Category Master Rank winner!",
  },
  {
    name: "Tough Ribbon",
    sprite: "gen-4/tough-ribbon",
    description: "Super Contest Tough Category Normal Rank winner!",
  },
  {
    name: "Tough Ribbon Great",
    sprite: "gen-4/tough-ribbon-great",
    description: "Super Contest Tough Category Great Rank winner!",
  },
  {
    name: "Tough Ribbon Ultra",
    sprite: "gen-4/tough-ribbon-ultra",
    description: "Super Contest Tough Category Ultra Rank winner!",
  },
  {
    name: "Tough Ribbon Master",
    sprite: "gen-4/tough-ribbon-master",
    description: "Super Contest Tough Category Master Rank winner!",
  },
  {
    name: "Ability Ribbon",
    sprite: "gen-4/ability-ribbon",
    description: "A Ribbon awarded for defeating the Tower Tycoon on the 21st battle of a Single Battle streak at the Battle Tower.",
  },
  {
    name: "Great Ability Ribbon",
    sprite: "gen-4/great-ability-ribbon",
    description: "A Ribbon awarded for defeating the Tower Tycoon on the 49th battle of a Single Battle streak at the Battle Tower.",
  },
  {
    name: "Double Ability Ribbon",
    sprite: "gen-4/double-ability-ribbon",
    description: "A Ribbon awarded for reaching a Double Battle streak of over 50 battles at the Battle Tower.",
  },
  {
    name: "Multi Ability Ribbon",
    sprite: "gen-4/multi-ability-ribbon",
    description: "A Ribbon awarded for reaching a Multi Battle streak of over 50 battles at the Battle Tower with an NPC teammate.",
  },
  {
    name: "Pair Ability Ribbon",
    sprite: "gen-4/pair-ability-ribbon",
    description: "A Ribbon awarded for reaching a Multi Battle streak of over 50 battles at the Battle Tower with a linked teammate.",
  },
  {
    name: "World Ability Ribbon",
    sprite: "gen-4/world-ability-ribbon",
    description: "A Ribbon awarded for winning a set of seven battles in a Wi-Fi Room at the Battle Tower.",
  },
  {
    name: "Effort Ribbon",
    sprite: "gen-4/effort-ribbon",
    description: "Ribbon awarded for reaching maximum Effort Values.",
  },
  {
    name: "Alert Ribbon",
    sprite: "gen-4/alert-ribbon",
    description: "A Ribbon given out on Mondays."
  },
  {
    name: "Shock Ribbon",
    sprite: "gen-4/shock-ribbon",
    description: "A Ribbon given out on Tuesdays.",
  },
  {
    name: "Downcast Ribbon",
    sprite: "gen-4/downcast-ribbon",
    description: "A Ribbon given out on Wednesdays.",
  },
  {
    name: "Careless Ribbon",
    sprite: "gen-4/careless-ribbon",
    description: "A Ribbon given out on Thursdays.",
  },
  {
    name: "Relax Ribbon",
    sprite: "gen-4/relax-ribbon",
    description: "A Ribbon given out on Fridays.",
  },
  {
    name: "Snooze Ribbon",
    sprite: "gen-4/snooze-ribbon",
    description: "A Ribbon given out on Saturdays.",
  },
  {
    name: "Smile Ribbon",
    sprite: "gen-4/smile-ribbon",
    description: "A Ribbon given out on Sundays.",
  },
  {
    name: "Gorgeous Ribbon",
    sprite: "gen-4/gorgeous-ribbon",
    description: "An extraordinarily gorgeous and extravagant Ribbon costing $10,000.",
  },
  {
    name: "Royal Ribbon",
    sprite: "gen-4/royal-ribbon",
    description: "An incredibly regal Ribbon with an air of nobility costing $100,000.",
  },
  {
    name: "Gorgeous Royal Ribbon",
    sprite: "gen-4/gorgeous-royal-ribbon",
    description: "A gorgeous and regal Ribbon that is the peak of fabulous costing $999,999.",
  },
  {
    name: "Footprint Ribbon",
    sprite: "gen-4/footprint-ribbon",
    description: "A Ribbon awarded to a Pokémon which has maximum friendship.",
  },
  {
    name: "Legend Ribbon",
    sprite: "gen-4/legend-ribbon",
    description: "A Ribbon awarded for setting a legendary record by defeating Red at Mt. Silver Cave.",
  },
];

const unobtainableRibbonsGen4 = [
  {
    name: "Record Ribbon",
    sprite: "gen-4/record-ribbon",
    description: "A Ribbon that has never been made available.",
  },
  {
    name: "Classic Ribbon",
    sprite: "gen-4/classic-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
  {
    name: "Premier Ribbon",
    sprite: "gen-4/premier-ribbon",
    description: "A Ribbon that indicates an Event Pokémon.",
  },
];

export function RibbonsGen4() {
  return (
    <CollectionCard
      placeholdList={ribbons}
      dir={"ribbons"}
      title={"Ribbons In Gen 4"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 4"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
      unobtainableList={unobtainableRibbonsGen4}
    />
  );
}

export function RibbonsGen4Stats() {
  return (
    <CollectionStatsCard
      placeholdList={ribbons}
      title={"Ribbons In Gen 4"}
      collectionStr={"ribbon"}
      additionalCollectionStr={"Gen 4"}
    />
  );
}
