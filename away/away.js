/* =====================================================================
   A-WAY CASE STUDY — diagrams, interactive journey, prioritisation
   matrix, application/document filters, reveals and the smart
   back-to-portfolio link. Vanilla JS, no dependencies.
   ===================================================================== */

/* ---------- shared colors (keep in sync with away.css) ---------- */
const INK='#22201B', SOFT='rgba(34,32,27,.62)', PAPER='#FFFDF6',
      BLUE='#2B49C7', GREEN='#2E7A4F', RED='#C74B2E', YEL='#E9B93B', AMB='#9A6A00';

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const vert=()=>innerWidth<640;

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
  });
  if(o.note){
    s+=`<text x="${o.note.x}" y="${o.note.y}" text-anchor="${o.note.anchor||'start'}" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${o.note.fill||RED}">${o.note.text}</text>`;
  }
  return s+'</svg>';
}
function chainV(items,o={}){
  const bw=230,bh=54,x=36,gap=32,H=16+items.length*bh+(items.length-1)*gap+10,W=500;
  let s=open(W,H,o.label);
  items.forEach((it,i)=>{
    const y=14+i*(bh+gap),hl=o.hl&&o.hl.includes(i);
    s+=box(x,y,bw,bh,it.t,{stroke:it.c||(hl?RED:INK),fill:hl?'#F8E3DC':(it.f||PAPER),fs:13});
    if(i<items.length-1)s+=vArrow(x+bw/2,y+bh+2,y+bh+gap-2);
    if(hl&&o.hlLabel){
      const cy=y+bh/2;
      s+=`<path d="M ${x+bw+10} ${cy} L ${x+bw+44} ${cy}" fill="none" stroke="${RED}" stroke-width="2.2" stroke-linecap="round"/>
      <text x="${x+bw+52}" y="${cy+7}" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">${o.hlLabel}</text>`;
    }
  });
  return s+'</svg>';
}

const FIGS={
  /* FIG. 01: the journey vs the org chart */
  journeyDepts(vert){
    const stages=['LEAD','COUNSELLING','ELIGIBILITY','SHORTLIST','APPLICATION','OFFER','VISA','PRE-DEPARTURE'];
    if(vert){
      let s=open(370,830,'One student journey above, five departments below, conceptual reconstruction');
      let y=12;
      stages.forEach((t,i)=>{
        s+=box(40,y,220,40,t,{fs:11});
        if(i<stages.length-1)s+=vArrow(150,y+42,y+70);
        y+=70;
      });
      s+=`<text x="40" y="${y+10}" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">…but the consultancy sees five departments:</text>`;
      const dy=y+24;
      ['COUNSELLOR','ADMISSIONS','VISA OFFICER','FINANCE','ADMIN'].forEach((d,i)=>{
        const col=i%2,row=(i-i%2)/2;
        s+=box(40+col*160,dy+row*54,145,40,d,{fs:9.5,stroke:SOFT,sw:1.8});
      });
      s+=`<text x="40" y="${dy+54*3+14}" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">every arrow = a handoff</text>
          <text x="40" y="${dy+54*3+42}" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${SOFT}">same student, different teams</text>`;
      return s+'</svg>';
    }
    const bw=104,bh=44,gap=14,x0=18,y1=30,W=966,H=262;
    let s=open(W,H,'One student journey above, five departments below, conceptual reconstruction');
    stages.forEach((t,i)=>{
      const x=x0+i*(bw+gap);
      s+=box(x,y1,bw,bh,t,{fs:10});
      if(i<stages.length-1)s+=hArrow(x+bw+1,x+bw+gap-1,y1+bh/2);
    });
    const depts=['COUNSELLOR','ADMISSIONS','VISA OFFICER','FINANCE','ADMIN'];
    const dw=156,dgp=22,total=5*dw+4*dgp,dx0=(W-total)/2,y2=200;
    depts.forEach((d,i)=>{
      const x=dx0+i*(dw+dgp),cx=x+dw/2;
      s+=`<path d="M ${cx} ${y2-4} C ${cx-6} 168, ${cx+6} 128, ${cx} ${y1+bh+6}" fill="none" stroke="${SOFT}" stroke-width="1.8" stroke-dasharray="5 6" filter="url(#rough)"/>`;
      s+=box(x,y2,dw,44,d,{fs:10,stroke:SOFT,sw:1.8});
    });
    s+=`<text x="34" y="106" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${RED}">every arrow = a handoff</text>
        <text x="932" y="106" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${SOFT}">same student, different teams</text>`;
    return s+'</svg>';
  },
  /* FIG. 02: from information to action, NEXT ACTION highlighted in blue */
  infoFlow(vert){
    const items=[
      {t:'STUDENT INFORMATION',fs:11},
      {t:'CURRENT STAGE'},
      {t:'CURRENT BLOCKER'},
      {t:'NEXT ACTION',c:BLUE,f:'#E8EEFA'},
      {t:'OWNER'}
    ];
    return vert
      ? chainV(items,{hlLabel:'the whole product',label:'From student information to owned next action, conceptual reconstruction'})
      : chainH(items,{bw:150,gap:36,note:{x:646,y:210,text:'↑ the whole product',fill:RED,anchor:'start'},label:'From student information to owned next action, conceptual reconstruction'});
  },
  /* FIG. 03: the MVP spine */
  mvpChain(vert){
    const items=[{t:'GET'},{t:'UNDERSTAND'},{t:'MOVE'},{t:'UNBLOCK'}].map(i=>({...i,c:BLUE,f:'#E8EEFA'}));
    return vert
      ? chainV(items,{label:'MVP spine, conceptual'})
      : chainH(items,{bw:160,gap:48,label:'MVP spine, conceptual'});
  },
  /* FIG. 04: application lifecycle */
  appStates(vert){
    const items=[
      {t:'SHORTLISTED'},{t:'DOCUMENTS'},{t:'SUBMITTED'},{t:'UNDER REVIEW'},
      {t:'OFFER',c:GREEN,f:'#E4F0E6'},{t:'ACCEPTED / REJECTED',c:RED,f:'#F8E3DC'}
    ];
    return vert
      ? chainV(items,{label:'Application lifecycle, conceptual reconstruction'})
      : chainH(items,{bw:140,gap:30,label:'Application lifecycle, conceptual reconstruction'});
  }
};

function renderFigures(){
  $$('.figbox').forEach(el=>{
    el.innerHTML=FIGS[el.dataset.fig](vert());
  });
}
renderFigures();

/* =====================================================================
   2. INTERACTIVE STUDENT JOURNEY
   ===================================================================== */
const JOURNEY=[
 {n:'01',t:'LEAD',what:'An enquiry arrives: website form, call, WhatsApp or a walk-in. First contact, first impression.',
  owner:'Counsellor (intake)',info:'Source, contact details, destination and course interest',
  blocker:'Incomplete or duplicated lead information',next:'Qualify the lead and assign a clear owner'},
 {n:'02',t:'COUNSELLING',what:'The first real conversation: academics, budget, timeline, and what the student actually wants.',
  owner:'Counsellor',info:'Academic history, budget, preferences, constraints',
  blocker:'Notes scattered across calls and chats; context gets re-asked',next:'Log a counselling summary and schedule eligibility'},
 {n:'03',t:'ELIGIBILITY',what:'Reality check: do the academics, tests and funds match the courses on the table?',
  owner:'Counsellor',info:'Entry requirements, test scores, financial readiness',
  blocker:'Assessment criteria living in people\u2019s heads',next:'Confirm realistic options and rule out the rest'},
 {n:'04',t:'SHORTLIST',what:'Narrowing the field to universities that fit, with reasons attached.',
  owner:'Counsellor + student',info:'Universities, deadlines, fees, preference ranking',
  blocker:'Preferences discussed but never recorded',next:'Save the shortlist with reasons, visible to everyone'},
 {n:'05',t:'APPLICATION',what:'Submitting to universities: forms, documents, fees, deadlines.',
  owner:'Admissions',info:'Application status, university, deadline, documents',
  blocker:'Missing document (a frequent one: the SOP)',next:'Request the document from the student'},
 {n:'06',t:'OFFER',what:'Offers arrive, each with conditions and their own acceptance deadlines.',
  owner:'Admissions + counsellor',info:'Offer conditions, deadlines, comparison criteria',
  blocker:'Decision pending while deadlines approach',next:'Call the student and work the decision'},
 {n:'07',t:'VISA',what:'The document-heavy sprint: forms, appointments, biometrics, waiting.',
  owner:'Visa Officer',info:'Visa documents, appointment status, timelines',
  blocker:'Appointment pending or a stale document',next:'Follow up on the appointment or refresh the document'},
 {n:'08',t:'PRE-DEPARTURE',what:'The long tail: fees, accommodation, flights, checklists.',
  owner:'Counsellor + operations',info:'Task list, owners, dates, travel details',
  blocker:'Many small tasks with no clear owner',next:'Assign every remaining task an owner and a date'},
 {n:'09',t:'COMPLETION',what:'The student flies out. The journey closes; the relationship shouldn\u2019t.',
  owner:'Counsellor',info:'Enrolment confirmation, feedback, referral potential',
  blocker:'The record goes cold once the student leaves',next:'Close the journey cleanly and keep the story alive'}
];

const jWrap=$('#awJourney'), jPanel=$('#awJpanel');
const jArrow=`<svg class="farr" viewBox="0 0 30 16" aria-hidden="true"><path d="M2 8 C 10 5, 20 11, 27 8 M22 3 l6 5 -6 5"/></svg>`;

jWrap.innerHTML=JOURNEY.map((s,i)=>
  `${i>0?jArrow:''}<button class="aw-jstage" role="tab" aria-selected="${i===0}" data-j="${i}">${s.n} ${s.t}</button>`
).join('');

function selectStage(i){
  const s=JOURNEY[i];
  $$('.aw-jstage').forEach(b=>b.setAttribute('aria-selected',String(+b.dataset.j===i)));
  jPanel.innerHTML=`
    <p class="jp__stage">${s.n} · ${s.t}</p>
    <p class="jp__k">WHAT HAPPENS HERE</p><p class="jp__v">${s.what}</p>
    <p class="jp__k">WHO OWNS IT</p><p class="jp__v jp__v--b">${s.owner}</p>
    <p class="jp__k">WHAT INFORMATION MATTERS</p><p class="jp__v">${s.info}</p>
    <p class="jp__k">TYPICAL BLOCKER</p><p class="jp__v jp__v--f">${s.blocker}</p>
    <p class="jp__k">NEXT ACTION</p><p class="jp__v jp__v--o">${s.next}</p>`;
}
jWrap.addEventListener('click',e=>{
  const b=e.target.closest('.aw-jstage');
  if(b)selectStage(+b.dataset.j);
});
selectStage(0);

/* =====================================================================
   3. PRIORITISATION MATRIX (hover / tap / focus)
   ===================================================================== */
const MX=[
 {t:'Student CRM',u:'High',b:'High',mvp:true,x:72,y:78,d:'One profile per student: the spine everything else hangs on.'},
 {t:'Student timeline',u:'High',b:'Med-high',mvp:true,x:84,y:62,d:'Every event in one place, so context survives handoffs.'},
 {t:'Task management',u:'High',b:'High',mvp:true,x:64,y:88,d:'Turns \u201Cwhat should happen\u201D into owned, dated actions.'},
 {t:'Application tracking',u:'High',b:'High',mvp:true,x:88,y:76,d:'Each university application as its own object with its own state.'},
 {t:'Document management',u:'High',b:'Med-high',mvp:true,x:78,y:64,d:'Checklists tied to stages, not just file storage.'},
 {t:'Communication history',u:'Med-high',b:'Med',mvp:true,x:58,y:50,d:'Calls and messages attached to the student\u2019s story.'},
 {t:'Advanced analytics',u:'Med',b:'High',mvp:false,x:40,y:82,d:'Useful once there is clean operational data to analyse.'},
 {t:'AI recommendations',u:'Low-med',b:'Med',mvp:false,x:28,y:44,d:'Tempting, but it needs the basics working first.'},
 {t:'Marketing automation',u:'Low',b:'Med-high',mvp:false,x:16,y:60,d:'Valuable for growth, not for unblocking counsellors.'},
 {t:'Custom reporting',u:'Low-med',b:'Med',mvp:false,x:24,y:28,d:'Every team wants their own view; standardise first.'}
];
const mx=$('#awMx'), mxPanel=$('#awMxPanel');

mx.insertAdjacentHTML('beforeend',MX.map((f,i)=>
  `<button class="aw-dot ${f.mvp?'aw-dot--mvp':''}" style="left:${f.x}%;top:${f.y}%" data-m="${i}"
    title="${f.t}" aria-label="${f.t}: user value ${f.u.toLowerCase()}, business value ${f.b.toLowerCase()}, ${f.mvp?'in the MVP':'later'}"></button>`
).join(''));

function selectDot(i){
  const f=MX[i];
  $$('.aw-dot').forEach(d=>d.classList.toggle('aw-dot--on',+d.dataset.m===i));
  mxPanel.innerHTML=`
    <h4>${f.t}</h4>
    <div class="aw-mxrow"><b>USER VALUE</b><span>${f.u}</span></div>
    <div class="aw-mxrow"><b>BUSINESS VALUE</b><span>${f.b}</span></div>
    <span class="aw-mxtag ${f.mvp?'aw-mxtag--mvp':'aw-mxtag--later'}">${f.mvp?'IN THE MVP':'LATER'}</span>
    <span class="hand">${f.d}</span>`;
}
mx.addEventListener('click',e=>{
  const d=e.target.closest('.aw-dot');
  if(d)selectDot(+d.dataset.m);
});
mx.addEventListener('mouseover',e=>{
  const d=e.target.closest('.aw-dot');
  if(d)selectDot(+d.dataset.m);
});
mx.addEventListener('focusin',e=>{
  const d=e.target.closest('.aw-dot');
  if(d)selectDot(+d.dataset.m);
});
mxPanel.innerHTML=`<h4>CONCEPTUAL PRIORITISATION</h4>
  <span class="hand">hover, tap or focus any dot to see why it sits where it sits →</span>
  <div class="aw-mxrow" style="margin-top:10px"><b>MVP SPINE</b><span>filled blue dots</span></div>
  <div class="aw-mxrow"><b>LATER</b><span>outline dots</span></div>`;

/* =====================================================================
   4. APPLICATIONS (status filter) + DOCUMENTS (category filter)
   ===================================================================== */
const APPS=[
 {u:'University of Manchester',c:'MSc Business Analytics',st:'UNDER REVIEW',sc:'blue'},
 {u:'University of Birmingham',c:'MSc Management',st:'OFFER RECEIVED',sc:'green'},
 {u:'University of Leeds',c:'MSc Finance',st:'DOCS PENDING',sc:'amber'}
];
const FILTERS=[['all','ALL'],['UNDER REVIEW','UNDER REVIEW'],['OFFER RECEIVED','OFFER RECEIVED'],['DOCS PENDING','DOCS PENDING']];

const fWrap=$('#awFchips'), aWrap=$('#awApps');
fWrap.innerHTML=FILTERS.map(([v,l],i)=>
  `<button class="aw-fch" aria-pressed="${i===0}" data-f="${v}">${l}</button>`).join('');

function renderApps(filter){
  aWrap.innerHTML=APPS.map(a=>{
    const show=filter==='all'||a.st===filter;
    return `<div class="app ${show?'':'hide'}">
      <div><h4>${a.u}</h4><p>${a.c}</p></div>
      <span class="app__st st-${a.sc}">${a.st}</span></div>`;
  }).join('');
}
fWrap.addEventListener('click',e=>{
  const b=e.target.closest('.aw-fch');
  if(!b)return;
  $$('.aw-fch').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  renderApps(b.dataset.f);
});
renderApps('all');

const DOCS=[
 {cat:'IDENTITY',n:'Passport',s:'VERIFIED',c:'ok'},
 {cat:'ACADEMIC',n:'Degree certificate',s:'VERIFIED',c:'ok'},
 {cat:'ACADEMIC',n:'Transcript',s:'VERIFIED',c:'ok'},
 {cat:'APPLICATION',n:'SOP',s:'REVISION REQUIRED',c:'warn'},
 {cat:'FINANCIAL',n:'Bank statement',s:'MISSING',c:'miss'}
];
const CATS=[['all','ALL'],['IDENTITY','IDENTITY'],['ACADEMIC','ACADEMIC'],['FINANCIAL','FINANCIAL'],['APPLICATION','APPLICATION'],['VISA','VISA']];

const cWrap=$('#awCats'), dWrap=$('#awDocs');
cWrap.innerHTML=CATS.map(([v,l],i)=>
  `<button class="aw-cat" aria-pressed="${i===0}" data-c="${v}">${l}</button>`).join('');

function renderDocs(cat){
  dWrap.innerHTML=DOCS.map(d=>{
    const show=cat==='all'||d.cat===cat;
    return `<div class="aw-doc ${d.c!=='ok'?'aw-doc--alert':''} ${show?'':'hide'}">
      <span class="aw-doc__n">${d.n}</span>
      <span class="aw-doc__s"><i class="aw-st aw-st--${d.c}">${d.s}</i></span>
      <span class="aw-doc__c">${d.cat}</span>
    </div>`;
  }).join('');
}
cWrap.addEventListener('click',e=>{
  const b=e.target.closest('.aw-cat');
  if(!b)return;
  $$('.aw-cat').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  renderDocs(b.dataset.c);
});
renderDocs('all');

/* =====================================================================
   5. BEHAVIOUR: reveals, bar shrink, resize, smart back link
   ===================================================================== */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 $$('.reveal, .animsvg').forEach(el=>io.observe(el));

const bar=$('#awBar');
addEventListener('scroll',()=>bar.classList.toggle('scrolled',scrollY>10),{passive:true});

/* re-render diagrams on size changes so labels stay readable on mobile */
let rt;
addEventListener('resize',()=>{
  clearTimeout(rt);
  rt=setTimeout(()=>{
    renderFigures();
    $$('.figbox svg').forEach(s=>s.classList.add('in'));
  },200);
});

/* SMART BACK: if the visitor came from the portfolio (same origin,
   outside this /away folder), history.back() preserves their scroll
   position. Otherwise the href (../index.html) is used as-is. */
function smartBack(e){
  let fromPortfolio=false;
  try{
    if(document.referrer){
      const u=new URL(document.referrer,location.href);
      fromPortfolio=u.origin===location.origin && !u.pathname.replace(/\/$/,'').endsWith('/away');
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
