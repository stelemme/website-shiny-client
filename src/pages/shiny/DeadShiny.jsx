import { useParams } from "react-router-dom";

// Components
import CompleteDeadDisplay from "../../components/DataDisplay/DeadDisplay";

// Hooks
import { useDeadShinyId } from "../../hooks/useData";

export default function DeadShiny() {
  const { deadId } = useParams();

  const { data: shiny, refetch } = useDeadShinyId(deadId);
  const data = shiny?.data;

  return <CompleteDeadDisplay data={data} refetch={refetch} />;
}
