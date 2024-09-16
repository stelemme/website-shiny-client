// mui imports
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";

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
  dev = false,
  select = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const widthMap = {
    0: "100%",
    1: "420px",
    2: { md: "630px", sm: "420px" },
    3: { lg: "840px", md: "630px", sm: "420px" },
    4: { lg: "920px" },
  };

  return (
    <Box mx="auto" my="20px" maxWidth={widthMap[widthSnaps]}>
      <Box
        display="flex"
        flexDirection="column"
        mx="20px"
        sx={{ bgcolor: dev ? colors.primary[400] : "" }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          mb={{ xs: select ? "20px" : "0px", sm: "0px" }}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title={title} subtitle={subtitle} />

            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" justifyContent="flex-end" width="100%">
                {icon1 && (
                  <IconButton onClick={onClickIcon1}>{icon1}</IconButton>
                )}
                {icon2 && (
                  <IconButton onClick={onClickIcon2}>{icon2}</IconButton>
                )}
              </Box>
              {select && (
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>{select}</Box>
              )}
            </Box>
          </Box>

          {select && (
            <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
              {select}
            </Box>
          )}
        </Box>

        {/* Content passed as children */}
        {children}
      </Box>
    </Box>
  );
};

export default PageComponent;
