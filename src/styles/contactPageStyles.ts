export const CONTACT_PAGE_STYLES = `
.contact-page{padding:80px 60px 100px}
.contact-wrap{display:grid;grid-template-columns:1fr 420px;gap:80px;align-items:start}
.contact-left{}
.contact-intro{font-size:.78rem;line-height:1.9;color:var(--muted);margin-bottom:40px;max-width:480px}
.contact-intro .hl{color:var(--accent)}
.contact-channels{display:flex;flex-direction:column;gap:2px;margin-bottom:48px}
.cc{display:flex;align-items:center;gap:16px;padding:18px 22px;border:1px solid var(--border);background:var(--bg3);text-decoration:none;color:inherit;transition:border-color .25s,background .25s}
.cc:hover{border-color:rgba(33,160,56,.4);background:rgba(33,160,56,.03)}
.cc-icon{font-size:1.1rem;opacity:.6;width:24px;text-align:center}
.cc-body{flex:1}
.cc-label{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
.cc-val{font-size:.78rem;color:var(--text)}
.cc-arrow{color:var(--muted);font-size:.8rem;transition:transform .2s}
.cc:hover .cc-arrow{transform:translateX(4px);color:var(--accent)}
.avail-box{padding:20px 24px;border:1px solid rgba(33,160,56,.25);background:rgba(33,160,56,.04);display:flex;align-items:center;gap:14px}
.av-dot{width:10px;height:10px;background:var(--accent2);border-radius:50%;flex-shrink:0;animation:avp 2s infinite}
@keyframes avp{0%,100%{box-shadow:0 0 0 0 rgba(84,219,106,.5)}50%{box-shadow:0 0 0 6px rgba(84,219,106,0)}}
.av-text{font-size:.7rem;line-height:1.6;color:var(--muted)}
.av-text strong{color:var(--accent2);font-weight:500}
.contact-form-wrap{}
.form-title{font-family:var(--font-d);font-weight:700;font-size:1.3rem;margin-bottom:8px}
.form-sub{font-size:.7rem;color:var(--muted);margin-bottom:32px;letter-spacing:.04em}
.mailto-note{font-size:.65rem;color:var(--muted);line-height:1.6;margin-bottom:20px;padding:12px 14px;border:1px solid var(--border);background:var(--bg3)}
.cf{display:flex;flex-direction:column;gap:16px}
.cf-group{display:flex;flex-direction:column;gap:6px}
.cf-label{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}
.cf-input,.cf-textarea,.cf-select{width:100%;font-family:var(--font-m);font-size:.75rem;padding:12px 16px;background:var(--bg3);border:1px solid var(--border);color:var(--text);outline:none;transition:border-color .2s;cursor:none}
.cf-input:focus,.cf-textarea:focus,.cf-select:focus{border-color:var(--accent)}
.cf-input::placeholder,.cf-textarea::placeholder{color:var(--muted);opacity:.6}
.cf-textarea{resize:vertical;min-height:120px}
.cf-select option{background:var(--bg2)}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.cf-submit{font-family:var(--font-m);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;padding:14px 32px;background:var(--accent);color:#fff;border:none;cursor:none;font-weight:500;transition:box-shadow .25s,transform .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);width:100%;margin-top:8px}
.cf-submit:hover:not(:disabled){box-shadow:0 0 28px rgba(33,160,56,.45);transform:translateY(-1px)}
.cf-submit:disabled{opacity:.5}
.cf-error{font-size:.65rem;color:#ff6b6b;margin-top:3px}
@media(max-width:900px){.contact-wrap{grid-template-columns:1fr}}
@media(max-width:640px){.contact-page{padding:60px 24px 80px}.cf-row{grid-template-columns:1fr}}
`;
