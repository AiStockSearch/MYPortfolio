import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { CONTACT_EMAIL } from "../../constants/links.js";
import LocaleToggle from "../molecules/LocaleToggle.jsx";
import { linkActiveClass } from "../Layout/linkActiveClass.js";

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
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={linkActiveClass(path, to)}>
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
          <a href={`mailto:${CONTACT_EMAIL}`} className="n-cta">
            <Trans>Hire me</Trans>
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
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={linkActiveClass(path, to)}
                  onClick={() => setMenuOpen(false)}
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
