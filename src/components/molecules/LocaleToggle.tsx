export default function LocaleToggle({ locale, setLocale }) {
  const btn = (code) => ({
    cursor: "none",
    border: "1px solid",
    borderColor: locale === code ? "var(--accent)" : "var(--border)",
    background: locale === code ? "rgba(33,160,56,.12)" : "transparent",
    color: locale === code ? "var(--accent)" : "var(--muted)",
    padding: "6px 10px",
    textTransform: "uppercase",
  });
  return (
    <div
      className="lang-sw"
      style={{
        display: "flex",
        gap: 4,
        fontFamily: "var(--font-m)",
        fontSize: "0.58rem",
        letterSpacing: "0.14em",
      }}
    >
      <button type="button" onClick={() => setLocale("en")} style={btn("en")}>
        EN
      </button>
      <button type="button" onClick={() => setLocale("ru")} style={btn("ru")}>
        RU
      </button>
    </div>
  );
}
