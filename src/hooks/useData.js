import { useQuery } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

// Centralized fetch function
const fetchData = (endpoint, query, groupCheck = false, options = {}) => {
  const url = groupCheck
    ? `/${endpoint}?filter=group&${query}`
    : `/${endpoint}?${query}`;
  return axios.get(url, options);
};

// Generalized hook for API queries
export const useApiQuery = (
  key,
  endpoint,
  query,
  complexFilter = false,
  type = "Shiny",
  dependency = true
) => {
  const [cookies] = useCookies([
    "filterGroups",
    `filter${type}Trainer`,
    `filter${type}Gen`,
    `filter${type}Game`,
    `filter${type}Method`,
    `filter${type}Date`,
    `filter${type}PokedexNrLower`,
    `filter${type}PokedexNrUpper`,
  ]);

  if (complexFilter) {
    query =
      query +
      "&filter=complex" +
      `&filterTrainer=${cookies[`filter${type}Trainer`]}` +
      `&filterGen=${cookies[`filter${type}Gen`]}` +
      `&filterGame=${cookies[`filter${type}Game`]}` +
      `&filterMethod=${cookies[`filter${type}Method`]}` +
      `&filterDate=${cookies[`filter${type}Date`]}` +
      `&filterPokedexNrLower=${cookies[`filter${type}PokedexNrLower`]}` +
      `&filterPokedexNrUpper=${cookies[`filter${type}PokedexNrUpper`]}`;
  }

  return useQuery({
    queryKey: [key, query, endpoint, cookies.filterGroups],
    queryFn: () => fetchData(endpoint, query, cookies.filterGroups),
    enabled: !!dependency,
  });
};

// Specific hooks using the generalized useApiQuery

export const useShiny = (query, complexFilter = false, type = "Shiny") =>
  useApiQuery("shinies", "shiny", query, complexFilter, type);

export const useDeadShiny = (query) =>
  useApiQuery("deadshinies", "deadshiny", query);

export const useShinyId = (shinyId) =>
  useApiQuery("shiny", `shiny/${shinyId}`, "action=noEncounters");

export const useDeadShinyId = (shinyId) =>
  useApiQuery("deadshiny", `deadshiny/${shinyId}`, "action=noEncounters");

export const useCounter = (query, complexFilter = false) =>
  useApiQuery("counters", "counters", query, complexFilter, "Counter");

export const useUser = (query) => useApiQuery("users", "user", query);

export const useGame = (query) => useApiQuery("game", "game", query);

export const useGameId = (gameId, query) =>
  useApiQuery("game", `game/${gameId}`, query);

export const usePokedex = (query) => useApiQuery("pokedex", "pokedex", query);

export const usePokemonId = (pokemonId) =>
  useApiQuery("pokemon", `pokedex/${pokemonId}`);
