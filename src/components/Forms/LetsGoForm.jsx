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

export default function LetsGoForm({ data, setData }) {
  return (
    <Box>
      <FormControl sx={{ mb: "5px", mr: "5px" }}>
        <FormLabel focused={false}>Lure</FormLabel>
        <RadioGroup
          row
          value={data.method.lure}
          onChange={(e, value) => {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    lure: JSON.parse(value),
                  },
                },
              };
            });
          }}
        >
          <FormControlLabel
            value={true}
            control={<Radio color="secondary" />}
            label="Active"
          />
          <FormControlLabel
            value={false}
            control={<Radio color="secondary" />}
            label="Not Active"
          />
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ mb: "5px" }}>
        <FormLabel focused={false}>Chain Matters?</FormLabel>
        <RadioGroup
          row
          value={data.method.chainMatters}
          onChange={(e, value) => {
            setData((prevState) => {
              return {
                ...prevState,
                ...{
                  method: {
                    ...prevState.method,
                    chainMatters: JSON.parse(value),
                  },
                },
              };
            });
          }}
        >
          <FormControlLabel
            value={false}
            control={<Radio color="secondary" />}
            label="False"
          />
          <FormControlLabel
            value={true}
            control={<Radio color="secondary" />}
            label="True"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        sx={{ mb: "20px" }}
        label="Chain Length"
        required
        disabled={!data.method.chainMatters}
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
                    letsGoChain: parseInt(e.target.value),
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
