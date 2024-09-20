// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Skeleton,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";

// Components imports
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import GeneralSelect from "../Selects/GeneralSelect";

export default function Leaderboard({
  data,
  dataSubstitute = 0,
  dataAddition = "",
  loading,
  title,
  selectBool,
  selectLabel,
  selectValue,
  handleChange,
  optionList,
  medalList,
  total,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  data =
    data?.length > 0
      ? data
      : [
          { data: 0, trainer: "Joaquin" },

          { data: 0, trainer: "Korneel" },

          { data: 0, trainer: "Simon" },

          { data: 0, trainer: "Stef" },
        ];

  return (
    <BoxComponent>
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
        {selectBool && (
          <GeneralSelect
            label={selectLabel}
            handleChange={handleChange}
            list={optionList}
            value={selectValue}
          />
        )}
      </Box>
      <Grid container spacing={"12px"}>
        <Grid item xs={12}>
          <LoadingComponent
            loadingCondition={loading}
            skeleton={
              <Skeleton
                sx={{
                  bgcolor: colors.primary[500],
                  height: {
                    xs: "228.2px",
                  },
                }}
                variant="rounded"
                width={"100%"}
              />
            }
          >
            <BoxComponent py="10px" px="20px" noContrastColor>
              {data?.map((item, index) => {
                return (
                  <Box key={index}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Box display={"flex"} alignItems="center" gap={"20px"}>
                        <Box
                          display="inline-flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <img height={"30px"} alt="" src={medalList[index]} />
                        </Box>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={14}
                          align="left"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.trainer}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight={"bold"}
                        fontSize={14}
                        align="left"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.data === 0
                          ? dataSubstitute
                          : item.data + dataAddition}
                      </Typography>
                    </Box>
                    {<Divider sx={{ my: 1 }} />}
                  </Box>
                );
              })}
              <Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box display={"flex"} alignItems="center" gap={"20px"}>
                    <Box
                      display="inline-flex"
                      justifyContent="center"
                      alignItems="center"
                      width={"30px"}
                    ></Box>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={14}
                      align="left"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      TOTAL
                    </Typography>
                  </Box>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={14}
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {total}
                  </Typography>
                </Box>
              </Box>
            </BoxComponent>
          </LoadingComponent>
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
