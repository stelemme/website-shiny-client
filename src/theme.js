import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles"
import Cookies from "js-cookie"

// color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#d0d1d5",
        200: "#a1a4ab",
        300: "#727681",
        400: "#1F2A40",
        500: "#141b2d",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#3c5078",
      },
      redAccent: {
        100: "#ffcdd2",
        200: "#ef9a9a",
        300: "#e57373",
        400: "#ef5350",
        500: "#f44336",
        600: "#e53935",
        700: "#d32f2f",
        800: "#c62828",
        900: "#b71c1c",
      },
      yellowAccent: {
        100: "#f7f5bc",
        200: "#f1ee8e",
        300: "#ece75f",
        400: "#e8e337",
        500: "#e5de00",
        600: "#e6cc00",
        700: "#e6b400",
        800: "#e69b00",
        900: "#e47200",
      },
      greenAccent: {
        100: "#c8e6c9",
        200: "#a5d6a7",
        300: "#81c784",
        400: "#66bb6a",
        500: "#4caf50",
        600: "#43a047",
        700: "#388e3c",
        800: "#2e7d32",
        900: "#1b5e20",
      },
      blueAccent: {
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
      },
      purpleAccent: {
        100: "#c6a8e0",
        200: "#b58dd7",
        300: "#a473ce",
        400: "#9258c4",
        500: "#8140b9",
        600: "#6f379e",
        700: "#5c2e84",
        800: "#4a2569",
        900: "#371b4f",
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0", // manually changed
        500: "#fcfcfc",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      redAccent: {
        100: "#ffcdd2",
        200: "#ef9a9a",
        300: "#e57373",
        400: "#ef5350",
        500: "#f44336",
        600: "#e53935",
        700: "#d32f2f",
        800: "#c62828",
        900: "#b71c1c",
      },
      yellowAccent: {
        100: "#f7f5bc",
        200: "#f1ee8e",
        300: "#ece75f",
        400: "#e8e337",
        500: "#e5de00",
        600: "#e6cc00",
        700: "#e6b400",
        800: "#e69b00",
        900: "#e47200",
      },
      greenAccent: {
        100: "#c8e6c9",
        200: "#a5d6a7",
        300: "#81c784",
        400: "#66bb6a",
        500: "#4caf50",
        600: "#43a047",
        700: "#388e3c",
        800: "#2e7d32",
        900: "#1b5e20",
      },
      blueAccent: {
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
      },
      purpleAccent: {
        100: "#c6a8e0",
        200: "#b58dd7",
        300: "#a473ce",
        400: "#9258c4",
        500: "#8140b9",
        600: "#6f379e",
        700: "#5c2e84",
        800: "#4a2569",
        900: "#371b4f",
      },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: "#FFFFFF",
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: "#fcfcfc",
          },
          secondary: {
            main: "#000000",
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    scrollbar: {
      width: 5,
      height: 2,
      trackColor: mode === "dark" ? colors.grey[700] : colors.grey[900],
      thumbColor: mode === "dark" ? colors.grey[500] : colors.grey[800],
      thumbHoverColor: mode === "dark" ? colors.grey[300] : colors.grey[600],
    },
  };
};

const scrollbarStyle = (theme) => {
  const { scrollbar } = theme;

  return {
    "&::-webkit-scrollbar": {
      width: scrollbar.width,
    },
    "&::-webkit-scrollbar-track": {
      background: scrollbar.trackColor,
    },
    "&::-webkit-scrollbar-thumb": {
      background: scrollbar.thumbColor,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: scrollbar.thumbHoverColor,
    },
    // Horizontal scrollbar
    "&::-webkit-scrollbar:horizontal": {
      height: scrollbar.height,
    },
    "&::-webkit-scrollbar-thumb:horizontal": {
      background: scrollbar.thumbColor,
    },
    "&::-webkit-scrollbar-thumb:hover:horizontal": {
      background: scrollbar.thumbHoverColor,
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState(Cookies.get("theme") ? Cookies.get("theme") : "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"))
        const themeCookie = Cookies.get("theme")
        Cookies.set("theme", themeCookie === "light" ? "dark" : "light")
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme({
    ...themeSettings(mode),
    components: {
      MuiCssBaseline: {
        styleOverrides: scrollbarStyle(themeSettings(mode)),
      },
    },
  }), [mode]);
  return [theme, colorMode];
};