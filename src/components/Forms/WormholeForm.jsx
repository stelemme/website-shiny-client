// Mui
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";

export default function WormholeForm({ data, setData }) {
  return (
    <Box>
      <FormControl sx={{ mb: "5px", mr: "5px" }}>
        <FormLabel focused={false}>Wormhole Type</FormLabel>
        <RadioGroup
          row
          value={data.method.wormholeType}
          onChange={(e, value) => {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    wormholeType: JSON.parse(value),
                  },
                },
              };
            });
          }}
        >
          <FormControlLabel
            value={0}
            control={<Radio color="secondary" />}
            label="Type 1"
          />
          <FormControlLabel
            value={1}
            control={<Radio color="secondary" />}
            label="Type 2"
          />
          <FormControlLabel
            value={2}
            control={<Radio color="secondary" />}
            label="Type 3"
          />
          <FormControlLabel
            value={3}
            control={<Radio color="secondary" />}
            label="Type 4"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        sx={{ mb: "20px" }}
        label="Light Years"
        required
        type="number"
        color="secondary"
        onChange={(e) => {
          if (parseInt(e.target.value) > 0) {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    wormholeDistance: parseInt(e.target.value),
                  },
                },
              };
            });
          }
        }}
      ></TextField>
    </Box>
  );
}
