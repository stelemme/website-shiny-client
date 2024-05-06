import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

/* ALL SHINY DATA */
const groupShinies = Cookies.get("groupShinies")
  ? Cookies.get("groupShinies")
  : false;

const groupCheck = groupShinies === "true";

const fetchShinies = (query) => {
  if (groupCheck) {
    return axios.get(`/shiny?groupShinies=true&${query}`);
  } else {
    return axios.get(`/shiny?${query}`);
  }
};

export const useShiny = (query) => {
  return useQuery(["shinies", query], () => fetchShinies(query));
};

const fetchDeadShinies = (query) => {
  if (groupCheck) {
    return axios.get(`/deadshiny?groupShinies=true&${query}`);
  } else {
    return axios.get(`/deadshiny?${query}`);
  }
};

export const useDeadShiny = (query) => {
  return useQuery(["deadshinies", query], () => fetchDeadShinies(query));
};

/* INDIVIDUAL SHINY DATA */
const fetchShiny = (shinyId) => {
  return axios.get(`/shiny/${shinyId}?action=noEncounters`);
};

export const useShinyId = (shinyId) => {
  return useQuery(["shiny", shinyId], () => fetchShiny(shinyId));
};
 
/* INDIVIDUAL DEAD SHINY DATA */
const fetchDeadShiny = (shinyId) => {
  return axios.get(`/deadshiny/${shinyId}?action=noEncounters`);
};

export const useDeadShinyId = (shinyId) => {
  return useQuery(["deadshiny", shinyId], () => fetchDeadShiny(shinyId));
};

/* ALL COUNTER DATA */
const fetchCounters = (query) => {
  return axios.get(`/counters${query}`);
};

export const useCounter = (query, dependency = true) => {
  return useQuery(["counters", query], () => fetchCounters(query), {
    enabled: !!dependency,
  });
};

/* ALL USER DATA */
const fetchUsers = (query) => {
  return axios.get(`/user${query}`);
};

export const useUser = (query) => {
  return useQuery(["users", query], () => fetchUsers(query));
};

/* ALL GAME DATA */
const fetchGames = (query) => {
  return axios.get(`/game${query}`);
};

export const useGame = (query, dependency = true) => {
  return useQuery(["game", query], () => fetchGames(query), {
    enabled: !!dependency,
  });
};

/* ALL POKEDEX DATA */
const fetchPokedex = (query) => {
  return axios.get(`/pokedex${query}`);
};

export const usePokedex = (query, dependency = true) => {
  return useQuery(["pokedex", query], () => fetchPokedex(query), {
    enabled: !!dependency,
  });
};
