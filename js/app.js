/* =====================================================================
   APP — behaviour, not content.
   ===================================================================== */

const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e);}
}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});

function observeAll(root){
  (root||document).querySelectorAll('.reveal, .animsvg').forEach(el=>io.observe(el));
}
observeAll(document);

const nav=$('#nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

const secIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)$$('.nav__links a').forEach(a=>a.classList.toggle('active',a.dataset.sec===e.target.id));
}),{rootMargin:'-40% 0px -55% 0px'});

['home','work','about','thinking','playground','contact'].forEach(id=>{
  const s=document.getElementById(id);if(s)secIO.observe(s);
});

const burger=$('#burger'),menu=$('#menu');
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  burger.setAttribute('aria-expanded',String(open));
  burger.setAttribute('aria-label',open?'Close menu':'Open menu');
  $('#main').inert=open;
  document.querySelector('.footer').inert=open;
  if(open)menu.querySelector('a').focus();
}
burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});

addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(document.body.classList.contains('menu-open'))setMenu(false);
    if(currentCase!==null) location.hash='';
  }
});

const pol=$('#polaroidWrap');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(pol&&!reduced){
  let tick=false;
  addEventListener('scroll',()=>{
    if(tick)return;
    tick=true;
    requestAnimationFrame(()=>{
      const r=pol.getBoundingClientRect(),off=(r.top-innerHeight/2)*-0.05;
      pol.style.transform=`translateY(${Math.max(-22,Math.min(22,off)).toFixed(1)}px)`;
      tick=false;
    });
  },{passive:true});
}

/* ---------- project card interaction ---------- */
const workGrid=$('#workGrid');

workGrid.addEventListener('click',e=>{
  const card=e.target.closest('.pcard[data-case]');
  if(!card)return;

  const id=card.dataset.case;
  if(!CASES[id])return;

  /*
   The CTA is a real anchor, so let the browser update the hash.
   For the rest of the card we update the hash here.
   handleHash() is the single source of truth for opening the case.
  */
  if(!e.target.closest('.pcard__cta')){
    e.preventDefault();
    if(location.hash!==`#${id}`) location.hash=id;
    else openCase(id);
  }
});

workGrid.addEventListener('keydown',e=>{
  const card=e.target.closest('.pcard[data-case]');
  if(!card)return;
  if(e.key==='Enter'||e.key===' '){
    e.preventDefault();
    const id=card.dataset.case;
    if(CASES[id]){
      if(location.hash!==`#${id}`) location.hash=id;
      else openCase(id);
    }
  }
});

/* ---------- case study overlay ---------- */
const caseView=$('#caseView');
const caseBody=$('#caseBody');
const cvPos=$('#cvPos');
const cvClose=$('#cvClose');
const cvBack=$('#cvBack');

let currentCase=null;
let lastFocus=null;

function renderCase(id){
  const c=CASES[id];

  if(!c){
    throw new Error(`Unknown case study: ${id}`);
  }

  const idx=ORDER.indexOf(id);
  const next=ORDER[(idx+1)%ORDER.length];

  if(!caseBody||!cvPos){
    throw new Error('Case study container is missing from index.html');
  }

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

caseBody.addEventListener('click',e=>{
  const b=e.target.closest('.jstg');
  if(!b)return;
  $$('.jstg').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  setJPanel(Number(b.dataset.j));
});

function openCase(id){
  if(!CASES[id])return;

  if(currentCase===id && !caseView.hidden){
    caseView.scrollTop=0;
    return;
  }

  currentCase=id;
  lastFocus=document.activeElement;

  /*
   Important fix:
   show the overlay BEFORE rendering the dynamic content.
   Previously, any rendering exception left #caseView hidden,
   making a valid #away URL look like it did nothing.
  */
  caseView.hidden=false;
  document.body.classList.add('locked');
  $('#main').inert=true;
  document.querySelector('.footer').inert=true;
  nav.inert=true;

  try{
    renderCase(id);
    caseView.scrollTop=0;
  }catch(err){
    console.error('Case study render failed:',err);
    caseBody.innerHTML=`
      <div class="a-blue">
        <p class="cs-k">CASE STUDY ${CASES[id].num}</p>
        <h2 class="cs-title">${CASES[id].title}</h2>
        <p class="cs-cat">The case study could not be rendered.</p>
        <div class="cs-sec">
          <h3>RENDERING ERROR</h3>
          <p>The case-study data loaded, but one of the interactive sections failed to render. Check the browser console for the exact error.</p>
        </div>
      </div>`;
  }

  requestAnimationFrame(()=>{
    caseView.scrollTop=0;
    if(cvClose)cvClose.focus();
  });
}

function closeCase(){
  if(currentCase===null){
    caseView.hidden=true;
    return;
  }

  currentCase=null;
  caseView.hidden=true;
  document.body.classList.remove('locked');
  $('#main').inert=false;
  document.querySelector('.footer').inert=false;
  nav.inert=false;

  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}

cvClose.addEventListener('click',()=>{location.hash='';});
cvBack.addEventListener('click',()=>{location.hash='';});

function handleHash(){
  const raw=location.hash.slice(1);
  const id=decodeURIComponent(raw).trim().toLowerCase();

  if(id && CASES[id]){
    openCase(id);
  }else{
    closeCase();
  }
}

addEventListener('hashchange',handleHash);
addEventListener('pageshow',handleHash);

/*
 Run once after all deferred scripts have executed.
 This makes direct URLs such as /Malavika/#away work on refresh.
*/
handleHash();

let rt;
addEventListener('resize',()=>{
  clearTimeout(rt);
  rt=setTimeout(()=>{
    if(currentCase)$$('.figbox').forEach(el=>{
      const fig=FIGS[el.dataset.fig];
      if(!fig)return;
      el.innerHTML=fig(vert());
      const svg=el.querySelector('svg');
      if(svg)svg.classList.add('in');
    });
  },200);
});

$('#year').textContent=new Date().getFullYear();
