import { ACCENT_TAG_STYLES } from "../components/atoms/accentTag.styles.js";
import { OUTLINE_BUTTON_STYLES } from "../components/atoms/outlineButton.styles.js";

const LAYOUT = `
.proj-page{padding:80px 60px 100px}
.proj-hero{padding:60px 0 56px;border-bottom:1px solid var(--border);margin-bottom:60px}
.proj-filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:48px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:2px;align-items:stretch}
.pc{background:var(--bg3);border:1px solid var(--border);overflow:hidden;display:flex;flex-direction:column;text-decoration:none;color:inherit;border-color:rgba(33,160,56,0);transition:border-color .3s,opacity .5s,transform .5s;opacity:0;transform:translateY(16px);min-height:100%;height:100%;box-sizing:border-box}
.pc.vis{opacity:1;transform:translateY(0)}
.pc:hover{border-color:rgba(33,160,56,.4)}
.pc:hover .pc-img{transform:scale(1.04)}
.pc-img-w{height:200px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center;position:relative}
.pc-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.pc-ph{font-size:2.5rem;opacity:.1}
.pc-type{position:absolute;top:12px;left:12px;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;padding:4px 9px;border:1px solid var(--border);background:rgba(5,14,8,.88);backdrop-filter:blur(8px)}
.pc-live{position:absolute;top:12px;right:12px;display:flex;align-items:center;gap:5px;font-size:.56rem;padding:4px 9px;background:rgba(5,14,8,.88);border:1px solid rgba(33,160,56,.28);color:var(--accent2)}
.pc-live::before{content:'';width:5px;height:5px;background:var(--accent2);border-radius:50%;animation:plg 2s infinite}
@keyframes plg{0%,100%{box-shadow:0 0 0 0 rgba(84,219,106,.5)}50%{box-shadow:0 0 0 4px rgba(84,219,106,0)}}
.pc-body{padding:24px;flex:1;display:flex;flex-direction:column;min-height:0}
.pc-name{font-family:var(--font-d);font-weight:700;font-size:1.05rem;margin-bottom:8px;flex-shrink:0}
.pc-desc{font-size:.7rem;line-height:1.7;color:var(--muted);margin-bottom:16px;flex-shrink:0}
.pc-metrics{display:flex;gap:16px;margin-bottom:14px;padding:12px;background:rgba(33,160,56,.04);border:1px solid var(--border);flex-shrink:0;min-height:4.5rem;align-items:center}
.pcm{text-align:center}
.pcm-v{font-family:var(--font-d);font-weight:700;font-size:1rem;color:var(--accent)}
.pcm-l{font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:2px}
.pc-stack{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:0;flex-shrink:0}
.pc-cta{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:6px;transition:gap .2s;margin-top:auto;flex-shrink:0;padding-top:16px}
.pc:hover .pc-cta{gap:10px}
@media(max-width:640px){.proj-page{padding:60px 24px 80px}}
`;

export const PROJECTS_PAGE_STYLES =
  LAYOUT + OUTLINE_BUTTON_STYLES + ACCENT_TAG_STYLES;
