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
  options = {},
  dependency = true
) => {
  const [cookies] = useCookies(["groupShinies"]);
  return useQuery({
    queryKey: [key, query, endpoint],
    queryFn: () => fetchData(endpoint, query, cookies.groupShinies, options),
    enabled: !!dependency,
  });
};

// Specific hooks using the generalized useApiQuery

export const useShiny = (query) => useApiQuery("shinies", "shiny", query);

export const useDeadShiny = (query) =>
  useApiQuery("deadshinies", "deadshiny", query);

export const useShinyId = (shinyId) =>
  useApiQuery("shiny", `shiny/${shinyId}`, "action=noEncounters");

export const useDeadShinyId = (shinyId) =>
  useApiQuery("deadshiny", `deadshiny/${shinyId}`, "action=noEncounters");

export const useCounter = (query, dependency = true) =>
  useApiQuery("counters", "counters", query, {}, dependency);

export const useUser = (query) => useApiQuery("users", "user", query);

export const useGame = (query, dependency = true) =>
  useApiQuery("game", "game", query, {}, dependency);

export const useGameId = (gameId, query, dependency = true) =>
  useApiQuery("game", `game/${gameId}`, query, {}, dependency);

export const usePokedex = (query, dependency = true) =>
  useApiQuery("pokedex", "pokedex", query, {}, dependency);

export const usePokemonId = (pokemonId) =>
  useApiQuery("pokemon", `pokedex/${pokemonId}`);
