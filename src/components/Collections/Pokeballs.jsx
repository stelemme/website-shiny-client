// Components imports
import CollectionCard from "./CollectionCard";
import CollectionStatsCard from "./CollectionStatsCard";

const ballsData = [
  {
    name: "Poké Ball",
    sprite: "poke-ball",
  },
  {
    name: "Great Ball",
    sprite: "great-ball",
  },
  {
    name: "Ultra Ball",
    sprite: "ultra-ball",
  },
  {
    name: "Master Ball",
    sprite: "master-ball",
  },
  {
    name: "Safari Ball",
    sprite: "safari-ball",
  },
  {
    name: "Fast Ball",
    sprite: "fast-ball",
  },
  {
    name: "Level Ball",
    sprite: "level-ball",
  },
  {
    name: "Lure Ball",
    sprite: "lure-ball",
  },
  {
    name: "Heavy Ball",
    sprite: "heavy-ball",
  },
  {
    name: "Love Ball",
    sprite: "love-ball",
  },
  {
    name: "Friend Ball",
    sprite: "friend-ball",
  },
  {
    name: "Moon Ball",
    sprite: "moon-ball",
  },
  {
    name: "Sport Ball",
    sprite: "sport-ball",
  },
  {
    name: "Net Ball",
    sprite: "net-ball",
  },
  {
    name: "Dive Ball",
    sprite: "dive-ball",
  },
  {
    name: "Nest Ball",
    sprite: "nest-ball",
  },
  {
    name: "Repeat Ball",
    sprite: "repeat-ball",
  },
  {
    name: "Timer Ball",
    sprite: "timer-ball",
  },
  {
    name: "Luxury Ball",
    sprite: "luxury-ball",
  },
  {
    name: "Premier Ball",
    sprite: "premier-ball",
  },
  {
    name: "Dusk Ball",
    sprite: "dusk-ball",
  },
  {
    name: "Heal Ball",
    sprite: "heal-ball",
  },
  {
    name: "Quick Ball",
    sprite: "quick-ball",
  },
  {
    name: "Dream Ball",
    sprite: "dream-ball",
  },
  {
    name: "Beast Ball",
    sprite: "beast-ball",
  },
  {
    name: "Poké Ball (Hisui)",
    sprite: "poke-ball-legends",
  },
  {
    name: "Great Ball (Hisui)",
    sprite: "great-ball-legends",
  },
  {
    name: "Ultra Ball (Hisui)",
    sprite: "ultra-ball-legends",
  },
  {
    name: "Feather Ball",
    sprite: "feather-ball",
  },
  {
    name: "Wing Ball",
    sprite: "wing-ball",
  },
  {
    name: "Jet Ball",
    sprite: "jet-ball",
  },
  {
    name: "Heavy Ball (Hisui)",
    sprite: "heavy-ball-legends",
  },
  {
    name: "Leaden Ball",
    sprite: "leaden-ball",
  },
  {
    name: "Gigaton Ball",
    sprite: "gigaton-ball",
  },
];

const unobtainableBalls = [
  {
    name: "Cherish Ball",
    sprite: "cherish-ball",
  },
  {
    name: "Park Ball",
    sprite: "park-ball",
  },
]

export function Pokeballs() {
  return (
    <CollectionCard
      placeholdList={ballsData}
      dir={"balls/pixel"}
      title={"POKEBALLS"}
      collectionStr={"ball"}
      lg={2}
      sm={3}
      xs={4}
      imgHeight={40}
      unobtainableList={unobtainableBalls}
    />
  );
}

export function PokeballsStats() {
  return (
    <CollectionStatsCard
      placeholdList={ballsData}
      title={"POKEBALLS"}
      collectionStr={"ball"}
    />
  );
}
