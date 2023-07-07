// mui imports
import { Box } from "@mui/material";

// Components imports
import Header from "../../components/Header";

export default function CountersAll() {
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="COMPLETED COUNTERS"
          subtitle="Here you can find all counters which are completed."
        />
      </Box>
    </Box>
  );
}
