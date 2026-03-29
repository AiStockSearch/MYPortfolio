export const BLOG_POST_PAGE_STYLES = `
.bp-wrap{padding:80px 60px 100px}
.bp-back{display:inline-flex;align-items:center;gap:8px;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;margin-bottom:48px;transition:color .2s}
.bp-back:hover{color:var(--accent)}
.bp-header{max-width:720px;margin-bottom:60px;padding-bottom:48px;border-bottom:1px solid var(--border)}
.bp-cat{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:16px}
.bp-cat::before{content:'// ';opacity:.5}
.bp-title{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4vw,3.4rem);line-height:1.05;letter-spacing:-.02em;margin-bottom:14px}
.bp-sub{font-size:1rem;line-height:1.6;color:var(--accent2);margin-bottom:24px}
.bp-meta{display:flex;gap:24px;align-items:center;margin-bottom:24px}
.bp-date{font-size:.63rem;color:var(--muted);letter-spacing:.08em}
.bp-read{font-size:.63rem;color:var(--muted);letter-spacing:.08em}
.bp-tags{display:flex;flex-wrap:wrap;gap:6px}
.bpt{font-size:.58rem;letter-spacing:.07em;padding:4px 9px;background:rgba(33,160,56,.07);border:1px solid rgba(33,160,56,.15);color:rgba(84,219,106,.65)}
.bp-draft-banner{background:rgba(255,200,0,.04);border:1px solid rgba(255,200,0,.2);padding:16px 24px;margin-bottom:48px;font-size:.72rem;color:rgba(255,200,0,.7);letter-spacing:.06em}
.bp-content{max-width:720px;font-size:.8rem;line-height:1.95;color:var(--muted)}
.bp-content h2{font-family:var(--font-d);font-weight:700;font-size:1.3rem;color:var(--text);margin:40px 0 16px;letter-spacing:-.01em}
.bp-content h3{font-family:var(--font-d);font-weight:600;font-size:1.05rem;color:var(--accent2);margin:28px 0 12px}
.bp-content p{margin-bottom:20px}
.bp-content strong{color:var(--text);font-weight:500}
.bp-content em{color:var(--accent2);font-style:normal}
.bp-content a{color:var(--accent);text-decoration:underline;text-underline-offset:3px;transition:color .2s}
.bp-content a:hover{color:var(--accent2)}
.bp-content code{font-family:var(--font-m);font-size:.75rem;background:rgba(33,160,56,.08);border:1px solid var(--border);padding:2px 7px;color:var(--accent3)}
.bp-content pre{background:var(--bg3);border:1px solid var(--border);padding:24px;margin:24px 0;overflow-x:auto;border-left:2px solid var(--accent)}
.bp-content pre code{background:none;border:none;padding:0;font-size:.72rem;line-height:1.7;color:var(--accent3)}
.bp-content ul,.bp-content ol{padding-left:0;margin:16px 0 24px}
.bp-content li{list-style:none;padding-left:20px;position:relative;margin-bottom:8px;font-size:.78rem}
.bp-content ul li::before{content:'→';position:absolute;left:0;color:var(--accent);opacity:.7}
.bp-content ol{counter-reset:ol}
.bp-content ol li{counter-increment:ol}
.bp-content ol li::before{content:counter(ol)'.';position:absolute;left:0;color:var(--accent);font-size:.7rem}
.bp-nav{margin-top:80px;padding-top:48px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:gap}
.bp-nav a{text-decoration:none;color:var(--muted);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;transition:color .2s;display:flex;align-items:center;gap:6px}
.bp-nav a:hover{color:var(--accent)}
@media(max-width:640px){.bp-wrap{padding:60px 24px 80px}}
`;
