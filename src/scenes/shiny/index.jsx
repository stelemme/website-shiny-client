import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load";

// Mui
import { Box, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/ShinyCard";
import SortMenu from "../../components/SortMenu";
import FilterMenu from "../../components/FilterMenu";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import useAxios from "axios-hooks";

export default function Shiny() {
  const { username } = useAuth();
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);

  const [openFilter, setOpenFilter] = useState(false);

  const [shinies, setShinies] = useState(undefined);

  const [trainerFilter, setTrainerFilter] = useState("All");

  const [{ data: userData, loading: userDataLoading }] = useAxios(
    `/user?user=${username}&action=shinies`
  );

  const [{ data: shinyData, loading: shinyLoading }] = useAxios(
    `/shiny?preview=shiny&sort=${userData?.user.shiniesSort}`
  );

  useEffect(() => {
    if (!userDataLoading) {
      setTrainerFilter(userData.user.shiniesFilter.trainer);
    }
  }, [userData, userDataLoading]);

  console.log(trainerFilter);

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
      const filteredItems =
        trainerFilter !== "All"
          ? data?.filter((item) => item.trainer === trainerFilter)
          : data;

      return filteredItems?.map((item) => {
        return (
          <LazyLoad key={item._id} height={120}>
            <div style={{ marginBottom: "20px" }}>
              <ShinyCard
                id={item._id}
                name={item.name}
                gameSprite={item.sprite.game}
                dir={item.sprite.dir}
                monSprite={item.sprite.pokemon}
                trainer={item.trainer}
              />
            </div>
          </LazyLoad>
        );
      });
    }
  };

  return (
    <Box maxWidth={{ md: "630px", sm: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SHINY POKEMON"
            subtitle="Here you can find all shinies."
          />
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={(e) => setOpenFilter(true)}>
              <FilterAltOutlinedIcon />
            </IconButton>
            <FilterMenu
              open={openFilter}
              setOpen={setOpenFilter}
              username={username}
              trainerFilter={trainerFilter}
              setTrainerFilter={setTrainerFilter}
            />
            <IconButton onClick={(e) => setAnchorElSort(e.currentTarget)}>
              <SortIcon style={{ transform: "scaleX(-1)" }} />
            </IconButton>
            <SortMenu
              open={openSort}
              anchorEl={anchorElSort}
              setAnchorEl={setAnchorElSort}
              data={shinies}
              setData={setShinies}
              username={username}
              sortKey="shiniesSort"
              options={["game", "pokedexNo", "date"]}
            />
          </Box>
        </Box>

        {/* CARDS */}
        <ShinyDisplay
          data={shinies}
          loading={shinyLoading || userDataLoading}
        />
      </Box>
    </Box>
  );
}
