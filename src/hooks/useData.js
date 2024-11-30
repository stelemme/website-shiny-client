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
  dependency = true
) => {
  const [cookies] = useCookies([
    "groupShinies",
    "filterDate",
    "filterGame",
    "filterGen",
    "filterPokedexNrLower",
    "filterPokedexNrUpper",
    "filterTrainer",
  ]);

  if (complexFilter) {
    query =
      query +
      "&filter=complex" +
      `&filterTrainer=${cookies.filterTrainer}` +
      `&filterGen=${cookies.filterGen}` +
      `&filterGame=${cookies.filterGame}` +
      `&filterDate=${cookies.filterDate}` +
      `&filterPokedexNrLower=${cookies.filterPokedexNrLower}` +
      `&filterPokedexNrUpper=${cookies.filterPokedexNrUpper}`;
  }

  return useQuery({
    queryKey: [key, query, endpoint, cookies.groupShinies],
    queryFn: () => fetchData(endpoint, query, cookies.groupShinies),
    enabled: !!dependency,
  });
};

// Specific hooks using the generalized useApiQuery

export const useShiny = (query, complexFilter = false) =>
  useApiQuery("shinies", "shiny", query, complexFilter);

export const useDeadShiny = (query) =>
  useApiQuery("deadshinies", "deadshiny", query);

export const useShinyId = (shinyId) =>
  useApiQuery("shiny", `shiny/${shinyId}`, "action=noEncounters");

export const useDeadShinyId = (shinyId) =>
  useApiQuery("deadshiny", `deadshiny/${shinyId}`, "action=noEncounters");

export const useCounter = (query) => useApiQuery("counters", "counters", query);

export const useUser = (query) => useApiQuery("users", "user", query);

export const useGame = (query) => useApiQuery("game", "game", query);

export const useGameId = (gameId, query) =>
  useApiQuery("game", `game/${gameId}`, query);

export const usePokedex = (query) => useApiQuery("pokedex", "pokedex", query);

export const usePokemonId = (pokemonId) =>
  useApiQuery("pokemon", `pokedex/${pokemonId}`);
