// Mui
import { Button } from "@mui/material";

// Components
import PageComponent from "../../components/General/PageComponent";

// Hooks
import { useShiny, useCounter } from "../../hooks/useData";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

// Functions
import { calculateMeanEncounterTime } from "../../functions/statFunctions";

export default function DataManipulation() {
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const { data: shinyData } = useShiny("filter=ungroup");
  const { data: counterData } = useCounter("preview=encounters");

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

  const handleMeanEncTimeClick = async (e) => {
    await counterData.data.forEach(async (element) => {
      const meanEncounterTime = calculateMeanEncounterTime(
        element.encounters,
        element.upperTimeThreshold,
        element.lowerTimeThreshold,
        element.increment
      );

      console.log(element.name, meanEncounterTime)

      const url = `/counters/${element._id}?action=meanEncounterTime`;

      try {
        await makeRequest(
          "patch",
          url,
          { meanEncounterTime: meanEncounterTime },
          "edit"
        );
      } catch (error) {
        return;
      }

      /* await element.evolutions.forEach(async (element2) => {
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
          completedManipulations += 1;
        } catch (error) {
          return;
        }
      }); */
    });
  };

  return (
    <PageComponent
      title="DEV PAGE: DATA MANIPULATION"
      subtitle="Only accessible in development."
    >
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
      <Button
        type="submit"
        variant="contained"
        color="neutral"
        sx={{ mb: "10px" }}
        style={{ color: "white" }}
        onClick={handleMeanEncTimeClick}
      >
        Add meanEncounterTime
      </Button>
    </PageComponent>
  );
}
