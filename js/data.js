/* =====================================================================
   DATA - ALL THE CONTENT LIVES HERE.

   This is the file you will edit most often:
   - project cards on the "selected work" grid   → PROJECTS
   - big pinned numbers                          → IMPACT
   - the four "work I'm proud of" receipts       → PROUD
   - toolkit chips                               → TK
   - experience rows                             → XP
   - full case-study pages (incl. A-WAY)         → CASES + ORDER

   To add a project: add an object to PROJECTS, a matching object in
   CASES with the same "id", and add the id to ORDER. That's it.
   ===================================================================== */

/* shared colors used when drawing the SVG diagrams (keep in sync with css/main.css) */
const INK='#22201B', SOFT='rgba(34,32,27,.62)', PAPER='#FFFDF6',
      BLUE='#2B49C7', GREEN='#2E7A4F', RED='#C74B2E', PINK='#D94F72', YEL='#E9B93B', AMB='#9A6A00';

/* ---------- project cards on the main page ---------- */
/* treat: 't1' taped sheet · 't2' folder tab · 't3' punched folder · 't4' legal pad
   acc:  'blue' | 'amber' | 'green' | 'pink'
   metrics: use {n:'30%',d:'down'|'up',l:'label'} - or null for concept projects */
const PROJECTS=[
  /* CASE 01: A-WAY. A product-definition concept, so no impact numbers,
     only an honest status. Everything else below is documented work. */
  {id:'away',num:'01',treat:'t3',acc:'blue',href:'away/',
   title:'A-WAY Consultancy: Turning a study abroad brief into a real product',
   cat:'PRODUCT STRATEGY × PRODUCT DEFINITION · CONCEPT',
   desc:'I took a broad study abroad consultancy brief and worked backwards from the real problem: helping counsellors know which students need attention, what is blocking them, and what should happen next.',
   metrics:null,
   note:'a product exercise in deciding what matters first'},
  {id:'c1',num:'02',treat:'t1',acc:'blue',
   title:'Reducing repeated claim issues',
   cat:'HEALTHCARE OPERATIONS × PROCESS IMPROVEMENT',
   desc:'Identifying claim-handling bottlenecks and working with cross-functional teams to improve the workflow.',
   metrics:[{n:'30%',d:'down',l:'repeated issues'},{n:'20%',d:'up',l:'resolution speed'}],
   note:'this one started with a bottleneck'},
  {id:'c2',num:'03',treat:'t2',acc:'amber',
   title:'Finding the pattern behind claim denials',
   cat:'DATA × ROOT-CAUSE ANALYSIS',
   desc:'Using operational data and root-cause analysis to improve denial identification and resolution.',
   metrics:[{n:'18%',d:'down',l:'claim backlog'},{n:'15%',d:'up',l:'first-pass resolution'}],
   note:'patterns hiding in plain sight'},
  {id:'c3',num:'04',treat:'t4',acc:'green',
   title:'Making workflow tracking clearer',
   cat:'WORKFLOW × CROSS-FUNCTIONAL COLLABORATION',
   desc:'Using cross-team feedback to identify workflow inefficiencies and support better tracking.',
   metrics:[{n:'20%',d:'down',l:'operational friction'}],
   note:'the fix lived between teams'},
  {id:'c4',num:'05',treat:'t1',acc:'pink',
   title:'Understanding the customer before fixing the process',
   cat:'CUSTOMER EXPERIENCE × OPERATIONS',
   desc:'Mapping customer pain points during onboarding and using those insights to improve operational workflows.',
   metrics:[{n:'12%',d:'up',l:'user satisfaction'}],
   note:'empathy, but make it operational'}
];

/* ---------- pinned impact numbers ---------- */
const IMPACT=[
  {n:'30%',d:'down',l:'reduction in repeated claim issues',acc:'blue',r:-2},
  {n:'20%',d:'down',l:'faster team resolution speed',acc:'red',r:1.6},
  {n:'18%',d:'down',l:'claim backlog reduction',acc:'green',r:-1.2},
  {n:'15%',d:'up',l:'increase in first-pass resolution',acc:'pink',r:2.2}
];

/* ---------- playground items (section currently hidden; kept for later) ---------- */
const PG=[
  {i:'001',t:'Product teardowns',s:'"Why does this app make me do this?"',acc:'blue'},
  {i:'002',t:'UX explorations',s:'Taking an everyday workflow and asking how it could feel simpler.',acc:'pink'},
  {i:'003',t:'AI experiments',s:'Where AI can remove repetitive work without adding another complicated layer.',acc:'green'},
  {i:'004',t:'Data experiments',s:'Finding patterns in messy data and turning them into product questions.',acc:'amber'},
  {i:'005',t:'User journeys',s:'Mapping complicated workflows and looking for the friction nobody talks about.',acc:'red'}
];

/* ---------- toolkit ---------- */
const TK=[
  {g:'PRODUCT',dot:BLUE,items:['Jira','Notion','Confluence']},
  {g:'ANALYTICS',dot:GREEN,items:['SQL','Excel','Power BI','Tableau']},
  {g:'DESIGN',dot:PINK,items:['Figma','FigJam']},
  {g:'AI',dot:YEL,items:['ChatGPT','Claude']}
];

/* ---------- experience ---------- */
const XP=[
  {dates:'MAY 2021 TO MAY 2022',co:'Jana Small Finance Bank',role:'Operations Assistant / Cashier',
   sum:"Front-line banking: customer transactions, cash handling and daily service, my first close look at how a process feels to the person standing in front of it."},
  {dates:'APR 2022 TO APR 2023',co:'Access Healthcare',role:'AR Caller',
   sum:"Working unpaid insurance claims end to end: payer follow-ups, status tracking, and full-time life inside the claims workflow."},
  {dates:'JUL 2023 TO DEC 2024',co:'AGS Health',role:'AR Caller',
   sum:"High-volume claim follow-up and resolution. Somewhere in the repetition, the patterns behind denials became impossible to ignore."},
  {dates:'JUN 2025 TO MAR 2026',co:'Vee Healthtek',role:'Senior Associate',
   sum:"Claim resolution with room to dig deeper: root-cause analysis, cross-team coordination, and the process improvements that first felt like someone else's job.",
   note:'← where the product questions got loud'}
];

/* =====================================================================
   CASE STUDIES - one object per project id.

   Each section (secs[]) can use any of these blocks:
   t: [paragraphs]            · quote: 'big handwritten quote'
   cards / roles / opps       · journey (interactive stage explorer)
   principle (before/after)   · matrix (prioritisation)
   mock: 'crm' | 'student'    · apps (application cards)
   docs (file list vs workflow) · reqs (expandable epics)
   edges (Q&A)                · metrics / exp / roadmap / validate
   figs: [{f:'figureName', cap, hand}]
   ===================================================================== */
const CASES={

 /* CASE 01 · A-WAY CONSULTANCY (product concept, based on a supplied brief) */
 away:{num:'01',acc:'blue',title:'A-WAY Consultancy: Turning a study abroad brief into a real product',
   cat:'ASSOCIATE PRODUCT MANAGEMENT CASE STUDY · A-WAY CONSULTANCY',
   meta:'ROLE: ASSOCIATE PRODUCT MANAGER (CASE STUDY) · FOCUS: PRODUCT STRATEGY / CRM / WORKFLOW<br/>DOMAIN: STUDY ABROAD / EDTECH · STATUS: CONCEPT / PRODUCT DEFINITION · BASED ON A SUPPLIED PRODUCT BRIEF',
   hero:{n:'1',d:null,l:'question I kept coming back to: who needs my attention right now?'},
   secs:[
    {k:'THE QUICK READ',t:[
      "Studying abroad looks like a simple checklist from the outside. Pick a university. Apply. Get an offer. Get a visa. Fly out.",
      "But behind that checklist is a surprisingly complicated operation. Counsellors, admissions teams, visa officers and students are all working on different parts of the same journey.",
      "The product opportunity wasn't to build another CRM. It was to make that journey easier for everyone involved."]},
    {k:'BUSINESS CONTEXT · WHY THIS IS A PRODUCT PROBLEM, NOT JUST A CRM PROBLEM',t:[
      "The supplied brief describes a broad platform: CRM, student portal, application tracking, documents, appointments, analytics, university and course discovery, plus future AI capabilities. (From the brief.)",
      "The first thing I did was step back from the feature list. I did not want to treat every module as equally important. Before deciding what to build, I wanted to understand where the journey actually breaks. Three things stood out:"],
     cards:{cols:3,items:[
      {h:'Too many handoffs',p:'The student moves through nine stages. The organisation sees those stages through five different departments.'},
      {h:'Too much context',p:'Multiple people touch the same student. Knowing what happened last, and why, shouldn\u2019t require archaeology.'},
      {h:'Not enough visibility',p:'A list of students doesn\u2019t tell anyone who needs attention right now, or what is blocking them.'}]}},
    {k:'THE REAL PROBLEM',quote:'Everyone is working on the same student journey, but not necessarily looking at the same picture.',t:[
      "The student experiences one continuous journey. The consultancy experiences a series of departments. The gap between those two views is where things get stuck: handoffs blur, context scatters, and \u201Cwhat\u2019s next?\u201D becomes everyone\u2019s question and no one\u2019s job."],
     figs:[{f:'journeyDepts',cap:'FIG. 01 · ONE JOURNEY, FIVE DEPARTMENTS',hand:'every arrow is a handoff · conceptual reconstruction'}]},
    {k:'WHO ACTUALLY NEEDS THIS PRODUCT',t:["Before features, roles. Who spends their day inside this product, and what do they need?"],
     roles:[
      {tag:'PRIMARY',h:'Counsellor',p:'The person closest to the student\u2019s journey. Needs context, follow-ups and a clear picture of what needs attention.',primary:true},
      {tag:'SECONDARY',h:'Admissions',p:'Moves applications forward and checks whether requirements are complete.'},
      {tag:'SECONDARY',h:'Visa Officer',p:'Owns the visa stage and its document-heavy workflow.'},
      {tag:'SECONDARY',h:'Admin',p:'Needs the bigger picture: pipeline, productivity and business performance.'},
      {tag:'END USER',h:'Student',p:'Doesn\u2019t need a CRM. Needs to know where they are and what to do next.'}],
     rnote:'priority is a product decision, not a statement about organisational importance'},
    {k:'I STOPPED LOOKING AT FEATURES AND STARTED LOOKING AT THE JOURNEY',t:[
      "The brief naturally breaks into departments and features. I reframed it around the student\u2019s journey instead. Click a stage to see how I thought about it:"],
     journey:{stages:[
      {n:'01 LEAD',g:'Understand who the student is and what they want.',f:'Information arrives scattered: forms, calls, WhatsApp, walk-ins.',o:'Capture the lead with an owner and a next action, not just a name.'},
      {n:'02 COUNSELLING',g:'Build trust and map out realistic options.',f:'Notes live everywhere; the next person re-asks everything.',o:'A single student workspace with counselling history built in.'},
      {n:'03 ELIGIBILITY',g:'Check academics, tests and budget against real options.',f:'Assessment criteria live in people\u2019s heads or scattered sheets.',o:'A structured eligibility checklist on the student profile.'},
      {n:'04 SHORTLIST',g:'Narrow universities and courses to a realistic set.',f:'Preferences get discussed but not recorded, then re-litigated.',o:'A saved shortlist with reasons, visible to everyone involved.'},
      {n:'05 APPLICATION',g:'Submit applications without constantly chasing people for updates.',f:'Documents, statuses and ownership get hard to track across teams.',o:'Every application gets its own status, checklist and history.'},
      {n:'06 OFFER',g:'Compare offers and decide quickly.',f:'Offer conditions arrive in different formats and inboxes.',o:'Offers attached to the application, with conditions and deadlines.'},
      {n:'07 VISA',g:'Get the document-heavy visa stage right, first time.',f:'Missing or stale documents cause avoidable delays.',o:'A contextual document checklist tied to the visa stage.'},
      {n:'08 PRE-DEPARTURE',g:'Handle the long tail of logistics without dropping things.',f:'Many small tasks, no clear owner, deadline pressure.',o:'A task list with owners and dates, visible on the journey.'},
      {n:'09 ALUMNI',g:'Turn a finished journey into the next one: referrals, reviews.',f:'Once the student flies out, the record goes cold.',o:'An alumni state that keeps the story alive instead of archiving it.'}],
      jnote:'working product assumptions, not validated findings'}},
    {k:'FOUR PROBLEMS KEPT SHOWING UP',opps:[
      {n:'01',h:'Context gets lost',p:'Multiple people can work on the same student. The product needs to preserve the story, not just the data.',o:'Single student workspace'},
      {n:'02',h:'Follow-ups get buried',p:'A list of students doesn\u2019t tell a counsellor who needs attention right now.',o:'Prioritised actions and follow-ups'},
      {n:'03',h:'Applications are multi-thread',p:'One student can have several university applications moving at different speeds.',o:'Application-level tracking'},
      {n:'04',h:'Documents are part of the workflow',p:'A document isn\u2019t useful just because it exists. Someone needs to know whether it\u2019s missing, submitted, rejected or approved.',o:'Contextual document checklist'}]},
    {k:'THE PRODUCT PRINCIPLE',quote:'Don\u2019t make people manage the workflow. Make the workflow guide them.',t:[
      "A CRM can easily become another place employees have to maintain. I wanted A-WAY to work differently. Instead of the product asking \u201Cwhere should I go to update this?\u201D it should answer \u201Cwhat needs my attention right now?\u201D"],
     principle:{before:['Student list','Open profile','Find application','Check documents','Search messages','Figure out next action'],
                after:['\u201CRahul needs your attention\u201D','Missing financial document','Application currently blocked','Follow up today']}},
    {k:'MVP STRATEGY · THE HARDEST PART WAS DECIDING WHAT NOT TO BUILD',t:[
      "The brief has a lot of surface area: website, student portal, AI assistant, applications, documents, appointments, CRM, analytics, university catalogue, course catalogue. Building everything at once would create a big product without necessarily solving the most important problem.",
      "So I narrowed the MVP to the spine of the journey. Together, these create the foundation for everything else:"],
     cards:{variant:'mvp',items:['Lead management','Student profile','Counselling & follow-ups','Application tracking','Document management','Basic dashboard']},
     figs:[{f:'mvpChain',cap:'FIG. 02 · THE MVP SPINE',hand:'everything else builds on this'}]},
    {k:'PRIORITISATION',t:["I sketched the surface area against two axes: what it would take to build, and how much of the journey it would unblock."],
     matrix:{qs:[
      {k:'BUILD FIRST · HIGH IMPACT, LOWER EFFORT',items:['Student profile','Lead management','Follow-ups','Application tracking','Document checklist']},
      {k:'PLAN NEXT · HIGH IMPACT, HIGHER EFFORT',items:['Student portal','University catalogue','Advanced analytics','Appointment workflows']},
      {k:'WHEN THE SPINE WORKS',items:['Analytics deepening','Finance / marketing workflows','Course catalogue depth']},
      {k:'LATER · VALIDATE THE VALUE FIRST',items:['AI assistant','OCR','AI SOP review','IELTS evaluation','University APIs','Workflow automation']}],
      note:'prioritisation is based on product reasoning from the available brief, not validated delivery estimates'}},
    {k:'PRODUCT ARCHITECTURE · ONE SYSTEM, DIFFERENT JOBS',t:[
      "The important part isn\u2019t the navigation. It\u2019s that the student remains the centre of the system, and everything else connects back to them:"],
     figs:[{f:'hub',cap:'FIG. 03 · STUDENT AT THE CENTRE',hand:'conceptual architecture'}]},
    {k:'THE KEY EXPERIENCE',quote:'Who needs my attention right now?',t:[
      "If the CRM answers nothing else, it should answer that, before anything else. Here\u2019s the shape of the counsellor\u2019s day I was designing for:"],
     mock:'crm'},
    {k:'APPLICATION TRACKING',t:[
      "One student can have many applications moving at different speeds. So I treated the application as its own object, instead of making application status just another field on the student. That is the key structural decision in the whole design. (Conceptual examples:)"],
     apps:{list:[
      {u:'University of Toronto',c:'Computer Science',st:'SUBMITTED',sc:'blue'},
      {u:'University of Waterloo',c:'Data Science',st:'OFFER RECEIVED',sc:'green'},
      {u:'University of British Columbia',c:'Computer Science',st:'DOCS PENDING',sc:'amber'}]},
     figs:[{f:'appStates',cap:'FIG. 04 · APPLICATION LIFECYCLE',hand:'each application, its own state'}]},
    {k:'DOCUMENT MANAGEMENT',t:[
      "A file list isn\u2019t a workflow. The useful question isn\u2019t \u201Cwhat files do we have?\u201D It\u2019s \u201Cwhat is still stopping this application from moving forward?\u201D"],
     docs:{bad:['passport.pdf','marksheet.pdf','ielts.pdf','sop.pdf'],
           good:[{s:'ok',t:'Passport'},{s:'ok',t:'Academic transcript'},{s:'ok',t:'IELTS score'},{s:'warn',t:'SOP needs review'},{s:'miss',t:'Financial documents'}]}},
    {k:'THE STUDENT SIDE',t:[
      "The employee interface is about managing complexity. The student interface is about reducing it: one next step at a time, no internal jargon."],
     mock:'student'},
    {k:'EDGE CASES · THE QUESTIONS THAT CHANGE THE DESIGN',t:["A few cases shaped the product more than the happy path did:"],
     edges:[
      {q:'What if a student applies to seven universities?',a:'Each application gets its own status and document requirements. One student, multiple independent threads.'},
      {q:'What if a document is rejected?',a:'Show the reason, surface the next action, and create the follow-up instead of leaving someone to remember it.'},
      {q:'What if the student changes counsellors?',a:'Ownership changes. The history stays intact, so the new counsellor can pick up the story without starting over.'}]},
    {k:'METRICS · HOW I WOULD MEASURE IT',t:[
      "I would not measure success by logins or feature usage alone. I would start with student progression: are active students moving to their next journey stage within the expected timeframe?",
      "These are proposed metrics for a concept, not reported outcomes."],
     metrics:[
      {g:'LEAD',items:['Lead to counselling conversion','Time to first follow-up','Follow-up completion rate']},
      {g:'APPLICATION',items:['Application completion rate','Average processing time','Document completion rate']},
      {g:'OPERATIONS',items:['Tasks completed on time','Overdue follow-ups','Time spent managing an application']},
      {g:'BUSINESS',items:['Student to application conversion','Application to offer conversion','Offer to visa progression']}],
     mnote:'proposed metrics · to be validated, not reported'},
    {k:'AN EXPERIMENT I\u2019D RUN FIRST',exp:{
      h:'If counsellors get a prioritised view of students and actions requiring attention, missed follow-ups should decrease and student progression should improve.',
      control:'Existing workflow: student lists and memory.',variant:'Prioritised, action-based CRM view.',
      measure:['Follow-up completion','Time to follow-up','Student progression','Counsellor adoption'],
      decisions:[{d:'Scale',c:'if the improvement is meaningful'},{d:'Iterate',c:'if the improvement is partial'},{d:'Investigate / reconsider',c:'if there is no meaningful improvement'}],
      note:'proposed experiment, not a reported result'}},
    {k:'ROADMAP',t:["Phased so each layer earns the next. Phase 4 items come directly from the brief\u2019s future integrations:"],
     roadmap:[
      {p:'PHASE 1',n:'Foundation',items:['CRM MVP','Leads','Students','Tasks','Applications','Documents','Timeline']},
      {p:'PHASE 2',n:'Student experience',items:['Student portal','Journey tracker','Notifications','Appointments']},
      {p:'PHASE 3',n:'Scale',items:['University catalogue','Course catalogue','Analytics','Finance / marketing workflows']},
      {p:'PHASE 4',n:'Automation',items:['AI assistant','OCR','AI SOP review','IELTS evaluation','University APIs','Workflow automation']}]},
    {k:'WHAT I\u2019D VALIDATE NEXT',t:["This is a product concept. The next step isn\u2019t a build, it\u2019s listening:"],
     validate:[
      {g:'COUNSELLORS',items:['How do you currently track follow-ups?','What information do you look for before calling a student?','Where do applications usually get stuck?']},
      {g:'ADMISSIONS',items:['How do you know whether an application is complete?','What causes applications to be delayed?']},
      {g:'STUDENTS',items:['What part of the process is most confusing?','How do you currently find out what\u2019s happening?','What information do you want without contacting your counsellor?']},
      {g:'LEADERSHIP',items:['Which stage has the biggest business impact?','Where do students drop off?','Which operational metric matters most?']}],
     closing:'The answers could change the MVP. That\u2019s not a problem. That\u2019s product discovery doing its job.'}
   ],
   proposed:{v:'Student progression',l:'Percentage of active students progressing to their next journey stage within the expected timeframe.',tag:'to be validated · not a reported result'},
   learned:"The biggest thing I took away wasn\u2019t about CRM design. It was about resisting the urge to build everything. The brief had a lot of interesting possibilities: AI, university discovery, analytics, appointments, applications, documents. It would\u2019ve been easy to turn that into a long feature list. Instead I kept coming back to the journey. What is the student trying to accomplish? What does the employee need to do? Where can things get stuck? Who needs to act next? That led me to a fairly simple idea: make it obvious what happened, what needs to happen next, and who needs to do it. Everything else can build on that."},

 /* CASE 02 · documented operational work */
 c1:{num:'02',acc:'blue',title:'Reducing repeated claim issues',
   cat:'HEALTHCARE OPERATIONS × PROCESS IMPROVEMENT',
   hero:{n:'30%',d:'down',l:'reduction in repeated issues'},
   secs:[
    {k:'THE CONTEXT',t:["This work happened inside a high-volume healthcare claims operation. Every day, claims moved through a familiar pipeline: identification, investigation, follow-up, resolution. The team's job was to keep that pipeline flowing.",
      "At a high level, that's all a claims operation is: a queue with rules. The interesting part is what happens when the rules and the reality disagree."]},
    {k:'THE PROBLEM',t:["Some claims kept coming back. An issue would be flagged, worked, closed, and then resurface on the same claim, sometimes more than once.",
      "Every repeat meant rework: someone picked the claim back up, re-read its history, and started over. It was friction that never announced itself. It just quietly ate capacity."]},
    {k:'WHAT I NOTICED',t:["When you work a queue every day, you start to feel patterns before you can prove them. Certain claim types, certain follow-up steps, certain handoffs kept producing repeats.",
      "One area of improvement was the loop between investigation and follow-up: issues were being surfaced before they could actually be resolved, so they boomeranged."]},
    {k:'INVESTIGATION',t:["Based on the workflow analysis and the patterns in day-to-day operational data, the recurring spots became visible. Conceptually, the workflow looked like this:"],
     figs:[{f:'claimsFlow',cap:'FIG. 01 · CLAIM WORKFLOW',hand:'where the repeats lived'}]},
    {k:'COLLABORATION',t:["Fixing the loop was never an operations-only job. The improvement only held because product, engineering and customer teams could see the same problem from their side of the screen. Conceptual representation of how the teams connected:"],
     figs:[{f:'network',cap:'FIG. 02 · TEAM TOUCHPOINTS',hand:'conceptual, obviously'}]},
    {k:'THE CHANGE',t:["At a high level, the improvement was about closing the loop instead of restarting it: making sure that when an issue was identified, the information needed to actually resolve it travelled with the claim, and that follow-up happened at the point in the workflow where it could stick.",
      "The specifics lived in the process. The principle was simple: stop letting the same problem find a new owner."]}
   ],
   outcome:[{n:'30%',d:'down',l:'reduction in repeated issues'},{n:'20%',d:'up',l:'improvement in team resolution speed'}],
   learned:"One thing this work reinforced for me: the fastest way to understand a workflow isn't always to look at the workflow diagram. Sometimes you need to talk to the person who lives inside it every day."},

 c2:{num:'03',acc:'amber',title:'Finding the pattern behind claim denials',
   cat:'DATA × ROOT-CAUSE ANALYSIS',
   hero:{n:'18%',d:'down',l:'claim backlog reduction'},
   secs:[
    {k:'THE CONTEXT',t:["Denials are the part of healthcare claims operations everyone feels and nobody loves. They arrive in volume, each one carrying a reason, and the default response is to work them one at a time.",
      "In a high-volume environment, that keeps you busy, and keeps the backlog growing at the same time."]},
    {k:'THE PROBLEM',t:["The backlog wasn't just big; it was uniform. Every denial got roughly the same attention, regardless of why it happened or whether it was actually fixable.",
      "The question that started bugging me: were these hundreds of separate problems, or a handful of patterns wearing hundreds of costumes?"]},
    {k:'INVESTIGATION',t:["Using the operational data I had access to, I started grouping denials instead of only working them: by reason, by stage, by what happened after follow-up.",
      "Root-cause analysis on the biggest groups showed a small number of causes generating a disproportionate share of the backlog. The shape of that insight looked something like this:"],
     figs:[{f:'dash',cap:'FIG. 01 · DENIALS BY REASON',hand:'conceptual data view, not real data, just the shape of the idea'}]},
    {k:'THE FLOW',t:["At a high level, the change in approach looked like this: from working denials one by one to finding the pattern, fixing the cause, and letting resolution improve downstream:"],
     figs:[{f:'denialsFlow',cap:'FIG. 02 · THE FLOW',hand:'conceptual reconstruction'}]},
    {k:'THE CHANGE',t:["Based on that analysis, the process started grouping instead of only queueing: prioritising denial types that were both frequent and fixable, and pushing prevention upstream, closer to where each root cause actually lived.",
      "Less energy on denials nobody could win. More energy on the ones that could actually be resolved."]}
   ],
   outcome:[{n:'18%',d:'down',l:'claim backlog reduction'},{n:'15%',d:'up',l:'increase in first-pass resolution'}],
   learned:"Data tells you what is happening; it rarely confesses why on its own. The \u201Cwhy\u201D came from combining the numbers with what the team already knew from living in the queue. Neither half was enough by itself."},

 c3:{num:'04',acc:'green',title:'Making workflow tracking clearer',
   cat:'WORKFLOW × CROSS-FUNCTIONAL COLLABORATION',
   hero:{n:'20%',d:'down',l:'operational friction reduction'},
   secs:[
    {k:'THE CONTEXT',t:["One workflow, several teams, everyone holding a different piece of it. Each team owned a stage, and status lived wherever the last person had left it."]},
    {k:'THE PROBLEM',t:["The inefficiency wasn't in any single team's work. It lived in the seams. Work items waited, not because someone was slow, but because nobody could easily see where they were, who had them, or what had happened last.",
      "The friction was hiding between teams, not inside them."]},
    {k:'INVESTIGATION',t:["I gathered feedback from across the teams touching the workflow, the places where people guessed, duplicated work, or simply waited, and mapped where information was getting lost at handoffs. The concept that came out of it:"],
     figs:[{f:'teams',cap:'FIG. 01 · CONVERGING ON ONE VIEW',hand:'conceptual reconstruction'}]},
    {k:'THE CHANGE',t:["At a high level, the change was a shared view of the workflow: one place where status was visible across teams, so follow-up could be triggered by the state of the work instead of by someone noticing.",
      "Less \u201Cwhere is it?\u201D More \u201Chere it is.\u201D"]}
   ],
   outcome:[{n:'20%',d:'down',l:'reduction in operational friction'}],
   learned:"This one taught me systems thinking the honest way: you can optimise every team and still have a slow system. Sometimes the unit that matters is the space between teams."},

 c4:{num:'05',acc:'pink',title:'Understanding the customer before fixing the process',
   cat:'CUSTOMER EXPERIENCE × OPERATIONS',
   hero:{n:'12%',d:'up',l:'user satisfaction improvement'},
   secs:[
    {k:'THE CONTEXT',t:["Onboarding is where an operations process meets a real human being for the first time. Everything a customer experiences there, forms, waits, unclear next steps, sets their expectations for everything after."]},
    {k:'THE PROBLEM',t:["The process worked. It was complete, compliant, and it moved. But looking at what customers actually went through during onboarding, there were pain points the process had quietly grown around: steps that made sense internally and confused externally.",
      "The workflow was fine on paper and bumpy in person."]},
    {k:'INVESTIGATION',t:["Mapping the customer's journey against the operational workflow showed exactly where the two disagreed: the moments where a customer hit friction and reached for support:"],
     figs:[{f:'journey',cap:'FIG. 01 · CUSTOMER JOURNEY',hand:'friction highlighted'}]},
    {k:'THE CHANGE',t:["Those insights fed back into the operational workflow and its policies, reordering steps, clarifying what a customer needed to know and when, so fewer journeys detoured through support.",
      "The fix wasn't a new product. It was empathy turned into process."]}
   ],
   outcome:[{n:'12%',d:'up',l:'improvement in user satisfaction'}],
   learned:"I used to think of the customer as the end of the process. Turns out they're the best diagnostic tool you have. You just have to treat their experience as an input, not background noise."}
};

/* the order cases appear in, and the order the "keep reading" link cycles through */
const ORDER=['away','c1','c2','c3','c4'];
