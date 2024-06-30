// Mui
import { useTheme, Box, Typography } from "@mui/material";
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
} from "recharts";

// Functions
import {
  formatEncounterData,
  getMaxEncounters,
} from "../../functions/statFunctions";

export default function CounterEncounterGraph({
  data,
  trainer,
  timeDifference,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const encounterData = formatEncounterData(data?.encounters);
  const maxEncounters = getMaxEncounters(encounterData)?.value;

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
    <Box>
      <ResponsiveContainer
        width="100%"
        height={window.innerWidth < 500 ? 300 : 400}
      >
        <BarChart
          data={encounterData ? encounterData : []}
          margin={{
            top: 0,
            right: 0,
            bottom: -15,
            left: 10,
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
      </ResponsiveContainer>
      {data.encounters.length > 0 && (
        <>
          <Typography fontWeight={"bold"}>Encounters Record</Typography>
          <Typography>
            {maxEncounters} on{" "}
            {new Date(getMaxEncounters(encounterData)?.date).toLocaleDateString(
              "en-BE",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}{" "}
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
  );
}
