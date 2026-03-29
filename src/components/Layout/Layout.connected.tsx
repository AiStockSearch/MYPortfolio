import { Trans } from "@lingui/macro";
import { useLocale } from "../../i18n";
import LayoutView from "./Layout.view";
import { useLayoutChrome } from "./useLayoutChrome";

export default function LayoutConnected({ children }) {
  const { locale, setLocale } = useLocale();
  const chrome = useLayoutChrome();

  const navLinks = [
    { to: "/", label: <Trans>Главная</Trans> },
    { to: "/projects", label: <Trans>Проекты</Trans> },
    { to: "/blog", label: <Trans>Блог</Trans> },
    { to: "/resume", label: <Trans>Резюме</Trans> },
    { to: "/contact", label: <Trans>Контакты</Trans> },
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
