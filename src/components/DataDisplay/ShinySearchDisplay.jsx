// Mui
import { Box } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import ShinyCardEvolutions from "../Cards/ShinyCardEvolutions";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function ShinySearchDisplay({ pokemon }) {
  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `search=${pokemon}`
  );

  const data = shinyData?.data;

  return (
    <BoxComponent noContrastColor p="" title={"SHINIES"}>
      <LoadingComponent
        loadingCondition={shinyLoading}
        errorCondition={!shinyData?.data.length}
        errorText="No Pokémons Found"
      >
        {data
          ?.reduce((acc, item) => {
            if (!item.group) {
              acc.push(item);
            } else if (!acc.some((el) => el.group === item.group)) {
              acc.push(item);
            }
            return acc;
          }, [])
          ?.map((item) => {
            return (
              <Box key={item._id} mt={"20px"}>
                <ShinyCardEvolutions
                  id={item._id}
                  name={item.name}
                  gameSprite={item.sprite.game}
                  dir={item.sprite.dir}
                  monSprite={item.sprite.pokemon}
                  trainer={item.trainer}
                  evolutions={item.evolutions}
                  forms={item.forms}
                  group={item.group}
                  imgSize={"40px"}
                  gameImgSize={"22px"}
                />
              </Box>
            );
          })}
      </LoadingComponent>
    </BoxComponent>
  );
}
