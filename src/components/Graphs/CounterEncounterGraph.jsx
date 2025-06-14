import { useState } from "react";

// Mui
import {
  useTheme,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { tokens } from "../../theme";

// Recharts
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Functions
import {
  formatEncounterData,
  getMaxEncounters,
  getCumulativeCounts,
} from "../../functions/statFunctions";

export default function CounterEncounterGraph({
  data,
  trainer,
  timeDifference,
  open,
  setOpen,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cumulative, setCumulative] = useState(false);

  let color = "";

  if (trainer === "Joaquin") {
    color = colors.redAccent[500];
  } else if (trainer === "Korneel") {
    color = colors.yellowAccent[500];
  } else if (trainer === "Simon") {
    color = colors.greenAccent[500];
  } else if (trainer === "Stef") {
    color = colors.blueAccent[500];
  }

  const encounterDataDay = formatEncounterData(data?.encounters);
  const encounterData = !cumulative
    ? encounterDataDay
    : getCumulativeCounts(data?.encounters);
  const maxEncounters = getMaxEncounters(encounterDataDay)?.value;

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${new Date(label).toLocaleDateString()}`}</p>
          <p
            style={{ margin: 0, color: payload[0].color }}
          >{`Encounters: ${payload[0].value}`}</p>
          <p style={{ margin: 0, color: payload[0].color }}>{`Time: ${
            timeDifference
              ? new Date(timeDifference * 1000 * payload[0].value)
                  .toISOString()
                  .slice(11, 19)
              : "Undefined"
          }`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle fontWeight={"bold"} variant="h4">
        Encounter Graph
      </DialogTitle>
      <FormGroup
        sx={(theme) => ({
          position: "absolute",
          right: 12,
          top: 12,
        })}
      >
        <FormControlLabel
          control={
            <Switch
              size="small"
              color="default"
              checked={cumulative}
              onChange={() => setCumulative((prevState) => !prevState)}
            />
          }
          label="Cuml."
        />
      </FormGroup>
      <DialogContent width="100%">
        <Box>
          <ResponsiveContainer
            width="100%"
            height={window.innerWidth < 500 ? 300 : 400}
          >
            {!cumulative ? (
              <BarChart
                data={encounterData ? encounterData : []}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: -15,
                  left: !cumulative ? 10 : 20,
                }}
              >
                <XAxis
                  dataKey="date"
                  scale="time"
                  type="number"
                  domain={[
                    (dataMin) => {
                      const previousDay = new Date(dataMin);
                      previousDay.setDate(previousDay.getDate() - 1);
                      return previousDay;
                    },
                    () => new Date(data.endDate).getTime(),
                  ]}
                  tick={false}
                  axisLine={{ stroke: colors.primary[200] }}
                  tickLine={{ stroke: colors.primary[200] }}
                />
                <YAxis
                  dataKey="value"
                  width={25}
                  tick={{ fill: colors.grey[100] }}
                  axisLine={{ stroke: colors.primary[200] }}
                  tickLine={{ stroke: colors.primary[200] }}
                />
                <CartesianGrid stroke={colors.primary[200]} />
                <Tooltip
                  labelStyle={{ color: "black" }}
                  labelFormatter={(value) => {
                    return `${new Date(value).toLocaleDateString()}`;
                  }}
                  payload={[{ time: "test" }]}
                  content={<CustomToolTip />}
                />
                <Bar dataKey="value" fill={color} maxBarSize={200} />
              </BarChart>
            ) : (
              <AreaChart
                data={encounterData ? encounterData : []}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: -15,
                  left: !cumulative ? 10 : 20,
                }}
              >
                <XAxis
                  dataKey="date"
                  scale="time"
                  type="number"
                  domain={[
                    (dataMin) => {
                      const previousDay = new Date(dataMin);
                      previousDay.setDate(previousDay.getDate() - 1);
                      return previousDay;
                    },
                    () => new Date(data.endDate).getTime(),
                  ]}
                  tick={false}
                  axisLine={{ stroke: colors.primary[200] }}
                  tickLine={{ stroke: colors.primary[200] }}
                />
                <YAxis
                  dataKey="value"
                  width={25}
                  tick={{ fill: colors.grey[100] }}
                  axisLine={{ stroke: colors.primary[200] }}
                  tickLine={{ stroke: colors.primary[200] }}
                />
                <CartesianGrid stroke={colors.primary[200]} />
                <Tooltip
                  labelStyle={{ color: "black" }}
                  labelFormatter={(value) => {
                    return `${new Date(value).toLocaleDateString()}`;
                  }}
                  payload={[{ time: "test" }]}
                  content={<CustomToolTip />}
                />
                <Area
                  type={"stepAfter"}
                  dataKey="value"
                  strokeWidth={3}
                  animationDuration={500}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
          {data.encounters.length > 0 && (
            <>
              <Typography fontWeight={"bold"}>Encounters Record</Typography>
              <Typography>
                {maxEncounters} on{" "}
                {new Date(
                  getMaxEncounters(encounterDataDay)?.date
                ).toLocaleDateString("en-BE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                (
                {timeDifference
                  ? new Date(timeDifference * 1000 * maxEncounters)
                      .toISOString()
                      .slice(11, 19)
                  : "Undefined"}
                )
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
