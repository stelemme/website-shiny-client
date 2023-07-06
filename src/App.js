import { useState } from "react";
import { Routes, Route } from "react-router-dom"

// mui imports
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Scenes imports
import Topbar from "./scenes/global/Topbar"
import Home from "./scenes/home"
import Login from "./scenes/login"
import CustomSidebar from "./scenes/global/Sidebar";
import OngoingCounters from "./scenes/counters-ongoing";
import CompletedCounters from "./scenes/counters-completed";

// Firebase imports
import { useAuth } from "./hooks/useAuth";

function App() {
  const {login} = useAuth()
  const [isSidebar, setIsSidebar] = useState(true);
  
  const ConditionalRender = () => {
    if (login) {
      return (
        <div className="app">
          <CustomSidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/ongoing-counters" element={<OngoingCounters />} />
              <Route path="/completed-counters" element={<CompletedCounters />} />
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
