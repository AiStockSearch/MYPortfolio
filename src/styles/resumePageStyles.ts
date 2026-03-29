export const RESUME_PAGE_STYLES = `
.resume-page{padding:80px 60px 100px}
.resume-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:60px;padding-bottom:48px;border-bottom:1px solid var(--border)}
.resume-actions{display:flex;gap:10px;flex-wrap:wrap}
.ra-btn{font-family:var(--font-m);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;padding:11px 22px;border:1px solid var(--border);color:var(--muted);background:transparent;cursor:none;transition:border-color .2s,color .2s,background .2s}
.ra-btn:hover{border-color:var(--accent);color:var(--accent);background:rgba(33,160,56,.04)}
.ra-btn.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.ra-btn.primary:hover{box-shadow:0 0 24px rgba(33,160,56,.4)}
.cv{background:var(--bg2);border:1px solid var(--border);padding:60px;max-width:900px}
.cv-top{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:start;margin-bottom:48px;padding-bottom:36px;border-bottom:1px solid var(--border)}
.cv-name{font-family:var(--font-d);font-weight:800;font-size:2.8rem;line-height:1;letter-spacing:-.02em;margin-bottom:8px}
.cv-title{font-size:.85rem;color:var(--accent);letter-spacing:.05em;margin-bottom:16px}
.cv-contact{display:flex;flex-direction:column;gap:5px}
.cv-contact a,.cv-contact span{font-size:.68rem;color:var(--muted);text-decoration:none;letter-spacing:.04em}
.cv-contact a:hover{color:var(--accent)}
.cv-photo{width:100px;height:100px;background:var(--bg3);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:2.5rem;opacity:.2;overflow:hidden;flex-shrink:0}
.cv-photo img{width:100%;height:100%;object-fit:cover;opacity:1}
.cv-section{margin-bottom:40px}
.cv-sec-title{font-family:var(--font-d);font-weight:700;font-size:.85rem;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.cv-stack-switch{display:inline-flex;flex-wrap:wrap;gap:4px;margin:0 0 18px;padding:4px;border:1px solid var(--border);background:rgba(33,160,56,.03);width:fit-content}
.cv-stack-sw{font-family:var(--font-m);font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;padding:7px 14px;border:1px solid transparent;background:transparent;color:var(--muted);cursor:pointer;transition:color .2s,border-color .2s,background .2s}
.cv-stack-sw:hover{color:var(--accent2)}
.cv-stack-sw.on{color:var(--accent);border-color:rgba(33,160,56,.35);background:rgba(33,160,56,.08)}
.cv-exp-sh{font-family:var(--font-m);font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent2);margin:0 0 16px;padding-bottom:10px;border-bottom:1px solid rgba(33,160,56,.12)}
.cv-exp-empty{font-size:.68rem;line-height:1.6;color:var(--muted);margin:0 0 18px}
.cv-exp-case-wrap{margin:0 0 10px}
.cv-exp-case{font-size:.62rem;letter-spacing:.06em;color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(33,160,56,.35)}
.cv-exp-case:hover{color:var(--accent2);border-bottom-color:var(--accent2)}
.cv-exp-ach .m{color:var(--accent);font-weight:500}
.cv-summary{font-size:.75rem;line-height:1.85;color:var(--muted)}
.cv-exp-item{margin-bottom:28px;padding-left:16px;border-left:2px solid var(--border);position:relative}
.cv-exp-item::before{content:'';position:absolute;left:-5px;top:6px;width:8px;height:8px;background:var(--accent);border-radius:50%;box-shadow:0 0 8px rgba(33,160,56,.6)}
.cv-exp-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px}
.cv-exp-role{font-family:var(--font-d);font-weight:700;font-size:.88rem}
.cv-exp-period{font-size:.62rem;color:var(--accent);letter-spacing:.06em}
.cv-exp-company{font-size:.7rem;color:var(--accent2);margin-bottom:8px;letter-spacing:.04em}
.cv-exp-desc{font-size:.7rem;line-height:1.75;color:var(--muted);margin-bottom:8px}
.cv-exp-ach{list-style:none;margin-bottom:8px}
.cv-exp-ach li{font-size:.68rem;line-height:1.65;color:var(--muted);padding-left:14px;position:relative;margin-bottom:3px}
.cv-exp-ach li::before{content:'→';position:absolute;left:0;color:var(--accent);opacity:.7;font-size:.6rem}
.cv-exp-tags{display:flex;flex-wrap:wrap;gap:4px}
.cv-etag{font-size:.56rem;letter-spacing:.06em;padding:2px 7px;background:rgba(33,160,56,.06);border:1px solid rgba(33,160,56,.12);color:rgba(84,219,106,.6)}
.cv-skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.cv-skill-group{}
.cv-sg-title{font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;opacity:.8}
.cv-sg-list{font-size:.68rem;line-height:1.8;color:var(--muted)}
.cv-sg-list a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(33,160,56,.35)}
.cv-sg-list a:hover{color:var(--accent2);border-bottom-color:var(--accent2)}
.cv-edu-item{margin-bottom:16px}
.cv-edu-deg{font-family:var(--font-d);font-weight:600;font-size:.85rem;margin-bottom:3px}
.cv-edu-inst{font-size:.7rem;color:var(--accent2);margin-bottom:2px}
.cv-edu-year{font-size:.62rem;color:var(--muted)}
.cv-ref-list{list-style:none;margin:0;padding:0}
.cv-ref-item{margin-bottom:14px;font-size:.68rem;line-height:1.65;color:var(--muted)}
.cv-ref-item a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(33,160,56,.35)}
.cv-ref-item a:hover{color:var(--accent2);border-bottom-color:var(--accent2)}
.cv-ref-note{display:block;margin-top:4px;font-size:.6rem;color:var(--muted);opacity:.85;letter-spacing:.03em}
@media print{
  .resume-page{padding:0}
  .resume-header{display:none}
  .cv{background:white;color:black;border:none;padding:40px}
  :root{--text:#111;--muted:#444;--accent:#21A038;--accent2:#1a8030;--bg2:white;--bg3:#f5f5f5;--border:#ddd}
}
@media(max-width:640px){.resume-page{padding:60px 24px 80px}.cv{padding:32px 20px}.cv-skills-grid{grid-template-columns:1fr 1fr}.resume-header{flex-direction:column;gap:16px}}
`;
