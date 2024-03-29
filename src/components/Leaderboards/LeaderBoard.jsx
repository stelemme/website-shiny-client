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

  const StatsDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Grid item xs={12}>
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
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Box
            py="10px"
            px="20px"
            width="100%"
            backgroundColor={colors.primary[500]}
            borderRadius="5px"
          >
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
          </Box>
        </Grid>
      );
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
        <StatsDisplay data={data} loading={loading} />
      </Grid>
    </Box>
  );
}
