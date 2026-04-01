import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppI18n } from "./i18n";
import { initFirebaseAnalytics } from "./lib/firebaseAnalytics";

void initFirebaseAnalytics();

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Root element "#root" not found');
}

createRoot(rootEl).render(
  <StrictMode>
    <AppI18n>
      <App />
    </AppI18n>
  </StrictMode>
);
