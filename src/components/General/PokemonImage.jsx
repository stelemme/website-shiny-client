import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function PokemonImage({
  directory,
  initSprite,
  gameSort,
  genderDifference,
  backBool,
  shiny = false,
  width = "100%",
}) {
  const [cookies] = useCookies([
    "animatedSpriteDisplayPreGen8",
    "animatedSpriteDisplayPostGen8",
  ]);

  const [parentDir, setParentDir] = useState("pokemon");
  const [dir, setDir] = useState("/" + directory);
  const [animated, setAnimated] = useState("");
  const [back, setBack] = useState(backBool ? "/back" : "");
  const [sprite, setSprite] = useState("/" + initSprite);

  useEffect(() => {
    setParentDir(shiny ? "pokemon-shiny" : "pokemon");
  }, [shiny]);

  useEffect(() => {
    setDir("/" + directory);
  }, [directory]);

  useEffect(() => {
    const shouldAnimate =
      (gameSort < 31 && cookies.animatedSpriteDisplayPreGen8) ||
      cookies.animatedSpriteDisplayPostGen8;
    setAnimated(shouldAnimate ? "/animated" : "");
  }, [gameSort, cookies]);

  useEffect(() => {
    setBack(backBool ? "/back" : "");
  }, [backBool]);

  useEffect(() => {
    setSprite(genderDifference ? `/${initSprite}-f` : `/${initSprite}`);
  }, [initSprite, genderDifference]);

  const imageRendering = gameSort < 29 ? "pixelated" : "auto";

  const handleError = () => {
    if (animated) {
      setAnimated("");
    } else {
      setDir("/gen-all-home");
    }
  };

  console.log(`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDir}${dir}${animated}${back}${sprite}.png`)

  return (
    <img
      src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDir}${dir}${animated}${back}${sprite}.png`}
      onError={handleError}
      alt={`Pokémon sprite of ${initSprite}`}
      style={{ width: width, imageRendering: imageRendering }}
    />
  );
}