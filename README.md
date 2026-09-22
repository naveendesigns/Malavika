Malavika · Portfolio Notebook
Personal portfolio built with plain HTML, CSS and JavaScript. No buildstep, no dependencies. Hosted on GitHub Pages.

File map (what to edit for what)
I want to change...	Edit this file
Any text in the case studies (A-WAY etc.)	js/data.js → CASES
Project cards on the work grid	js/data.js → PROJECTS
The big impact numbers / proud-of receipts	js/data.js → IMPACT / PROUD
Toolkit chips, experience rows	js/data.js → TK / XP
Hero, about, contact section text	index.html
Email address, LinkedIn URL	index.html (search for TODO)
Colors, fonts, spacing, layout	css/main.css (top of file)
Case-study popup styling	css/casestudy.css
The hand-drawn SVG diagrams	js/figures.js → FIGS
Menu, scrolling, case-study open/close	js/app.js
Adding a new project
In js/data.js, add an object to PROJECTS (give it a new id).
Add a matching object to CASES with the same id.
Add the id to the ORDER array.
Done. The card, the case-study page and the "keep reading" linksall generate automatically.
Re-enabling the playground section
In index.html, remove the HTML comment markers around thePLAYGROUND section (search for "PLAYGROUND SECTION").
Re-enable the playground link in the header navigation.
Re-enable the playground link in the mobile menu.(Playground items live in js/data.js → PG. No JS edits needed.)
Script load order (do not change)
js/data.js → js/figures.js → js/render.js → js/app.js

These are plain scripts sharing globals in this order. If you add anew file, add its <script> tag in index.html after the ones itdepends on.

Deploying on GitHub Pages
Push these files to your repository (main branch).
Repo Settings → Pages → Build and deployment →Deploy from a branch → main / / (root) → Save.
Live at https://yourusername.github.io/repo-name/ in a minute or two.
All asset paths are relative, so no configuration is needed.
