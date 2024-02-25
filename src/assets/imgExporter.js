function importAll(r) {
  let images = {};
  r.keys().forEach(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

const gameImages = importAll(require.context('./games', false, /\.png$/));
const trainerImages = importAll(require.context('./trainers', false, /\.png$/));
const medalImages = importAll(require.context('./medals', false, /\.png$/));
const natureImages = importAll(require.context('./natures', false, /\.png$/));

export { gameImages, trainerImages, medalImages, natureImages };