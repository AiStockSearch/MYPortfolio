import { AppI18n } from "./i18n.jsx";
import { BASE_CSS } from "./styles/theme.js";

/** Глобальная обёртка Cosmos: i18n и базовые стили. Router — в фикстурах при необходимости. */
export default function CosmosDecorator({ children }) {
  return (
    <AppI18n>
      <>
        <style>{BASE_CSS}</style>
        <div style={{ minHeight: "100vh", background: "var(--bg)" }}>{children}</div>
      </>
    </AppI18n>
  );
}
