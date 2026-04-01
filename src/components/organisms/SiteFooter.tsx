import { Trans } from "@lingui/macro";
import { GITHUB_URL,GITHUB_URL_AISTOCKSEARCH, TELEGRAM_URL } from "../../constants/links";
import { trackCta } from "../../lib/firebaseAnalytics";


export default function SiteFooter() {
  return (
    <footer>
      <p>
        <Trans>© 2026 Вячеслав Якимов · Senior RN инженер</Trans>
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
          onClick={() => trackCta("footer_telegram", "footer", TELEGRAM_URL, "Telegram")}
        >
          Telegram
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)", textDecoration: "none" }}
          onClick={() => trackCta("footer_github", "footer", GITHUB_URL, "GitHub")}
        >
          GitHub
        </a>
        <a
          href={GITHUB_URL_AISTOCKSEARCH}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          GitHub AiStockSearch
        </a>
      </p>
    </footer>
  );
}
