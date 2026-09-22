/* =====================================================================
   FIGURES — the hand-drawn SVG diagram builders used inside case
   studies. Every figure is a conceptual reconstruction, not real data.

   To add a new diagram: add a function to FIGS below, then reference it
   from a case-study section in js/data.js as figs:[{f:'yourName',...}].
   The functions receive one argument "vert" (true on narrow screens) so
   diagrams can re-render vertically on mobile.
   ===================================================================== */

const vert = () => innerWidth < 640;

function box(x,y,w,h,txt,o={}){
  return `<g filter="url(#rough)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${o.fill||PAPER}" stroke="${o.stroke||INK}" stroke-width="${o.sw||2.2}"/></g>
  <text x="${x+w/2}" y="${y+h/2+1}" text-anchor="middle" dominant-baseline="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="${o.fs||13}" letter-spacing="1" fill="${INK}">${txt}</text>`;
}
function hArrow(a,b,y){return `
  <path class="dp" pathLength="1" d="M ${a} ${y} C ${a+12} ${y-7}, ${b-12} ${y+7}, ${b-4} ${y}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M ${b-2} ${y} L ${b-13} ${y-7} M ${b-2} ${y} L ${b-13} ${y+7}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;}
function vArrow(x,a,b){return `
  <path class="dp" pathLength="1" d="M ${x} ${a} C ${x-6} ${a+8}, ${x+6} ${b-8}, ${x} ${b-3}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M ${x} ${b-1} L ${x-7} ${b-11} M ${x} ${b-1} L ${x+7} ${b-11}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;}
function open(w,h,label){return `<svg class="diag animsvg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`;}

/* horizontal chain of boxes with arrows */
function chainH(items,o={}){
  const bw=o.bw||152,bh=o.bh||58,gap=o.gap||44,top=118,H=205;
  const W=o.w||items.length*bw+(items.length-1)*gap+40;
  const x0=20;let s=open(W,H,o.label);
  items.forEach((it,i)=>{
    const x=x0+i*(bw+gap),hl=o.hl&&o.hl.includes(i);
    s+=box(x,top,bw,bh,it.t,{stroke:it.c||(hl?RED:INK),fill:hl?'#F8E3DC':(it.f||PAPER),fs:it.fs||12.5});
    if(i<items.length-1)s+=hArrow(x+bw+3,x+bw+gap-3,top+bh/2);
  });
  if(o.loop){
    const xf=x0+o.loop.from*(bw+gap)+bw/2, xt=x0+o.loop.to*(bw+gap)+bw/2;
    s+=`<path class="dp" pathLength="1" d="M ${xf} ${top} C ${xf} 26, ${xt} 26, ${xt} ${top-8}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M ${xt} ${top-6} L ${xt-8} ${top-18} M ${xt} ${top-6} L ${xt+8} ${top-18}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="${(xf+xt)/2}" y="42" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${RED}">${o.loop.label}</text>`;
  }
  return s+'</svg>';
}
/* vertical chain of boxes with arrows */
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
  if(o.loop){
    const yFrom=14+o.loop.from*(bh+gap)+bh/2, yTo=14+o.loop.to*(bh+gap)+bh/2;
    s+=`<path class="dp" pathLength="1" d="M ${x+bw} ${yFrom} C ${x+bw+80} ${yFrom-6}, ${x+bw+80} ${yTo+6}, ${x+bw+4} ${yTo}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M ${x+bw+6} ${yTo} L ${x+bw+16} ${yTo-8} M ${x+bw+6} ${yTo} L ${x+bw+16} ${yTo+8}" fill="none" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
    <text x="${x+bw+88}" y="${(yFrom+yTo)/2}" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${RED}">${o.loop.label}</text>`;
  }
  return s+'</svg>';
}

/* wraps a figure in the standard <figure> markup used by case studies */
function figureHTML(fig){
  return `<figure class="diagram"><div class="figbox" data-fig="${fig.f}">${FIGS[fig.f](vert())}</div>
  <figcaption class="fig"><span>${fig.cap}</span><em>${fig.hand}</em></figcaption></figure>`;
}

/* the figure library */
const FIGS={
  /* ----- operational case figures ----- */
  claimsFlow(vert){
    const items=[{t:'CLAIM'},{t:'IDENTIFICATION'},{t:'INVESTIGATION'},{t:'FOLLOW-UP'},{t:'RESOLUTION'}];
    return vert
      ? chainV(items,{hl:[2,3],loop:{from:3,to:2,label:'repeats happened here'},label:'Claim workflow with the repeat loop, conceptual reconstruction'})
      : chainH(items,{hl:[2,3],loop:{from:3,to:2,label:'repeats happened here'},label:'Claim workflow with the repeat loop, conceptual reconstruction'});
  },
  denialsFlow(vert){
    const items=[{t:'LOTS OF DENIALS',c:RED},{t:'PATTERN IDENTIFICATION'},{t:'ROOT CAUSE'},{t:'PROCESS CHANGE'},{t:'BETTER RESOLUTION',c:GREEN,f:'#E4F0E6'}];
    return vert
      ? chainV(items,{label:'From denials to better resolution, conceptual reconstruction'})
      : chainH(items,{label:'From denials to better resolution, conceptual reconstruction'});
  },
  network(vert){
    if(vert){
      const s=open(360,470,'Team touchpoints around one problem, conceptual representation');
      s+=box(70,16,220,50,'PRODUCT',{stroke:BLUE});
      s+=box(70,96,220,50,'ENGINEERING');
      s+=box(55,196,250,62,'OPERATIONS',{stroke:BLUE,sw:2.6,fill:'#E8EEFA'});
      s+=box(70,346,220,50,'CUSTOMER TEAMS',{stroke:PINK});
      s+=vArrow(180,68,94)+vArrow(180,148,194)+vArrow(180,260,344);
      s+=`<text x="352" y="230" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">same problem,</text>
          <text x="352" y="254" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">different seats</text>`;
      return s+'</svg>';
    }
    const s=open(470,340,'Team touchpoints around one problem, conceptual representation');
    s+=`<ellipse cx="235" cy="172" rx="212" ry="152" fill="none" stroke="${SOFT}" stroke-width="1.6" stroke-dasharray="7 7" filter="url(#rough)"/>`;
    s+=box(20,26,140,52,'PRODUCT',{stroke:BLUE});
    s+=box(310,26,150,52,'ENGINEERING');
    s+=box(160,140,150,62,'OPERATIONS',{stroke:BLUE,sw:2.6,fill:'#E8EEFA'});
    s+=box(155,272,160,52,'CUSTOMER TEAMS',{stroke:PINK});
    s+=`<g filter="url(#rough)"><path d="M120 80 C 150 105, 165 118, 190 138" fill="none" stroke="${SOFT}" stroke-width="2"/>
        <path d="M350 80 C 320 105, 305 118, 280 138" fill="none" stroke="${SOFT}" stroke-width="2"/>
        <path d="M235 270 C 234 245, 236 225, 235 204" fill="none" stroke="${SOFT}" stroke-width="2"/></g>`;
    s+=`<text x="22" y="190" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">same problem,</text>
        <text x="22" y="214" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">different seats</text>`;
    return s+'</svg>';
  },
  teams(vert){
    if(vert){
      const s=open(380,430,'Two teams converging on one shared workflow view, conceptual reconstruction');
      s+=box(35,18,180,54,'TEAM A');
      s+=box(35,300,180,54,'TEAM B');
      s+=box(65,170,250,72,'SHARED WORKFLOW VIEW',{stroke:BLUE,sw:2.6,fill:'#E8EEFA',fs:12.5});
      s+=`<path class="dp" pathLength="1" d="M125 74 C 130 100, 145 125, 165 168" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M165 168 L155 156 M165 168 L152 164" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
          <path class="dp" pathLength="1" d="M125 298 C 130 272, 145 247, 165 246" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M165 246 L152 250 M165 246 L155 258" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;
      s+=`<text x="330" y="160" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">nobody could see</text>
          <text x="330" y="184" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">the other's work</text>
          <text x="190" y="392" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${GREEN}">one place to look</text>`;
      return s+'</svg>';
    }
    const s=open(780,300,'Two teams converging on one shared workflow view, conceptual reconstruction');
    s+=box(24,42,150,56,'TEAM A');
    s+=box(24,202,150,56,'TEAM B');
    s+=box(500,112,250,76,'SHARED WORKFLOW VIEW',{stroke:BLUE,sw:2.6,fill:'#E8EEFA',fs:13.5});
    s+=`<path class="dp" pathLength="1" d="M174 70 C 320 26, 420 62, 496 126" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M498 128 L484 122 M498 128 L490 114" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
        <path class="dp" pathLength="1" d="M174 230 C 320 274, 420 238, 496 174" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M498 172 L484 178 M498 172 L490 186" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;
    s+=`<g filter="url(#rough)"><path d="M99 98 L99 202" fill="none" stroke="${SOFT}" stroke-width="1.8" stroke-dasharray="6 6"/></g>
        <text x="120" y="128" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">nobody could see</text>
        <text x="120" y="152" font-family="Caveat,cursive" font-weight="600" font-size="19" fill="${SOFT}">the other's work</text>
        <text x="625" y="232" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="21" fill="${GREEN}">one place to look</text>`;
    return s+'</svg>';
  },
  dash(vert){
    const small=vert||innerWidth<640;
    const W=small?380:520,H=330;
    const bw=small?30:44,gp=small?16:22,base=258,x0=small?46:66;
    const hs=small?[62,108,50,142,84,36]:[70,120,55,160,95,40];
    const cols=[YEL,PINK,BLUE,GREEN,RED,'rgba(34,32,27,.3)'];
    let s=open(W,H,'Conceptual data view of denials grouped by reason, illustrative shape only, not real data');
    s+=`<g filter="url(#rough)"><rect x="10" y="10" width="${W-20}" height="${H-20}" rx="12" fill="${PAPER}" stroke="${INK}" stroke-width="2.2"/></g>
    <path d="M10 54 H ${W-10}" stroke="${INK}" stroke-width="1.6" opacity=".5"/>
    <text x="26" y="38" font-family="'Space Mono',monospace" font-size="${small?9:11}" letter-spacing="2" fill="${INK}">CONCEPTUAL DATA VIEW</text>
    <text x="${W-24}" y="38" text-anchor="end" font-family="Caveat,cursive" font-weight="600" font-size="${small?14:17}" fill="${SOFT}">the shape of the idea, not real data</text>`;
    s+=`<g filter="url(#rough)"><path d="M34 ${base} H ${W-40} M34 84 V ${base}" fill="none" stroke="${INK}" stroke-width="1.8"/></g>`;
    hs.forEach((h,i)=>{s+=`<g filter="url(#rough)"><rect x="${x0+i*(bw+gp)}" y="${base-h}" width="${bw}" height="${h}" fill="${cols[i]}" stroke="${INK}" stroke-width="1.4"/></g>
      <text x="${x0+i*(bw+gp)+bw/2}" y="${base+18}" text-anchor="middle" font-family="'Space Mono',monospace" font-size="${small?8:9}" fill="${SOFT}">R${i+1}</text>`;});
    s+=`<text x="${x0+5*(bw+gp)+bw/2}" y="${base+18}" text-anchor="middle" font-family="'Space Mono',monospace" font-size="${small?8:9}" fill="${SOFT}">other</text>`;
    const rc=x0+3*(bw+gp)+bw/2;
    s+=`<g filter="url(#rough)"><ellipse cx="${rc}" cy="${base-hs[3]/2}" rx="${bw/2+16}" ry="${hs[3]/2+18}" fill="none" stroke="${RED}" stroke-width="2.4"/></g>
    <text x="${rc}" y="${base-hs[3]-46<30?base-hs[3]-26:base-hs[3]-46}" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">root cause</text>`;
    return s+'</svg>';
  },
  journey(){
    const items=[{t:'START'},{t:'ONBOARDING'},{t:'USER ACTION'},{t:'FRICTION'},{t:'SUPPORT'},{t:'RESOLUTION'}];
    return chainV(items,{hl:[3],hlLabel:'friction lived here',label:'Customer journey with friction highlighted, conceptual reconstruction'});
  },

  /* ----- A-WAY figures ----- */
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
      s+=`<text x="40" y="${dy+54*3+12}" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">every arrow = a handoff</text>`;
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
    s+=`<text x="300" y="150" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">who owns this?</text>
        <text x="560" y="150" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">what happened last?</text>
        <text x="790" y="150" font-family="Caveat,cursive" font-weight="600" font-size="20" fill="${RED}">what\u2019s next?</text>`;
    return s+'</svg>';
  },
  mvpChain(){
    return chainH([
      {t:'GET STUDENT',c:BLUE,f:'#E8EEFA'},
      {t:'UNDERSTAND STUDENT',c:BLUE,f:'#E8EEFA'},
      {t:'MOVE STUDENT FORWARD',c:BLUE,f:'#E8EEFA'},
      {t:'KNOW WHAT\u2019S BLOCKING THEM',c:BLUE,f:'#E8EEFA'}
    ],{bw:190,gap:36,label:'MVP spine, conceptual'});
  },
  appStates(){
    return chainH([
      {t:'SHORTLISTED'},{t:'DOCUMENTS'},{t:'SUBMITTED'},{t:'UNDER REVIEW'},
      {t:'OFFER',c:GREEN,f:'#E4F0E6'},{t:'ACCEPTED / REJECTED',c:RED,f:'#F8E3DC'}
    ],{bw:140,gap:30,label:'Application lifecycle, conceptual reconstruction'});
  },
  hub(){
    const s=open(470,370,'Student at the centre of the system, conceptual architecture');
    const cx=235,cy=185;
    const nodes=[['DASHBOARD',30,56],['LEADS',330,56],['TASKS',16,178],['COMMUNICATION',300,178],['TIMELINE',30,290],['APPLICATIONS',312,290],['UNIVERSITIES',176,12],['REPORTS',190,326]];
    nodes.forEach(([t,x,y])=>{
      const w=t.length>10?140:118,bx=x+w/2,by=y+20;
      s+=`<path d="M ${bx} ${by} L ${cx+(bx-cx)*0.42} ${cy+(by-cy)*0.42}" fill="none" stroke="${SOFT}" stroke-width="1.8" filter="url(#rough)"/>`;
    });
    s+=`<g filter="url(#rough2)"><ellipse cx="${cx}" cy="${cy}" rx="80" ry="48" fill="#E8EEFA" stroke="${BLUE}" stroke-width="2.8"/></g>`;
    s+=`<text x="${cx}" y="${cy+1}" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="16" fill="${BLUE}">STUDENT</text>
        <text x="${cx}" y="${cy+20}" text-anchor="middle" font-family="Caveat,cursive" font-weight="600" font-size="16" fill="${BLUE}">the centre of the system</text>`;
    nodes.forEach(([t,x,y])=>{
      const w=t.length>10?140:118;
      s+=box(x,y,w,40,t,{fs:10});
    });
    return s+'</svg>';
  }
};
