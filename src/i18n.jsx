import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { messages as enMessages } from "./locales/en/messages.mjs";
import { messages as ruMessages } from "./locales/ru/messages.mjs";

const catalogs = {
  en: enMessages,
  ru: ruMessages,
};

const LocaleContext = createContext({
  locale: "en",
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

function detectLocale() {
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "ru") return saved;
  if (
    typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("ru")
  ) {
    return "ru";
  }
  return "en";
}

export function AppI18n({ children }) {
  const [locale, setLocaleState] = useState(() => {
    const loc = detectLocale();
    i18n.load(loc, catalogs[loc]);
    i18n.activate(loc);
    return loc;
  });

  const setLocale = useCallback((next) => {
    if (next !== "en" && next !== "ru") return;
    i18n.load(next, catalogs[next]);
    i18n.activate(next);
    setLocaleState(next);
    localStorage.setItem("locale", next);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
}
