import { useEffect, useState } from "react";
import axios from "axios";

// Mui
import { Box, Grid, Typography, IconButton } from "@mui/material";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/ShinyCard";

export default function Shiny() {
  const [shinies, setShinies] = useState(undefined);
  const [shiniesLoading, setShiniesLoading] = useState(true)

  useEffect(() => {
    const fetchOngoingData = async () => {
      try {
        const response = await axios.get(`/shiny`);
        setShinies(response.data);
        setShiniesLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchOngoingData();
  }, []);

  console.log(shinies);

  const ShiniesDisplay = () => {
    if (shiniesLoading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
            Loading ...
          </Typography>
      )
    } else {
      return (
        shinies?.shiny.map((counter) => {
          return (
            <div key={counter._id} style={{ marginBottom: "20px" }}>
              <ShinyCard
                id={counter._id}
                name={counter.name}
                gameSprite={counter.sprite.game}
                dir={counter.sprite.dir}
                monSprite={counter.sprite.pokemon}
                trainer={counter.trainer}
              />
            </div>
          );
        })
      )
    }
  }

  return (
    <Box maxWidth={{ lg: "840px", xs: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY POKEMON"
            subtitle="Here you can find all shinies."
          />
        </Box>

        {/* CARDS */}
        {ShiniesDisplay()}

      </Box>
    </Box>
  );
}
