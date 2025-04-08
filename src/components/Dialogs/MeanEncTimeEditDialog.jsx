import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// Mui
import { Grid, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// Components
import CustomDialog from "../../components/Dialogs/CustomDialog";
import ThresholdForm from "../../components/Forms/ThresholdForm";
import MeanEncForm from "../../components/Forms/MeanEncForm";

// Functions
import { calculateMeanEncounterTime } from "../../functions/statFunctions";

// Hooks
import { useMakeRequest } from "../../hooks/useAxios";

export default function MeanEncTimeEditDialog({
  data,
  setData,
  open,
  setOpen,
  count,
  timeDifference,
  setTimeDifference,
}) {
  const { counterId } = useParams();
  const [searchParams] = useSearchParams();
  const makeRequest = useMakeRequest();

  const [thresholdEdit, setThresholdEdit] = useState(undefined);
  const [meanEncTimeEdit, setMeanEncTimeEdit] = useState(undefined);

  /* DATA FETCHING */
  useEffect(() => {
    if (data) {
      setThresholdEdit({
        lowerTimeThreshold: data.lowerTimeThreshold,
        upperTimeThreshold: data.upperTimeThreshold,
      });
      setMeanEncTimeEdit({
        meanEncounterTime: timeDifference,
      });
    }
  }, [data, timeDifference]);

  const handleThresholdEdit = async () => {
    let data = {
      lowerTimeThreshold: thresholdEdit.lowerTimeThreshold,
      upperTimeThreshold: thresholdEdit.upperTimeThreshold,
      meanEncounterTime: timeDifference,
      manualMeanEncounterTime: false,
      totalHuntTime: Math.round(timeDifference * count),
    };

    if (meanEncTimeEdit.meanEncounterTime !== timeDifference) {
      data.meanEncounterTime = meanEncTimeEdit.meanEncounterTime;
      data.manualMeanEncounterTime = true;
      data.totalHuntTime = Math.round(
        meanEncTimeEdit.meanEncounterTime * count
      );
    }

    let database = "counters";
    if (searchParams.get("completed") === "true") {
      database = "shiny";
    }

    try {
      const response = await makeRequest(
        "patch",
        `/${database}/${counterId}?action=thresholdEdit`,
        data,
        "edit"
      );

      setData(response);
      setOpen(false);
    } catch {
      return;
    }
  };

  const handleResetManualEncTime = async () => {
    const resetValue = calculateMeanEncounterTime(
      data.encounters,
      data.upperTimeThreshold,
      data.lowerTimeThreshold,
      data.increment
    );
    setTimeDifference(resetValue);
    setMeanEncTimeEdit(resetValue);

    let database = "counters";
    if (searchParams.get("completed") === "true") {
      database = "shiny";
    }

    let editData = {
      meanEncounterTime: resetValue,
      manualMeanEncounterTime: false,
      totalHuntTime: Math.round(resetValue * count),
    };

    try {
      const response = await makeRequest(
        "patch",
        `/${database}/${counterId}?action=resetMeanEncTime`,
        editData,
        "edit"
      );
      setData(response);
      setOpen(false);
    } catch {
      return;
    }
  };

  return (
    <CustomDialog
      open={open}
      handleClick={handleThresholdEdit}
      handleClose={() => {
        setOpen(false);
      }}
      title={"Edit the Thresholds"}
      content={
        <Grid container mt={1} spacing={2}>
          {data.stats.manualMeanEncounterTime && (
            <Grid item xs={12} mb={"10px"}>
              <Button
                fullWidth
                onClick={handleResetManualEncTime}
                variant="outlined"
                color="secondary"
                startIcon={<AutorenewIcon />}
              >
                Reset Mean Encounter Time
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <MeanEncForm data={meanEncTimeEdit} setData={setMeanEncTimeEdit} />
          </Grid>
          <Grid item md={6} xs={12}>
            <ThresholdForm
              data={thresholdEdit}
              setData={setThresholdEdit}
              type="lower"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ThresholdForm
              data={thresholdEdit}
              setData={setThresholdEdit}
              type="upper"
            />
          </Grid>
        </Grid>
      }
      action={"Edit"}
    />
  );
}
