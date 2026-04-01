import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { CONTACT_EMAIL } from "../../constants/links";
import { trackCta } from "../../lib/firebaseAnalytics";
import LocaleToggle from "../molecules/LocaleToggle";
import { linkActiveClass } from "../Layout/linkActiveClass";

export default function SiteHeader({
  scrolled,
  path,
  navLinks,
  menuOpen,
  setMenuOpen,
  locale,
  setLocale,
}) {
  return (
    <>
      <nav className={scrolled ? "sc" : ""}>
        <Link to="/" className="n-logo">
          VY<span>.</span>
        </Link>
        <ul className="n-links">
          {navLinks.map(({ to, label, linkClass = "" }) => (
            <li key={to}>
              <Link
                to={to}
                className={[linkActiveClass(path, to), linkClass]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  trackCta(`nav_${to === "/" ? "home" : to.replace(/\//g, "_")}`, "header", to)
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="n-nav-right">
          <button
            type="button"
            className="n-menu-btn"
            aria-expanded={menuOpen}
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <LocaleToggle locale={locale} setLocale={setLocale} />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="n-cta"
            onClick={() =>
              trackCta("header_mailto", "header", `mailto:${CONTACT_EMAIL}`, "contact")
            }
          >
            <Trans>Связаться</Trans>
          </a>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className="n-mobile-overlay"
          role="dialog"
          aria-label="Navigation"
        >
          <ul>
            {navLinks.map(({ to, label, linkClass = "" }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={[linkActiveClass(path, to), linkClass]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    trackCta(
                      `nav_mobile_${to === "/" ? "home" : to.replace(/\//g, "_")}`,
                      "header_mobile",
                      to
                    );
                    setMenuOpen(false);
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
