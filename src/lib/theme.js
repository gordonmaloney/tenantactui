import { createTheme } from "@mui/material/styles";

export const tenantMuiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e633b", dark: "#13582b", light: "#dcefe2" },
    success: { main: "#1e633b" },
    warning: { main: "#b87612" },
    error: { main: "#d64a45" },
    background: { default: "#f6f4ed", paper: "#fffefa" },
    text: { primary: "#141817", secondary: "#626b64" },
    divider: "#dedbd0",
  },
  typography: {
    fontFamily: "var(--ta-font-body)",
    h1: { fontFamily: "var(--ta-font-display)", letterSpacing: 0 },
    h2: { fontFamily: "var(--ta-font-display)", letterSpacing: 0 },
    h3: { fontFamily: "var(--ta-font-display)", letterSpacing: 0 },
    button: { textTransform: "none", fontWeight: 700, letterSpacing: 0 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
