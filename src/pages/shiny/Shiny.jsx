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
      <Box maxWidth={{ sm: "420px" }} mx="auto" my="20px">
        <Box display="flex" flexDirection="column" mx="20px">
          <Typography variant="h5" fontWeight="bold">#Radar shinies: {groupShinies?.length ? groupShinies?.length : "..."} </Typography>
        </Box>
      </Box>
      {groupShinies?.map((item) => (
        <CompleteShinyCard key={item._id} data={item} refetch={refetch} />
      ))}
    </>
  ) : (
    <CompleteShinyCard data={data} refetch={refetch2} />
  );
}
