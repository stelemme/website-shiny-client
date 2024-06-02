import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { alertOpen, alertSeverity, alertMessage } from "../../utils/atoms";

// Mui
import { Box, Typography, IconButton, Grid } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

// Components
import GeneralSelect from "../../components/Selects/GeneralSelect";
import CustomDialog from "../Dialogs/CustomDialog";
import NicknameForm from "../Forms/NicknameForm";
import EndDateForm from "../Forms/EndDateForm";
import NatureForm from "../Forms/NatureForm";
import GenderForm from "../Forms/GenderForm";
import LevelForm from "../Forms/LevelForm";
import LocationsForm from "../Forms/LocationForm";
import BallForm from "../Forms/BallForm";
import SubMethodForm from "../Forms/SubMethodForm";

// Hooks
import { useMakeRequest, useGetRequest } from "../../hooks/useAxios";

export default function InfoDisplay({
  data: initialData,
  username,
  refetch,
  isDead = false,
}) {
  const makeRequest = useMakeRequest();
  const getRequest = useGetRequest();

  const [data, setData] = useState(initialData);
  const [openEdit, setOpenEdit] = useState(false);
  const [collection, setCollection] = useState("Level");
  const [genderCheck, setGenderCheck] = useState(false);
  const [locationsList, setLocationsList] = useState([]);
  const [ballList, setBallList] = useState([]);
  const [methodCatList, setMethodCatList] = useState([]);

  const setAlertOpen = useSetRecoilState(alertOpen);
  const setAlertSeverity = useSetRecoilState(alertSeverity);
  const setAlertMessage = useSetRecoilState(alertMessage);

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

  const collectionComponentsDead = {
    Gender: (
      <GenderForm
        data={editData}
        setData={setEditData}
        genderCheck={genderCheck}
      />
    ),
    Level: <LevelForm data={editData} setData={setEditData} />,
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
    "Date Failed": <EndDateForm data={editData} setData={setEditData} />,
  };

  const handleChange = async (e) => {
    setCollection(e.target.value);
    setEditData({});

    if (e.target.value === "Gender") {
      try {
        const response = await getRequest(`/pokedex?name=${data.name}`);
        const pokemonData = response[0];

        if (
          pokemonData.gender === "100:0" ||
          pokemonData.gender === "0:100" ||
          pokemonData.gender === "Genderless"
        ) {
          setGenderCheck(false);
        } else {
          setGenderCheck(true);
        }
      } catch {
        return;
      }
    } else if (e.target.value === "Location") {
      try {
        const response = await getRequest(`/game?name=${data.game}`);
        setLocationsList(response[0].locations);
      } catch {
        return;
      }
    } else if (e.target.value === "Ball") {
      try {
        const response = await getRequest(`/game?name=${data.game}`);
        setBallList(response[0].balls);
      } catch {
        return;
      }
    } else if (e.target.value === "Method Category") {
      try {
        const response = await getRequest(`/game?name=${data.game}`);
        const method = response[0].methods.find(
          (method) => method.name === data.method.name
        );
        setMethodCatList(method.categories);
      } catch {
        return;
      }
    } else if (
      e.target.value === "Date Caught" ||
      e.target.value === "Date Failed"
    ) {
      setEditData(initialState);
    }
  };

  /* EDIT THE VALUE */
  const handleEdit = async () => {
    if (Object.keys(editData).length === 0) {
      setAlertMessage("The data is not filled in.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const url = !isDead
      ? `/shiny/${data._id}?editByString=${collection}`
      : `/deadshiny/${data._id}?editByString=${collection}`;

    try {
      const response = await makeRequest("patch", url, editData, "edit");
      setData(response);
      setOpenEdit(false);
      refetch();
    } catch (error) {
      return;
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
              <CustomDialog
                open={openEdit}
                handleClick={handleEdit}
                handleClose={() => setOpenEdit(false)}
                title={"Edit an Attribute:"}
                content={
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                      <GeneralSelect
                        label={"Collections"}
                        handleChange={handleChange}
                        list={
                          isDead
                            ? Object.keys(collectionComponentsDead)
                            : Object.keys(collectionComponents)
                        }
                        value={collection}
                        width={"100%"}
                        size={"normal"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {isDead
                        ? collectionComponentsDead[collection]
                        : collectionComponents[collection]}
                    </Grid>
                  </Grid>
                }
                action={"Edit"}
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <InfoDict infoCat={"Dex No."} infoName={`#${data?.pokedexNo}`} />
        <InfoDict infoCat={"Pokémon"} infoName={data?.name} />
        {!isDead && <InfoDict infoCat={"Nature"} infoName={data?.nature} />}
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
        {!isDead && (
          <InfoDict
            infoCat={"Nickname"}
            infoName={data?.nickname ? data?.nickname : "-"}
          />
        )}
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
          infoCat={!isDead ? "Date Caught" : "Date Failed"}
          infoName={new Date(data?.endDate).toLocaleDateString("nl-BE")}
        />
      </Grid>

      <Grid item xs={12}>
        <InfoDict
          xs1={2.75}
          xs2={9.25}
          infoCat={"Trainer"}
          infoName={data?.trainer}
        />
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
