/* =====================================================================
   RENDER — turns the data in js/data.js into HTML.

   Main page: fills #workGrid, #impactPins, #proudGrid, #tkWrap, #xpList
   (and #pgList if the playground section is re-enabled).
   Case studies: secHTML() builds each case-study section from the
   block types described in js/data.js.

   You rarely need to touch this file to change content — edit data.js.
   ===================================================================== */

/* tiny DOM helpers (also used by app.js, which loads after this file) */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const dirIcon=d=>`<svg class="ic ${d==='up'?'ic--up':''}" aria-hidden="true"><use href="#i-${d==='down'?'dn':'up'}"/></svg>`;

/* =====================================================================
   MAIN PAGE RENDERERS
   ===================================================================== */
 $('#workGrid').innerHTML=PROJECTS.map((p,i)=>`
  <div class="pw pc-${p.treat} reveal" style="--d:${i*0.06}s">
    <div class="tilt pcard a-${p.acc}" style="--r:${[-.7,.8,-.5,.6,-.6][i%5]}deg">
      ${p.treat==='t1'?'<span class="tape tape--l" aria-hidden="true"></span><span class="tape tape--r" aria-hidden="true"></span>':''}
      ${p.treat==='t2'?'<span class="tab">CASE ${p.num}</span>':''}
      <div class="pcard__in">
        ${p.treat==='t3'?'<span class="hole hole--a" aria-hidden="true"></span><span class="hole hole--b" aria-hidden="true"></span>':''}
        <span class="pcard__num" aria-hidden="true">${p.num}</span>
        <p class="pcard__note hand" aria-hidden="true">${p.note}</p>
        <span class="pcard__cat">${p.cat}</span>
        <h3>${p.title}</h3>
        <p class="pcard__desc">${p.desc}</p>
        ${p.metrics
          ?`<div class="pcard__metrics">${p.metrics.map(m=>`<span class="pm"><span class="pm__row"><span class="pm__num">${m.n}</span>${dirIcon(m.d)}</span><span class="pm__lbl">${m.l}</span></span>`).join('')}</div>`
          :`<div class="pcard__status"><span class="pst">STATUS: CONCEPT · PRODUCT DEFINITION</span><span class="pst">PROPOSED METRIC: STUDENT PROGRESSION</span></div>`}
        <a class="pcard__cta" href="#${p.id}">READ CASE STUDY <svg class="ic" aria-hidden="true"><use href="#i-arr"/></svg></a>
      </div>
    </div>
  </div>`).join('');

 $('#impactPins').innerHTML=IMPACT.map((m,i)=>`
  <div class="reveal" style="--d:${i*0.08}s"><div class="tilt pin a-${m.acc}" style="--r:${m.r}deg">
    <span class="tape tape--c" aria-hidden="true"></span>
    <span class="pin__num">${m.n}${dirIcon(m.d)}</span>
    <span class="pin__cap">${m.l}</span>
  </div></div>`).join('');

 $('#proudGrid').innerHTML=PROUD.map((r,i)=>`
  <div class="reveal" style="--d:${i*0.06}s"><div class="tilt receipt a-${r.acc}" style="--r:${[-1,1.2,-.8,1][i%4]}deg">
    <span class="receipt__k"><svg aria-hidden="true"><use href="#i-star"/></svg>RECEIPT · ${String(i+1).padStart(2,'0')}</span>
    <span class="receipt__num">${r.n}</span>
    <p>${r.l}</p>
  </div></div>`).join('');

/* playground cards: guarded, renders only if the section exists (it's hidden by default) */
const pgList=$('#pgList');
if(pgList) pgList.innerHTML=PG.map((g,i)=>`
  <article class="pg-row reveal a-${g.acc}" style="--d:${i*0.05}s">
    <span class="pg-idx">EXPERIMENT ${g.i}</span>
    <div><h3>${g.t}</h3><p class="pg-sub">${g.s}</p></div>
    <span class="stamp">WORK IN&nbsp;PROGRESS</span>
  </article>`).join('');

 $('#tkWrap').innerHTML=TK.map(g=>`
  <div class="tk-group reveal">
    <p class="tk-group__h"><i style="background:${g.dot}"></i>${g.g}</p>
    <div class="tk-chips">${g.items.map((t,j)=>`<span class="chip" style="--r:${j%2?1.4:-1.2}deg">${t}</span>`).join('')}</div>
  </div>`).join('');

 $('#xpList').innerHTML=XP.map((r,i)=>`
  <div class="xp-row reveal" style="--d:${i*0.05}s">
    <span class="xp-dates">${r.dates}</span>
    <div>
      <h3>${r.co}</h3>
      <span class="xp-role">${r.role}</span>
      <p class="xp-sum">${r.sum}</p>
      ${r.note?`<span class="xp-note">${r.note}</span>`:''}
    </div>
  </div>`).join('');

/* =====================================================================
   A-WAY / CASE COMPONENT RENDERERS
   ===================================================================== */

/* interactive journey explorer state (app.js resets it when a case opens) */
let curJourney=null;

function renderCards(cd){
  if(cd.variant==='mvp')return `<div class="cs-cards cs-cards--mvp">${cd.items.map((it,i)=>`<div class="cs-card"><span class="cs-card__n mono">${String(i+1).padStart(2,'0')}</span><h4>${it}</h4></div>`).join('')}</div>`;
  return `<div class="cs-cards">${cd.items.map(c=>`<div class="cs-card"><h4>${c.h}</h4><p>${c.p}</p></div>`).join('')}</div>`;
}
function renderRoles(roles,note){
  return `<div class="cs-roles">${roles.map(r=>`<div class="cs-card cs-role ${r.primary?'cs-role--primary':''}">
    <span class="cs-role__tag">${r.tag}</span><h4>${r.h}</h4><p>${r.p}</p></div>`).join('')}</div>
    ${note?`<p class="cs-note hand">${note}</p>`:''}`;
}
function renderOpps(opps){
  return `<div class="cs-opps">${opps.map(o=>`<div class="cs-opp"><span class="cs-opp__n" aria-hidden="true">${o.n}</span>
    <div><h4>${o.h}</h4><p>${o.p}</p><p class="cs-opp__o">→ opportunity: <strong>${o.o}</strong></p></div></div>`).join('')}</div>`;
}
function renderJourney(j){
  curJourney=j;
  return `<div class="jmap">
    <div class="jmap__stages" role="tablist" aria-label="Student journey stages">
      ${j.stages.map((s,i)=>`<button class="jstg" role="tab" aria-selected="${i===0}" aria-controls="jpanel" data-j="${i}">${s.n}</button>`).join('')}
    </div>
    <div class="jmap__panel" id="jpanel" role="tabpanel" aria-live="polite"></div>
    <p class="jmap__note hand">${j.jnote}</p>
  </div>`;
}
/* fills the journey panel for stage index i (clicks are wired in app.js) */
function setJPanel(i){
  const s=curJourney&&curJourney.stages[i],p=document.getElementById('jpanel');
  if(!s||!p)return;
  p.innerHTML=`<p class="jp__stage">${s.n}</p>
    <p class="jp__k">USER GOAL</p><p class="jp__v">${s.g}</p>
    <p class="jp__k">POTENTIAL FRICTION</p><p class="jp__v jp__v--f">${s.f}</p>
    <p class="jp__k">PRODUCT OPPORTUNITY</p><p class="jp__v jp__v--o">${s.o}</p>`;
}
function renderPrinciple(pr){
  const arrow=`<svg class="farr" viewBox="0 0 30 16" aria-hidden="true"><path d="M2 8 C 10 5, 20 11, 27 8 M22 3 l6 5 -6 5"/></svg>`;
  const col=(k,arr,cls)=>`<div class="prin__col ${cls}"><p class="prin__k">${k}</p>
    <div class="prin__steps">${arr.map(t=>`<span class="fn">${t}</span>`).join(arrow)}</div></div>`;
  return `<div class="prin">${col('BEFORE',pr.before,'prin__col--before')}${col('AFTER',pr.after,'prin__col--after')}</div>`;
}
function renderMatrix(m){
  return `<div class="mx">
    <p class="mx__axis mx__axis--y">USER / BUSINESS IMPACT ↑</p>
    <div class="mx__grid">${m.qs.map(q=>`<div class="mx__q"><h4>${q.k}</h4>
      <div class="mx__chips">${q.items.map(i=>`<span class="mx__c">${i}</span>`).join('')}</div></div>`).join('')}</div>
    <p class="mx__axis mx__axis--x">IMPLEMENTATION EFFORT →</p>
  </div>${m.note?`<p class="cs-note hand">${m.note}</p>`:''}`;
}

/* conceptual product interfaces (clearly labelled, not real screens) */
const MOCKS={
  crm(){
    return `<div class="mock">
      <div class="mock__bar"><span class="mock__g">Good morning, Priya</span><span class="mock__pill">12 STUDENTS NEED ATTENTION</span></div>
      <div class="mock__body">
        <div>
          <p class="mock__k">URGENT · 3 STUDENTS</p>
          <div class="scard"><h5>Rahul Sharma</h5><p>Offer received</p><p class="scard__w">Visa documents pending</p><span class="sdue">DUE TODAY</span></div>
          <div class="scard"><h5>Ananya Singh</h5><p>University application</p><p class="scard__w">Missing transcript</p><span class="sdue">DUE TODAY</span></div>
        </div>
        <div>
          <p class="mock__k">FOLLOW UPS · 6 STUDENTS</p>
          <div class="mock__row"><b>Karthik</b><span>confirm shortlist · tomorrow</span></div>
          <div class="mock__row"><b>Meera</b><span>send deadline reminder · fri</span></div>
          <div class="mock__row"><b>Divya</b><span>eligibility call · mon</span></div>
        </div>
        <div>
          <p class="mock__k">RECENTLY UPDATED · 3</p>
          <div class="mock__row"><b>Rahul</b><span>offer logged</span></div>
          <div class="mock__row"><b>Ananya</b><span>transcript requested</span></div>
          <div class="mock__row"><b>Sanjay</b><span>visa docs approved</span></div>
        </div>
      </div>
      <span class="mock__label">CONCEPTUAL PRODUCT INTERFACE · NOT REAL DATA</span>
    </div>`;
  },
  student(){
    const sj=(t,st)=>`<span class="sj sj--${st}">${t}</span>`;
    return `<div class="mock mock--student">
      <div class="mock__bar"><span class="mock__g">Hi Rahul</span><span class="mono" style="font-size:.56rem;letter-spacing:.16em;color:var(--ink-soft)">YOU'RE CURRENTLY HERE</span></div>
      <div class="mock__body mock__body--col">
        <div class="sjourney">
          ${sj('✓ Counselling','done')}${sj('✓ Eligibility','done')}${sj('✓ Shortlist','done')}${sj('✓ Application','done')}${sj('● Offer','cur')}${sj('○ Visa','')}${sj('○ Pre-departure','')}
        </div>
        <div class="snext">
          <p class="mono">YOUR NEXT STEP</p>
          <h5>Upload your financial documents</h5>
          <p class="mono">DUE 18 SEPTEMBER</p>
          <span class="btn-st">UPLOAD DOCUMENTS</span>
        </div>
        <div class="scards3">
          <div class="smini"><b>APPLICATION STATUS</b><span>Waterloo: offer received</span></div>
          <div class="smini"><b>UPCOMING APPOINTMENT</b><span>Counsellor call · Thu 4 PM</span></div>
          <div class="smini"><b>RECENT UPDATE</b><span>Transcript verified</span></div>
        </div>
      </div>
      <span class="mock__label">CONCEPTUAL PRODUCT INTERFACE</span>
    </div>`;
  }
};

function renderApps(a){
  return `<div class="apps">${a.list.map(x=>`<div class="app">
    <div><h4>${x.u}</h4><p>${x.c}</p></div><span class="app__st st-${x.sc}">${x.st}</span></div>`).join('')}</div>`;
}
function renderDocs(d){
  const mark={ok:'✓',warn:'⚠',miss:'○'};
  return `<div class="docs">
    <div class="docs__col"><p class="prin__k">A FILE LIST</p>
      <ul class="docs__files">${d.bad.map(f=>`<li>${f}</li>`).join('')}</ul>
      <p class="docs__cap hand">exists ≠ useful</p></div>
    <div class="docs__col docs__col--good"><p class="prin__k">A WORKFLOW</p>
      <ul class="docs__check">${d.good.map(g=>`<li><span class="docs__m docs__m--${g.s}">${mark[g.s]}</span>${g.t}</li>`).join('')}</ul>
      <p class="docs__cap hand">what's still blocking this application?</p></div>
  </div>`;
}
function renderReq(r){
  return `<details class="req"><summary><span class="req__ep">EPIC</span> ${r.epic}<span class="req__chev" aria-hidden="true">+</span></summary>
    <div class="req__body">
      <p class="req__k">USER STORY</p><p class="req__story">\u201C${r.story}\u201D</p>
      <p class="req__k">GOAL</p><p>${r.goal}</p>
      <p class="req__k">ACCEPTANCE CRITERIA</p><ul class="req__ul">${r.ac.map(x=>`<li>${x}</li>`).join('')}</ul>
      <p class="req__k">EDGE CASES</p><ul class="req__ul">${r.edge.map(x=>`<li>${x}</li>`).join('')}</ul>
    </div></details>`;
}
function renderEdge(e){
  return `<details class="req req--edge"><summary>${e.q}<span class="req__chev" aria-hidden="true">+</span></summary>
    <div class="req__body"><p>${e.a}</p></div></details>`;
}
function renderMetrics(ms,note){
  return `<div class="mgrid">${ms.map(g=>`<div class="mg"><h4>${g.g} <span class="mg__tag">PROPOSED</span></h4>
    <ul>${g.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>
    ${note?`<p class="cs-note hand">${note}</p>`:''}`;
}
function renderExp(x){
  return `<div class="expcard">
    <p class="expcard__k">HYPOTHESIS</p><p class="expcard__h">\u201C${x.h}\u201D</p>
    <div class="exp__cols">
      <div><p class="req__k">CONTROL</p><p>${x.control}</p></div>
      <div><p class="req__k">VARIANT</p><p>${x.variant}</p></div>
    </div>
    <p class="req__k">MEASURE</p><ul class="req__ul req__ul--inline">${x.measure.map(m=>`<li>${m}</li>`).join('')}</ul>
    <p class="req__k">DECISION FRAMEWORK</p><ul class="req__ul">${x.decisions.map(d=>`<li><strong>${d.d}</strong>: ${d.c}</li>`).join('')}</ul>
    <p class="exp__note hand">${x.note}</p>
  </div>`;
}
function renderRoadmap(rm){
  return `<div class="rmp">${rm.map(p=>`<div class="rmp__p"><span class="rmp__n">${p.p}</span><h4>${p.n}</h4>
    <ul>${p.items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`;
}
function renderValidate(v,closing){
  return `<div class="mgrid">${v.map(g=>`<div class="mg"><h4>${g.g}</h4>
    <ul class="vq">${g.items.map(q=>`<li>${q}</li>`).join('')}</ul></div>`).join('')}</div>
    ${closing?`<blockquote class="cs-quote cs-quote--sm">${closing}</blockquote>`:''}`;
}

/* builds one case-study section from any combination of blocks */
function secHTML(s){
  let h='';
  if(s.quote)h+=`<blockquote class="cs-quote">${s.quote}</blockquote>`;
  if(s.t)h+=s.t.map(p=>`<p>${p}</p>`).join('');
  if(s.cards)h+=renderCards(s.cards);
  if(s.roles)h+=renderRoles(s.roles,s.rnote);
  if(s.opps)h+=renderOpps(s.opps);
  if(s.journey)h+=renderJourney(s.journey);
  if(s.principle)h+=renderPrinciple(s.principle);
  if(s.matrix)h+=renderMatrix(s.matrix);
  if(s.mock)h+=MOCKS[s.mock]();
  if(s.apps)h+=renderApps(s.apps);
  if(s.docs)h+=renderDocs(s.docs);
  if(s.reqs)h+=s.reqs.map(renderReq).join('');
  if(s.edges)h+=s.edges.map(renderEdge).join('');
  if(s.metrics)h+=renderMetrics(s.metrics,s.mnote);
  if(s.exp)h+=renderExp(s.exp);
  if(s.roadmap)h+=renderRoadmap(s.roadmap);
  if(s.validate)h+=renderValidate(s.validate,s.closing);
  if(s.figs)h+=s.figs.map(figureHTML).join('');
  return `<section class="cs-sec"><h3>${s.k}</h3>${h}</section>`;
}
