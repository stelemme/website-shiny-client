import { useState, createElement } from "react";

// mui imports
import { Box, Grid } from "@mui/material";

// Components imports
import Header from "../../components/Header";
import GeneralSelect from "../../components/Selects/GeneralSelect";
import Pokeballs from "../../components/Collections/Pokeballs";
import Natures from "../../components/Collections/Natures";
import Megas from "../../components/Collections/Megas";
import Gigantamax from "../../components/Collections/Gigantamax";
import Alolans from "../../components/Collections/Alolans";
import Galarians from "../../components/Collections/Galarian";
import Hisuians from "../../components/Collections/Hisuians";
import Paldeans from "../../components/Collections/Paldeans";
import Eeveelutions from "../../components/Collections/Eeveelutions";
import Unowns from "../../components/Collections/Unowns";

export default function Collections() {
  const [collection, setCollection] = useState("Pokéballs");

  const handleChange = (e) => {
    setCollection(e.target.value);
  };

  const collectionComponents = {
    "Pokéballs": Pokeballs,
    "_Natures": Natures,
    "Mega Evolutions": Megas,
    "_Gigantamax Pokémon": Gigantamax,
    "Alolan Forms": Alolans,
    "Galarian Forms": Galarians,
    "Hisuian Forms": Hisuians,    
    "_Paldean Forms": Paldeans,
    "Eeveelutions": Eeveelutions,
    "Unowns": Unowns,
  };

  return (
    <Box maxWidth={"100%"} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", md: "center" }}
          mb={{ xs: "20px", md: "0px" }}
        >
          <Header
            title={`COLLECTIONS PAGE`}
            subtitle={`Here you can view and change all collections.`}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GeneralSelect
              label={"Collections"}
              handleChange={handleChange}
              list={Object.keys(collectionComponents)}
              value={collection}
              width={200}
              size={"normal"}
            />
          </Grid>
          <Grid item xs={12}>
            {/* COLLECTIONS */}
            {createElement(collectionComponents[collection])}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
