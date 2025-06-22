import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// mui imports
import { Button, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import BoxComponent from "../../components/General/BoxComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import CompleteShinyCard from "../../components/DataDisplay/ShinyDisplay";

// Hooks
import { useShinyId, useShiny } from "../../hooks/useData";

// Functions
import { findPrevNextById } from "../../functions/statFunctions";

export default function Shiny() {
  const { shinyId } = useParams();
  const navigate = useNavigate();
  const [cookie] = useCookies(["sortShiny", "filterEvolutions"]);
  const [previousId, setPreviousId] = useState(null);
  const [nextId, setNextId] = useState(null);

  const { data: shiny, refetch } = useShinyId(shinyId);
  const data = shiny?.data;

  const {
    isLoading: shinyLoading,
    data: groupShiniesData,
    refetch: refetch2,
  } = useShiny(`groups=pokemon&group=${data?.group}`);
  const groupShinies = groupShiniesData?.data;

  const { isLoading: shinyIdsLoading, data: shinyIdData } = useShiny(
    `sort=${cookie.sortShiny}${
      cookie.filterEvolutions ? "&list=evolution" : "&preview=onlyId"
    }`,
    true
  );

  useEffect(() => {
    if (!shinyIdsLoading && shinyIdData?.data) {
      const IdResult = findPrevNextById(shinyIdData.data, shinyId);
      setPreviousId(IdResult.prev);
      setNextId(IdResult.next);
    }
  }, [shinyIdsLoading, shinyIdData, shinyId]);

  console.log(data);

  return (
    <>
      <Box maxWidth={{ sm: "420px" }} mx="auto">
        <Box mx="20px" display="flex" justifyContent="space-between">
          <Button
            variant="secondary"
            startIcon={<ArrowBackIosIcon />}
            disabled={!previousId}
            onClick={() => {
              if (previousId) {
                navigate(`/shiny/${previousId._id}`);
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            endIcon={<ArrowForwardIosIcon />}
            disabled={!nextId}
            onClick={() => {
              if (nextId) {
                navigate(`/shiny/${nextId._id}`);
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
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
          <CompleteShinyCard key={data?._id} data={data} refetch={refetch2} />
        )}
      </LoadingComponent>
    </>
  );
}
