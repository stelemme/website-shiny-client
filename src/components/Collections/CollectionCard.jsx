import { useState } from "react";

// mui imports
import { Box, useTheme, Typography, Grid } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function CollectionCard({
  placeholdList,
  trainer,
  setTrainer,
  dir,
  title,
  collectionStr,
  lg,
  sm,
  xs,
  numbers=true,
  imgHeight=(window.innerWidth < 600) ? 50 : 70
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [query, setQuery] = useState("");

  const { data: shinyData } = useShiny(`collection=${collectionStr}${query}`);
  const collectionData = shinyData?.data[0]?.collectionData;

  const handleChange = (e) => {
    if (e.target.value === "All") {
      setQuery("");
      setTrainer("All");
    } else {
      setQuery(`&trainer=${e.target.value}`);
      setTrainer(e.target.value);
    }
  };

  return (
    <Box
      p="20px"
      width="100%"
      backgroundColor={colors.primary[400]}
      borderRadius="5px"
      height="100%"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={"14px"}
        height={"28px"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          {title}
        </Typography>
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={trainer}
        />
      </Box>
      <Grid container spacing={"12px"}>
        {placeholdList.map((item) => {
          return (
            <Grid item key={item.name} lg={lg} sm={sm} xs={xs}>
              <Box
                py="10px"
                px="20px"
                height="100%"
                backgroundColor={colors.primary[500]}
                borderRadius="5px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
              >
                {collectionData && collectionData[item.name] ? (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${dir}/${item.sprite}.png`}
                    style={{
                      imageRendering: "pixelated",
                      height: String(imgHeight) + "px",
                    }}
                  />
                ) : (
                  <img
                    alt=""
                    src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${dir}/${item.sprite}.png`}
                    style={{
                      imageRendering: "pixelated",
                      height: String(imgHeight) + "px",
                      filter: "contrast(0%) brightness(50%)",
                    }}
                  />
                )}
                <Typography fontWeight={"bold"} align="center" fontSize={12} mt={"10px"}>
                  {item.name}
                </Typography>
                {numbers && <Typography variant="h6">
                  {collectionData && collectionData[item.name]
                    ? collectionData[item.name]
                    : 0}
                </Typography>}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
