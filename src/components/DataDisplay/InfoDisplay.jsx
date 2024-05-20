import { useState } from "react";
import axios from "axios";

// Mui
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Components
import GeneralSelect from "../../components/Selects/GeneralSelect";
import NicknameForm from "../Forms/NicknameForm";
import EndDateForm from "../Forms/EndDateForm";
import NatureForm from "../Forms/NatureForm";
import GenderForm from "../Forms/GenderForm";
import LevelForm from "../Forms/LevelForm";
import LocationsForm from "../Forms/LocationForm";
import BallForm from "../Forms/BallForm";
import SubMethodForm from "../Forms/SubMethodForm";

export default function InfoDisplay({ data: initialData, username, refetch }) {
  const [data, setData] = useState(initialData);
  const [openEdit, setOpenEdit] = useState(false);
  const [collection, setCollection] = useState("Nickname");
  const [genderCheck, setGenderCheck] = useState(false);
  const [locationsList, setLocationsList] = useState([]);
  const [ballList, setBallList] = useState([]);
  const [methodCatList, setMethodCatList] = useState([]);
  const [alertShown, setAlertShown] = useState(false)

  let initialState = {
    endDate: new Date(),
  };

  const [editData, setEditData] = useState({});

  const collectionComponents = {
    Nature: <NatureForm setData={setEditData} />,
    Gender: (
      <GenderForm
        data={editData}
        setData={setEditData}
        genderCheck={genderCheck}
      />
    ),
    Level: <LevelForm data={editData} setData={setEditData} />,
    Nickname: <NicknameForm data={editData} setData={setEditData} />,
    Ball: <BallForm setData={setEditData} ballList={ballList} />,
    "Method Category": (
      <SubMethodForm
        data={editData}
        setData={setEditData}
        methodCatList={methodCatList}
      />
    ),
    Location: (
      <LocationsForm setData={setEditData} locationsList={locationsList} />
    ),
    "Date Caught": <EndDateForm data={editData} setData={setEditData} />,
  };

  const handleChange = (e) => {
    setCollection(e.target.value);
    setEditData({});

    if (e.target.value === "Gender") {
      axios
        .get(`/pokedex?name=${data.name}`)
        .then((res) => {
          const pokemonData = res.data[0];

          if (
            pokemonData.gender === "100:0" ||
            pokemonData.gender === "0:100" ||
            pokemonData.gender === "Genderless"
          ) {
            setGenderCheck(false);
          } else {
            setGenderCheck(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value === "Location") {
      axios
        .get(`/game?name=${data.game}`)
        .then((res) => {
          setLocationsList(res.data[0].locations);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value === "Ball") {
      axios
        .get(`/game?name=${data.game}`)
        .then((res) => {
          setBallList(res.data[0].balls);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value === "Method Category") {
      axios
        .get(`/game?name=${data.game}`)
        .then((res) => {
          const method = res.data[0].methods.find(
            (method) => method.name === data.method.name
          );
          setMethodCatList(method.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.value === "Date Caught") {
      setEditData(initialState);
    }
  };

  /* EDIT THE VALUE */
  const handleEdit = () => {
    if (Object.keys(editData).length !== 0) {
      setAlertShown(false)
      let editPatchData = JSON.stringify(editData);

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `/shiny/${data._id}?editByString=${collection}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: editPatchData,
      };

      axios
        .request(config)
        .then((res) => {
          setData(res.data);
          setOpenEdit(false);
          refetch();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setAlertShown(true)
    }
  };

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

  const alertDisplay = () => {
    if (alertShown) {
      return (
        <Alert variant="filled" severity={"warning"}>
          The data is not filled in.
        </Alert>
      );
    } else {
      return null;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          mb="5px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight="bold">
            SHINY INFORMATION
          </Typography>
          {username === data.trainer && (
            <Box ml="10px" display="flex">
              <IconButton
                size="small"
                onClick={() => {
                  setOpenEdit(true);
                }}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
              <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                sx={{
                  "& .MuiDialog-paper": { width: "400px", maxWidth: "80%" },
                }}
              >
                <DialogTitle fontWeight={"bold"} variant="h4">
                  Edit an Attribute:
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                      <GeneralSelect
                        label={"Collections"}
                        handleChange={handleChange}
                        list={Object.keys(collectionComponents)}
                        value={collection}
                        width={"100%"}
                        size={"normal"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {collectionComponents[collection]}
                    </Grid>
                    <Grid item xs={12}>
                      {alertDisplay()}
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions
                  style={{ justifyContent: "right", gap: "10px" }}
                  sx={{ mb: "15px", mr: "15px" }}
                >
                  <Button
                    variant="contained"
                    color="neutral"
                    style={{ color: "white" }}
                    onClick={() => setOpenEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="neutral"
                    style={{ color: "white" }}
                    onClick={handleEdit}
                    autoFocus
                  >
                    Edit
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
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
        <InfoDict infoCat={"Level"} infoName={`lvl. ${data?.level}`} />
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
