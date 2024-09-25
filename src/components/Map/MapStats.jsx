// mui
import { Grid } from "@mui/material";

// Components
import BoxComponent from "../General/BoxComponent";
import CountryGraph from "../Graphs/CountryGraph";
import MapRecords from "./MapRecords";

export default function MapStats() {
  return (
    <BoxComponent tabs>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MapRecords />
        </Grid>
        <Grid item xs={12} md={6}>
          <CountryGraph />
        </Grid>
      </Grid>
    </BoxComponent>
  );
}
