import { useSearchParams } from "react-router-dom";
import { useState } from "react";

// Mui
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Header from "../../components/Header";
import ShinySearchDisplay from "../../components/DataDisplay/ShinySearchDisplay";
import CounterSearchDisplay from "../../components/DataDisplay/CounterSearchDisplay";
import PokedexSearchDisplay from "../../components/DataDisplay/PokedexSearchDisplay";

export default function Search() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState("shinies");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.search.value) {
      setSearchParams({ search: e.target.search.value });
    } else {
      setSearchParams({});
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

        <RadioGroup
          row
          value={searchType}
          onChange={(e, value) => {
            setSearchType(value);
          }}
        >
          <FormControlLabel
            value={"shinies"}
            control={<Radio color="secondary" />}
            label="Shinies"
          />
          <FormControlLabel
            value={"counters"}
            control={<Radio color="secondary" />}
            label="Counters"
          />
          <FormControlLabel
            value={"pokedex"}
            control={<Radio color="secondary" />}
            label="Pokedex"
          />
        </RadioGroup>

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
        {searchType === "shinies" && (
          <ShinySearchDisplay
            pokemon={
              searchParams.get("search") ? searchParams.get("search") : false
            }
          />
        )}
        {searchType === "counters" && (
          <CounterSearchDisplay
            pokemon={
              searchParams.get("search") ? searchParams.get("search") : false
            }
          />
        )}
        {searchType === "pokedex" && (
          <PokedexSearchDisplay
            pokemon={
              searchParams.get("search") ? searchParams.get("search") : false
            }
          />
        )}
      </Box>
    </Box>
  );
}
