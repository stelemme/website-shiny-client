import { useState, useEffect } from "react";

// mui imports
import { Autocomplete, TextField } from "@mui/material";

// Hooks
import { useUser } from "../../hooks/useData";

export default function UserMultipleSelect({
  label,
  handleChange,
  size = "small",
  value = [],
  fullWidth = false,
}) {
  const [userList, setUserList] = useState([]);

  const { isLoading: userLoading, data: userData } = useUser("list=users");

  const userListData = userData?.data[0].names;

  useEffect(() => {
    if (!userLoading) {
      setUserList(userListData);
    }
  }, [userListData, userLoading]);

  return (
    <Autocomplete
      autoHighlight
      multiple
      disableCloseOnSelect
      value={value}
      onChange={handleChange}
      options={userList}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          size={size}
          fullWidth={fullWidth}
          color="secondary"
          {...params}
          label={label}
        />
      )}
    />
  );
}
