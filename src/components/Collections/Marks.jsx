// Components imports
import CollectionCard from "./CollectionCard";

const marks = [
  {
    name: "Destiny Mark",
    sprite: "destiny-mark",
  },
  {
    name: "Itemfinder Mark",
    sprite: "itemfinder-mark",
  },
  {
    name: "Gourmand Mark",
    sprite: "gourmand-mark",
  },
  {
    name: "Jumbo Mark",
    sprite: "jumbo-mark",
  },
  {
    name: "Mightiest Mark",
    sprite: "mightiest-mark",
  },
  {
    name: "Mini Mark",
    sprite: "mini-mark",
  },
  {
    name: "Partner Mark",
    sprite: "partner-mark",
  },
  {
    name: "Titan Mark",
    sprite: "titan-mark",
  },
  {
    name: "Alpha Mark",
    sprite: "alpha-mark",
  },
  {
    name: "Lunchtime Mark",
    sprite: "lunchtime-mark",
  },
  {
    name: "Sleepy-Time Mark",
    sprite: "sleepy-time-mark",
  },
  {
    name: "Dusk Mark",
    sprite: "dusk-mark",
  },
  {
    name: "Dawn Mark",
    sprite: "dawn-mark",
  },
  {
    name: "Cloudy Mark",
    sprite: "cloudy-mark",
  },
  {
    name: "Rainy Mark",
    sprite: "rainy-mark",
  },
  {
    name: "Stormy Mark",
    sprite: "stormy-mark",
  },
  {
    name: "Snowy Mark",
    sprite: "snowy-mark",
  },
  {
    name: "Blizzard Mark",
    sprite: "blizzard-mark",
  },
  {
    name: "Sandstorm Mark",
    sprite: "sandstorm-mark",
  },
  {
    name: "Misty Mark",
    sprite: "misty-mark",
  },
  {
    name: "Rare Mark",
    sprite: "rare-mark",
  },
  {
    name: "Uncommon Mark",
    sprite: "uncommon-mark",
  },
  {
    name: "Rowdy Mark",
    sprite: "rowdy-mark",
  },
  {
    name: "Absent-Minded Mark",
    sprite: "absent-minded-mark",
  },
  {
    name: "Jittery Mark",
    sprite: "jittery-mark",
  },
  {
    name: "Excited Mark",
    sprite: "excited-mark",
  },
  {
    name: "Charismatic Mark",
    sprite: "charismatic-mark",
  },
  {
    name: "Calmness Mark",
    sprite: "calmness-mark",
  },
  {
    name: "Intense Mark",
    sprite: "intense-mark",
  },
  {
    name: "Zoned-Out Mark",
    sprite: "zoned-out-mark",
  },
  {
    name: "Joyful Mark",
    sprite: "joyful-mark",
  },
  {
    name: "Angry Mark",
    sprite: "angry-mark",
  },
  {
    name: "Smiley Mark",
    sprite: "smiley-mark",
  },
  {
    name: "Teary Mark",
    sprite: "teary-mark",
  },
  {
    name: "Upbeat Mark",
    sprite: "upbeat-mark",
  },
  {
    name: "Peeved Mark",
    sprite: "peeved-mark",
  },
  {
    name: "Intellectual Mark",
    sprite: "intellectual-mark",
  },
  {
    name: "Ferocious Mark",
    sprite: "ferocious-mark",
  },
  {
    name: "Crafty Mark",
    sprite: "crafty-mark",
  },
  {
    name: "Scowling Mark",
    sprite: "scowling-mark",
  },
  {
    name: "Kindly Mark",
    sprite: "kindly-mark",
  },
  {
    name: "Flustered Mark",
    sprite: "flustered-mark",
  },
  {
    name: "Pumped-Up Mark",
    sprite: "pumped-up-mark",
  },
  {
    name: "Zero Energy Mark",
    sprite: "zeroenergy-mark",
  },
  {
    name: "Prideful Mark",
    sprite: "prideful-mark",
  },
  {
    name: "Unsure Mark",
    sprite: "unsure-mark",
  },
  {
    name: "Humble Mark",
    sprite: "humble-mark",
  },
  {
    name: "Thorny Mark",
    sprite: "thorny-mark",
  },
  {
    name: "Vigor Mark",
    sprite: "vigor-mark",
  },
  {
    name: "Slump Mark",
    sprite: "slump-mark",
  },
];

export default function Marks() {
  return (
    <CollectionCard
      placeholdList={marks}
      dir={"marks"}
      title={"Marks"}
      collectionStr={"mark"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
