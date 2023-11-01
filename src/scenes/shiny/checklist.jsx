import { useState } from "react";
import Cookies from "js-cookie";

// Mui
import {
  Box,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { tokens } from "../../theme";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LazyLoad from "react-lazy-load";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Recharts
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

// Components
import Header from "../../components/Header";
import FilterMenu from "../../components/FilterMenu";

// Functions
import { calculateOverlapPercentage } from "../../functions/statFunctions";

// Hooks
import { usePokedex, useShiny } from "../../hooks/useData";

export default function ShinyChecklist() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openGraph, setOpenGraph] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const checklistGenFilter = Cookies.get("checklistGenFilter")
    ? Cookies.get("checklistGenFilter")
    : "All";

  const { data: pokedex } = usePokedex(`?gen=${checklistGenFilter}`);

  const { data: shinyList } = useShiny(
    `?shinyList=true&gen=${checklistGenFilter}`
  );
  const { data: shinyListJoaquin } = useShiny(
    `?shinyList=true&trainer=Joaquin&gen=${checklistGenFilter}`
  );
  const { data: shinyListKorneel } = useShiny(
    `?shinyList=true&trainer=Korneel&gen=${checklistGenFilter}`
  );
  const { data: shinyListSimon } = useShiny(
    `?shinyList=true&trainer=Simon&gen=${checklistGenFilter}`
  );
  const { data: shinyListStef } = useShiny(
    `?shinyList=true&trainer=Stef&gen=${checklistGenFilter}`
  );

  const graphData = [
    {
      name: "Joaquin",
      percentage: calculateOverlapPercentage(
        shinyListJoaquin?.data,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Korneel",
      percentage: calculateOverlapPercentage(
        shinyListKorneel?.data,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Simon",
      percentage: calculateOverlapPercentage(
        shinyListSimon?.data,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Stef",
      percentage: calculateOverlapPercentage(
        shinyListStef?.data,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "All",
      percentage: calculateOverlapPercentage(
        shinyList?.data,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
  ];

  const graphColors = [
    colors.redAccent[400],
    colors.yellowAccent[400],
    colors.greenAccent[400],
    colors.blueAccent[400],
    colors.purpleAccent[400],
  ];

  return (
    <Box maxWidth={{ md: "630px", sm: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY CHECKLIST"
            subtitle="Here you can find the checklist for all Shiny Pokémon."
          />
          <Box style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={(e) => setOpenFilter(true)}>
              <FilterAltOutlinedIcon />
            </IconButton>
            <FilterMenu
              open={openFilter}
              setOpen={setOpenFilter}
              cookieGen={"checklistGenFilter"}
              options={["gen"]}
            />
            <IconButton onClick={(e) => setOpenGraph(true)}>
              <AssessmentOutlinedIcon />
            </IconButton>
            <Dialog
              open={openGraph}
              onClose={() => setOpenGraph(false)}
              fullWidth
            >
              <DialogTitle fontWeight={"bold"} variant="h4">
                {`Checklist - ${checklistGenFilter} Pokémon`}
              </DialogTitle>
              <DialogContent>
                <ResponsiveContainer
                  width="100%"
                  height={window.innerWidth < 500 ? 300 : 400}
                >
                  <BarChart
                    margin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: -15,
                    }}
                    data={graphData}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fill: colors.grey[100] }}
                      axisLine={{ stroke: colors.primary[200] }}
                      tickLine={{ stroke: colors.primary[200] }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(tick) => {
                        return `${tick}%`;
                      }}
                      tick={{ fill: colors.grey[100] }}
                      axisLine={{ stroke: colors.primary[200] }}
                      tickLine={{ stroke: colors.primary[200] }}
                    />
                    <Tooltip
                      labelStyle={{ color: "black" }}
                      formatter={(value) => {
                        return `${value.toFixed(2)}%`;
                      }}
                      animationDuration={0}
                    />
                    <Bar
                      dataKey="percentage"
                      background={{ fill: colors.grey[800] }}
                    >
                      {graphData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={graphColors[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>

        {/* CHECKLIST CARDS */}
        <Grid container spacing={"10px"}>
          <Grid item xs={12}>
            <Box
              p="10px"
              width="100%"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
            >
              <Box display="flex">
                {/* POKEMON IMAGE */}
                <Box
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  height="35px"
                  minWidth="35px"
                />
                {/* POKEMON NAME */}
                <Box
                  mx="15px"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  width="250px"
                >
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    fontSize={window.innerWidth < 600 ? 12 : 14}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Pokemon Name
                  </Typography>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                ></Box>
              </Box>
            </Box>
          </Grid>
          {pokedex?.data.map((pokemon) => {
            return (
              <Grid item xs={12} key={pokemon._id}>
                <LazyLoad>
                  <Box
                    p="10px"
                    width="100%"
                    backgroundColor={colors.primary[400]}
                    borderRadius="5px"
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: colors.primary[900],
                      },
                    }}
                  >
                    <Box display="flex">
                      {/* POKEMON IMAGE */}
                      <Box
                        display="inline-flex"
                        justifyContent="center"
                        alignItems="center"
                        minWidth="35px"
                      >
                        <img
                          height={"35px"}
                          alt=""
                          src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/gen-all-home/${pokemon.sprite}.png`}
                        />
                      </Box>
                      {/* POKEMON NAME */}
                      <Box
                        mx="15px"
                        overflow="hidden"
                        display="flex"
                        alignItems="center"
                        width="250px"
                      >
                        <Typography
                          fontSize={window.innerWidth < 600 ? 12 : 14}
                          fontWeight={"bold"}
                          variant="h5"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {pokemon.name}
                        </Typography>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {shinyListJoaquin?.data.includes(pokemon.name) ? (
                          <CheckBoxIcon
                            size="small"
                            style={{ color: colors.redAccent[500] }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            size="small"
                            style={{ color: colors.redAccent[500] }}
                          />
                        )}
                        {shinyListKorneel?.data.includes(pokemon.name) ? (
                          <CheckBoxIcon
                            size="small"
                            style={{ color: colors.yellowAccent[500] }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            size="small"
                            style={{ color: colors.yellowAccent[500] }}
                          />
                        )}
                        {shinyListSimon?.data.includes(pokemon.name) ? (
                          <CheckBoxIcon
                            size="small"
                            style={{ color: colors.greenAccent[500] }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            size="small"
                            style={{ color: colors.greenAccent[500] }}
                          />
                        )}
                        {shinyListStef?.data.includes(pokemon.name) ? (
                          <CheckBoxIcon
                            size="small"
                            style={{ color: colors.blueAccent[500] }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            size="small"
                            style={{ color: colors.blueAccent[500] }}
                          />
                        )}
                        {shinyList?.data.includes(pokemon.name) ? (
                          <CheckBoxIcon
                            size="small"
                            style={{ color: colors.purpleAccent[500] }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            size="small"
                            style={{ color: colors.purpleAccent[500] }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </LazyLoad>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
