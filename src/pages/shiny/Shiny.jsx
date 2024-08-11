import { useParams } from "react-router-dom";

// Mui
import { Box, Typography } from "@mui/material";

// Components
import CompleteShinyCard from "../../components/DataDisplay/ShinyDisplay";

// Hooks
import { useShinyId, useShiny } from "../../hooks/useData";

export default function Shiny() {
  const { shinyId } = useParams();

  const { data: shiny, refetch } = useShinyId(shinyId);
  const data = shiny?.data;

  const { data: groupShiniesData, refetch: refetch2 } = useShiny(
    `groups=pokemon&group=${data?.group}`
  );
  const groupShinies = groupShiniesData?.data;

  console.log(data);

  return data?.group ? (
    <>
      {groupShinies?.map((item, index) => (
        <CompleteShinyCard
          key={item._id}
          data={item}
          refetch={refetch}
          count={groupShinies?.length}
          index={index}
        />
      ))}
    </>
  ) : (
    <CompleteShinyCard data={data} refetch={refetch2} />
  );
}
