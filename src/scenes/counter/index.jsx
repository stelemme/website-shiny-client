import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Mui
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Hooks
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

export default function Counter() {
  const { counterId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { username } = useAuth();
  const [backgroundColor, setBackgroundColor] = useState(colors.primary[400]);
  
  const { response: data, loading } = useAxios({
    method: "get",
    url: `/counters/${counterId}`,
  });

  const [count, setCount] = useState(undefined)

  useEffect(() => {
    if (data) {
      setCount(data.counter.totalEncounters);
    }
  }, [data]);

  const handleCountClick = () => {
    setBackgroundColor(colors.primary[900]);

    axios["patch"](`/counters/${counterId}`)
      .then((res) => {
        setCount(res.data.counter.totalEncounters);
      })
      .catch((err) => {
        console.log(err);
      }) 

    setTimeout(() => {
      setBackgroundColor(colors.primary[400]);
    }, 200);
  };

  const handleDeleteClick = () => {
    axios["delete"](`/counters/${counterId}`)
      .then((res) => {
        console.log(res.data);
        navigate(-1)
      })
      .catch((err) => {
        console.log(err);
      })    
  };

  return (
    <Box maxWidth="420px" mx="auto" my="20px">
      {data && (
        <Box display="flex" flexDirection="column" mx="20px">
          {/* HEADER */}
          <Box
            mb="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              {data.counter.name.toUpperCase()}
            </Typography>
            <Box ml="10px" display="flex">
              <IconButton onClick={() => console.log("shiny button")}>
                <AutoAwesomeIcon />
              </IconButton>
              <IconButton onClick={() => console.log("edit button")}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton onClick={handleDeleteClick}>
                <DeleteRoundedIcon />
              </IconButton>
            </Box>
          </Box>
          {/* CONTENT */}
          <Box display="flex" justifyContent="space-between" mb="20px">
            <Box display="flex" gap="20px">
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/games/${data.counter.sprite.game}.png`}
                  height="33px"
                />
              </Box>
              <Box display="inline-flex" alignItems="center">
                <img
                  alt=""
                  src={`https://raw.githubusercontent.com/stelemme/database-pokemon/main/pokemon-shiny/${data.counter.sprite.dir}/${data.counter.sprite.pokemon}.png`}
                  height="33px"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius="4px"
              width="90px"
              minWidth="90px"
              mx="10px"
            >
              <Typography fontWeight={"bold"} variant="h5">
                {count}
              </Typography>
            </Box>
          </Box>
          <Box
            minHeight="300px"
            borderRadius="30px"
            backgroundColor={backgroundColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleCountClick}
            sx={{
              "@media (hover: hover)": {
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: colors.primary[900],
                },
              },
            }}
          >
            <Typography fontSize={80} fontWeight={"bold"}>
              +1
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
