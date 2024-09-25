// Mui
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Components
import LoadingComponent from "../General/LoadingComponent";

export default function CheckboxDisplay({ data, name, state, setState }) {
  return (
    <LoadingComponent
      loadingCondition={!data}
      errorCondition={Array.isArray(data) && data.length === 0}
      errorText={`No ${name} Found`}
    >
      <Box mb="10px">
        <Typography variant="h5" fontWeight="bold">
          {name}
        </Typography>
        <FormGroup>
          {data?.map((item) => {
            return (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    color="secondary"
                    checked={state.some(
                      (checkedItem) => checkedItem._id === item._id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setState((prevState) => [...prevState, item]);
                      } else {
                        setState((prevState) =>
                          prevState.filter((value) => value._id !== item._id)
                        );
                      }
                    }}
                  />
                }
                label={item.name}
              />
            );
          })}
        </FormGroup>
      </Box>
    </LoadingComponent>
  );
}
