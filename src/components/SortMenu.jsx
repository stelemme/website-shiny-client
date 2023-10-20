import axios from "axios";

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

function sortByKeys(array, sortKeys) {
  return array.sort(function (a, b) {
    for (let i = 0; i < sortKeys.length; i++) {
      const key = sortKeys[i].key;
      const desc = sortKeys[i].desc;

      var x = a[key];
      var y = b[key];

      if (typeof x == "string") {
        x = ("" + x).toLowerCase();
      }
      if (typeof y == "string") {
        y = ("" + y).toLowerCase();
      }

      if (x < y) return -desc;
      if (x > y) return desc;
    }

    return 0;
  });
}

export default function SortMenu({
  open,
  anchorEl,
  setAnchorEl,
  data,
  setData,
  username,
  sortKey,
  options,
}) {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (sortType) => () => {
    handleSortClose(sortType, data, setData, username, sortKey);
  };

  const handleSortClose = (sortString, data, setData, username, sortKey) => {
    if (typeof sortString === "string") {
      let sortedData = [];
      switch (sortString) {
        case "gameAsc":
          sortedData = sortByKeys(data, [
            { key: "gameSort", desc: 1 },
            { key: "pokedexNo", desc: 1 },
          ]);
          break;
        case "gameDesc":
          sortedData = sortByKeys(data, [
            { key: "gameSort", desc: -1 },
            { key: "pokedexNo", desc: 1 },
          ]);
          break;
        case "pokedexNoAsc":
          sortedData = sortByKeys(data, [{ key: "pokedexNo", desc: 1 }]);
          break;
        case "pokedexNoDesc":
          sortedData = sortByKeys(data, [{ key: "pokedexNo", desc: -1 }]);
          break;
        case "newest":
          sortedData = sortByKeys(data, [{ key: "endDate", desc: -1 }]);
          break;
        case "oldest":
          sortedData = sortByKeys(data, [{ key: "endDate", desc: 1 }]);
          break;
        case "encAsc":
          sortedData = sortByKeys(data, [{ key: "totalEncounters", desc: -1 }]);
          break;
        case "encDesc":
          sortedData = sortByKeys(data, [{ key: "totalEncounters", desc: 1 }]);
          break;
        default:
          console.log("failed");
      }
      setData(sortedData);

      axios
        .patch(`/user?user=${username}&${sortKey}=${sortString}`)
        .catch((err) => {
          console.log(err);
        });
    }

    setAnchorEl(null);
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
    </Menu>
  );
}
