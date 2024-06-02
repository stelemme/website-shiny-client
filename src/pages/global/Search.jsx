import { useSearchParams } from "react-router-dom";
import { useState } from "react";

// Mui
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Header from "../../components/Header";
import ShinyCard from "../../components/Cards/ShinyCard";
import CounterCard from "../../components/Cards/CounterCard";

// Hooks
import { useShiny, useCounter } from "../../hooks/useData";

export default function Search() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchParams, setSearchParams] = useSearchParams();
  const [countersSearch, setCountersSearch] = useState(false);

  const { isLoading: shinyLoading, data: shinyData } = useShiny(
    `search=${searchParams.get("search") ? searchParams.get("search") : false}`
  );
  const { isLoading: counterLoading, data: counterData } = useCounter(
    `?search=${searchParams.get("search") ? searchParams.get("search") : false}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.search.value) {
      setSearchParams({ search: e.target.search.value });
    } else {
      setSearchParams({});
    }
  };

  const ShinyDisplay = ({ data, loading, error, text }) => {
    if (loading) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Loading ...
        </Typography>
      );
    } else if (error) {
      return (
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          No {text} Found
        </Typography>
      );
    } else {
      return data?.map((item) => {
        console.log(item);
        return (
          <>
            {!countersSearch && (
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
            )}
            {countersSearch && item.totalEncounters > 0 && (
              <div key={item._id} style={{ marginBottom: "20px" }}>
                <CounterCard
                  id={item._id}
                  name={item.name}
                  gameSprite={item.sprite.game}
                  count={item.totalEncounters}
                  trainer={item.trainer}
                  query={"?completed=true"}
                />
              </div>
            )}
          </>
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

        <RadioGroup
          row
          value={countersSearch}
          onChange={(e, value) => {
            setCountersSearch(JSON.parse(value));
          }}
        >
          <FormControlLabel
            value={false}
            control={<Radio color="secondary" />}
            label="Shinies"
          />
          <FormControlLabel
            value={true}
            control={<Radio color="secondary" />}
            label="Counters"
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
        <ShinyDisplay
          data={
            countersSearch
              ? shinyData?.data.concat(counterData?.data)
              : shinyData?.data
          }
          loading={
            countersSearch ? shinyLoading && counterLoading : shinyLoading
          }
          error={
            countersSearch
              ? !shinyData?.data.length && !counterData?.data.length
              : !shinyData?.data.length
          }
          text={countersSearch ? "Counters" : "Pokémons"}
        />
      </Box>
    </Box>
  );
}
