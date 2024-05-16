import axios from "axios";
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

export default function RadarGroupForm({
  data,
  setData,
  groupList,
  setGroupList,
  username,
}) {
  return (
    <Box>
      <FormControl sx={{ mb: "5px", mr: "5px" }}>
        <FormLabel focused={false}>Caught Multiple Shinies?</FormLabel>
        <RadioGroup
          row
          value={data.method.group}
          onChange={(e, value) => {
            if (JSON.parse(value)) {
              axios["get"](`shiny?group=true&trainer=${username}`)
                .then((res) => {
                  setGroupList([...res.data]);
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
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
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
