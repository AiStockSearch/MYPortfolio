export const BLOG_PAGE_STYLES = `
.blog-page{padding:80px 60px 100px}
.blog-hero{padding:60px 0 56px;border-bottom:1px solid var(--border);margin-bottom:60px;display:flex;justify-content:space-between;align-items:flex-end}
.blog-hero-left{}
.blog-count{font-size:.65rem;color:var(--muted);font-family:var(--font-m);margin-top:12px;letter-spacing:.1em}
.blog-cats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:48px}
.bc-btn{font-family:var(--font-m);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;padding:7px 16px;border:1px solid var(--border);color:var(--muted);background:transparent;cursor:none;transition:border-color .2s,color .2s,background .2s}
.bc-btn:hover,.bc-btn.on{border-color:var(--accent);color:var(--accent);background:rgba(33,160,56,.05)}
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:2px}
.bcard{background:var(--bg3);border:1px solid var(--border);padding:32px;display:flex;flex-direction:column;text-decoration:none;color:inherit;transition:border-color .3s,background .3s;position:relative;overflow:hidden}
.bcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);transform:scaleX(0);transition:transform .4s}
.bcard:hover{border-color:rgba(33,160,56,.35);background:rgba(33,160,56,.02)}
.bcard:hover::before{transform:scaleX(1)}
.bcard.draft{opacity:.5}
.bc-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.bc-cat{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);padding:4px 9px;border:1px solid var(--border);background:rgba(33,160,56,.06)}
.bc-read{font-size:.58rem;color:var(--muted);letter-spacing:.06em}
.bc-date{font-size:.58rem;color:var(--muted);letter-spacing:.06em;margin-bottom:12px}
.bc-title{font-family:var(--font-d);font-weight:700;font-size:1.05rem;line-height:1.25;margin-bottom:8px}
.bc-sub{font-size:.68rem;color:var(--accent2);margin-bottom:14px;line-height:1.4}
.bc-excerpt{font-size:.7rem;line-height:1.75;color:var(--muted);flex:1;margin-bottom:20px}
.bc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:20px}
.bct{font-size:.56rem;letter-spacing:.07em;padding:3px 7px;background:rgba(33,160,56,.06);border:1px solid rgba(33,160,56,.12);color:rgba(84,219,106,.6)}
.bc-link{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:6px;transition:gap .2s}
.bcard:hover .bc-link{gap:10px}
.bc-draft-badge{font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border:1px solid rgba(255,200,0,.2);color:rgba(255,200,0,.6);background:rgba(255,200,0,.04);margin-left:8px}
@media(max-width:640px){.blog-page{padding:60px 24px 80px}.blog-hero{flex-direction:column;gap:16px;align-items:flex-start}}
`;
