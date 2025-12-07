import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// mui imports
import {
  Box,
  IconButton,
  Tab,
  Tabs,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";

const PageComponent = ({
  title,
  subtitle,
  children,
  widthSnaps = 0,
  icon1 = null,
  onClickIcon1 = null,
  disableIcon1 = false,
  icon2 = null,
  onClickIcon2 = null,
  disableIcon2 = false,
  item1 = null,
  onClickItem1 = null,
  dev = false,
  select = null,
  tabs = false,
  childrenTab1 = null,
  childrenTab2 = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState("data");

  useEffect(() => {
    const tabValue = searchParams.get("tab");
    if (tabValue) {
      setTab(tabValue);
    }
  }, [searchParams]);

  const handleTabChange = (e, newTabValue) => {
    setTab(newTabValue);
    setSearchParams({ tab: newTabValue });
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
      display: "none",
    },
    "& .MuiTabs-flexContainer": {
      maxWidth: "600px",
      borderRadius: 4,
    },
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minHeight: 30,
      borderRadius: "4px 4px 0 0",
      padding: 0,
      backgroundColor: colors.primary[600],
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: "bold",
      fontVariant: "h1",
      "&:hover": {
        backgroundColor: colors.primary[700],
      },
      "&.Mui-selected": {
        color: colors.grey[100],
        backgroundColor: colors.primary[400],
        fontWeight: "bold",
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
        <Box mb={tabs ? "0px" : "15px"}>
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
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
              >
                {title}
              </Typography>
              {window.innerWidth > 500 && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" justifyContent="flex-end" width="100%">
                    {item1}
                    {icon1 && (
                      <IconButton
                        onClick={onClickIcon1}
                        disabled={disableIcon1}
                      >
                        {icon1}
                      </IconButton>
                    )}
                    {icon2 && (
                      <IconButton
                        onClick={onClickIcon2}
                        disabled={disableIcon2}
                      >
                        {icon2}
                      </IconButton>
                    )}
                  </Box>
                  {select && (
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                      {select}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="start"
            >
              <Box mb="15px">
                <Typography variant="h5" color={colors.grey[300]}>
                  {subtitle}
                </Typography>
              </Box>
              {window.innerWidth < 500 && (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" justifyContent="flex-end" width="100%">
                    {item1}
                    {icon1 && (
                      <IconButton
                        onClick={onClickIcon1}
                        disabled={disableIcon1}
                      >
                        {icon1}
                      </IconButton>
                    )}
                    {icon2 && (
                      <IconButton
                        onClick={onClickIcon2}
                        disabled={disableIcon2}
                      >
                        {icon2}
                      </IconButton>
                    )}
                  </Box>
                  {select && (
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                      {select}
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {select && (
              <Box
                sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}
                mb={tabs ? "15px" : "0px"}
              >
                {select}
              </Box>
            )}

            {tabs && (
              <Box width="100%" height="30px">
                <AntTabs
                  value={tab}
                  onChange={handleTabChange}
                  aria-label="ant example"
                  variant="fullWidth"
                >
                  <AntTab label="DATA" value={"data"} />
                  <AntTab label="STATS" value={"stats"} />
                </AntTabs>
              </Box>
            )}
          </Box>
        </Box>
        {/* Content passed as children */}
        {!tabs && children}
        {tab === "data" && childrenTab1}
        {tab === "stats" && childrenTab2}
      </Box>
    </Box>
  );
};

export default PageComponent;
