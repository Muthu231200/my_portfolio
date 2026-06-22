import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#38bdf8" },
    secondary: { main: "#818cf8" },
    success: { main: "#34d399" },
    background: {
      default: "#040810",
      paper: "#0a1628",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#64748b",
    },
    divider: "rgba(99,179,237,0.12)",
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      letterSpacing: "-1px",
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
    },
    button: {
      fontFamily: "'DM Sans', sans-serif",
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: { overflowX: "hidden" },
        "::selection": { background: "rgba(56,189,248,0.25)", color: "#fff" },
        "::-webkit-scrollbar": { width: "4px" },
        "::-webkit-scrollbar-track": { background: "#040810" },
        "::-webkit-scrollbar-thumb": { background: "#38bdf8", borderRadius: "4px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.72rem",
          letterSpacing: "0.5px",
          borderColor: "rgba(99,179,237,0.12)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#0a1628",
          border: "1px solid rgba(99,179,237,0.12)",
          borderRadius: 20,
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.35s",
        },
      },
    },
  },
});

export default theme;
