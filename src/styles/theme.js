export const BASE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#050e08;--bg2:#071209;--bg3:#0a180c;
  --accent:#21A038;--accent2:#54DB6A;--accent3:#a3ffb4;
  --text:#e8f2eb;--muted:#3d6647;--border:rgba(33,160,56,0.15);
  --font-d:'Syne',sans-serif;--font-m:'Fira Code',monospace;
  --nav-h:68px;
}
body{background:var(--bg);color:var(--text);font-family:var(--font-m);overflow-x:hidden;cursor:none}
a{cursor:none}
.cur{position:fixed;width:10px;height:10px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:width .15s,height .15s}
.cur-r{position:fixed;width:38px;height:38px;border:1px solid var(--accent);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.35;transition:width .3s,height .3s}
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);padding:0 60px;display:flex;align-items:center;justify-content:space-between;transition:background .3s,border-color .3s,backdrop-filter .3s;border-bottom:1px solid transparent}
nav.sc{background:rgba(5,14,8,.92);backdrop-filter:blur(20px);border-color:var(--border)}
.n-logo{font-family:var(--font-d);font-weight:800;font-size:1.1rem;color:var(--text);text-decoration:none;letter-spacing:.05em}
.n-logo span{color:var(--accent)}
.n-links{display:flex;gap:32px;list-style:none;align-items:center}
.n-links a{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s;font-family:var(--font-m)}
.n-links a:hover,.n-links a.active{color:var(--accent)}
.n-links a.active{border-bottom:1px solid var(--accent);padding-bottom:2px}
.n-nav-right{display:flex;align-items:center;gap:14px}
.n-menu-btn{display:none;width:38px;height:38px;align-items:center;justify-content:center;border:1px solid var(--border);background:transparent;color:var(--text);font-family:var(--font-m);font-size:1.05rem;line-height:1;padding:0;flex-shrink:0}
.n-menu-btn:hover{border-color:var(--accent);color:var(--accent)}
.n-cta{font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:9px 20px;border:1px solid var(--border);color:var(--muted);text-decoration:none;transition:border-color .2s,color .2s,background .2s;font-family:var(--font-m)}
.n-cta:hover{border-color:var(--accent);color:var(--accent);background:rgba(33,160,56,.04)}
.n-mobile-overlay{position:fixed;top:var(--nav-h);left:0;right:0;bottom:0;z-index:150;background:rgba(5,14,8,.94);backdrop-filter:blur(12px);padding:24px 20px 40px;overflow:auto;border-top:1px solid var(--border)}
.n-mobile-overlay ul{list-style:none;display:flex;flex-direction:column;gap:6px;max-width:320px;margin:0 auto}
.n-mobile-overlay a{display:block;padding:14px 18px;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;border:1px solid var(--border);transition:border-color .2s,color .2s;font-family:var(--font-m)}
.n-mobile-overlay a:hover,.n-mobile-overlay a.active{color:var(--accent);border-color:rgba(33,160,56,.45)}
footer{background:var(--bg);padding:26px 60px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border)}
footer p{font-size:.6rem;color:var(--muted);letter-spacing:.1em}
.page-wrap{padding-top:var(--nav-h)}
.sec-label{font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.sec-label::before{content:'// ';opacity:.5}
.sec-title{font-family:var(--font-d);font-weight:800;font-size:clamp(2rem,4vw,3.2rem);line-height:1.05;letter-spacing:-.02em;margin-bottom:48px}
.btn-p{font-family:var(--font-m);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;padding:12px 28px;background:var(--accent);color:#fff;border:none;cursor:none;font-weight:500;text-decoration:none;transition:box-shadow .25s,transform .2s;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);display:inline-block}
.btn-p:hover{box-shadow:0 0 28px rgba(33,160,56,.45);transform:translateY(-2px)}
.btn-s{font-family:var(--font-m);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;padding:11px 28px;background:transparent;color:var(--text);border:1px solid var(--border);cursor:none;text-decoration:none;transition:border-color .25s,color .25s;display:inline-block}
.btn-s:hover{border-color:var(--accent);color:var(--accent)}
.tag{font-size:.58rem;letter-spacing:.08em;padding:4px 9px;background:rgba(33,160,56,.07);border:1px solid rgba(33,160,56,.15);color:rgba(84,219,106,.7)}
.reveal{opacity:0;transform:translateY(18px);transition:opacity .55s ease,transform .55s ease}
.reveal.vis{opacity:1;transform:translateY(0)}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@media(max-width:640px){nav{padding:0 20px}.n-links{display:none}.n-menu-btn{display:inline-flex}footer{flex-direction:column;gap:6px;padding:20px 24px}}
`;
