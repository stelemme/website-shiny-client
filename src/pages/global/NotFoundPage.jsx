// Mui
import { Box } from "@mui/material";

// Components
import Header from "../../components/Header";

export default function NotFoundPage() {
  return (
    <Box mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="THIS PAGE DOES NOT EXIST"
            subtitle="This page is either under constrution or will never be constructed."
          />
        </Box>
      </Box>
    </Box>
  );
}
