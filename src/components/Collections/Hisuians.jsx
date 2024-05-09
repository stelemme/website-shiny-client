// Components imports
import CollectionCard from "./CollectionCard";

const hisuians = [
  {
    name: "Hisuian Growlithe",
    sprite: "growlithe-hisui",
  },
  {
    name: "Hisuian Arcanine",
    sprite: "arcanine-hisui",
  },
  {
    name: "Hisuian Voltorb",
    sprite: "voltorb-hisui",
  },
  {
    name: "Hisuian Electrode",
    sprite: "electrode-hisui",
  },
  {
    name: "Hisuian Typhlosion",
    sprite: "typhlosion-hisui",
  },
  {
    name: "Hisuian Qwilfish",
    sprite: "qwilfish-hisui",
  },
  {
    name: "Hisuian Sneasel",
    sprite: "sneasel-hisui",
  },
  {
    name: "Hisuian Samurott",
    sprite: "samurott-hisui",
  },
  {
    name: "Hisuian Lilligant",
    sprite: "lilligant-hisui",
  },
  {
    name: "Hisuian Zorua",
    sprite: "zorua-hisui",
  },
  {
    name: "Hisuian Zoroark",
    sprite: "zoroark-hisui",
  },
  {
    name: "Hisuian Braviary",
    sprite: "braviary-hisui",
  },
  {
    name: "Hisuian Sliggoo",
    sprite: "sliggoo-hisui",
  },
  {
    name: "Hisuian Goodra",
    sprite: "goodra-hisui",
  },
  {
    name: "Hisuian Avalugg",
    sprite: "avalugg-hisui",
  },
  {
    name: "Hisuian Decidueye",
    sprite: "decidueye-hisui",
  },
];

export default function Hisuians() {
  return (
    <CollectionCard
      placeholdList={hisuians}
      dir={"pokemon-shiny/gen-all-home"}
      title={"Hisuian Forms"}
      collectionStr={"hisui"}
      lg={2}
      sm={3}
      xs={4}
      numbers={false}
    />
  );
}
