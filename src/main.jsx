import React from "react";
import { createRoot } from "react-dom/client";
import "./lib/tokens/tenantact.css";
import "./catalogue/catalogue.css";
import App from "./catalogue/App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
