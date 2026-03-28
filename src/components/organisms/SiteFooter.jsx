import { Trans } from "@lingui/macro";
import { GITHUB_URL, TELEGRAM_URL } from "../../constants/links.js";

export default function SiteFooter() {
  return (
    <footer>
      <p>
        <Trans>© 2026 Vyacheslav Yakimov · Senior RN Engineer</Trans>
      </p>
      <p>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "var(--muted)",
            textDecoration: "none",
            marginRight: 20,
          }}
        >
          Telegram
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
