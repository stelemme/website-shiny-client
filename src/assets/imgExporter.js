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

export default gameImgPaths;