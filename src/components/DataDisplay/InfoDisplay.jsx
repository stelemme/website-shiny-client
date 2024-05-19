// Mui
import { Grid, Typography } from "@mui/material";

export default function InfoDisplay({ data }) {
  const InfoDict = ({ infoCat, infoName, xs1 = 5.5, xs2 = 6.5 }) => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={xs1}>
          <Typography
            fontSize={window.innerWidth < 600 ? 12 : 14}
            fontWeight={"bold"}
          >
            {infoCat}
          </Typography>
        </Grid>
        <Grid item xs={xs2}>
          <Typography fontSize={window.innerWidth < 600 ? 12 : 14}>
            {infoName}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight={"bold"}>
          SHINY INFORMATION
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <InfoDict infoCat={"Dex No."} infoName={`#${data?.pokedexNo}`} />
        <InfoDict infoCat={"Pokémon"} infoName={data?.name} />
        <InfoDict infoCat={"Nature"} infoName={data?.nature} />
        <InfoDict
          infoCat={"Gender"}
          infoName={
            data?.gender === "male"
              ? "♂"
              : data?.gender === "female"
              ? "♀"
              : "-"
          }
        />
        <InfoDict infoCat={"Level Caught"} infoName={`lvl. ${data?.level}`} />
        <InfoDict
          infoCat={"Nickname"}
          infoName={data?.nickname ? data?.nickname : "-"}
        />
      </Grid>
      <Grid item xs={6}>
        <InfoDict
          infoCat={"Encounters"}
          infoName={data?.totalEncounters > 0 ? data?.totalEncounters : "-"}
        />
        <InfoDict
          infoCat={"Probability"}
          infoName={`1/${data?.stats.probability}`}
        />
        <InfoDict
          infoCat={"Percentage"}
          infoName={data?.stats.percentage ? `${data?.stats.percentage}%` : "-"}
        />
        <InfoDict
          infoCat={"Date Caught"}
          infoName={new Date(data?.endDate).toLocaleDateString()}
        />
      </Grid>

      <Grid item xs={12}>
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Game"}
          infoName={data?.game}
        />
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Generation"}
          infoName={data?.gen}
        />
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Method"}
          infoName={data?.method.name}
        />
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Category"}
          infoName={data?.method.category ? data?.method.category : "-"}
        />
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Location"}
          infoName={data?.location}
        />
      </Grid>
    </Grid>
  );
}
