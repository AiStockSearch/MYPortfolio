import { useState } from "react";
import LocaleToggle from "./LocaleToggle";

function Stateful() {
  const [locale, setLocale] = useState("en");
  return <LocaleToggle locale={locale} setLocale={setLocale} />;
}

export default <Stateful />;
