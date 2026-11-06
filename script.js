const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const output = document.getElementById("terminalOutput");
const form = document.getElementById("terminalForm");
const input = document.getElementById("terminalInput");

const commands = {
  help: `Available commands:
  whoami       — discover who I am
  about        — read my introduction
  education    — explore my education
  skills       — view my technical toolkit
  projects     — see my projects
  aws          — discover my AWS community experience
  experience   — explore my learning and internship journey
  journey      — view my path from diploma to B.Tech
  funfact      — discover something personal
  superpower   — reveal what drives me as a builder
  achievements — view milestones and experience
  contact      — find ways to connect
  github       — open my GitHub profile
  clear        — clear this terminal`,
  whoami: "I'm Parasram Gaikwad, an aspiring software developer from Nagpur, Maharashtra, and a B.Tech Information Technology student.",
  about: "I completed a Diploma in Computer Engineering and am now pursuing B.Tech in Information Technology. I enjoy learning by building practical projects and exploring software, AI/ML and cloud computing.",
  education: "B.Tech in Information Technology at KITS College, Ramtek (expected 2028). Before that, I completed a Diploma in Computer Engineering with 80%.",
  skills: "Programming: C, C++, Java, Python | Web: HTML, CSS, JavaScript | Databases: SQL, MongoDB | Tools: VS Code, Git and GitHub (basic) | Exploring: AI/ML, cloud computing, data analytics and cybersecurity.",
  projects: "Projects: AI Travel Planner (Python, HTML, CSS and JavaScript); E-Pizza e-commerce project (Python); Arduino Uno sensor and motion-detection projects; PARASRAM.OS portfolio (HTML, CSS and JavaScript, with AWS Amplify deployment work in progress).",
  aws: "As an AWS Student Builder Campus Leader, I communicated with students about AWS Builder Center and created original AWS-themed posts. These activities helped me build confidence, improve communication and learn more about cloud computing. I am still developing hands-on experience with AWS services.",
  experience: "AWS Student Builder Campus Leader: student outreach and original AWS-themed content. Internship experience: Marvetech Technologies. I enjoy learning beyond the classroom through projects and community activities.",
  journey: "My journey started with a Diploma in Computer Engineering (80%). I continued into B.Tech Information Technology at KITS College, Ramtek, with an expected graduation year of 2028. My goal is to become a professional software developer.",
  futurelab: "Future Me Lab: Stage 1 — strengthen programming, problem-solving and web fundamentals. Stage 2 — build and deploy practical full-stack and cloud projects. Stage 3 — deepen skills in AI/ML and cloud computing through focused projects. Stage 4 — prepare for software development opportunities with a strong portfolio and continued learning. This is an aspirational roadmap, not a claim of completed milestones.",
  funfact: "I moved from a Computer Engineering diploma into B.Tech IT, and I enjoy exploring both software projects and hands-on Arduino sensor experiments. I like learning by trying things out, not just reading about them.",
  superpower: "My builder mindset: I enjoy turning what I learn into something practical, whether it is a web project, an Arduino experiment or an interactive portfolio.",
  achievements: "Milestones so far: Diploma in Computer Engineering with 80%; AWS Student Builder Campus Leader community and content activities; internship experience with Marvetech Technologies; and hands-on software and Arduino projects. No AWS certification or badge claimed yet.",
  contact: "Email: parasram.gk13@gmail.com | LinkedIn: linkedin.com/in/parasram-gaikwad-22218a354/ | GitHub: github.com/parasramgk13-maker",
  github: "Opening my GitHub profile: https://github.com/parasramgk13-maker"
};

function addTerminalLine(className, text) {
  const line = document.createElement("p");
  line.className = className;
  line.textContent = text;
  output.appendChild(line);
}

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  addTerminalLine("command-line", `visitor@parasram:~$ ${command}`);

  if (command === "clear") {
    output.replaceChildren();
    addTerminalLine("command-response", "Terminal cleared. Type help to see available commands.");
  } else if (Object.prototype.hasOwnProperty.call(commands, command)) {
    addTerminalLine("command-response", commands[command]);
    if (command === "github") window.open("https://github.com/parasramgk13-maker", "_blank", "noopener,noreferrer");
  } else {
    addTerminalLine("command-response", `Command not found: ${command}. Type help to see available commands.`);
  }
  output.scrollTop = output.scrollHeight;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  runCommand(input.value);
  input.value = "";
  input.focus();
});

document.querySelectorAll(".hint-command").forEach(button => {
  button.addEventListener("click", () => {
    runCommand(button.dataset.command);
    input.focus();
  });
});

// Reading progress and floating back-to-top control
const progressBar = document.getElementById('scrollProgress');
const floatingTop = document.querySelector('.floating-top');
function updateScrollUI(){
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  floatingTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateScrollUI, {passive:true});
updateScrollUI();

// Project detail dialogs. Content stays factual and avoids claiming unverified outcomes.
const projectInfo = {
  travel:{title:'AI Travel Planner',category:'WEB APPLICATION / PROJECT 01',description:'A travel-planning website with a branded navigation bar for Home, Destinations, Tours and Blog, plus a Sign In entry point. The supplied desktop capture shows a featured Japan destination image. The project is described as using Python, HTML, CSS and JavaScript.',tech:['Python','HTML','CSS','JavaScript'],note:'Desktop screenshot supplied by the project owner. The screenshot shows the interface running locally at localhost:5000; it is not a public live demo. Add the project repository and verify the exact AI functionality before describing or linking it.'},
  pizza:{title:'E-Pizza',category:'E-COMMERCE / PROJECT 02',description:'An e-commerce learning project centered on an online pizza-ordering experience. It explores the flow of browsing pizza options and placing an order.',tech:['Python','E-commerce'],note:'Add the exact framework, database, screenshots and repository URL when confirmed.'},
  arduino:{title:'Arduino Sensor & Motion Detection',category:'HARDWARE / PROJECT 03',description:'Hands-on Arduino Uno experiments using sensors to explore motion detection and sensor-based responses. These builds provided practical exposure to hardware connections and embedded programming concepts.',tech:['Arduino Uno','Sensors','Motion Detection'],note:'You can expand this case study with circuit diagrams, components, code and a short demo video.'},
  portfolio:{title:'PARASRAM.OS — 3D Portfolio',category:'PERSONAL WEBSITE / PROJECT 04',description:'A personal developer portfolio built with HTML, CSS and JavaScript. It features a working visitor terminal, responsive sections and an interactive Three.js 3D hero scene.',tech:['HTML','CSS','JavaScript','Three.js','AWS Amplify'],note:'AWS Amplify deployment is described as in progress; add the public URL after deployment is complete.'}
};
const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('projectModalTitle');
const modalEyebrow = document.getElementById('projectModalEyebrow');
const modalDescription = document.getElementById('projectModalDescription');
const modalTech = document.getElementById('projectModalTech');
const modalNote = document.getElementById('projectModalNote');
let lastFocused = null;
document.querySelectorAll('.project-details').forEach(button => button.addEventListener('click', () => {
  const item = projectInfo[button.dataset.project];
  if(!item) return;
  lastFocused = button;
  modalTitle.textContent = item.title;
  modalEyebrow.textContent = item.category;
  modalDescription.textContent = item.description;
  modalNote.textContent = item.note;
  modalTech.replaceChildren(...item.tech.map(label => {const tag=document.createElement('span');tag.textContent=label;return tag;}));
  projectModal.hidden = false;
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.modal-close').focus();
}));
function closeProjectModal(){projectModal.hidden=true;document.body.style.overflow='';if(lastFocused)lastFocused.focus();}
projectModal.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeProjectModal));

// Quick navigation palette (Ctrl/⌘ + K)
const palette = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const paletteButtons = [...document.querySelectorAll('#paletteItems button')];
const commandTrigger = document.getElementById('commandTrigger');
let activePaletteIndex = 0;
function openPalette(){palette.hidden=false;document.body.style.overflow='hidden';paletteInput.value='';filterPalette('');paletteInput.focus();}
function closePalette(){palette.hidden=true;document.body.style.overflow='';commandTrigger?.focus();}
function filterPalette(query){
  const q=query.trim().toLowerCase();let visible=0;
  paletteButtons.forEach((button)=>{const show=button.textContent.toLowerCase().includes(q);button.hidden=!show;if(show){button.classList.toggle('active',visible===0);visible++;}});
  activePaletteIndex=0;
}
function selectPaletteButton(button){if(!button)return;const target=document.querySelector(button.dataset.target);closePalette();target?.scrollIntoView({behavior:'smooth'});}
commandTrigger?.addEventListener('click',openPalette);
paletteInput.addEventListener('input',()=>filterPalette(paletteInput.value));
paletteButtons.forEach(button=>button.addEventListener('click',()=>selectPaletteButton(button)));
palette.querySelectorAll('[data-close-palette]').forEach(el=>el.addEventListener('click',closePalette));
paletteInput.addEventListener('keydown',event=>{
  const visible=paletteButtons.filter(button=>!button.hidden);
  if(event.key==='ArrowDown'||event.key==='ArrowUp'){
    event.preventDefault();activePaletteIndex=(activePaletteIndex+(event.key==='ArrowDown'?1:-1)+visible.length)%visible.length;
    visible.forEach((button,index)=>button.classList.toggle('active',index===activePaletteIndex));
  }else if(event.key==='Enter'){event.preventDefault();selectPaletteButton(visible[activePaletteIndex]);}
});
document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();palette.hidden?openPalette():closePalette();}
  if(event.key==='Escape'){if(!projectModal.hidden)closeProjectModal();if(!palette.hidden)closePalette();nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}
});


// Future Me Lab: interactive, owner-editable career roadmap.
const roadmapStages = [
  { kicker: "STAGE 01 / CURRENT FOUNDATION", title: "Strengthen the fundamentals.", description: "Keep building confidence in programming, problem-solving, web development and core computer science concepts.", goals: ["Programming practice", "Data structures", "Web fundamentals"] },
  { kicker: "STAGE 02 / BUILD & SHIP", title: "Turn learning into working projects.", description: "Create practical applications, improve code quality and learn to deploy projects so others can explore what I build.", goals: ["Full-stack projects", "Git & GitHub", "AWS deployment"] },
  { kicker: "STAGE 03 / SPECIALIZE", title: "Explore the technologies shaping tomorrow.", description: "Develop deeper, project-based understanding of cloud computing and AI/ML while keeping strong software engineering foundations.", goals: ["Cloud architecture", "AI / ML projects", "Data & APIs"] },
  { kicker: "STAGE 04 / CAREER LAUNCH", title: "Prepare to contribute as a developer.", description: "Refine my portfolio, practice technical interviews and look for opportunities to learn from teams while solving real problems.", goals: ["Portfolio case studies", "Interview preparation", "Internship / developer roles"] }
];
const roadmapTabs = [...document.querySelectorAll(".roadmap-tab")];
function showRoadmapStage(index) {
  const stage = roadmapStages[index];
  if (!stage) return;
  document.getElementById("roadmapKicker").textContent = stage.kicker;
  document.getElementById("roadmapTitle").textContent = stage.title;
  document.getElementById("roadmapDescription").textContent = stage.description;
  document.getElementById("roadmapGoals").replaceChildren(...stage.goals.map(goal => {
    const tag = document.createElement("span"); tag.textContent = goal; return tag;
  }));
  document.getElementById("roadmapCounter").textContent = `${String(index + 1).padStart(2, "0")} / 04`;
  roadmapTabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    tab.setAttribute("aria-pressed", String(i === index));
  });
}
roadmapTabs.forEach(tab => tab.addEventListener("click", () => showRoadmapStage(Number(tab.dataset.stage))));
showRoadmapStage(0);
