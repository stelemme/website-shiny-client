import { Fragment } from "react";

// Mui
import { Typography, Box } from "@mui/material";

// Components
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
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="21px"
      >
        <Typography variant="h5" fontWeight={"bold"}>
          COUNTERS
        </Typography>
      </Box>
      <LoadingComponent
        loadingCondition={shinyLoading && counterLoading}
        errorCondition={!shinyData?.data.length && !counterData?.data.length}
        errorText="No Counters Found"
      >
        {data
          .reduce((acc, item) => {
            if (!item?.group) {
              acc.push(item);
            } else if (!acc.some((el) => el.group === item?.group)) {
              acc.push(item);
            }
            return acc;
          }, [])
          .map((item) => {
            if (!item?._id || item?.totalEncounters === 0) {
              return null;
            }
            return (
              <Fragment key={item?._id}>
                <Box mt={"20px"}>
                  <CounterCard
                    id={item._id}
                    name={item.name}
                    gameSprite={item.sprite.game}
                    count={item?.totalEncounters}
                    trainer={item.trainer}
                    query={item.origin ? "" : "?completed=true"}
                  />
                </Box>
              </Fragment>
            );
          })}
      </LoadingComponent>
    </>
  );
}
