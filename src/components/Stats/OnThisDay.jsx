// mui imports
import { Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { tokens } from "../../theme";

// Components
import BoxComponent from "../General/BoxComponent";
import LoadingComponent from "../General/LoadingComponent";
import ShinyCard from "../Cards/ShinyCard";

// Hooks
import { useShiny } from "../../hooks/useData";

// Functions
import { formatDateToString } from "../../functions/statFunctions";

export default function OnThisDay() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = formatDateToString(new Date());

  const { isLoading: dataLoading, data: shinyStats } = useShiny(
    `list=yearsAgo&timezone=${timezone}&date=${today}`
  );

  const data = shinyStats?.data;

  return (
    <BoxComponent title={"ON THIS DAY"}>
      <LoadingComponent
        loadingCondition={dataLoading}
        skeleton={
          <Skeleton
            sx={{
              bgcolor: colors.primary[500],
            }}
            variant="rounded"
            width={"100%"}
            height={"400px"}
          />
        }
      >
        <Grid container spacing={2}>
          {data?.map((item) => {
            return (
              <Grid item xs={12} key={item?.year}>
                <Typography variant="h6" fontWeight={"bold"} mb={"10px"}>
                  {item.year}
                </Typography>
                <Grid container spacing={2}>
                  {item?.mons
                    .reduce((acc, item) => {
                      if (!item.group) {
                        acc.push(item);
                      } else if (!acc.some((el) => el.group === item.group)) {
                        acc.push(item);
                      }
                      return acc;
                    }, [])
                    .map((item2) => {
                      return (
                        <Grid item xs={12} key={item2?._id}>
                          <ShinyCard
                            id={item2?._id}
                            name={item2?.name}
                            gameSprite={item2?.sprite.game}
                            dir={item2?.sprite.dir}
                            monSprite={item2?.sprite.pokemon}
                            trainer={item2?.trainer}
                            bgColor={500}
                            imgSize={52}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            );
          })}
          {data?.length === 0 && (
            <Grid item xs={12}>
              <BoxComponent noContrastColor>
                <Typography variant="h6" fontWeight={"bold"}>
                  There are no shinies caught yet on this day...
                </Typography>
              </BoxComponent>
            </Grid>
          )}
        </Grid>
      </LoadingComponent>
    </BoxComponent>
  );
}
