// Mui
import { TextField } from "@mui/material";

export default function NicknameForm({ data, setData }) {
  return (
    <TextField
      color="secondary"
      label="Nickname"
      fullWidth
      value={data.nickname}
      sx={{ mb: "20px" }}
      onChange={(e) => {
        setData((prevState) => {
          return {
            ...prevState,
            ...{
              nickname: e.target.value,
            },
          };
        });
      }}
    />
  );
}
