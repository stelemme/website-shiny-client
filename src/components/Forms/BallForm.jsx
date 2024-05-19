// Mui
import { TextField, Autocomplete } from "@mui/material";

export default function BallForm({ setData, ballList, ballCheck = true }) {
  return (
    <Autocomplete
      key={ballList && ballCheck}
      disabled={!ballList}
      autoHighlight
      onChange={(e, value, reason) => {
        setData((prevState) => {
          const { ball, ...updatedData } = prevState;
          delete updatedData.sprite.ball;

          return {
            ...updatedData,
          };
        });
        if (reason === "selectOption") {
          setData((prevState) => {
            return {
              ...prevState,
              ...{
                sprite: {
                  ...prevState.sprite,
                  ball: value.sprite,
                },
                ball: value.name,
              },
            };
          });
        }
      }}
      sx={{ mb: "10px" }}
      options={ballList ? ballList : []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField required color="secondary" {...params} label="Ball" />
      )}
    />
  );
}
