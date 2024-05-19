import { useParams } from "react-router-dom";

// Components
import CompleteShinyCard from "../../components/DataDisplay/ShinyDisplay";

// Hooks
import { useShinyId, useShiny } from "../../hooks/useData";

export default function ShinyId() {
  const { shinyId } = useParams();

  const { data: shiny, refetch } = useShinyId(shinyId);
  const data = shiny?.data;

  const { data: groupShiniesData, refetch: refetch2 } = useShiny(
    `groupShiniesPokemons=${data?.group}`
  );
  const groupShinies = groupShiniesData?.data;

  return data?.group ? (
    groupShinies?.map((item) => (
      <CompleteShinyCard key={item._id} data={item} refetch={refetch} />
    ))
  ) : (
    <CompleteShinyCard data={data} refetch={refetch2} />
  );
}
