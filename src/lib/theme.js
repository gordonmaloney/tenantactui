import { createTheme } from "@mui/material/styles";

export function createTenantMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#4fa56d" : "#317144",
        dark: isDark ? "#78c08f" : "#285c37",
        light: isDark ? "#233a2b" : "#dcefe2",
        contrastText: isDark ? "#0f130f" : "#fffefa",
      },
      success: { main: isDark ? "#78c08f" : "#317144" },
      warning: { main: isDark ? "#efc76a" : "#b87612" },
      error: { main: isDark ? "#f08a7d" : "#a24b43" },
      background: {
        default: isDark ? "#0f130f" : "#f6f7f2",
        paper: isDark ? "#18231d" : "#ffffff",
      },
      text: {
        primary: isDark ? "#e8f0ea" : "#151d17",
        secondary: isDark ? "#aebdb2" : "#596760",
      },
      divider: isDark ? "rgba(232, 240, 234, 0.16)" : "rgba(21, 29, 23, 0.11)",
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
}

export const tenantMuiTheme = createTenantMuiTheme("light");
