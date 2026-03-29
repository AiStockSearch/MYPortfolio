import CursorFollower from "../organisms/CursorFollower";
import SiteFooter from "../organisms/SiteFooter";
import SiteHeader from "../organisms/SiteHeader";

export default function LayoutView({
  children,
  navLinks,
  locale,
  setLocale,
  scrolled,
  path,
  menuOpen,
  setMenuOpen,
  cursor,
  ring,
}) {
  return (
    <>
      <CursorFollower cursor={cursor} ring={ring} />
      <SiteHeader
        scrolled={scrolled}
        path={path}
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        locale={locale}
        setLocale={setLocale}
      />
      <div className="page-wrap">{children}</div>
      <SiteFooter />
    </>
  );
}
