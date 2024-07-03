import { useQuery } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetchShinies = (query, groupCheck) => {
  if (groupCheck) {
    return axios.get(`/shiny?filter=group&${query}`);
  } else {
    return axios.get(`/shiny?${query}`);
  }
};

export const useShiny = (query) => {
  const [cookies] = useCookies(["groupShinies"]);

  return useQuery(["shinies", query], () => fetchShinies(query, cookies.groupShinies));
};

const fetchDeadShinies = (query, groupCheck) => {
  if (groupCheck) {
    return axios.get(`/deadshiny?filter=group&${query}`);
  } else {
    return axios.get(`/deadshiny?${query}`);
  }
};

export const useDeadShiny = (query) => {
  const [cookies] = useCookies(["groupShinies"]);

  return useQuery(["deadshinies", query], () => fetchDeadShinies(query, cookies.groupCheck));
};

const fetchShiny = (shinyId) => {
  return axios.get(`/shiny/${shinyId}?action=noEncounters`);
};

export const useShinyId = (shinyId) => {
  return useQuery(["shiny", shinyId], () => fetchShiny(shinyId));
};

const fetchDeadShiny = (shinyId) => {
  return axios.get(`/deadshiny/${shinyId}?action=noEncounters`);
};

export const useDeadShinyId = (shinyId) => {
  return useQuery(["deadshiny", shinyId], () => fetchDeadShiny(shinyId));
};

const fetchCounters = (query) => {
  return axios.get(`/counters${query}`);
};

export const useCounter = (query, dependency = true) => {
  return useQuery(["counters", query], () => fetchCounters(query), {
    enabled: !!dependency,
  });
};

const fetchUsers = (query) => {
  return axios.get(`/user${query}`);
};

export const useUser = (query) => {
  return useQuery(["users", query], () => fetchUsers(query));
};

const fetchGames = (query) => {
  return axios.get(`/game${query}`);
};

export const useGame = (query, dependency = true) => {
  return useQuery(["game", query], () => fetchGames(query), {
    enabled: !!dependency,
  });
};

const fetchPokedex = (query) => {
  return axios.get(`/pokedex${query}`);
};

export const usePokedex = (query, dependency = true) => {
  return useQuery(["pokedex", query], () => fetchPokedex(query), {
    enabled: !!dependency,
  });
};
