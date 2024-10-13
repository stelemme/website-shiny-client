export function isValidGeospatialCoordinates(coords) {
  // Check if the input is an array with exactly 2 elements
  if (!Array.isArray(coords) || coords.length !== 2) {
      return false;
  }

  const [lat, long] = coords;

  // Check if latitude is a number between -90 and 90
  const isValidLat = typeof lat === 'number' && lat >= -90 && lat <= 90;

  // Check if longitude is a number between -180 and 180
  const isValidLong = typeof long === 'number' && long >= -180 && long <= 180;

  return isValidLat && isValidLong;
}