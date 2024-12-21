import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

// Recoil
import { useRecoilValue } from "recoil";
import { backToggle } from "../../utils/atoms";

export default function PokemonImage({
  directory,
  initSprite,
  gameSort,
  genderDifference,
  shiny = false,
}) {
  const [cookies] = useCookies([
    "displayAnimatedSpritesPreGen8",
    "displayAnimatedSpritesPostGen8",
  ]);
  const backBool = useRecoilValue(backToggle);

  const [parentDir, setParentDir] = useState("pokemon");
  const [dir, setDir] = useState("/" + directory);
  const [animated, setAnimated] = useState("");
  const [back, setBack] = useState(backBool && gameSort <= 20 ? "/back" : "");
  const [sprite, setSprite] = useState("/" + initSprite);

  useEffect(() => {
    setParentDir(shiny ? "pokemon-shiny" : "pokemon");
  }, [shiny]);

  useEffect(() => {
    setDir("/" + directory);
  }, [directory]);

  useEffect(() => {
    const shouldAnimate =
      (gameSort < 31 && cookies.displayAnimatedSpritesPreGen8) ||
      cookies.displayAnimatedSpritesPostGen8;
    setAnimated(shouldAnimate ? "/animated" : "");
  }, [gameSort, cookies, backBool]);

  useEffect(() => {
    setBack(backBool && gameSort <= 20 ? "/back" : "");
  }, [backBool, gameSort]);

  useEffect(() => {
    setSprite(genderDifference ? `/${initSprite}-f` : `/${initSprite}`);
  }, [initSprite, genderDifference]);

  const imageRendering = gameSort < 29 ? "pixelated" : "auto";

  const handleError = (e) => {
    console.error(
      `Image failed to load https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDir}${dir}${animated}${back}${sprite}.png):`,
      e
    );

    if (animated) {
      setAnimated("");
    } else {
      setDir("/gen-all-home");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        paddingTop: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${parentDir}${dir}${animated}${back}${sprite}.png`}
        onError={handleError}
        alt={`Pokémon sprite of ${initSprite}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxHeight: "100%",
          imageRendering: imageRendering,
        }}
      />
    </div>
  );
}
