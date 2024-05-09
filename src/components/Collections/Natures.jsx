// Components imports
import CollectionCard from "./CollectionCard";

const natures = [
  {
    name: "Hardy",
    sprite: "hardy",
  },
  {
    name: "Lonely",
    sprite: "lonely",
  },
  {
    name: "Adamant",
    sprite: "adamant",
  },
  {
    name: "Naughty",
    sprite: "naughty",
  },
  {
    name: "Brave",
    sprite: "brave",
  },
  {
    name: "Bold",
    sprite: "bold",
  },
  {
    name: "Docile",
    sprite: "docile",
  },
  {
    name: "Impish",
    sprite: "impish",
  },
  {
    name: "Lax",
    sprite: "lax",
  },
  {
    name: "Relaxed",
    sprite: "relaxed",
  },
  {
    name: "Modest",
    sprite: "modest",
  },
  {
    name: "Mild",
    sprite: "mild",
  },
  {
    name: "Bashful",
    sprite: "bashful",
  },
  {
    name: "Rash",
    sprite: "rash",
  },
  {
    name: "Quiet",
    sprite: "quiet",
  },
  {
    name: "Calm",
    sprite: "calm",
  },
  {
    name: "Gentle",
    sprite: "gentle",
  },
  {
    name: "Careful",
    sprite: "careful",
  },
  {
    name: "Quirky",
    sprite: "quirky",
  },
  {
    name: "Sassy",
    sprite: "sassy",
  },
  {
    name: "Timid",
    sprite: "timid",
  },
  {
    name: "Hasty",
    sprite: "hasty",
  },
  {
    name: "Jolly",
    sprite: "jolly",
  },
  {
    name: "Naive",
    sprite: "naive",
  },
  {
    name: "Serious",
    sprite: "serious",
  },
];

export default function Natures() {
  return (
    <CollectionCard
      placeholdList={natures}
      dir={"natures"}
      title={"Natures"}
      collectionStr={"nature"}
      lg={2.4}
      sm={2.4}
      xs={4}
      imgHeight={40}
    />
  );
}
