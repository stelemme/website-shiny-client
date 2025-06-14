// Mui
import { Button } from "@mui/material";

// Components
import PageComponent from "../../components/General/PageComponent";

// Hooks
import { useShiny, useCounter } from "../../hooks/useData";
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

// Functions
import {
  calculateMeanEncounterTime,
  calculatePercentage,
} from "../../functions/statFunctions";

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
        const response = await getRequest(
          `/pokedex?filter=complex&filterName=${element.name}`
        );
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
          const response = await getRequest(
            `/pokedex?filter=complex&filterName=${element2.name}`
          );
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

  const handleStarterEdit = async (e) => {
    let completedManipulations = 0;

    await shinyData.data.forEach(async (element) => {
      let starter = false;

      try {
        const response = await getRequest(
          `/pokedex?filter=complex&filterName=${element.name}`
        );
        const pokemonData = response[0];

        if (pokemonData.starter) {
          starter = true;
        }
      } catch {
        return;
      }

      const url = `/shiny/${element._id}?action=starterEdit`;

      try {
        await makeRequest("patch", url, { starter: starter }, "edit");
      } catch (error) {
        return;
      }

      completedManipulations += 1;
    });

    console.log(
      `data manipulation done: (${completedManipulations}/${shinyData.data.length} completed)`
    );
  };

  const handleFossilEdit = async (e) => {
    let completedManipulations = 0;

    await shinyData.data.forEach(async (element) => {
      try {
        const response = await getRequest(
          `/pokedex?filter=complex&filterName=${element.name}`
        );
        const pokemonData = response[0];

        if (pokemonData.fossil) {
          console.log(pokemonData.name, pokemonData.fossil);
          const url = `/shiny/${element._id}?action=fossilEdit`;

          try {
            await makeRequest("patch", url, { fossil: true }, "edit");
          } catch (error) {
            return;
          }
        }
      } catch {
        return;
      }

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

      console.log(element.name, meanEncounterTime);

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
    });
  };

  const handlePercentageClick = async (e) => {
    await counterData.data.forEach(async (element) => {
      console.log(element);
      const percentage = calculatePercentage(
        element.totalEncounters,
        element.method.odds,
        element.method.rolls,
        element.method.shinyCharm,
        element.method?.charmRolls,
        element.method?.function,
        element.method?.searchLevel
      );

      console.log(element.name, percentage);

      const url = `/counters/${element._id}?action=percentage`;

      try {
        await makeRequest("patch", url, { percentage: percentage }, "edit");
      } catch (error) {
        return;
      }
    });
  };

  const handleTotalHuntTimeClick = async (e) => {
    await counterData.data.forEach(async (element) => {
      const totalHuntTime =
        element.totalEncounters *
        calculateMeanEncounterTime(
          element.encounters,
          element.upperTimeThreshold,
          element.lowerTimeThreshold,
          element.increment
        );

      console.log(element.name, totalHuntTime);

      const url = `/counters/${element._id}?action=totalHuntTime`;

      try {
        await makeRequest(
          "patch",
          url,
          { totalHuntTime: Math.round(totalHuntTime) },
          "edit"
        );
      } catch (error) {
        return;
      }
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
        onClick={handleStarterEdit}
      >
        Add Starter bool
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="neutral"
        sx={{ mb: "10px" }}
        style={{ color: "white" }}
        onClick={handleFossilEdit}
      >
        Add Fossil bool
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
      <Button
        type="submit"
        variant="contained"
        color="neutral"
        sx={{ mb: "10px" }}
        style={{ color: "white" }}
        onClick={handleTotalHuntTimeClick}
      >
        Add totalHuntTime
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="neutral"
        sx={{ mb: "10px" }}
        style={{ color: "white" }}
        onClick={handlePercentageClick}
      >
        Add percentage
      </Button>
    </PageComponent>
  );
}
