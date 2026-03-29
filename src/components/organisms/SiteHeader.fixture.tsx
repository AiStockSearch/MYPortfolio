import { Trans } from "@lingui/macro";
import { MemoryRouter } from "react-router-dom";
import SiteHeader from "./SiteHeader";

const navLinks = [
  { to: "/", label: <Trans>Главная</Trans> },
  { to: "/projects", label: <Trans>Проекты</Trans> },
];

export default (
  <MemoryRouter>
    <SiteHeader
      scrolled={false}
      path="/"
      navLinks={navLinks}
      menuOpen={false}
      setMenuOpen={() => {}}
      locale="en"
      setLocale={() => {}}
    />
  </MemoryRouter>
);
