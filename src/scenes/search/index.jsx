import { useSearchParams } from "react-router-dom";

// Mui
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/Cards/ShinyCard";

// Hooks
import { useShiny } from "../../hooks/useData";

export default function Search() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `search=${searchParams.get("search") ? searchParams.get("search") : false}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.search.value) {
      setSearchParams({ search: e.target.search.value });
    } else {
      setSearchParams({});
    }
  };

  const ShinyDisplay = ({ data, loading, error }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else if (error) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          No Pokémon Found
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
    <Box maxWidth={{ md: "630px", sm: "420px" }} mx="auto" my="20px">
      <Box display="flex" flexDirection="column" mx="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="SEARCH PAGE"
            subtitle="Here you can search for Shiny Pokémon."
          />
        </Box>

        {/* SEARCH BAR */}
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="5px"
            height="50px"
            mb="20px"
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              name="search"
              placeholder="Search"
            />
            <IconButton type="submit" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
        <ShinyDisplay data={shinyData?.data} loading={shinyLoading} error={!shinyData?.data.length}/>
      </Box>
    </Box>
  );
}
