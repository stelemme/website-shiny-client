// Mui
import { Box } from "@mui/material";

// Components
import Header from "../../components/Header";

export default function DataManipulation() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DEV PAGE: DATA MANIPULATION"
            subtitle="Only accessible in development."
          />
        </Box>

        
      </Box>
    </Box>
  );
}
