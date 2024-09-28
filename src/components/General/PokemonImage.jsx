import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function PokemonImage({
  directory,
  sprite,
  gameSort,
  genderDifference,
  shiny = false,
  back = false,
  width = "100%",
}) {
  const [cookies] = useCookies([
    "animatedSpriteDisplayPreGen8",
    "animatedSpriteDisplayPostGen8",
  ]);

  if (genderDifference) {
    sprite += "-f";
  }

  if (back) {
    sprite = "back/" + sprite;
  }

  const parentDirectory = shiny ? "pokemon-shiny" : "pokemon";
  const animated =
    gameSort < 31 && cookies.animatedSpriteDisplayPreGen8
      ? true
      : cookies.animatedSpriteDisplayPostGen8
      ? true
      : false;

  const imageRendering = gameSort < 29 ? "pixelated" : "auto";

  const fallbacks = animated
    ? [
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/${directory}/${sprite}.png`,
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/gen-all-home/${sprite}.png`,
      ]
    : [
        `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/gen-all-home/${sprite}.png`,
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

  useEffect(() => {
    setCurrentSrc(
      `https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDirectory}/${directory}${
        animated ? "/animated" : ""
      }/${sprite}.png`
    );
  }, [parentDirectory, directory, animated, sprite]);

  return (
    <img
      src={currentSrc}
      onError={handleError}
      alt={sprite}
      style={{ width: width, imageRendering: imageRendering }}
    />
  );
}
