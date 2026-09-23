/* =====================================================================
   TM CAF CASE STUDY — hand-drawn SVG diagrams (journey chain,
   monetization ladder, circular retention loop), scroll reveals,
   section-nav scrollspy, sticky bar shrink, smart back link.
   Vanilla JS, no dependencies.
   ===================================================================== */

const INK='#22201B', SOFT='rgba(34,32,27,.62)', PAPER='#FFFDF6',
      BLUE='#2B49C7', GREEN='#2E7A4F', RED='#C74B2E', YEL='#E9B93B', PINK='#C13B60';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const vert=()=>innerWidth<760;

/* =====================================================================
   1. HAND-DRAWN SVG DIAGRAMS (same builders as the portfolio)
   ===================================================================== */
function box(x,y,w,h,txt,o={}){
  return `<g filter="url(#rough)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${o.fill||PAPER}" stroke="${o.stroke||INK}" stroke-width="${o.sw||2.2}"/></g>
  <text x="${x+w/2}" y="${y+h/2+1}" text-anchor="middle" dominant-baseline="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="${o.fs||13}" letter-spacing="1" fill="${INK}">${txt}</text>`;
}
function hArrow(a,b,y){return `
  <path d="M ${a} ${y} C ${a+12} ${y-7}, ${b-12} ${y+7}, ${b-4} ${y}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M ${b-2} ${y} L ${b-13} ${y-7} M ${b-2} ${y} L ${b-13} ${y+7}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;}
function vArrow(x,a,b){return `
  <path d="M ${x} ${a} C ${x-6} ${a+8}, ${x+6} ${b-8}, ${x} ${b-3}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M ${x} ${b-1} L ${x-7} ${b-11} M ${x} ${b-1} L ${x+7} ${b-11}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;}
function open(w,h,label){return `<svg class="diag animsvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`;}

function chainH(items,o={}){
  const bw=o.bw||152,bh=o.bh||58,gap=o.gap||44,top=118,H=205;
  const W=o.w||items.length*bw+(items.length-1)*gap+40;
  const x0=20;let s=open(W,H,o.label);
  items.forEach((it,i)=>{
    const x=x0+i*(bw+gap),hl=o.hl&&o.hl.includes(i);
    s+=box(x,top,bw,bh,it.t,{stroke:it.c||(hl?RED:INK),fill:hl?'#F8E3DC':(it.f||PAPER),fs:it.fs||12.5});
    if(i<items.length-1)s+=hArrow(x+bw+3,x+bw+gap-3,top+bh/2);
    if(it.sub)s+=`<text x="${x+bw/2}" y="${top+bh+24}" text-anchor="middle" font-family="'Space Mono',monospace" font-size="8.5" letter-spacing="1" fill="${SOFT}">${it.sub}</text>`;
  });
  if(o.note){
    s+=`<text x="${o.note.x}" y="${o.note.y}" text-anchor="${o.note.anchor||'start'}" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${o.note.fill||RED}">${o.note.text}</text>`;
  }
  return s+'</svg>';
}
function chainV(items,o={}){
  const bw=250,bh=54,x=36,gap=34,H=16+items.length*bh+(items.length-1)*gap+10,W=520;
  let s=open(W,H,o.label);
  items.forEach((it,i)=>{
    const y=14+i*(bh+gap),hl=o.hl&&o.hl.includes(i);
    s+=box(x,y,bw,bh,it.t,{stroke:it.c||(hl?RED:INK),fill:hl?'#F8E3DC':(it.f||PAPER),fs:13});
    if(i<items.length-1)s+=vArrow(x+bw/2,y+bh+2,y+bh+gap-2);
  });
  return s+'</svg>';
}

/* circular retention loop: 7 nodes around a rough dashed circle,
   arrowheads on the circle between nodes, computed programmatically */
function loopSVG(){
  const nodes=['DATING TRIGGER','CAF ENTRY','FIRST SESSION','EXPERT CONTINUITY','WALLET RECHARGE','REPEAT SESSION','TM RETENTION'];
  const cx=280,cy=280,r=175,bw=128,bh=40,n=nodes.length;
  let s=open(560,560,'Retention loop from dating trigger through Caf entry, first session, expert continuity, wallet recharge, repeat session, to TM retention, conceptual');
  s+=`<g filter="url(#rough)"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SOFT}" stroke-width="2" stroke-dasharray="8 8"/></g>`;
  s+=`<g filter="url(#rough2)"><ellipse cx="${cx}" cy="${cy}" rx="66" ry="44" fill="#F5AFBF" stroke="${PINK}" stroke-width="2.8" opacity=".9"/></g>`;
  s+=`<text x="${cx}" y="${cy-4}" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="13" letter-spacing="1" fill="${PINK}">CONTINUITY</text>
      <text x="${cx}" y="${cy+16}" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="15" fill="${PINK}">the retention lever</text>`;
  nodes.forEach((t,i)=>{
    const a=(-90+i*360/n)*Math.PI/180;
    const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
    s+=box(x-bw/2,y-bh/2,bw,bh,t,{fs:9.5,stroke:i===3?PINK:INK,sw:i===3?2.6:2.2,fill:i===3?'#FBD9E2':PAPER});
    /* arrowhead at the midpoint angle between this node and the next */
    const am=(-90+(i+.5)*360/n)*Math.PI/180;
    const px=cx+r*Math.cos(am), py=cy+r*Math.sin(am);
    const dx=-Math.sin(am), dy=Math.cos(am);         /* tangent, clockwise */
    const pxn=dx/ Math.hypot(dx,dy), pyn=dy/ Math.hypot(dx,dy);
    const bx=px-pxn*11, by=py-pyn*11;
    const ox=-pyn*6, oy=pxn*6;                       /* perpendicular wings */
    s+=`<path d="M ${bx+ox} ${by+oy} L ${px} ${py} L ${bx-ox} ${by-oy}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>`;
  });
  s+=`<text x="${cx+r+22}" y="${cy-6}" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}" text-anchor="middle" transform="rotate(90 ${cx+r+22} ${cy})">feeds the dating product back</text>`;
  return s+'</svg>';
}

const FIGS={
  journeyChain(vert){
    const items=[
      {t:'TRIGGER MOMENT',sub:'unmatch / ghosting / loneliness'},
      {t:'CAF PROMPT',sub:'context-aware nudge',c:BLUE,f:'#E8EEFA'},
      {t:'EXPERT BROWSE',sub:'filtered list + trust signals'},
      {t:'FIRST SESSION',sub:'UPI payment + instant connection'},
      {t:'POST-SESSION',sub:'follow-up + rebook'},
      {t:'REPEAT USE',sub:'same expert → loyalty',c:PINK,f:'#FBD9E2'}
    ];
    return vert
      ? chainV(items,{label:'Caf journey from emotional trigger to repeat relationship, conceptual'})
      : chainH(items,{bw:150,gap:30,label:'Caf journey from emotional trigger to repeat relationship, conceptual'});
  },
  moneyLadder(vert){
    const items=[
      {t:'FREE TRIGGER',sub:'context-aware entry'},
      {t:'FIRST PAID CALL',sub:'₹2–₹5 / min',c:BLUE,f:'#E8EEFA'},
      {t:'5-MIN FREE TRIAL',sub:'reduce trust friction'},
      {t:'REPEAT USE',sub:'continuity, same expert'},
      {t:'WALLET PACKS',sub:'₹199 / ₹499 / ₹999',c:PINK,f:'#FBD9E2'}
    ];
    return vert
      ? chainV(items,{label:'Monetization ladder from free trigger to wallet packs, conceptual'})
      : chainH(items,{bw:150,gap:32,label:'Monetization ladder from free trigger to wallet packs, conceptual'});
  },
  retentionLoop(){
    return loopSVG();
  }
};

function renderFigures(){
  $$('.figbox').forEach(el=>{el.innerHTML=FIGS[el.dataset.fig](vert());});
}
renderFigures();

/* =====================================================================
   2. BEHAVIOUR: reveals, sticky bar, section-nav scrollspy, smart back
   ===================================================================== */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 $$('.reveal, .animsvg').forEach(el=>io.observe(el));

const bar=$('#csBar');
addEventListener('scroll',()=>bar.classList.toggle('scrolled',scrollY>10),{passive:true});

/* section nav scrollspy */
const navLinks=$$('#csNav a');
const spy=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-38% 0px -58% 0px'});
navLinks.forEach(a=>{const s=document.querySelector(a.getAttribute('href'));if(s)spy.observe(s);});

/* re-render diagrams on size changes so labels stay readable */
let rt;
addEventListener('resize',()=>{
  clearTimeout(rt);
  rt=setTimeout(()=>{
    renderFigures();
    $$('.figbox svg').forEach(s=>s.classList.add('in'));
  },200);
});

/* SMART BACK: if the visitor came from the portfolio (same origin,
   outside this /tmcaf folder), history.back() preserves scroll position.
   Otherwise the href (../index.html) is used as-is. */
function smartBack(e){
  let fromPortfolio=false;
  try{
    if(document.referrer){
      const u=new URL(document.referrer,location.href);
      fromPortfolio=u.origin===location.origin && !u.pathname.replace(/\/$/,'').endsWith('/tmcaf');
    }
  }catch(_){/* ignore malformed referrers */}
  if(fromPortfolio && history.length>1){
    e.preventDefault();
    history.back();
  }
}
 $('#backLink').addEventListener('click',smartBack);
 $('#backBig').addEventListener('click',smartBack);

 $('#year').textContent=new Date().getFullYear();
