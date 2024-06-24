import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue } from "recoil";
import { sidebarCollapse } from "./utils/atoms";
import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { CookiesProvider, useCookies } from "react-cookie";

// Firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

// mui imports
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// PAGE IMPORTS
// Counter Pages
import Counter from "./pages/counter/Counter";
import Counters from "./pages/counter/Counters";
import CreateCounter from "./pages/counter/CreateCounter";
// Global Pages
import ErrorPage from "./pages/global/ErrorPage";
import Home from "./pages/global/Home";
import Login from "./pages/global/Login";
import NotFoundPage from "./pages/global/NotFoundPage";
import Search from "./pages/global/Search";
import CustomSidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import User from "./pages/global/User";
// Info Pages
import ChangeLog from "./pages/info/ChangeLog";
// Pokedex Pages
import GamePokedex from "./pages/pokedex/GamePokedex";
import Pokédex from "./pages/pokedex/Pokedex";
import SelectPokedex from "./pages/pokedex/SelectPokedex";
// Shiny Pages
import Checklist from "./pages/shiny/Checklist";
import CreateDeadShiny from "./pages/shiny/CreateDeadShiny";
import CreateDeadShinyFromCounter from "./pages/shiny/CreateDeadShinyFromCounter";
import CreateShiny from "./pages/shiny/CreateShiny";
import CreateShinyFromCounter from "./pages/shiny/CreateShinyFromCounter";
import DeadShinies from "./pages/shiny/DeadShinies";
import DeadShiny from "./pages/shiny/DeadShiny";
import Shinies from "./pages/shiny/Shinies";
import Shiny from "./pages/shiny/Shiny";
import Table from "./pages/shiny/Table";
// Stats Pages
import Collections from "./pages/stats/Collections";
import CounterStats from "./pages/stats/CounterStats";
import Map from "./pages/stats/Map";
import ShinyStats from "./pages/stats/ShinyStats";

// Components
import CustomAlert from "./components/Alert";

if (!process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === "dev") {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BUILD;
}

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.REACT_APP_BACKEND_AUTH_TOKEN}`;

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
      { path: "/", Component: Home, loader: loader },
      {
        path: "/search",
        Component: Search,
        loader: loader,
      },
      {
        path: "/shiny",
        loader: loader,
        children: [
          { index: true, Component: Shinies },
          { path: ":shinyId", Component: Shiny },
          { path: "table", Component: Table },
          { path: "create", Component: CreateShiny },
          { path: "create/:counterId", Component: CreateShinyFromCounter },
          { path: "checklist", Component: Checklist },
          { path: "dead", Component: DeadShinies },
          { path: "dead/:deadId", Component: DeadShiny },
          { path: "dead/create", Component: CreateDeadShiny },
          {
            path: "dead/create/:counterDeadId",
            Component: CreateDeadShinyFromCounter,
          },
        ],
      },
      {
        path: "/counters",
        loader: loader,
        children: [
          { index: true, Component: Counters },
          { path: "create", Component: CreateCounter },
          { path: ":counterId", Component: Counter },
        ],
      },
      {
        path: "/user",
        loader: loader,
        children: [{ path: ":trainer", Component: User }],
      },
      {
        path: "/pokedex",
        loader: loader,
        children: [
          { index: true, Component: Pokédex },
          { path: "regional", Component: SelectPokedex },
          { path: "regional/:gameId", Component: GamePokedex },
        ],
      },
      {
        path: "/stats",
        loader: loader,
        children: [
          { index: true, Component: ShinyStats },
          { path: "counter", Component: CounterStats },
          { path: "collections", Component: Collections },
        ],
      },
      {
        path: "/map",
        loader: loader,
        children: [{ index: true, Component: Map }],
      },
      {
        path: "/changelogs",
        loader: loader,
        children: [{ index: true, Component: ChangeLog }],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const [theme, colorMode] = useMode();

  const queryClient = new QueryClient();

  const toggle = useRecoilValue(sidebarCollapse);
  const [collapse, setCollapse] = useState(false);

  const [cookies, setCookie] = useCookies([
    "checklistGenFilter",
    "collectionSelect",
    "completedCounterSort",
    "completedTrainerFilter",
    "evolutionSpriteDisplay",
    "gameSprite",
    "gameSpriteDisplay",
    "groupShinies",
    "ongoingCounterSort",
    "ongoingTrainerFilter",
    "shinyGenFilter",
    "shinySort",
    "shinyTrainerFilter",
    "theme",
  ]);

  const width = collapse
    ? "calc(100vw - 5px)"
    : toggle
    ? "calc(100vw - 100px)"
    : "calc(100vw - 260px)";
  const left = collapse ? "0px" : toggle ? "90px" : "250px";

  useEffect(() => {
    const foreverDate = new Date("9999-12-31T23:59:59");

    const defaultCookies = {
      checklistGenFilter: "All",
      collectionSelect: "All",
      completedCounterSort: "newest",
      completedTrainerFilter: "All",
      evolutionSpriteDisplay: "false",
      gameSprite: "false",
      gameSpriteDisplay: "false",
      groupShinies: "false",
      ongoingCounterSort: "newest",
      ongoingTrainerFilter: "All",
      shinyGenFilter: "All",
      shinySort: "newest",
      shinyTrainerFilter: "All",
      theme: "dark",
    };

    for (const [key, value] of Object.entries(defaultCookies)) {
      if (!cookies[key]) {
        setCookie(key, value, { expires: foreverDate });
      }
    }
  }, [cookies, setCookie]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <CssBaseline />
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  zIndex: 2000,
                }}
              >
                <CustomSidebar />
              </div>
              <main
                style={{
                  width: width,
                  position: "relative",
                  left: left,
                  top: "70px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    width: width,
                    left: left,
                    zIndex: 1000,
                  }}
                >
                  <Topbar />
                  <CustomAlert />
                </div>
                <ScrollRestoration />
                <ErrorBoundary FallbackComponent={ErrorPage}>
                  <Outlet />
                </ErrorBoundary>
              </main>
            </div>
          </CookiesProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
