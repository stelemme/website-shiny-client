// mui imports
import { Box } from "@mui/material";

// Components
import Header from "../Header";

const PageComponent = ({ title, subtitle, children, widthSnaps = 0 }) => {
  const widthMap = {
    0: {},
    1: "420px",
    2: { md: "630px", sm: "420px" },
    3: { lg: "840px", md: "630px", sm: "420px" },
  };

  return (
    <Box mx="auto" my="20px" maxWidth={widthMap[widthSnaps]}>
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={title} subtitle={subtitle} />
        </Box>

        {/* Content passed as children */}
        {children}
      </Box>
    </Box>
  );
};

export default PageComponent;
