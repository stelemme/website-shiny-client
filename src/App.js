import { Routes, Route } from "react-router-dom"

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

// Firebase imports
import { useAuth } from "./hooks/useAuth";

function App() {
  const {login} = useAuth()
  
  const ConditionalRender = () => {
    if (login) {
      return (
        <div className="app">
          <CustomSidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
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
        <ConditionalRender/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
