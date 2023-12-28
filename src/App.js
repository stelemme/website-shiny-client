import { Outlet, createBrowserRouter, RouterProvider, ScrollRestoration, redirect } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { sidebarCollapse } from "./atoms";
import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query"
import axios from "axios"

// Firebase imports
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./utils/firebase";

// mui imports
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Scenes imports
import Topbar from "./scenes/global/Topbar"
import Home from "./scenes/home"
import Search from "./scenes/search";
import Login from "./scenes/login"
import CustomSidebar from "./scenes/global/Sidebar";
import Counters from "./scenes/counters";
import Counter from "./scenes/counters/counterId";
import CreateCounters from "./scenes/counters/create";
import Pokédex from "./scenes/pokedex";
import PokédexRegional from "./scenes/pokedex/regional";
import GameId from "./scenes/pokedex/gameId";
import Shiny from "./scenes/shiny";
import ShinyId from "./scenes/shiny/shinyId";
import ShinyTable from "./scenes/shiny/table";
import ShinyChecklist from "./scenes/shiny/checklist";
import CreateShiny from "./scenes/shiny/create";
import CreateFromCounter from "./scenes/shiny/createFromCounter";
import ShinyStats from "./scenes/stats";
import ErrorPage from "./scenes/global/ErrorPage";

axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND;

const getUser = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();

      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

const loader = async () => {
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }
  return null;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/auth", Component: Login },
      { path: "/", Component: Home, loader: loader, },
      { path: "/search", Component: Search, loader: loader, },
      {
        path: "/shiny",
        loader: loader,
        children: [
          { index: true, Component: Shiny },
          { path: ":shinyId", Component: ShinyId },
          { path: "table", Component: ShinyTable },
          { path: "create", Component: CreateShiny },
          { path: "create/:counterId", Component: CreateFromCounter },
          { path: "checklist", Component: ShinyChecklist },
        ]
      },
      {
        path: "/counters",
        loader: loader,
        children: [
          { index: true, Component: Counters },
          { path: "create", Component: CreateCounters },
          { path: ":counterId", Component: Counter },
        ]
      },
      {
        path: "/pokedex",
        loader: loader,
        children: [
          { index: true, Component: Pokédex },
          { path: "regional", Component: PokédexRegional },
          { path: "regional/:gameId", Component: GameId },
        ]
      },
      {
        path: "/stats",
        loader: loader,
        children: [
          { index: true, Component: ShinyStats },
        ]
      },
      { path: "*", Component: ErrorPage },
    ]
  },

])

export default function App() {
  return <RouterProvider router={router} />
}

function Layout() {
  const [theme, colorMode] = useMode()

  const queryClient = new QueryClient()

  const toggle = useRecoilValue(sidebarCollapse)
  const [collapse, setCollapse] = useState(false)

  const width = collapse ? "calc(100vw - 10px)" : (toggle ? "calc(100vw - 100px)" : "calc(100vw - 260px)");
  const left = collapse ? "0px" : (toggle ? "90px" : "250px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={(colorMode)}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div style={{
            display: 'flex',
          }}>
            <div style={{
                zIndex: 2000,
              }}>
              <CustomSidebar />
            </div>
            <main style={{
              width: width,
              position: "relative",
              left: left,
              top: "70px",
              height: "100%",
            }}>
              <div style={{
                position: "fixed",
                top: 0,
                width: width,
                left: left,
                zIndex: 1000,
              }}>
                <Topbar />
              </div>
              <ScrollRestoration />
              <Outlet />
            </main>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
