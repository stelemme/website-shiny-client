import { useState } from "react";
import axios from "axios";

// Mui
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// Components
import CustomDialog from "../Dialogs/CustomDialog";

// Functions
import { makeRequest } from "../../functions/requestFunctions";

export default function IconsDisplay({
  data,
  username,
  type,
  refetch,
  exisitingData,
}) {
  const [openIconEdit, setOpenIconEdit] = useState(false);
  const [icons, setIcons] = useState(undefined);
  const [iconsEdit, setIconsEdit] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  /* EDIT THE ICON */
  const handleIconsEdit = async () => {
    let iconData = {
      name: iconsEdit["name"],
      sprite: iconsEdit["sprite"],
    };

    try {
      await makeRequest(
        "patch",
        `/shiny/${data._id}?action=${type}Edit`,
        iconData
      );
      exisitingData?.push(iconsEdit);
      setOpenIconEdit(false);
      refetch();
    } catch {
      return;
    }
  };

  const handleIconsDelete = async () => {
    if (!hoveredItem) {
      return;
    }

    let iconData = {
      name: hoveredItem["name"],
      sprite: hoveredItem["sprite"],
    };

    try {
      await makeRequest(
        "patch",
        `/shiny/${data._id}?action=${type}Delete`,
        iconData
      );
      const index = exisitingData.indexOf(hoveredItem);
      exisitingData.splice(index, 1);
      refetch();
    } catch {
      return;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          mb="5px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
            {type.toUpperCase()}
          </Typography>
          {username === data.trainer && (
            <Box ml="10px" display="flex">
              <IconButton
                size="small"
                onClick={() => {
                  axios
                    .get(`/game?name=${data.game}&action=${type}`)
                    .then((res) => {
                      const allIcons = res.data[0][type];
                      const filteredIcons = allIcons.filter(
                        (icon) =>
                          !exisitingData?.some(
                            (excluded) => excluded.name === icon.name
                          )
                      );
                      setIcons(filteredIcons);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  setOpenIconEdit(true);
                }}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
              <CustomDialog
                open={openIconEdit}
                handleClick={handleIconsEdit}
                handleClose={() => setOpenIconEdit(false)}
                title={`Add a ${
                  type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)
                }`}
                content={
                  <Autocomplete
                    key={icons}
                    disabled={!icons}
                    autoHighlight
                    onChange={(e, value, reason) => {
                      if (reason === "selectOption") {
                        setIconsEdit(value);
                      }
                    }}
                    sx={{ mt: "10px" }}
                    options={icons ? icons : []}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        required
                        color="secondary"
                        {...params}
                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                      />
                    )}
                  />
                }
                action={"Add"}
              />
            </Box>
          )}
        </Box>
      </Grid>
      {exisitingData?.length > 0 && (
        <Grid item xs={12}>
          {exisitingData?.map((icon) => {
            return (
              <div
                key={icon.name}
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setHoveredItem(icon)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/${type}/${icon.sprite}.png`}
                  width={"50px"}
                  title={icon.name}
                  style={{ imageRendering: "pixelated" }}
                />
                {username === data.trainer && (
                  <IconButton
                    size="small"
                    onClick={handleIconsDelete}
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      opacity: hoveredItem === icon ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <CancelOutlinedIcon fontSize="small" color="disabled" />
                  </IconButton>
                )}
              </div>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}
