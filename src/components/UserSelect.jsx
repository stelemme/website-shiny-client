import { useState, useEffect } from "react";

// mui imports
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Hooks
import useAxios from "axios-hooks";

export default function UserSelect({ label, handleChange, width=120, size="small", defaultValue }) {
  const [userList, setUserList] = useState(["All"]);

  const [{ data: userData, loading: userDataLoading }] = useAxios(
    `/user?&userList=true`
  );

  useEffect(() => {
    if (!userDataLoading) {
      setUserList(["All", ...userData.userList]);
    }
  }, [userData, userDataLoading]);

  return (
    <FormControl size={size} style={{ minWidth: width }} color="secondary">
      <InputLabel>{label} </InputLabel>
      <Select
        color="secondary"
        label={label}
        onChange={handleChange}
        value={defaultValue}
      >
        {userList.map((user, index) => (
          <MenuItem key={index} value={user}>
            {user}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
