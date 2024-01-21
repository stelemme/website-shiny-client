import { useState } from "react";
import { useParams } from "react-router-dom";

// mui imports
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import Header from "../../components/Header";
import UserSelect from "../../components/Selects/UserSelect";

// Images
import { trainerImages } from "../../assets/imgExporter";

export default function User() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { trainer } = useParams();
  const [trainerChoice, setTrainerChoice] = useState(trainer);

  const imageCheck = {
    Joaquin: "kwakquin",
    Korneel: "chorneef",
    Simon: "siwob",
    Stef: "t-loc",
  };

  const handleChange = (e) => {
    setTrainerChoice(e.target.value);
  };

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          mb={{ xs: "20px", md: "0px" }}
        >
          <Header
            title={`${trainerChoice.toLocaleUpperCase()}'S TRAINER PAGE`}
            subtitle={`Here you can view and change trainer specific data.`}
          />
          <UserSelect
            label={"User"}
            handleChange={handleChange}
            defaultValue={trainerChoice}
            addAll={false}
          />
        </Box>
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
              TRAINER SPRITES
            </Typography>
          </Box>
          <Box
            p="10px"
            width="100%"
            backgroundColor={colors.primary[500]}
            borderRadius="5px"
          >
            <Grid container>
              {Object.keys(trainerImages).map((item) => {
                if (item.includes(imageCheck[trainerChoice])) {
                  return (
                    <Grid item xs={2.4} key={item}>
                      <img
                        height={"100px"}
                        alt=""
                        src={trainerImages[item]}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          imageRendering: "pixelated",
                        }}
                      />
                    </Grid>
                  );
                } else {
                  return null;
                }
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
