// mui imports
import { Box, useTheme, Typography, Grid } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import PercentageBarChart from "../Graphs/PercentageBarChart";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    <Box
      p="20px"
      width="100%"
      backgroundColor={colors.primary[400]}
      height="100%"
      sx={{ borderRadius: { xs: "0px 0px 5px 5px", sm: "0px 5px 5px 5px" } }}
    >
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
      <Grid container>
        <Grid item xs={4}>
          <PercentageBarChart graphData={graphData} />
        </Grid>
      </Grid>
    </Box>
  );
}
