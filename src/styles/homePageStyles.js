export const HOME_PAGE_STYLES = `
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 60px 60px;position:relative;overflow:hidden}
.h-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(33,160,56,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(33,160,56,.035) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 90% 70% at 50% 0%,black 30%,transparent 100%)}
.h-glow{position:absolute;width:700px;height:700px;background:radial-gradient(circle,rgba(33,160,56,.1) 0%,transparent 70%);top:-200px;right:-150px;pointer-events:none}
.h-glow2{position:absolute;width:500px;height:500px;background:radial-gradient(circle,rgba(84,219,106,.06) 0%,transparent 70%);bottom:50px;left:-100px;pointer-events:none}
.h-term{display:inline-flex;align-items:center;gap:8px;background:rgba(33,160,56,.06);border:1px solid var(--border);padding:8px 16px;margin-bottom:26px;width:fit-content;opacity:0;animation:fadeUp .5s ease forwards .1s}
.h-term .pr{color:var(--accent2);font-size:.7rem}.h-term .cmd{color:var(--text);font-size:.7rem;letter-spacing:.02em}
.h-cb{display:inline-block;width:7px;height:14px;background:var(--accent);animation:blink .9s step-end infinite;vertical-align:middle;margin-left:2px}
.h-lbl{font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:18px;opacity:0;animation:fadeUp .6s ease forwards .3s}
.h-lbl::before{content:'// ';opacity:.5}
.h-name{font-family:var(--font-d);font-weight:800;font-size:clamp(3rem,8vw,6.8rem);line-height:.92;letter-spacing:-.02em;margin-bottom:4px;opacity:0;animation:fadeUp .7s ease forwards .45s}
.h-name .ghost{color:transparent;-webkit-text-stroke:1px rgba(232,242,235,.18)}
.h-sub{font-family:var(--font-d);font-weight:600;font-size:clamp(.9rem,2vw,1.25rem);color:var(--muted);margin-top:22px;margin-bottom:42px;line-height:1.5;opacity:0;animation:fadeUp .7s ease forwards .6s}
.h-sub .hl{color:var(--accent)}.h-sub .hl2{color:var(--accent2)}
.h-cta{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:fadeUp .7s ease forwards .75s}
.h-stats{display:flex;gap:52px;margin-top:68px;padding-top:34px;border-top:1px solid var(--border);opacity:0;animation:fadeUp .7s ease forwards .9s;flex-wrap:wrap}
.s-num{font-family:var(--font-d);font-weight:800;font-size:2.3rem;color:var(--accent);line-height:1}
.s-lbl{font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:5px}
.about-s{background:var(--bg2);padding:100px 60px}
.about-wrap{display:grid;grid-template-columns:1fr 380px;gap:80px;align-items:center}
.about-text{font-size:.78rem;line-height:1.9;color:var(--muted);margin-bottom:16px;max-width:520px}
.about-text .hl{color:var(--accent)}.about-text .hl2{color:var(--accent2)}
.about-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}
.abadge{font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border:1px solid var(--border);color:var(--muted);background:rgba(33,160,56,.03);transition:color .2s,border-color .2s}
.abadge:hover{color:var(--accent);border-color:rgba(33,160,56,.4)}
.about-photo{width:100%;aspect-ratio:3/4;background:var(--bg3);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}
.about-photo img{width:100%;height:100%;object-fit:cover;object-position:top;filter:grayscale(15%) contrast(1.05)}
.about-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(5,14,8,.6) 0%,transparent 50%)}
.photo-ph{display:flex;flex-direction:column;align-items:center;gap:10px;color:var(--muted);font-size:.63rem;letter-spacing:.1em;text-align:center;padding:20px}
.ph-icon{font-size:3rem;opacity:.15}
.about-pw{position:relative}
.ac{position:absolute;width:32px;height:32px;border-color:var(--accent);border-style:solid;border-width:0}
.ac.tl{top:-8px;left:-8px;border-top-width:2px;border-left-width:2px}
.ac.br{bottom:-8px;right:-8px;border-bottom-width:2px;border-right-width:2px}
.about-tag{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(5,14,8,.92);border:1px solid var(--border);padding:9px 18px;white-space:nowrap;z-index:2;font-size:.63rem;letter-spacing:.1em;color:var(--accent)}
.feat-s{background:var(--bg);padding:100px 60px}
.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:40px;align-items:stretch}
.feat-card{background:var(--bg3);border:1px solid var(--border);overflow:hidden;transition:border-color .3s;display:flex;flex-direction:column;text-decoration:none;color:inherit;min-height:100%;height:100%;box-sizing:border-box}
.feat-card:hover{border-color:rgba(33,160,56,.4)}
.feat-card:hover .fc-img{transform:scale(1.04)}
.fc-img-wrap{height:160px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center;position:relative}
.fc-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.fc-ph{display:flex;align-items:center;justify-content:center;font-size:2rem;opacity:.1;width:100%;height:100%}
.fc-type{position:absolute;top:12px;left:12px;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;padding:4px 9px;border:1px solid var(--border);background:rgba(5,14,8,.85);backdrop-filter:blur(8px)}
.fc-live{position:absolute;top:12px;right:12px;display:flex;align-items:center;gap:5px;font-size:.56rem;letter-spacing:.1em;padding:4px 9px;background:rgba(5,14,8,.85);border:1px solid rgba(33,160,56,.3);backdrop-filter:blur(8px);color:var(--accent2)}
.fc-live::before{content:'';width:5px;height:5px;background:var(--accent2);border-radius:50%;animation:pg2 2s infinite}
@keyframes pg2{0%,100%{box-shadow:0 0 0 0 rgba(84,219,106,.5)}50%{box-shadow:0 0 0 4px rgba(84,219,106,0)}}
.fc-body{padding:22px;flex:1;display:flex;flex-direction:column;min-height:0}
.fc-name{font-family:var(--font-d);font-weight:700;font-size:1rem;margin-bottom:8px;flex-shrink:0}
.fc-desc{font-size:.7rem;line-height:1.7;color:var(--muted);margin-bottom:14px;flex-shrink:0}
.fc-stack{display:flex;flex-wrap:wrap;gap:5px;margin-top:auto;flex-shrink:0}
.fcs{font-size:.56rem;letter-spacing:.07em;padding:3px 8px;background:rgba(33,160,56,.06);border:1px solid rgba(33,160,56,.13);color:rgba(84,219,106,.65)}
.feat-more{text-align:center}
.skills-s{background:var(--bg2);padding:100px 60px}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:2px}
.sk-card{background:var(--bg3);padding:28px;border:1px solid var(--border);transition:border-color .3s,background .3s;position:relative;overflow:hidden}
.sk-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent);transform:scaleX(0);transition:transform .4s}
.sk-card:hover{border-color:rgba(33,160,56,.35);background:rgba(33,160,56,.02)}
.sk-card:hover::before{transform:scaleX(1)}
.sk-cat{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:10px;opacity:.7}
.sk-name{font-family:var(--font-d);font-weight:700;font-size:1rem;margin-bottom:12px}
.sk-tags{display:flex;flex-wrap:wrap;gap:5px}
.sk-tag{font-size:.58rem;letter-spacing:.07em;padding:3px 8px;background:rgba(33,160,56,.06);border:1px solid var(--border);color:var(--muted);transition:color .2s}
.sk-card:hover .sk-tag{color:var(--text)}
.exp-s{background:var(--bg);padding:100px 60px}
.exp-tl{position:relative}
.exp-tl::before{content:'';position:absolute;left:0;top:8px;bottom:0;width:1px;background:linear-gradient(to bottom,var(--accent),transparent)}
.exp-item{display:grid;grid-template-columns:200px 1fr;gap:0 44px;padding-bottom:48px;position:relative;opacity:0;transform:translateX(-14px);transition:opacity .5s,transform .5s}
.exp-item.vis{opacity:1;transform:translateX(0)}
.exp-item::before{content:'';position:absolute;left:-4px;top:8px;width:9px;height:9px;background:var(--accent);border-radius:50%;box-shadow:0 0 12px rgba(33,160,56,.7)}
.exp-meta{padding-left:26px;text-align:right}
.exp-period{font-size:.63rem;color:var(--accent);letter-spacing:.07em;line-height:1.7}
.exp-co{font-size:.6rem;color:var(--muted);margin-top:4px;letter-spacing:.05em}
.exp-c{padding-left:20px}
.exp-role{font-family:var(--font-d);font-weight:700;font-size:1.05rem;margin-bottom:8px}
.exp-etag{font-family:var(--font-m);font-size:.6rem;font-weight:400;color:var(--accent2);margin-left:10px;vertical-align:middle}
.exp-desc{font-size:.72rem;line-height:1.8;color:var(--muted);margin-bottom:12px;max-width:560px}
.exp-ach{list-style:none;margin-bottom:12px}
.exp-ach li{font-size:.68rem;line-height:1.7;color:var(--muted);padding-left:16px;position:relative;margin-bottom:4px}
.exp-ach li::before{content:'→';position:absolute;left:0;color:var(--accent);opacity:.7}
.exp-ach .m{color:var(--accent);font-weight:500}
.exp-stack{display:flex;flex-wrap:wrap;gap:5px}
.est{font-size:.56rem;letter-spacing:.07em;padding:3px 8px;background:rgba(33,160,56,.04);border:1px solid rgba(33,160,56,.12);color:rgba(84,219,106,.55)}
@media(max-width:900px){.about-wrap,.feat-grid{grid-template-columns:1fr}.about-pw{max-width:320px}.exp-item{grid-template-columns:1fr}.exp-meta{text-align:left;padding-left:26px;margin-bottom:8px}}
@media(max-width:640px){.hero,.about-s,.feat-s,.skills-s,.exp-s{padding:70px 24px}.h-stats{gap:24px}}
`;
