// mui imports
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Skeleton,
  Divider,
  Tooltip,
} from "@mui/material";
import { tokens } from "../../theme";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Components imports
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import GeneralSelect from "../Selects/GeneralSelect";

// Functions
import { formatTime } from "../../functions/statFunctions";

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
  total = null,
  timeValue = false,
  timeToolTip = "",
  onlineIcons = false,
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
    <BoxComponent
      title={title}
      select={
        selectBool && (
          <GeneralSelect
            label={selectLabel}
            handleChange={handleChange}
            list={optionList}
            value={selectValue}
          />
        )
      }
    >
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
                          variant="h6"
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
                      <Box
                        display="flex"
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        {timeValue && (
                          <Tooltip title={timeToolTip}>
                            <Typography
                              fontWeight={"bold"}
                              variant="h6"
                              align="left"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatTime(item?.dataTime, false)}
                            </Typography>
                          </Tooltip>
                        )}
                        <Box width="70px">
                          <Typography
                            textAlign={"right"}
                            fontWeight={"bold"}
                            variant="h6"
                            align="left"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.data === 0 || !item.data
                              ? dataSubstitute
                              : item.data + dataAddition}
                            {onlineIcons && (
                              <>
                                {item.dataTime < 300 ? (
                                  <CheckCircleOutlineIcon
                                    sx={{ color: colors.greenAccent[400] }}
                                  />
                                ) : (
                                  <CancelOutlinedIcon
                                    sx={{ color: colors.grey[300] }}
                                  />
                                )}
                              </>
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {<Divider sx={{ my: 1 }} />}
                  </Box>
                );
              })}
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
                    variant="h6"
                    align="left"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    color={total ? "inherit" : "primary"}
                  >
                    TOTAL
                  </Typography>
                </Box>
                <Typography
                  fontWeight={"bold"}
                  variant="h6"
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
            </BoxComponent>
          </LoadingComponent>
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
