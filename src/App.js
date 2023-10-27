import { Routes, Route } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { sidebarCollapse } from "./atoms";
import { useState, useEffect } from "react";

// mui imports
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Scenes imports
import Topbar from "./scenes/global/Topbar"
import Home from "./scenes/home"
import Login from "./scenes/login"
import CustomSidebar from "./scenes/global/Sidebar";
import Counters from "./scenes/counters";
import CountersAll from "./scenes/counters/all";
import Counter from "./scenes/counters/counterId";
import CreateCounters from "./scenes/counters/create";
import Pokédex from "./scenes/pokedex";
import PokédexRegional from "./scenes/pokedex/regional";
import GameId from "./scenes/pokedex/gameId";
import Shiny from "./scenes/shiny";
import ShinyId from "./scenes/shiny/shinyId";
import ShinyTable from "./scenes/shiny/table";
import CreateShiny from "./scenes/shiny/create";
import CreateFromCounter from "./scenes/shiny/createFromCounter";

// Firebase imports
import { useAuth } from "./hooks/useAuth";

function App() {
  const { login } = useAuth()
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

  const ConditionalRender = () => {
    if (login) {
      return (
        <div style={{ display: 'flex' }}>
          <CustomSidebar />
          <main style={{
            width: width,
            position: "relative",
            left: left,
            height: "100%",
          }}>
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/shiny" element={<Shiny />} />
              <Route path="/shiny/table" element={<ShinyTable />} />
              <Route path="/shiny/:shinyId" element={<ShinyId />} />
              <Route path="/shiny/create" element={<CreateShiny />} />
              <Route path="/shiny/create/:counterId" element={<CreateFromCounter />} />
              <Route path="/counters" element={<Counters />} />
              <Route path="/counters/all" element={<CountersAll />} />
              <Route path="/counters/create" element={<CreateCounters />} />
              <Route path="/counters/:counterId" element={<Counter />} />
              <Route path="/pokedex" element={<Pokédex />} />
              <Route path="/pokedex/regional" element={<PokédexRegional />} />
              <Route path="/pokedex/regional/:gameId" element={<GameId />} />
            </Routes>
          </main>
        </div>
      )
    } else {
      return (
        <div className="app">
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/auth" element={<Login />} />
            </Routes>
          </main>
        </div>
      )
    }
  }

  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={(colorMode)}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConditionalRender />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
