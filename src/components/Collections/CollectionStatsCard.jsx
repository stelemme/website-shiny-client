// mui imports
import { Box, Typography, Grid } from "@mui/material";

// Components imports
import BoxComponent from "../General/BoxComponent";
import PercentageBarChart from "../Graphs/PercentageBarChart";
import ComingSoon from "../General/ComingSoon";

// Hooks
import { useShiny } from "../../hooks/useData";

// Functions
import { calculateCollectionPercentage } from "../../functions/statFunctions";

export default function CollectionStatsCard({
  placeholdList,
  title,
  collectionStr,
  additionalCollectionStr = null,
}) {
  const totalNumber = placeholdList.length;

  const { data: allShinyData } = useShiny(
    `collection=${collectionStr}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );
  const { data: joaquinShinyData } = useShiny(
    `trainer=Joaquin&collection=${collectionStr}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );
  const { data: korneelShinyData } = useShiny(
    `trainer=Korneel&collection=${collectionStr}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );
  const { data: simonShinyData } = useShiny(
    `trainer=Simon&collection=${collectionStr}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );
  const { data: stefShinyData } = useShiny(
    `trainer=Stef&collection=${collectionStr}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );

  const graphData = [
    {
      name: "Joaquin",
      percentage: calculateCollectionPercentage(
        totalNumber,
        joaquinShinyData?.data[0]?.collectionData
      ),
    },
    {
      name: "Korneel",
      percentage: calculateCollectionPercentage(
        totalNumber,
        korneelShinyData?.data[0]?.collectionData
      ),
    },
    {
      name: "Simon",
      percentage: calculateCollectionPercentage(
        totalNumber,
        simonShinyData?.data[0]?.collectionData
      ),
    },
    {
      name: "Stef",
      percentage: calculateCollectionPercentage(
        totalNumber,
        stefShinyData?.data[0]?.collectionData
      ),
    },
    {
      name: "All",
      percentage: calculateCollectionPercentage(
        totalNumber,
        allShinyData?.data[0]?.collectionData
      ),
    },
  ];

  return (
    <BoxComponent tabs>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
        height={"28px"}
      >
        <Typography
          variant={window.innerWidth < 600 ? "h6" : "h4"}
          fontWeight={"bold"}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PercentageBarChart graphData={graphData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ComingSoon />
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
