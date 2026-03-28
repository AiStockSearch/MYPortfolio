import { Trans } from "@lingui/macro";
import { useLocale } from "../../i18n.jsx";
import LayoutView from "./Layout.view.jsx";
import { useLayoutChrome } from "./useLayoutChrome.js";

export default function LayoutConnected({ children }) {
  const { locale, setLocale } = useLocale();
  const chrome = useLayoutChrome();

  const navLinks = [
    { to: "/", label: <Trans>Home</Trans> },
    { to: "/projects", label: <Trans>Projects</Trans> },
    { to: "/blog", label: <Trans>Blog</Trans> },
    { to: "/resume", label: <Trans>CV</Trans> },
    { to: "/contact", label: <Trans>Contact</Trans> },
  ];

  return (
    <LayoutView
      navLinks={navLinks}
      locale={locale}
      setLocale={setLocale}
      {...chrome}
    >
      {children}
    </LayoutView>
  );
}
