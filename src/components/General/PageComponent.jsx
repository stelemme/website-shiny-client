// mui imports
import { Box, IconButton } from "@mui/material";

// Components
import Header from "../Header";

const PageComponent = ({
  title,
  subtitle,
  children,
  widthSnaps = 0,
  icon1 = null,
  onClickIcon1 = null,
  icon2 = null,
  onClickIcon2 = null,
}) => {
  const widthMap = {
    0: {},
    1: "420px",
    2: { md: "630px", sm: "420px" },
    3: { lg: "840px", md: "630px", sm: "420px" },
    4: { lg: "920px" },
  };

  return (
    <Box mx="auto" my="20px" maxWidth={widthMap[widthSnaps]}>
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title={title} subtitle={subtitle} />

          <Box style={{ display: "flex", alignItems: "center" }}>
            {icon1 && <IconButton onClick={onClickIcon1}>{icon1}</IconButton>}
            {icon2 && <IconButton onClick={onClickIcon2}>{icon2}</IconButton>}
          </Box>
        </Box>

        {/* Content passed as children */}
        {children}
      </Box>
    </Box>
  );
};

export default PageComponent;
