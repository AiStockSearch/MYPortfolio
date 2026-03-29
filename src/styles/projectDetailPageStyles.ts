export const PROJECT_DETAIL_PAGE_STYLES = `
.pd-wrap{padding:80px 60px 100px;max-width:1100px}
.pd-back{display:inline-flex;align-items:center;gap:8px;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;margin-bottom:48px;transition:color .2s}
.pd-back:hover{color:var(--accent)}
.pd-header{display:grid;grid-template-columns:1fr 320px;gap:60px;align-items:start;margin-bottom:60px;padding-bottom:60px;border-bottom:1px solid var(--border)}
.pd-type{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.pd-type::before{content:'// ';opacity:.5}
.pd-title{font-family:var(--font-d);font-weight:800;font-size:clamp(2.2rem,5vw,4rem);line-height:1;letter-spacing:-.02em;margin-bottom:16px}
.pd-tagline{font-size:.85rem;line-height:1.7;color:var(--muted);margin-bottom:32px;max-width:500px}
.pd-links{display:flex;gap:10px;flex-wrap:wrap}
.pdl{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;padding:10px 20px;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:border-color .2s,color .2s,background .2s;display:flex;align-items:center;gap:6px}
.pdl:hover{border-color:var(--accent);color:var(--accent);background:rgba(33,160,56,.04)}
.pdl.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.pdl.primary:hover{box-shadow:0 0 24px rgba(33,160,56,.4)}
.pd-side{}
.pd-metrics{background:var(--bg3);border:1px solid var(--border);padding:28px;margin-bottom:16px}
.pd-metrics-title{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:20px;opacity:.7}
.pm-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
.pm-row:last-child{border-bottom:none}
.pm-key{font-size:.65rem;color:var(--muted);letter-spacing:.06em}
.pm-val{font-family:var(--font-d);font-weight:700;font-size:1rem;color:var(--accent)}
.pd-stack-box{background:var(--bg3);border:1px solid var(--border);padding:24px}
.pd-stack-title{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;opacity:.7}
.pd-stags{display:flex;flex-wrap:wrap;gap:6px}
.pd-stag{font-size:.6rem;letter-spacing:.07em;padding:5px 10px;background:rgba(33,160,56,.07);border:1px solid rgba(33,160,56,.15);color:rgba(84,219,106,.7)}
.pd-img{width:100%;aspect-ratio:16/7;background:var(--bg3);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:60px;overflow:hidden}
.pd-img-inner{width:100%;height:100%;object-fit:cover;display:block}
.pd-img-ph{font-size:4rem;opacity:.08}
.pd-body{display:grid;grid-template-columns:1fr 280px;gap:60px}
.pd-main{}
.pd-section-title{font-family:var(--font-d);font-weight:700;font-size:1.2rem;margin-bottom:16px;color:var(--text)}
.pd-text{font-size:.75rem;line-height:1.9;color:var(--muted);margin-bottom:28px}
.pd-prose{font-size:.75rem;line-height:1.9;color:var(--muted);margin-bottom:28px}
.pd-prose h2{font-family:var(--font-d);font-weight:700;font-size:1.15rem;color:var(--text);margin:28px 0 12px}
.pd-prose h3{font-family:var(--font-d);font-weight:600;font-size:1rem;color:var(--accent2);margin:20px 0 10px}
.pd-prose p{margin-bottom:16px}
.pd-prose strong{color:var(--text);font-weight:500}
.pd-prose em{color:var(--accent2);font-style:normal}
.pd-prose a{color:var(--accent);text-decoration:underline;text-underline-offset:3px}
.pd-prose code{font-family:var(--font-m);font-size:.72rem;background:rgba(33,160,56,.08);border:1px solid var(--border);padding:2px 6px;color:var(--accent3)}
.pd-prose pre{background:var(--bg3);border:1px solid var(--border);padding:20px;margin:20px 0;overflow-x:auto;border-left:2px solid var(--accent)}
.pd-prose pre code{background:none;border:none;padding:0;font-size:.7rem}
.pd-prose ul,.pd-prose ol{padding-left:0;margin:12px 0 20px}
.pd-prose li{list-style:none;padding-left:18px;position:relative;margin-bottom:6px;font-size:.74rem}
.pd-prose ul li::before{content:'→';position:absolute;left:0;color:var(--accent);opacity:.7}
.pd-inline-metrics,.pd-inline-stack{background:var(--bg3);border:1px solid var(--border);padding:24px;margin-bottom:28px}
.pd-sidebar{}
.pd-info-box{background:var(--bg3);border:1px solid var(--border);padding:24px;margin-bottom:16px}
.pib-label{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.pib-val{font-size:.75rem;color:var(--text);line-height:1.6}
.pd-next{margin-top:80px;padding-top:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.pd-next-lbl{font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.pd-next-name{font-family:var(--font-d);font-weight:700;font-size:1.1rem}
.pd-next a{text-decoration:none;color:inherit;transition:color .2s}
.pd-next a:hover{color:var(--accent)}
.pd-partner{margin-bottom:28px;padding:16px 20px;border:1px solid var(--border);background:var(--bg3)}
.pd-partner-link,.pd-partner-static{display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit}
.pd-partner-logo{max-height:36px;width:auto;object-fit:contain}
.pd-partner-fallback{font-size:1.5rem;opacity:.3}
.pd-partner-name{font-size:.75rem;color:var(--text)}
.pd-app-links{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
.pd-app-link{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;padding:10px 18px;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:border-color .2s,color .2s}
.pd-app-link:hover{border-color:var(--accent);color:var(--accent)}
.pd-figure{margin-bottom:32px}
.pd-figure-img-wrap{width:100%;aspect-ratio:16/9;background:var(--bg3);border:1px solid var(--border);overflow:hidden;display:flex;align-items:center;justify-content:center}
.pd-figure-img{width:100%;height:100%;object-fit:cover;display:block}
.pd-figure-cap{font-size:.65rem;color:var(--muted);margin-top:10px;letter-spacing:.04em}
@media(max-width:900px){.pd-header,.pd-body{grid-template-columns:1fr}.pd-wrap{padding:60px 24px 80px}}
`;
