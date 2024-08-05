import { useState } from "react";

export default function PokemonImage({
  directory,
  sprite,
  gameSort,
  shiny = false,
  width = "100%",
}) {
  const parentDirectory = shiny ? "pokemon-shiny" : "pokemon";
  const animated = gameSort < 31 ? true : false;
  const imageRendering = gameSort < 21 ? "pixelated" : "auto";

  const fallbacks = animated
    ? [
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/${directory}/${sprite}.png`,
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${parentDirectory}/${sprite}.png`,
      ]
    : [
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${parentDirectory}/${sprite}.png`,
      ];
  const [currentSrc, setCurrentSrc] = useState(
    `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/${directory}${
      animated ? "/animated" : ""
    }/${sprite}.png`
  );
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = () => {
    if (fallbackIndex < fallbacks.length) {
      setCurrentSrc(fallbacks[fallbackIndex]);
      setFallbackIndex(fallbackIndex + 1);
    }
  };

  return (
    <img
      src={currentSrc}
      onError={handleError}
      alt={sprite}
      style={{ width: width, imageRendering: imageRendering }}
    />
  );
}
