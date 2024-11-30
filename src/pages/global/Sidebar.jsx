import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sidebarToggle, sidebarCollapse } from "../../utils/atoms";

// Sidebar Pro imports
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";

// mui imports
import { tokens } from "../../theme";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import LocalHospitalSharpIcon from "@mui/icons-material/LocalHospitalSharp";
import ConstructionIcon from "@mui/icons-material/Construction";
import PreviewIcon from "@mui/icons-material/Preview";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const setToggled = useSetRecoilState(sidebarToggle);

  return (
    <MenuItem
      rootStyles={{
        ["." + menuClasses.active]: {
          backgroundColor: colors.primary[900],
        },
      }}
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        navigate(to);
        setToggled(false);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function CustomSidebar() {
  const domains = {
    "": "Home",
    shiny: "Shiny Pokémon",
    table: "Shiny Data Table",
    checklist: "Shiny Checklist",
    counters: "Your Counters",
    create: "Add a Counter",
    stats: "Shiny Stats",
    counter: "Counter Stats",
    pokedex: "National Pokédex",
    regional: "Regional Pokédex",
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(
    domains[
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    ]
  );
  const [toggled, setToggled] = useRecoilState(sidebarToggle);
  const [isCollapsed, setIsCollapsed] = useRecoilState(sidebarCollapse);

  const menuItemStyles = {
    button: {
      "&:hover": {
        backgroundColor: colors.primary[900],
      },
    },
  };

  return (
    <Sidebar
      transitionDuration="0"
      collapsed={isCollapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      customBreakPoint="900px"
      backgroundColor={colors.primary[400]}
      rootStyles={{
        borderWidth: "0px",
        position: "fixed",
        height: "100%",
      }}
    >
      <Menu iconShape="square" menuItemStyles={menuItemStyles}>
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed && !toggled ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" gap="15px">
                <img src="/logo192.png" alt="logo" width="30px" />
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                >
                  Shiny Data
                </Typography>
              </Box>
              {!toggled && (
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              )}
            </Box>
          )}
        </MenuItem>
        <Item
          title="Home"
          to="/"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        {/* SHINY APPLICATION */}
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Shiny" : "Shiny  Application"}
        </Typography>
        <Item
          title="Shiny Pokémon"
          to="/shiny"
          icon={<AutoAwesomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Shiny Stats"
          to="/stats"
          icon={<AssessmentOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Add a Shiny"
          to="/shiny/create"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        {/* COUNTER APPLICATION */}
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Counter" : "Counter  Application"}
        </Typography>
        <Item
          title="Counters"
          to="/counters"
          icon={<CalculateOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Counter Stats"
          to="/stats/counter"
          icon={<AssessmentIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Add a Counter"
          to="/counters/create"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />

        {/* STATISTICS */}
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Data" : "Data Sets"}
        </Typography>
        <Item
          title="Shiny Map"
          to={`/map`}
          icon={<MapOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Shiny Collections"
          to="/stats/collections"
          icon={<PermMediaOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Shiny Checklist"
          to="/shiny/checklist"
          icon={<FactCheckOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Shiny Data Table"
          to="/shiny/table"
          icon={<TableChartOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Dex" : "Pokédex"}
        </Typography>
        <Item
          title="National Pokédex"
          to="/pokedex"
          icon={<CatchingPokemonTwoToneIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Regional Pokédex"
          to="/pokedex/regional"
          icon={<CatchingPokemonTwoToneIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "RIP" : "Rest in Peace"}
        </Typography>
        <Item
          title="Dead Shiny's"
          to="/shiny/dead/"
          icon={<LocalHospitalSharpIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Add a Dead Shiny"
          to="/shiny/dead/create"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Info" : "Information"}
        </Typography>
        <Item
          title="Changelogs"
          to="/changelogs"
          icon={<ArticleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        {process.env.REACT_APP_ENV === "dev" ? (
          <>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              {isCollapsed ? "Dev" : "Development"}
            </Typography>
            <Item
              title="Data Manipulation"
              to="/dev/data"
              icon={<ConstructionIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Page Layout"
              to="/dev/layout"
              icon={<PreviewIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Shiny Stats (BETA)"
              to="/stats/beta"
              icon={<AssessmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        ) : null}
      </Menu>
    </Sidebar>
  );
}
