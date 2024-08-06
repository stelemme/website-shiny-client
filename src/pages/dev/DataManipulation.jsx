// Mui
import { Box, Button } from "@mui/material";

// Components
import Header from "../../components/Header";

// Hooks
import { useShiny } from "../../hooks/useData";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function DataManipulation() {
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const { data: shinyData } = useShiny("&filter=ungroup");

  const handleGenderDifferenceClick = async (e) => {
    let completedManipulations = 0;

    await shinyData.data.forEach(async (element) => {
      let genderDifference = false;

      try {
        const response = await getRequest(`/pokedex?name=${element.name}`);
        const pokemonData = response[0];

        if (pokemonData.genderDifference && element.gender === "female") {
          genderDifference = true;
        }
      } catch {
        return;
      }

      const url = `/shiny/${element._id}?action=genderDifference`;

      try {
        await makeRequest(
          "patch",
          url,
          { genderDifference: genderDifference },
          "edit"
        );
      } catch (error) {
        return;
      }

      await element.evolutions.forEach(async (element2) => {
        let genderDifference = false;
        
        try {
          const response = await getRequest(`/pokedex?name=${element2.name}`);
          const pokemonData = response[0];

          if (pokemonData.genderDifference && element.gender === "female") {
            genderDifference = true;
          }
        } catch {
          return;
        }

        const url = `/shiny/${element._id}?action=genderDifferenceEvolution&evoId=${element2._id}`;

        try {
          await makeRequest(
            "patch",
            url,
            { genderDifference: genderDifference },
            "edit"
          );
        } catch (error) {
          return;
        }
      });

      completedManipulations += 1;
    });

    console.log(
      `data manipulation done: (${completedManipulations}/${shinyData.data.length} completed)`
    );
  };

  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DEV PAGE: DATA MANIPULATION"
            subtitle="Only accessible in development."
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="neutral"
          sx={{ mb: "10px" }}
          style={{ color: "white" }}
          onClick={handleGenderDifferenceClick}
        >
          Add Gender Difference
        </Button>
      </Box>
    </Box>
  );
}
