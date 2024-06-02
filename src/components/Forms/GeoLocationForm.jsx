import { useState, useEffect } from "react";

// Mui
import {
  TextField,
  Typography,
  Autocomplete,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from "@mui/material";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function GeoLocationForm({ data, setData }) {
  const getRequest = useGetRequest();

  const [geoLocationsList, setGeoLocationsList] = useState(undefined);
  const [newGeoLocation, setNewGeoLocation] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRequest(`/shiny?geoLocationList=true`);
        setGeoLocationsList(response[0]["geoLocation"]);
      } catch {
        return;
      }
    }

    fetchData();
  }, []);

  let initialLocationState = {
    name: "",
    displayName: "",
    position: [],
  };

  const getGeoLocation = async (newValues) => {
    if (newValues.length !== 2) {
      return;
    }

    try {
      const response = await getRequest(
        `https://nominatim.openstreetmap.org/reverse?lat=${newValues[0]}&lon=${newValues[1]}&format=json`
      );
      setData((prevState) => {
        return {
          ...prevState,
          ...{
            geoLocation: {
              ...prevState.geoLocation,
              displayName: response.display_name,
            },
          },
        };
      });
    } catch {
      return;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl sx={{ mb: "5px" }}>
          <RadioGroup
            row
            value={newGeoLocation}
            onChange={(e, value) => {
              setNewGeoLocation(JSON.parse(value));
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    geoLocation: initialLocationState,
                  },
                };
              });
            }}
          >
            <FormControlLabel
              value={false}
              control={<Radio color="secondary" />}
              label="Existing Location"
            />
            <FormControlLabel
              value={true}
              control={<Radio color="secondary" />}
              label="New Location"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      {!newGeoLocation && (
        <Grid item xs={12}>
          <Autocomplete
            sx={{ mb: "10px" }}
            disabled={!geoLocationsList}
            autoHighlight
            onChange={(e, value) => {
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    geoLocation: value,
                  },
                };
              });
            }}
            options={geoLocationsList ? geoLocationsList : []}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                color="secondary"
                {...params}
                label="Geo Location"
              />
            )}
          />
        </Grid>
      )}
      {newGeoLocation && (
        <>
          <Grid item xs={12} sx={{ mb: "10px" }}>
            <TextField
              required
              fullWidth
              autoComplete="off"
              color="secondary"
              label="Location Name"
              value={data.geoLocation.name}
              onChange={(e) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      geoLocation: {
                        ...prevState.geoLocation,
                        name: e.target.value,
                      },
                    },
                  };
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoComplete="off"
              color="secondary"
              label="Latitude, Longitude"
              onChange={(e) => {
                const newValues = e.target.value
                  .split(",")
                  .map((value) => Number(value.trim()));
                setData((prevState) => {
                  return {
                    ...prevState,
                    ...{
                      geoLocation: {
                        ...prevState.geoLocation,
                        position: newValues,
                      },
                    },
                  };
                });
                getGeoLocation(newValues);
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ my: "10px" }}>
            <Typography>Address: {data.geoLocation.displayName}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
