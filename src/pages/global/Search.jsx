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
import PageComponent from "../../components/General/PageComponent";
import ShinySearchDisplay from "../../components/DataDisplay/ShinySearchDisplay";
import CounterSearchDisplay from "../../components/DataDisplay/CounterSearchDisplay";
import PokedexSearchDisplay from "../../components/DataDisplay/PokedexSearchDisplay";

export default function Search() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState(
    searchParams.get("type") || "shinies"
  );
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue) {
      setSearchParams({ search: inputValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <PageComponent
      title="SEARCH PAGE"
      subtitle="Here you can search for Shiny Pokémon."
      widthSnaps={2}
    >
      <RadioGroup
        row
        value={searchType}
        onChange={(e, value) => {
          setSearchParams((prevParams) => {
            return {
              ...Object.fromEntries(prevParams),
              type: value,
            };
          });

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
            value={inputValue}
            onChange={handleInputChange}
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
    </PageComponent>
  );
}
