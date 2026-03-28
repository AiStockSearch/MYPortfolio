import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppI18n } from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppI18n>
      <App />
    </AppI18n>
  </StrictMode>
);
