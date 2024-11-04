import { useParams } from "react-router-dom";

// Components
import BoxComponent from "../../components/General/BoxComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import CompleteShinyCard from "../../components/DataDisplay/ShinyDisplay";

// Hooks
import { useShinyId, useShiny } from "../../hooks/useData";

export default function Shiny() {
  const { shinyId } = useParams();

  const { data: shiny, refetch } = useShinyId(shinyId);
  const data = shiny?.data;

  const {
    isLoading: shinyLoading,
    data: groupShiniesData,
    refetch: refetch2,
  } = useShiny(`groups=pokemon&group=${data?.group}`);
  const groupShinies = groupShiniesData?.data;

  console.log(data);

  return (
    <LoadingComponent
      loadingCondition={shinyLoading}
      skeleton={
        <BoxComponent colored={false}>
          <LoadingComponent loadingCondition={shinyLoading} />
        </BoxComponent>
      }
    >
      {data?.group ? (
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
      )}
    </LoadingComponent>
  );
}
