/* =====================================================================
   APP — behaviour, not content.

   - scroll-reveal animations
   - sticky nav (shrink + active section highlighting)
   - mobile menu
   - gentle parallax on the polaroid
   - the case-study overlay: hash routing (#away, #c1 … #c4),
     journey stage clicks, diagram re-render on resize
   ===================================================================== */

/* ---------- scroll reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});

function observeAll(root){
  (root||document).querySelectorAll('.reveal, .animsvg').forEach(el=>io.observe(el));
}
observeAll(document);

/* ---------- sticky nav: shrink on scroll + highlight active section ---------- */
const nav=$('#nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

const secIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)$$('.nav__links a').forEach(a=>a.classList.toggle('active',a.dataset.sec===e.target.id));
}),{rootMargin:'-40% 0px -55% 0px'});
/* 'playground' stays in this list so it works the moment you re-enable the section */
['home','work','about','thinking','playground','contact'].forEach(id=>{
  const s=document.getElementById(id);if(s)secIO.observe(s);
});

/* ---------- mobile menu ---------- */
const burger=$('#burger'),menu=$('#menu');
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  burger.setAttribute('aria-expanded',open);
  burger.setAttribute('aria-label',open?'Close menu':'Open menu');
  $('#main').inert=open;document.querySelector('.footer').inert=open;
  if(open)menu.querySelector('a').focus();
}
burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});

addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(document.body.classList.contains('menu-open'))setMenu(false);
    closeCase();
  }
});

/* ---------- gentle parallax on the polaroid ---------- */
const pol=$('#polaroidWrap');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(pol&&!reduced){
  let tick=false;
  addEventListener('scroll',()=>{
    if(tick)return;tick=true;
    requestAnimationFrame(()=>{
      const r=pol.getBoundingClientRect(),off=(r.top-innerHeight/2)*-0.05;
      pol.style.transform=`translateY(${Math.max(-22,Math.min(22,off)).toFixed(1)}px)`;
      tick=false;
    });
  },{passive:true});
}

/* ---------- case study overlay (hash-routed: #away, #c1 through #c4) ---------- */
const caseView=$('#caseView'),caseBody=$('#caseBody'),cvPos=$('#cvPos');
let currentCase=null,lastFocus=null;

function renderCase(id){
  const c=CASES[id],idx=ORDER.indexOf(id),next=ORDER[(idx+1)%ORDER.length];
  curJourney=null;
  cvPos.textContent=`CASE ${c.num} / ${ORDER.length}`;
  caseBody.innerHTML=`
   <div class="a-${c.acc}">
    <p class="cs-k">CASE STUDY ${c.num}</p>
    <h2 class="cs-title">${c.title}</h2>
    <p class="cs-cat">${c.cat}</p>
    ${c.meta?`<p class="cs-meta">${c.meta}</p>`:''}
    <div class="cs-hero"><span class="n">${c.hero.n}${c.hero.d?dirIcon(c.hero.d):''}</span><span class="l">${c.hero.l}</span></div>
    ${c.secs.map(secHTML).join('')}
    ${c.outcome?`<div class="cs-outcome">${c.outcome.map(o=>`<div><span class="n">${o.n}${dirIcon(o.d)}</span><span class="l">${o.l}</span></div>`).join('')}</div>`:''}
    ${c.proposed?`<div class="cs-proposed"><span class="cs-proposed__k">PROPOSED PRIMARY METRIC</span>
      <p class="cs-proposed__v">${c.proposed.v}</p><p class="cs-proposed__l">${c.proposed.l}</p>
      <span class="cs-proposed__tag">${c.proposed.tag}</span></div>`:''}
    <div class="cs-learned"><span class="cs-learned__k">what I learned →</span><p>${c.learned}</p></div>
    <div class="cs-next">
      <span class="cs-next__k">KEEP READING</span>
      <a href="#${next}">${CASES[next].title} <svg class="ic" aria-hidden="true"><use href="#i-arr"/></svg></a>
      <a class="cs-backall" href="#work">↑ back to all work</a>
    </div>
   </div>`;
  observeAll(caseBody);
  if(curJourney)setJPanel(0);
}

/* journey stage clicks (delegated on the overlay, survives re-renders) */
caseBody.addEventListener('click',e=>{
  const b=e.target.closest('.jstg');
  if(!b)return;
  $$('.jstg').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  setJPanel(+b.dataset.j);
});

function openCase(id){
  if(currentCase===id){return;}
  currentCase=id;lastFocus=document.activeElement;
  renderCase(id);
  caseView.hidden=false;
  requestAnimationFrame(()=>caseView.scrollTop=0);
  document.body.classList.add('locked');
  $('#main').inert=true;document.querySelector('.footer').inert=true;nav.inert=true;
  $('#cvClose').focus();
}
function closeCase(){
  if(currentCase===null)return;
  currentCase=null;caseView.hidden=true;
  document.body.classList.remove('locked');
  $('#main').inert=false;document.querySelector('.footer').inert=false;nav.inert=false;
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
 $('#cvClose').addEventListener('click',()=>{location.hash='';});
 $('#cvBack').addEventListener('click',()=>{location.hash='';});

function handleHash(){
  const h=location.hash.slice(1);
  if(CASES[h])openCase(h);else closeCase();
}
addEventListener('hashchange',handleHash);
handleHash();

/* re-render diagrams on orientation/size changes so labels stay readable */
let rt;
addEventListener('resize',()=>{
  clearTimeout(rt);
  rt=setTimeout(()=>{
    if(currentCase)$$('.figbox').forEach(el=>{
      el.innerHTML=FIGS[el.dataset.fig](vert());
      el.querySelector('svg').classList.add('in');
    });
  },200);
});

/* footer year */
 $('#year').textContent=new Date().getFullYear();
