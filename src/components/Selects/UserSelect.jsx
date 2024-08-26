import { useState, useEffect } from "react";

// mui imports
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Hooks
import { useUser } from "../../hooks/useData";

export default function UserSelect({
  label,
  handleChange,
  width = 120,
  size = "small",
  defaultValue = "All",
  addAll = true,
}) {
  const [userList, setUserList] = useState(["All"]);

  const { isLoading: userLoading, data: userData } = useUser("userList=true");

  useEffect(() => {
    if (!userLoading) {
      if (addAll) {
        setUserList(["All", ...userData.data]);
      } else {
        setUserList(userData.data)
      }
    }
  }, [userData, userLoading, addAll]);

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
