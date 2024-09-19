import { useState } from "react";

// mui imports
import { Box, IconButton, Tab, Tabs, useTheme, styled } from "@mui/material";
import { tokens } from "../../theme";

// Components
import Header from "./Header";

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
  tabs = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tab, setTab] = useState(1);

  const handleTabChange = (e, newTabValue) => {
    setTab(newTabValue);
  };

  const widthMap = {
    0: "100%",
    1: "420px",
    2: { md: "630px", sm: "420px" },
    3: { lg: "840px", md: "630px", sm: "420px" },
    4: { lg: "920px" },
  };

  const AntTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      border: "1px solid",
      maxWidth: "600px",
      padding: "2px 3px",
      borderRadius: 4,
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minHeight: 31,
      borderRadius: 4,
      padding: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      color: "secondary",
      fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'].join(
        ","
      ),
      "&:hover": {
        color: "secondary",
        opacity: 1,
      },
      "&.Mui-selected": {
        color: colors.grey[100],
        backgroundColor: colors.primary[400],
        fontWeight: theme.typography.fontWeightMedium,
      },
    })
  );

  return (
    <Box mx="auto" my="20px" maxWidth={widthMap[widthSnaps]}>
      <Box
        display="flex"
        flexDirection="column"
        mx="20px"
        sx={{ bgcolor: dev ? colors.primary[400] : "" }}
      >
        <Box mb="20px">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems={{ sm: "center" }}
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* HEADER */}
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
                  <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                    {select}
                  </Box>
                )}
              </Box>
            </Box>

            {tabs && (
              <Box width="100%">
                <AntTabs
                  value={tab}
                  onChange={handleTabChange}
                  aria-label="ant example"
                  variant="fullWidth"
                >
                  <AntTab label="Data" value={1} />
                  <AntTab label="Stats" value={2} />
                </AntTabs>
              </Box>
            )}

            {select && (
              <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
                {select}
              </Box>
            )}
          </Box>
        </Box>
        {/* Content passed as children */}
        {children}
      </Box>
    </Box>
  );
};

export default PageComponent;
