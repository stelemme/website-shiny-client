import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Recoil
import { useRecoilState } from "recoil";
import { sidebarToggle } from "../../utils/atoms";

// mui imports
import { ColorModeContext, tokens } from "../../theme";
import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";

// Hooks
import { useAuth } from "../../hooks/useAuth";

export default function Topbar() {
  const { username } = useAuth();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [toggled, setToggled] = useRecoilState(sidebarToggle);
  const [cookies, setCookies] = useCookies(["filterGroups"]);
  const [groupCheck, setGroupCheck] = useState(cookies.filterGroups);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.search.value) {
      navigate(`/search?type=shinies&search=${e.target.search.value}`);
    } else {
      navigate("/search?type=shinies");
    }
  };

  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleGroupChange = () => {
    setCookies("filterGroups", !groupCheck, { expires: foreverDate });
    setGroupCheck((prevStat) => !prevStat);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor={colors.primary[500]}
    >
      <Box display="flex">
        {!isMediumScreen && (
          <IconButton onClick={() => setToggled(!toggled)}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        {isSmallScreen && (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Box
              display="flex"
              backgroundColor={colors.primary[400]}
              borderRadius="5px"
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                name="search"
                placeholder="Search"
              />
              <IconButton type="submit" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </form>
        )}
      </Box>

      <Box display="flex">
        {!isSmallScreen && (
          <IconButton onClick={() => navigate("/search")}>
            <SearchIcon />
          </IconButton>
        )}
        <IconButton onClick={handleGroupChange}>
          {groupCheck ? <AdjustOutlinedIcon /> : <GroupWorkOutlinedIcon />}
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={() => navigate(`/user/${username}`)}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/auth")}>
          {username ? <LogoutIcon /> : <LoginIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
