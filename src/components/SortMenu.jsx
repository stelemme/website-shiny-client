// Mui
import {
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function SortMenu({open, anchorEl, handleClose}) {
  const handleClick = (sortType) => () => {
    handleClose(sortType);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
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
    </Menu>
  );
}
