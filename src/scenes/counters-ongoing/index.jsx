
// mui imports
import { Box } from "@mui/material"

// Components imports
import Header from "../../components/Header"

export default function OngoingCounters() {
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ONGOING COUNTERS" subtitle="Here you can find all counters which are not completed."/>
      </Box>
    </Box>
  )
}
