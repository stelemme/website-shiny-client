import { useEffect, useState } from "react";

// Mui
import { Box, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/ShinyCard";
import SortMenu from "../../components/SortMenu";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import useAxios from "axios-hooks";

export default function Shiny() {
  const { username } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const openFilter = Boolean(anchorEl);

  const [shinies, setShinies] = useState(undefined);

  const [{ data: userData, loading: userDataLoading }] = useAxios(
    `/user?user=${username}&action=shiniesSort`
  );

  const [{ data: shinyData, loading: shinyLoading }] =
    useAxios(`/shiny?preview=shiny&sort=${userData?.user.shiniesSort}`);

  useEffect(() => {
    if (!shinyLoading) {
      setShinies(shinyData.shiny);
    }
  }, [shinyData, shinyLoading]);

  const ShinyDisplay = ({ data, loading }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else {
      return data?.map((item) => {
        return (
          <div key={item._id} style={{ marginBottom: "20px" }}>
            <ShinyCard
              id={item._id}
              name={item.name}
              gameSprite={item.sprite.game}
              dir={item.sprite.dir}
              monSprite={item.sprite.pokemon}
              trainer={item.trainer}
            />
          </div>
        );
      });
    }
  };

  return (
    <Box
      maxWidth={{ lg: "840px", md: "630px", sm: "420px" }}
      mx="auto"
      my="20px"
    >
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY POKEMON"
            subtitle="Here you can find all shinies."
          />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <SortIcon style={{ transform: "scaleX(-1)" }} />
              </IconButton>
              <SortMenu
                open={openFilter}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                data={shinies}
                setData={setShinies}
                username={username}
                sortKey="shiniesSort"
                options={["game", "pokedexNo", "date"]}
              />
        </Box>

        {/* CARDS */}
        <ShinyDisplay
          data={shinies}
          loading={shinyLoading && userDataLoading}
        />
      </Box>
    </Box>
  );
}
