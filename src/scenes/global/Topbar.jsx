import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { sidebarToggle } from "../../atoms";

// mui imports
import { ColorModeContext, tokens } from "../../theme"
import { Box, IconButton , useTheme, InputBase, useMediaQuery } from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Topbar() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const navigate = useNavigate();
  const [toggled, setToggled] = useRecoilState(sidebarToggle);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
      {!isMediumScreen && (
        <IconButton onClick={() => setToggled(!toggled)}>
          <MenuOutlinedIcon />
        </IconButton>
      )}
      {isSmallScreen && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}
      </Box>
      
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate('/')}>
          <HomeOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/auth')}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
