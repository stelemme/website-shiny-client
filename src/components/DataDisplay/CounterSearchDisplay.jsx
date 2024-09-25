// Mui
import { Box } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import CounterCard from "../Cards/CounterCard";

// Hooks
import { useShiny, useCounter } from "../../hooks/useData";

export default function CounterSearchDisplay({ pokemon }) {
  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `search=${pokemon}`
  );
  const { isLoading: counterLoading, data: counterData } = useCounter(
    `search=${pokemon}`
  );

  const data = shinyData?.data.concat(counterData?.data);

  return (
    <BoxComponent noContrastColor p="" title={"COUNTERS"}>
      <LoadingComponent
        loadingCondition={shinyLoading && counterLoading}
        errorCondition={!shinyData?.data.length && !counterData?.data.length}
        errorText="No Counters Found"
      >
        {data
          ?.reduce((acc, item) => {
            if (!item?.group) {
              acc.push(item);
            } else if (!acc.some((el) => el.group === item?.group)) {
              acc.push(item);
            }
            return acc;
          }, [])
          ?.map((item) => {
            if (!item?._id || item?.totalEncounters === 0) {
              return null;
            }
            return (
              <Box mt={"20px"} key={item?._id}>
                <CounterCard
                  id={item._id}
                  name={item.name}
                  gameSprite={item.sprite.game}
                  count={item?.totalEncounters}
                  trainer={item.trainer}
                  query={item.origin ? "" : "?completed=true"}
                />
              </Box>
            );
          })}
      </LoadingComponent>
    </BoxComponent>
  );
}
