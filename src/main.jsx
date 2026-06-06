import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { tenantMuiTheme } from "./lib/theme.js";
import "./lib/tokens/tenantact.css";
import "./catalogue/catalogue.css";
import App from "./catalogue/App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={tenantMuiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
