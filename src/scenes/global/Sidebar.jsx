import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sidebarToggle, sidebarCollapse } from "../../atoms";

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
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

// Hooks
import { useAuth } from "../../hooks/useAuth";

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
  const { username } = useAuth();
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
        position: 'fixed',
        height: '100%',
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
                  variant="h3"
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
          title="Shiny Data Table"
          to="/shiny/table"
          icon={<TableChartOutlinedIcon />}
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
          title="Add a Shiny"
          to="/shiny/create"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
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
          title="Add a Counter"
          to="/counters/create"
          icon={<LibraryAddOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Stats" : "Statistics"}
        </Typography>
        <Item
          title="Shiny Stats"
          to="/stats"
          icon={<AssessmentOutlinedIcon />}
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
        <Typography
          variant="h6"
          color={colors.grey[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {isCollapsed ? "Info" : "Information"}
        </Typography>
        <Item
          title="User Info"
          to={`/user/${username}`}
          icon={<PermIdentityRoundedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Map"
          to={`/Map`}
          icon={<PermIdentityRoundedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
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
      </Menu>
    </Sidebar>
  );
}
