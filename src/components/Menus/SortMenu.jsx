import { useCookies } from "react-cookie";

// Mui
import {
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function SortMenu({
  open,
  anchorEl,
  setAnchorEl,
  cookie,
  options,
}) {
  const [, setCookies] = useCookies([cookie]);
  const foreverDate = new Date("9999-12-31T23:59:59");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (sortType) => () => {
    setCookies(cookie, sortType, { expires: foreverDate });
    setAnchorEl(null);
  };

  return (
    <Menu
      id="sort-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {options.indexOf("game") !== -1 && (
        <Box>
          <MenuItem onClick={handleClick("gameAsc")}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Game</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick("gameDesc")}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Game</Typography>
          </MenuItem>
          <Divider />
        </Box>
      )}
      {options.indexOf("pokedexNo") !== -1 && (
        <Box>
          <MenuItem onClick={handleClick("pokedexNoAsc")}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Pokédex Number</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick("pokedexNoDesc")}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Pokédex Number</Typography>
          </MenuItem>
          <Divider />
        </Box>
      )}
      {options.indexOf("date") !== -1 && (
        <Box>
          <MenuItem onClick={handleClick("newest")}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Newest First</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick("oldest")}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Oldest First</Typography>
          </MenuItem>
        </Box>
      )}
      {options.indexOf("encounters") !== -1 && (
        <Box>
          <Divider />
          <MenuItem onClick={handleClick("encAsc")}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Most Encounters</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick("encDesc")}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Least Encounters</Typography>
          </MenuItem>
        </Box>
      )}
      {options.indexOf("abc") !== -1 && (
        <Box>
          <Divider sx={{ mb: "10px" }} />
          <MenuItem onClick={handleClick("abcAsc")}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>A - Z</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick("abcDesc")}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography fontWeight={"bold"}>Z - A</Typography>
          </MenuItem>
        </Box>
      )}
    </Menu>
  );
}
