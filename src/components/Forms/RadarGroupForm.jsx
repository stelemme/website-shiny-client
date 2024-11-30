// Mui
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
} from "@mui/material";

// Hooks
import { useGetRequest } from "../../hooks/useAxios";

export default function RadarGroupForm({
  data,
  setData,
  groupList,
  setGroupList,
  username,
}) {
  const getRequest = useGetRequest();

  return (
    <Box>
      <FormControl sx={{ mb: "5px", mr: "5px" }}>
        <FormLabel focused={false}>Caught Multiple Shinies?</FormLabel>
        <RadioGroup
          row
          value={data.method.group}
          onChange={async (e, value) => {
            if (!JSON.parse(value)) {
              setGroupList(undefined);
              setData((prevState) => {
                delete prevState.group;
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      group: JSON.parse(value),
                    },
                  },
                };
              });
            }
            try {
              const response = await getRequest(
                `shiny?list=groupList&trainer=${username}`
              );
              setGroupList([...response[0]?.groups]);
              setData((prevState) => {
                return {
                  ...prevState,
                  ...{
                    method: {
                      ...prevState.method,
                      group: JSON.parse(value),
                    },
                    group: `${username}-${
                      data.name
                    }-${data.endDate.toLocaleDateString("nl-NL")}`,
                  },
                };
              });
            } catch {
              return;
            }
          }}
        >
          <FormControlLabel
            value={false}
            control={<Radio color="secondary" />}
            label="No"
          />
          <FormControlLabel
            value={true}
            control={<Radio color="secondary" />}
            label="Yes"
          />
        </RadioGroup>
      </FormControl>
      <Autocomplete
        required
        key={groupList}
        disabled={!groupList}
        autoHighlight
        value={data.group}
        onChange={(e, value, reason) => {
          if (reason === "selectOption") {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  group: value,
                },
              };
            });
          }
        }}
        sx={{ mb: "20px" }}
        options={groupList ? groupList : []}
        isOptionEqualToValue={(option, value) =>
          value ===
          `${username}-${data.name}-${data.endDate.toLocaleDateString("nl-NL")}`
        }
        renderInput={(params) => (
          <TextField required color="secondary" {...params} label="Group" />
        )}
      />
    </Box>
  );
}
