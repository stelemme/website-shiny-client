import { useNavigate } from "react-router-dom";

// Mui
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

// Components
import Header from "../../components/Header";

// Functions
import { formatTime, formatSeconds } from "../../functions/statFunctions";

// Hooks
import useAxios from "axios-hooks";

const columns = [
  {
    field: "pokedexNo",
    headerClassName: "theme-header",
    type: "number",
    headerName: "No.",
    width: 50,
    disableColumnMenu: true,
  },
  {
    field: "name",
    headerClassName: "theme-header",
    headerName: "Pokémon Name",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "trainer",
    headerClassName: "theme-header",
    headerName: "Trainer",
    width: 70,
  },
  {
    field: "nature",
    headerClassName: "theme-header",
    headerName: "Nature",
    width: 70,
  },
  {
    field: "gender",
    headerClassName: "theme-header",
    valueGetter: (params) => {
      if (params.value === "female") {
        return "♀";
      } else if (params.value === "male") {
        return "♂";
      } else {
        return "-";
      }
    },
    headerName: "⚥",
    width: 30,
    disableColumnMenu: true,
  },
  {
    field: "level",
    headerClassName: "theme-header",
    headerName: "Lvl.",
    width: 30,
    disableColumnMenu: true,
  },
  {
    field: "startDate",
    headerClassName: "theme-header",
    valueGetter: (params) => {
      const dateValue = params.value;
      if (!dateValue) {
        return null;
      }
      return new Date(dateValue);
    },
    type: "date",
    headerName: "Start Date",
    width: 80,
  },
  {
    field: "endDate",
    headerClassName: "theme-header",
    valueGetter: (params) => {
      return new Date(params.value);
    },
    type: "date",
    headerName: "Catch Date",
    width: 80,
  },
  {
    field: "daysHunted",
    headerClassName: "theme-header",
    valueGetter: (params) => {
      if (params.row.stats.daysHunting) {
        return params.row.stats.daysHunting;
      }
      return null;
    },
    type: "number",
    headerName: "Days Hunted",
    width: 60,
    headerAlign: "right",
    disableColumnMenu: true,
  },
  {
    field: "ball",
    headerClassName: "theme-header",
    headerName: "Ball",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "gen",
    headerClassName: "theme-header",
    headerName: "Generation",
    width: 60,
  },
  {
    field: "game",
    headerClassName: "theme-header",
    headerName: "Game",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "location",
    headerClassName: "theme-header",
    headerName: "Location",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "IRLLocation",
    headerClassName: "theme-header",
    headerName: "IRL Location",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "method",
    headerClassName: "theme-header",
    headerName: "Method",
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => {
      return params.value.name;
    },
  },
  {
    field: "totalEncounters",
    headerClassName: "theme-header",
    headerName: "Enc.",
    type: "number",
    valueGetter: (params) => {
      if (!params.value) {
        return null;
      }
      return params.value;
    },
    width: 70,
  },
  {
    field: "stats",
    headerClassName: "theme-header",
    headerName: "Prob.",
    width: 70,
    type: "number",
    valueGetter: (params) => {
      return params.value.probability;
    },
  },
  {
    field: "percentage",
    headerClassName: "theme-header",
    headerName: "%",
    width: 70,
    valueGetter: (params) => {
      if (params.row.stats.percentage) {
        return `${params.row.stats.percentage}%`;
      }
      return null;
    },
    align: "right",
    headerAlign: "right",
  },
  {
    field: "meanEncounterTime",
    headerClassName: "theme-header",
    headerName: "Enc. Time",
    width: 70,
    valueGetter: (params) => {
      if (params.row.stats.meanEncounterTime) {
        return new Date(params.row.stats.meanEncounterTime * 1000)
          .toISOString()
          .slice(11, 19);
      }

      return null;
    },
    align: "right",
    headerAlign: "right",
  },
  {
    field: "totalTime",
    headerClassName: "theme-header",
    headerName: "Total Time",
    width: 110,
    valueGetter: (params) => {
      if (params.row.stats.totalHuntTime) {
        return formatTime(params.row.stats.totalHuntTime, false);
      }
      return null;
    },
    align: "right",
    headerAlign: "right",
    sortComparator: (v1, v2) => {
      var timeA = formatSeconds(v1, false);
      var timeB = formatSeconds(v2, false);
      return timeA - timeB;
    },
  },
];

export default function ShinyTable() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [{ data: shinyData, loading: shinyLoading }] =
    useAxios(`/shiny?sort=newest`);

  const ShinyDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            "& .theme-header": {
              backgroundColor: colors.primary[900],
            },
            "& .gen1": {
              backgroundColor: "#fbf8cc",
              color: "#000000",
            },
            "& .gen2": {
              backgroundColor: "#fde4cf",
              color: "#000000",
            },
            "& .gen3": {
              backgroundColor: "#ffcfd2",
              color: "#000000",
            },
            "& .gen4": {
              backgroundColor: "#f1c0e8",
              color: "#000000",
            },
            "& .gen5": {
              backgroundColor: "#cfbaf0",
              color: "#000000",
            },
            "& .gen6": {
              backgroundColor: "#a3c4f3",
              color: "#000000",
            },
            "& .gen7": {
              backgroundColor: "#90dbf4",
              color: "#000000",
            },
            "& .gen8": {
              backgroundColor: "#8eecf5",
              color: "#000000",
            },
            "& .gen9": {
              backgroundColor: "#98f5e1",
              color: "#000000",
            },
            "& .gen10": {
              backgroundColor: "#b9fbc0",
              color: "#000000",
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            onRowClick={(params) => navigate(`/shiny/${params.row._id}`)}
            getRowId={(row) => row._id}
            density="compact"
            getCellClassName={(params) => {
              if (params.value === "Gen 1") {
                return "gen1";
              }
              if (params.value === "Gen 2") {
                return "gen2";
              }
              if (params.value === "Gen 3") {
                return "gen3";
              }
              if (params.value === "Gen 4") {
                return "gen4";
              }
              if (params.value === "Gen 5") {
                return "gen5";
              }
              if (params.value === "Gen 6") {
                return "gen6";
              }
              if (params.value === "Gen 7") {
                return "gen7";
              }
              if (params.value === "Gen 8") {
                return "gen8";
              }
              if (params.value === "Gen 9") {
                return "gen9";
              }
              if (params.value === "Gen 10") {
                return "gen10";
              }
            }}
          />
        </Box>
      );
    }
  };

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY DATA TABLE"
            subtitle="Here you can find all shinies."
          />
        </Box>
        <ShinyDisplay data={shinyData?.shiny} loading={shinyLoading} />
      </Box>
    </Box>
  );
}
