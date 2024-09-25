import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// mui imports
import { Box, Typography, Grid } from "@mui/material";

// Components imports
import BoxComponent from "../General/BoxComponent";
import UserSelect from "../Selects/UserSelect";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function CollectionCard({
  placeholdList,
  dir,
  title,
  collectionStr,
  lg,
  sm,
  xs,
  numbers = true,
  imgHeight = window.innerWidth < 600 ? 50 : 70,
  additionalCollectionStr = null,
}) {
  const foreverDate = new Date("9999-12-31T23:59:59");
  const [cookies, setCookies] = useCookies(["collectionUserSelect"]);

  const [query, setQuery] = useState("");

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
  }, [cookies.collectionUserSelect]);

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

  return (
    <BoxComponent
      tabs
      title={title}
      select={
        <UserSelect
          label={"User"}
          handleChange={handleChange}
          defaultValue={cookies.collectionUserSelect}
        />
      }
    >
      <Grid container spacing={"12px"}>
        {placeholdList.map((item) => {
          return (
            <Grid item key={item.name} lg={lg} sm={sm} xs={xs}>
              <BoxComponent py="10px" px="20px" noContrastColor>
                <Box
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
                  <Typography
                    fontWeight={"bold"}
                    align="center"
                    fontSize={12}
                    mt={"10px"}
                  >
                    {item.name}
                  </Typography>
                  {numbers && (
                    <Typography variant="h6">
                      {collectionData && collectionData[item.name]
                        ? collectionData[item.name]
                        : 0}
                    </Typography>
                  )}
                </Box>
              </BoxComponent>
            </Grid>
          );
        })}
      </Grid>
    </BoxComponent>
  );
}
