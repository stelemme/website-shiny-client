const gameImgNames = [
  "blue.png",
  "red.png",
  "yellow.png",
  "gold.png",
  "silver.png",
  "crystal.png",
  "ruby.png",
  "sapphire.png",
  "leafgreen.png",
  "firered.png",
  "emerald.png",
  "diamond.png",
  "pearl.png",
  "platinum.png",
  "heartgold.png",
  "soulsilver.png",
  "black.png",
  "white.png",
  "black-2.png",
  "white-2.png",
  "x.png",
  "y.png",
  "omega-ruby.png",
  "alpha-sapphire.png",
  "sun.png",
  "moon.png",
  "ultra-sun.png",
  "ultra-moon.png",
  "lets-go-pikachu.png",
  "lets-go-eevee.png",
  "sword.png",
  "shield.png",
  "brilliant-diamond.png",
  "shining-pearl.png",
  "legends-arceus.png",
  "scarlet.png",
  "violet.png"
]

const gameImgPaths = gameImgNames.map(fileName => {
  return import(`./games/${fileName}`).then(module => module.default);
});

const medalImgNames = [
  "medal-diamond.png",
  "medal-gold.png",
  "medal-silver.png",
  "medal-bronze.png",
]

const medalImgPaths = medalImgNames.map(fileName => {
  return import(`./medals/${fileName}`).then(module => module.default);
});

const trainerImgNames = [
  /* "Gen 1 - kwakquin.png",
  "Gen 1 - chorneef.png",
  "Gen 1 - siwob.png",
  "Gen 1 - t-loc.png",
  "Gen 2 - kwakquin.png",
  "Gen 2 - chorneef.png",
  "Gen 2 - siwob.png",
  "Gen 2 - t-loc.png",
  "Gen 3 - kwakquin.png",
  "Gen 3 - chorneef.png",
  "Gen 3 - siwob.png",
  "Gen 3 - t-loc.png",
  "Gen 4 - kwakquin.png",
  "Gen 4 - chorneef.png",
  "Gen 4 - siwob.png",
  "Gen 4 - t-loc.png",
  "Gen 5 - kwakquin.png",
  "Gen 5 - chorneef.png",
  "Gen 5 - siwob.png",
  "Gen 5 - t-loc.png", */
  "Gen 6 - kwakquin.png",
  "Gen 6 - chorneef.png",
  "Gen 6 - siwob.png",
  "Gen 6 - t-loc.png",
]

const trainerImgPaths = trainerImgNames.map(fileName => {
  return import(`./trainers/${fileName}`).then(module => module.default);
});

export { gameImgPaths, medalImgPaths, trainerImgPaths };