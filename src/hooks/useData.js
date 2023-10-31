import { useQuery } from 'react-query'
import axios from "axios"

/* ALL SHINY DATA */
const fetchShinies = (query) => {
  return axios.get(`/shiny${query}`)
}

export const useShiny = (query) => {
  return useQuery(["shinies", query], () => fetchShinies(query))
}

/* INDIVIDUAL SHINY DATA */
const fetchShiny = (shinyId) => {
  return axios.get(`/shiny/${shinyId}?action=noEncounters`)
}

export const useShinyId = (shinyId) => {
  return useQuery(["shiny", shinyId], () => fetchShiny(shinyId))
}

/* ALL COUNTER DATA */
const fetchCounters = (query) => {
  return axios.get(`/counters${query}`)
}

export const useCounter = (query, dependency = true) => {
  return useQuery(["counters", query], () => fetchCounters(query), {
    enabled: !!dependency
  })
}

/* ALL USER DATA */
const fetchUsers = (query) => {
  return axios.get(`/user${query}`)
}

export const useUser = (query) => {
  return useQuery(["users", query], () => fetchUsers(query))
}


/* ALL GAME DATA */
const fetchGames = (query) => {
  return axios.get(`/game${query}`)
}

export const useGame = (query, dependency = true) => {
  return useQuery(["game", query], () => fetchGames(query), {
    enabled: !!dependency
  })
}

/* ALL POKEDEX DATA */
const fetchPokedex = (query) => {
  return axios.get(`/pokedex${query}`)
}

export const usePokedex = (query, dependency = true) => {
  return useQuery(["pokedex", query], () => fetchPokedex(query), {
    enabled: !!dependency
  })
}