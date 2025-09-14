// V3.1 — centered logo on results (screen + print)
const ITEMS = [
  { id: "V1", mod: "Visuel", text: "Je retiens mieux avec des schémas, cartes mentales ou tableaux."},
  { id: "V2", mod: "Visuel", text: "J’aime surligner et coder les informations par couleur."},
  { id: "V3", mod: "Visuel", text: "Je préfère des supports avec images, graphiques ou vidéos sous-titrées."},
  { id: "V4", mod: "Visuel", text: "Je visualise mentalement les informations pour m’en souvenir."},
  { id: "V5", mod: "Visuel", text: "Les présentations structurées et bien mises en page m’aident à apprendre."},
  { id: "A1", mod: "Auditif", text: "J’apprends bien en écoutant des explications ou des podcasts."},
  { id: "A2", mod: "Auditif", text: "J’aime répéter à voix haute ou expliquer à quelqu’un pour mémoriser."},
  { id: "A3", mod: "Auditif", text: "La musique ambiante (appropriée) peut m’aider à me concentrer."},
  { id: "A4", mod: "Auditif", text: "Je me rappelle les informations comme si j’entendais les mots."},
  { id: "A5", mod: "Auditif", text: "Les échanges oraux et classes interactives me conviennent."},
  { id: "K1", mod: "Kinesthésique", text: "J’apprends mieux en manipulant, testant ou en faisant par moi-même."},
  { id: "K2", mod: "Kinesthésique", text: "J’ai besoin de bouger ou d’alterner les postures pour rester concentré·e."},
  { id: "K3", mod: "Kinesthésique", text: "Les expériences pratiques, simulations ou jeux sérieux m’aident beaucoup."},
  { id: "K4", mod: "Kinesthésique", text: "Je retiens ce que je fais plus que ce que je lis ou j’entends."},
  { id: "K5", mod: "Kinesthésique", text: "J’utilise des objets, gestes ou ancrages corporels pour mémoriser."},
  { id: "O1", mod: "Olfactif", text: "Certaines odeurs facilitent ma concentration ou l’ancrage d’un souvenir."},
  { id: "O2", mod: "Olfactif", text: "Je lie souvent des souvenirs d’apprentissage à des parfums/ambiances."},
  { id: "O3", mod: "Olfactif", text: "J’utilise parfois l’aromathérapie (menthe, agrumes…) pour étudier."},
  { id: "O4", mod: "Olfactif", text: "Les environnements neutres en odeurs m’aident à rester focus."},
  { id: "O5", mod: "Olfactif", text: "Je remarque facilement les odeurs dans une salle de cours/bureau."},
  { id: "G1", mod: "Gustatif", text: "Boire/mâcher (eau, tisane, chewing-gum) m’aide à maintenir l’attention."},
  { id: "G2", mod: "Gustatif", text: "Je mémorise mieux lorsque j’associe l’étude à une routine gustative."},
  { id: "G3", mod: "Gustatif", text: "Je suis sensible au goût des boissons/aliments quand j’étudie."},
  { id: "G4", mod: "Gustatif", text: "Des micro-pauses collation structurent bien mes sessions d’apprentissage."},
  { id: "G5", mod: "Gustatif", text: "Je peux ancrer une information en l’associant à un goût spécifique."}
];

const ADVICE = {
  "Visuel": [
    "Cartes mentales, schémas, codes couleur et surlignage.",
    "Regroupez par blocs visuels (tableaux, infographies maison).",
    "Film mental : visualisez la mise en pratique du concept."
  ],
  "Auditif": [
    "Expliquez à voix haute, enregistrez-vous et réécoutez.",
    "Privilégiez podcasts, cours audio, lectures à voix haute.",
    "Mettez les points clés en rythme (rimes, slogans)."
  ],
  "Kinesthésique": [
    "Apprenez en faisant : exercices, manipulations, jeux sérieux.",
    "Alternez postures, marchez en révision, utilisez des gestes.",
    "Objectifs SMARTER, micro-actions concrètes."
  ],
  "Olfactif": [
    "Associez une odeur (menthe, agrumes) aux révisions pour ancrer.",
    "Même parfum/ambiance au moment du rappel d’info.",
    "Aérez et évitez les odeurs envahissantes."
  ],
  "Gustatif": [
    "Hydratez-vous (eau, tisane), mastication légère si utile.",
    "Rituel gustatif neutre et constant pendant l’étude.",
    "Micro-pauses collation pour rythmer vos sessions."
  ]
};

let index = 0;
const answers = {};
let chart;

function qs(s){ return document.querySelector(s); }
function el(t,a={},h=""){ const n=document.createElement(t); Object.entries(a).forEach(([k,v])=>k==="class"?n.className=v:n.setAttribute(k,v)); if(h) n.innerHTML=h; return n; }

function showScreen(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden")); qs("#"+id).classList.remove("hidden"); }

function startQuiz(){ index=0; showScreen("quizScreen"); renderCurrent(); }

function renderCurrent(){
  const item = ITEMS[index];
  qs("#progressText").textContent = `Question ${index+1}/${ITEMS.length}`;
  const pct = Math.round((index/ITEMS.length)*100);
  qs("#progressBar").style.width = pct + "%";
  qs("#questionText").textContent = item.text;

  const scale = qs("#quizScreen .scale");
  scale.innerHTML = "";
  for(let v=1; v<=5; v++){
    const rid = `${item.id}_${v}`;
    const input = el("input", {type:"radio", id:rid, name:"likert", value:String(v)});
    const label = el("label", {for:rid}, String(v));
    scale.appendChild(input); scale.appendChild(label);
  }
  if(answers[item.id]){
    const prev = qs(`input[name="likert"][value="${answers[item.id]}"]`);
    if(prev) prev.checked = true;
  }
  qs("#prevBtn").disabled = index===0;
  const last = index===ITEMS.length-1;
  qs("#nextBtn").classList.toggle("hidden", last);
  qs("#finishBtn").classList.toggle("hidden", !last);
}

function commitCurrent(){
  const item = ITEMS[index];
  const checked = qs('input[name="likert"]:checked');
  if(!checked){ alert("Merci de sélectionner une réponse (1 à 5) avant de continuer."); return false; }
  answers[item.id] = Number(checked.value);
  return true;
}

function onNext(){ if(!commitCurrent()) return; if(index<ITEMS.length-1){ index++; renderCurrent(); } }
function onPrev(){ if(index>0){ index--; renderCurrent(); } }

function computeMeans(){
  const agg={"Visuel":0,"Auditif":0,"Kinesthésique":0,"Olfactif":0,"Gustatif":0};
  const cnt={"Visuel":0,"Auditif":0,"Kinesthésique":0,"Olfactif":0,"Gustatif":0};
  ITEMS.forEach(it=>{ const v=answers[it.id]; agg[it.mod]+=v||0; cnt[it.mod]+=1; });
  const means={}; Object.keys(agg).forEach(k=>means[k]=(agg[k]/cnt[k])||0); return means;
}

function renderChart(means){
  const ctx = qs("#radar");
  const labels = Object.keys(means);
  const data = labels.map(k=>means[k]);
  if(chart) chart.destroy();
  chart = new Chart(ctx, { type:"radar",
    data:{ labels, datasets:[{ label:"Moyenne (1–5)", data, fill:true }]},
    options:{ responsive:true, scales:{ r:{ beginAtZero:true, min:0, max:5, ticks:{stepSize:1}}}, plugins:{ legend:{display:false}}}
  });
}

function renderCards(means){
  const host = qs("#scoreCards"); host.innerHTML="";
  Object.entries(means).forEach(([mod,mean])=>{
    const c = el("div",{class:"card-mini"});
    c.appendChild(el("h4",{},`${mod} — ${mean.toFixed(2)}/5`));
    const ul = el("ul");
    (ADVICE[mod]||[]).forEach(t=>ul.appendChild(el("li",{},t)));
    c.appendChild(ul); host.appendChild(c);
  });
}

function summarize(means){
  const r = Object.entries(means).sort((a,b)=>b[1]-a[1]);
  const [t1,t2]=r; const eq=Math.abs(t1[1]-t2[1])<0.15;
  let s = eq?`Profil mixte dominant : ${t1[0]} + ${t2[0]} (≈ ${t1[1].toFixed(2)}).`:
               `Dominante : ${t1[0]} (${t1[1].toFixed(2)}). Secondaire : ${t2[0]} (${t2[1].toFixed(2)}).`;
  s += " Ce sont des préférences, pas des limites : adaptez vos méthodes selon la tâche.";
  return s;
}

function finish(){
  if(!commitCurrent()) return;
  const means = computeMeans();
  renderChart(means); renderCards(means);
  qs("#summaryText").textContent = summarize(means);
  showScreen("results");
  try{ localStorage.setItem("vakog_results_v3_1", JSON.stringify({ ts:new Date().toISOString(), answers, means })); }catch{}
}

function exportPDF(){ window.print(); }
function restart(){ location.reload(); }

document.addEventListener("DOMContentLoaded", ()=>{
  qs("#startBtn").addEventListener("click", startQuiz);
  qs("#prevBtn").addEventListener("click", onPrev);
  qs("#nextBtn").addEventListener("click", onNext);
  qs("#finishBtn").addEventListener("click", finish);
  qs("#exportPdfBtn").addEventListener("click", exportPDF);
  qs("#restartBtn").addEventListener("click", restart);
});
