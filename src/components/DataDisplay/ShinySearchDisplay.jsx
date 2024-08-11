// Mui
import { Typography, Box } from "@mui/material";

// Components
import ShinyCardEvolutions from "../Cards/ShinyCardEvolutions";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function ShinySearchDisplay({ pokemon }) {
  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `search=${pokemon}`
  );

  const ShinyDisplay = ({ data, loading, error, text }) => {
    if (loading) {
      return (
        <Typography variant="h5" mt={"20px"}>
          Loading ...
        </Typography>
      );
    } else if (error) {
      return (
        <Typography variant="h5" mt={"20px"}>
          No {text} Found
        </Typography>
      );
    } else {
      const uniqueData = data?.reduce((acc, item) => {
        if (!item.group) {
          acc.push(item);
        } else if (!acc.some((el) => el.group === item.group)) {
          acc.push(item);
        }
        return acc;
      }, []);

      return uniqueData?.map((item) => {
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
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="21px"
      >
        <Typography variant="h5" fontWeight={"bold"}>
          SHINIES
        </Typography>
      </Box>
      <ShinyDisplay
        data={shinyData?.data}
        loading={shinyLoading}
        error={!shinyData?.data.length}
        text={"Pokémons"}
      />
    </>
  );
}
