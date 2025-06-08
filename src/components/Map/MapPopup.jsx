import { useNavigate } from "react-router-dom";

// mui imports
import { Box, Typography } from "@mui/material";

// leaflet imports
import { Popup } from "react-leaflet";

// Components imports
import PokemonImage from "../General/PokemonImage";

export default function MapPopup({ data }) {
  const navigate = useNavigate();

  return (
    <Popup>
      <Box
        onClick={() => {
          navigate(`/shiny/${data._id}`);
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box width={"100px"}>
            <PokemonImage
              directory={data.sprite.dir}
              initSprite={data.sprite.pokemon}
              gameSort={data.gameSort}
              genderDifference={false}
              shiny={true}
            />
          </Box>
        </Box>
        <Typography fontWeight="bold" style={{ marginBottom: 0, marginTop: 0 }}>
          {data.geoLocation.name}
        </Typography>
        <Typography gutterBottom style={{ marginTop: 0 }}>
          {data.trainer + " - " + data.name}
        </Typography>
      </Box>
    </Popup>
  );
}
