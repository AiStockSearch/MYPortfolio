/**
 * Генерирует SVG-обложки для карточек и hero проектов.
 * Запуск: node scripts/generate-project-covers.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "projects");

const IDS = [
  "mirapolis-lms",
  "mobility-top",
  "haqqex-wallet",
  "flowwow-erp",
  "hawex-crypto",
  "freedom-finance",
  "dv-group",
  "innopolis-zencar",
  "sparkling-tide",
  "mytradelink",
  "bizonex",
  "pilot-retail",
  "cosmo-fusion-dao",
  "carelink",
  "wls-trading",
];

/** Градиенты [от, до] — по одному на проект, чтобы карточки отличались в сетке. */
const PALETTES = {
  "mirapolis-lms": ["#0c4a6e", "#22d3ee"],
  "mobility-top": ["#292524", "#f97316"],
  "haqqex-wallet": ["#1e1b4b", "#a78bfa"],
  "flowwow-erp": ["#14532d", "#4ade80"],
  "hawex-crypto": ["#422006", "#fbbf24"],
  "freedom-finance": ["#172554", "#60a5fa"],
  "dv-group": ["#1c1917", "#78716c"],
  "innopolis-zencar": ["#164e63", "#2dd4bf"],
  "sparkling-tide": ["#134e4a", "#5eead4"],
  mytradelink: ["#312e81", "#818cf8"],
  bizonex: ["#4a044e", "#e879f9"],
  "pilot-retail": ["#7f1d1d", "#f87171"],
  "cosmo-fusion-dao": ["#0f172a", "#38bdf8"],
  carelink: ["#064e3b", "#34d399"],
  "wls-trading": ["#052e16", "#4ade80"],
};

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFromId(id) {
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const id of IDS) {
  const [c1, c2] = PALETTES[id] ?? ["#1e293b", "#64748b"];
  const label = titleFromId(id);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="rgba(0,0,0,0.12)"/>
  <text x="72" y="300" fill="rgba(255,255,255,0.95)" font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="52" font-weight="700">${escapeXml(label)}</text>
  <text x="72" y="368" fill="rgba(255,255,255,0.45)" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="500">Portfolio case study</text>
</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, `${id}.svg`), svg, "utf8");
}

console.log(`Wrote ${IDS.length} SVG covers to ${path.relative(ROOT, OUT_DIR)}`);
