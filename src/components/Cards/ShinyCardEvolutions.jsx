import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// mui imports
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";

// Hooks
import { useShiny } from "../../hooks/useData";

function makeUnique(array, propertyName) {
  let seen = new Set();
  return array.filter((item) => {
    let propertyValue = item[propertyName];
    return seen.has(propertyValue) ? false : seen.add(propertyValue);
  });
}

export default function ShinyCardEvolutions({
  id,
  name,
  gameSprite,
  dir,
  monSprite,
  trainer,
  evolutions,
  forms,
  group,
  bgColor = 400,
  imgSize = window.innerWidth < 600 ? "40px" : "80px",
  gameImgSize = window.innerWidth < 600 ? "22px" : "33px",
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [cookies] = useCookies(["groupShinies", "gameSpriteDisplay"]);

  let trainerHeight = "100%";
  if (trainer) {
    trainerHeight = "50";
  }

  const { data: groupData } = useShiny(`groups=evolutions&group=${group}`);

  if (cookies.groupShinies && groupData?.data[0]?.evolutions) {
    evolutions = makeUnique(groupData?.data[0]?.evolutions, "name");

    evolutions.sort((a, b) => a.pokedexNo - b.pokedexNo);
  }

  const onCardClick = () => {
    navigate(`/shiny/${id}`);
  };

  return (
    <BoxComponent
      p="10px"
      noContrastColor={bgColor === 400 ? false : true}
      onClick={onCardClick}
    >
      <Box display="flex" alignItems="center">
        {/* GAME IMAGE */}
        <Box
          display="inline-flex"
          width={window.innerWidth < 600 ? "60px" : "90px"}
          minWidth={window.innerWidth < 600 ? "60px" : "90px"}
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt=""
            src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${gameSprite}.png`}
            height={gameImgSize}
          />
        </Box>
        {/* COUNTER NAME */}
        <Box
          width={window.innerWidth < 600 ? "80px" : "100px"}
          minWidth={window.innerWidth < 600 ? "80px" : "100px"}
          mx="15px"
          overflow="hidden"
        >
          <Typography
            fontWeight={"bold"}
            color={colors.grey[400]}
            fontSize={window.innerWidth < 600 ? 10 : 12}
          >
            {trainer}
          </Typography>
          <Box display="flex" alignItems="center" height={trainerHeight}>
            <Typography
              fontWeight={"bold"}
              variant="h5"
              align="left"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              fontSize={window.innerWidth < 600 ? 12 : 14}
            >
              {name}
            </Typography>
          </Box>
        </Box>

        {/* SHINY SPRITE */}
        <Box display="flex" overflow="auto">
          <Box display="flex" alignItems="center" justifyContent="center">
            {cookies.gameSpriteDisplay && (
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${monSprite}.png`}
                height={imgSize}
              />
            )}
            {!cookies.gameSpriteDisplay && (
              <img
                alt=""
                src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${dir}/${monSprite}.png`}
                height={imgSize}
                style={{ imageRendering: "pixelated" }}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${monSprite}.png`;
                }}
              />
            )}
          </Box>
          {evolutions.map((evolution) => {
            return (
              <Box
                key={evolution._id}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cookies.gameSpriteDisplay && (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${evolution.sprite}.png`}
                    height={imgSize}
                  />
                )}
                {!cookies.gameSpriteDisplay && (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${dir}/${evolution.sprite}.png`}
                    height={imgSize}
                    style={{ imageRendering: "pixelated" }}
                    onError={(e) => {
                      e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${evolution.sprite}.png`;
                    }}
                  />
                )}
              </Box>
            );
          })}
          {forms.map((form) => {
            return (
              <Box
                key={form._id}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cookies.gameSpriteDisplay && (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${form.sprite}.png`}
                    height={imgSize}
                  />
                )}
                {!cookies.gameSpriteDisplay && (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${dir}/${form.sprite}.png`}
                    height={imgSize}
                    style={{ imageRendering: "pixelated" }}
                    onError={(e) => {
                      e.target.src = `https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${form.sprite}.png`;
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </BoxComponent>
  );
}
