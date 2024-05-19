import { useParams } from "react-router-dom";

// Components
import CompleteDeadCard from "../../components/DataDisplay/DeadDisplay";

// Hooks
import { useDeadShinyId } from "../../hooks/useData";

export default function ShinyDeadId() {
  const { deadId } = useParams();

  const { data: shiny, refetch } = useDeadShinyId(deadId);
  const data = shiny?.data;

  return <CompleteDeadCard data={data} refetch={refetch} />;
}
