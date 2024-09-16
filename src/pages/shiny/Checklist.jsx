import { useState } from "react";
import { useCookies } from "react-cookie";

// Mui
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { tokens } from "../../theme";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LazyLoad from "react-lazyload";
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
import PageComponent from "../../components/General/PageComponent";
import FilterMenu from "../../components/Dialogs/FilterDialog";

// Functions
import { calculateOverlapPercentage } from "../../functions/statFunctions";

// Hooks
import { usePokedex, useShiny } from "../../hooks/useData";

// Images
import { trainerImages, medalImages } from "../../assets/imgExporter";

export default function Checklist() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openGraph, setOpenGraph] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [cookie] = useCookies(["checklistGenFilter"]);

  const medalList = [
    medalImages["adventure-1-d.png"],
    medalImages["adventure-1-g.png"],
    medalImages["adventure-1-s.png"],
    medalImages["adventure-1-b.png"],
  ];

  const { data: pokedex } = usePokedex(`gen=${cookie.checklistGenFilter}`);

  const { data: shinyListData } = useShiny(
    `list=names&filter=${cookie.checklistGenFilter}`
  );
  const { data: shinyListJoaquinData } = useShiny(
    `list=names&trainer=Joaquin&filter=${cookie.checklistGenFilter}`
  );
  const { data: shinyListKorneelData } = useShiny(
    `list=names&trainer=Korneel&filter=${cookie.checklistGenFilter}`
  );
  const { data: shinyListSimonData } = useShiny(
    `list=names&trainer=Simon&filter=${cookie.checklistGenFilter}`
  );
  const { data: shinyListStefData } = useShiny(
    `list=names&trainer=Stef&filter=${cookie.checklistGenFilter}`
  );

  const shinyList = shinyListData?.data[0].names;
  const shinyListJoaquin = shinyListJoaquinData?.data[0]?.names;
  const shinyListKorneel = shinyListKorneelData?.data[0]?.names;
  const shinyListSimon = shinyListSimonData?.data[0]?.names;
  const shinyListStef = shinyListStefData?.data[0]?.names;

  const graphData = [
    {
      name: "Joaquin",
      percentage: calculateOverlapPercentage(
        shinyListJoaquin,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Korneel",
      percentage: calculateOverlapPercentage(
        shinyListKorneel,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Simon",
      percentage: calculateOverlapPercentage(
        shinyListSimon,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "Stef",
      percentage: calculateOverlapPercentage(
        shinyListStef,
        pokedex?.data.map((pokemon) => pokemon.name)
      ),
    },
    {
      name: "All",
      percentage: calculateOverlapPercentage(
        shinyList,
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

  const handleFilterClick = () => {
    setOpenFilter(true);
  };

  const handleStatsClick = () => {
    setOpenGraph(true);
  };

  return (
    <PageComponent
      title="SHINY CHECKLIST"
      subtitle="Here you can find the checklist for all Shiny Pokémon."
      widthSnaps={2}
      icon1={<FilterAltOutlinedIcon />}
      onClickIcon1={handleFilterClick}
      icon2={<AssessmentOutlinedIcon />}
      onClickIcon2={handleStatsClick}
    >
      <FilterMenu
        open={openFilter}
        setOpen={setOpenFilter}
        cookieGen={"checklistGenFilter"}
        options={["gen"]}
      />
      <Dialog open={openGraph} onClose={() => setOpenGraph(false)} fullWidth>
        <DialogTitle fontWeight={"bold"} variant="h4">
          {`Checklist - ${cookie.checklistGenFilter} Pokémon`}
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
              <Bar dataKey="percentage" background={{ fill: colors.grey[800] }}>
                {graphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={graphColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DialogContent>
      </Dialog>
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
                minWidth="35px"
              ></Box>
              {/* POKEMON NAME */}
              <Box
                ml="15px"
                mr="5px"
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
                  {"Pokémon Name"}
                </Typography>
              </Box>
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img
                  height={"30px"}
                  alt=""
                  src={trainerImages["Gen 6 - kwakquin.png"]}
                  style={{ imageRendering: "pixelated" }}
                />
                <img
                  height={"30px"}
                  alt=""
                  src={trainerImages["Gen 6 - chorneef.png"]}
                  style={{ imageRendering: "pixelated" }}
                />
                <img
                  height={"30px"}
                  alt=""
                  src={trainerImages["Gen 6 - siwob.png"]}
                  style={{ imageRendering: "pixelated" }}
                />
                <img
                  height={"30px"}
                  alt=""
                  src={trainerImages["Gen 6 - t-loc.png"]}
                  style={{ imageRendering: "pixelated" }}
                />
                <Box width={"30px"} />
                {window.innerWidth >= 600 && <Box width={"30px"} />}
              </Box>
            </Box>
          </Box>
        </Grid>
        {pokedex?.data.map((pokemon) => {
          const joaquinCheck = shinyListJoaquin?.includes(pokemon.name);
          const korneelCheck = shinyListKorneel?.includes(pokemon.name);
          const simonCheck = shinyListSimon?.includes(pokemon.name);
          const stefCheck = shinyListStef?.includes(pokemon.name);

          const trueCount = [
            joaquinCheck,
            korneelCheck,
            simonCheck,
            stefCheck,
          ].filter(Boolean).length;

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
                      {joaquinCheck ? (
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
                      {korneelCheck ? (
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
                      {simonCheck ? (
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
                      {stefCheck ? (
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
                      {shinyList.includes(pokemon.name) ? (
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
                      {trueCount > 0 ? (
                        <img
                          width={window.innerWidth < 500 ? "20px" : "30px"}
                          alt=""
                          src={medalList[4 - trueCount]}
                        />
                      ) : (
                        <Box
                          width={window.innerWidth < 500 ? "20px" : "30px"}
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
    </PageComponent>
  );
}
