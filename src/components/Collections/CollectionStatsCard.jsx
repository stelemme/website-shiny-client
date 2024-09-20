import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// mui imports
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import UserSelect from "../Selects/UserSelect";
import PercentageChart from "../Graphs/PercentageChart";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function CollectionStatsCard({
  placeholdList,
  title,
  collectionStr,
  additionalCollectionStr = null,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const foreverDate = new Date("9999-12-31T23:59:59");
  const [cookies, setCookies] = useCookies(["collectionUserSelect"]);

  const [query, setQuery] = useState("");
  const [graphColor, setGraphColor] = useState(colors.purpleAccent[500]);

  const { data: shinyData } = useShiny(
    `collection=${collectionStr}${query}${
      additionalCollectionStr
        ? `&collectionFilter=${additionalCollectionStr}`
        : ""
    }`
  );
  const collectionData = shinyData?.data[0]?.collectionData;

  useEffect(() => {
    if (cookies.collectionUserSelect === "All") {
      setQuery("");
    } else {
      setQuery(`&trainer=${cookies.collectionUserSelect}`);
    }

    if (cookies.collectionUserSelect === "Joaquin") {
      setGraphColor(colors.redAccent[500]);
    } else if (cookies.collectionUserSelect === "Korneel") {
      setGraphColor(colors.yellowAccent[500]);
    } else if (cookies.collectionUserSelect === "Simon") {
      setGraphColor(colors.greenAccent[500]);
    } else if (cookies.collectionUserSelect === "Stef") {
      setGraphColor(colors.blueAccent[500]);
    } else if (cookies.collectionUserSelect === "All") {
      setGraphColor(colors.purpleAccent[500]);
    }
  }, [cookies.collectionUserSelect, colors]);

  const handleChange = (e) => {
    setCookies("collectionUserSelect", e.target.value, {
      expires: foreverDate,
    });
    if (e.target.value === "All") {
      setQuery("");
    } else {
      setQuery(`&trainer=${e.target.value}`);
    }
  };

  const totalNumber = placeholdList.length;
  const completedNumber = Object.keys(
    collectionData ? collectionData : {}
  ).length;
  const percentage = (completedNumber / totalNumber) * 100;

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
          {title} - ({completedNumber}/{totalNumber}, {Math.round(percentage)}%)
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={cookies.collectionUserSelect}
        />
      </Box>
      <PercentageChart
        data={[
          { name: "completed", value: completedNumber },
          { name: "unCompleted", value: totalNumber - completedNumber },
        ]}
        graphColor={graphColor}
      />
    </Box>
  );
}
