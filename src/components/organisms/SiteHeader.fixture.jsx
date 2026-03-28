import { Trans } from "@lingui/macro";
import { MemoryRouter } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";

const navLinks = [
  { to: "/", label: <Trans>Home</Trans> },
  { to: "/projects", label: <Trans>Projects</Trans> },
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
