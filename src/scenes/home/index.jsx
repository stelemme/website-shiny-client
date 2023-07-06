
// mui imports
import { Box } from "@mui/material"

// Components imports
import Header from "../../components/Header"


export default function Home() {
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOMEPAGE" subtitle="Welcome to the Homepage"/>
      </Box>
    </Box>
  )
}
