// V2 – JSON export removed
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

const LIKERT = [
  { value: 1, label: "1<br><span>Pas du tout</span>" },
  { value: 2, label: "2<br><span>Plutôt non</span>" },
  { value: 3, label: "3<br><span>Mitigé·e</span>" },
  { value: 4, label: "4<br><span>Plutôt oui</span>" },
  { value: 5, label: "5<br><span>Tout à fait</span>" },
];

const ADVICE = {
  "Visuel": [
    "Utilisez cartes mentales, schémas, codes couleur et surlignage.",
    "Regroupez par blocs visuels, créez des tableaux et des infographies maison.",
    "Visualisez une scène où vous appliquez le concept (« film mental »)."
  ],
  "Auditif": [
    "Expliquez à voix haute, enregistrez-vous et réécoutez.",
    "Privilégiez podcasts, cours audio, lectures à voix haute.",
    "Transformez les points clés en rimes, rythmes ou slogans."
  ],
  "Kinesthésique": [
    "Apprenez en faisant : exercices, manipulations, simulations, jeux sérieux.",
    "Alternez postures (assis/debout), marchez en révision, utilisez des gestes.",
    "Fixez des objectifs SMARTER avec micro-actions concrètes."
  ],
  "Olfactif": [
    "Associez une odeur (menthe, agrumes) aux révisions pour créer un ancrage.",
    "Restez cohérent·e : même parfum/ambiance lors du rappel d’info.",
    "Aérez l’espace et évitez les odeurs trop envahissantes."
  ],
  "Gustatif": [
    "Hydratez-vous régulièrement (eau, tisane), mastication légère si utile.",
    "Créez un rituel gustatif neutre et constant pendant l’étude.",
    "Planifiez des micro-pauses collation pour rythmer vos sessions."
  ]
};

function el(tag, attrs = {}, html = "") {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "for") node.htmlFor = v;
    else node.setAttribute(k, v);
  });
  if (html) node.innerHTML = html;
  return node;
}

function renderQuestions() {
  const wrap = document.getElementById("questions");
  ITEMS.forEach((q, idx) => {
    const item = el("div", { class: "item" });
    item.appendChild(el("h3", {}, `${idx + 1}. ${q.text} <span class="badge">${q.mod}</span>`));

    const scale = el("div", { class: "scale", role: "radiogroup", "aria-label": `Échelle de 1 à 5 pour la question ${idx + 1}` });
    LIKERT.forEach(opt => {
      const id = `${q.id}_${opt.value}`;
      const input = el("input", { type: "radio", id, name: q.id, value: String(opt.value), required: "required" });
      const label = el("label", { for: id });
      label.appendChild(el("span", { class: "pill" }, opt.label));
      scale.appendChild(input);
      scale.appendChild(label);
    });

    item.appendChild(scale);
    wrap.appendChild(item);
  });
}

function computeScores(formData) {
  const scores = { "Visuel": 0, "Auditif": 0, "Kinesthésique": 0, "Olfactif": 0, "Gustatif": 0 };
  const counts = { "Visuel": 0, "Auditif": 0, "Kinesthésique": 0, "Olfactif": 0, "Gustatif": 0 };
  for (const [k, v] of formData.entries()) {
    const item = ITEMS.find(i => i.id === k);
    if (!item) continue;
    scores[item.mod] += Number(v);
    counts[item.mod] += 1;
  }
  const means = {};
  Object.keys(scores).forEach(mod => {
    means[mod] = counts[mod] ? (scores[mod] / counts[mod]) : 0;
  });
  return { scores, counts, means };
}

let chart;
function renderChart(means) {
  const ctx = document.getElementById("radar");
  const labels = Object.keys(means);
  const data = labels.map(k => means[k]);
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "radar",
    data: { labels, datasets: [{ label: "Préférences (moyenne 1–5)", data, fill: true }] },
    options: { responsive: true, scales: { r: { beginAtZero: true, min: 0, max: 5, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } }
  });
}

function rankModalities(means) {
  return Object.entries(means).sort((a,b) => b[1] - a[1]);
}

function summarize(ranked) {
  const top = ranked[0];
  const second = ranked[1];
  const equal = (a,b) => Math.abs(a - b) < 0.15;
  let txt = "";
  if (equal(top[1], second[1])) {
    txt = `Profil mixte dominant : ${top[0]} + ${second[0]} (moyennes ≈ ${top[1].toFixed(2)}).`;
  } else {
    txt = `Dominante actuelle : ${top[0]} (moyenne ${top[1].toFixed(2)}). Secondaire : ${second[0]} (moyenne ${second[1].toFixed(2)}).`;
  }
  txt += " Rappelez-vous : ce sont des préférences, pas des limites. Adaptez vos méthodes selon la tâche et le contexte.";
  return txt;
}

function renderCards(means) {
  const host = document.getElementById("scoreCards");
  host.innerHTML = "";
  Object.entries(means).forEach(([mod, mean]) => {
    const card = el("div", { class: "card" });
    card.appendChild(el("h4", {}, mod));
    card.appendChild(el("p", { class: "small" }, `Moyenne : <strong>${mean.toFixed(2)}</strong> / 5`));
    const ul = el("ul");
    (ADVICE[mod] || []).forEach(a => { ul.appendChild(el("li", {}, a)); });
    card.appendChild(ul);
    host.appendChild(card);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target.closest("form");
  if (!form) return;
  const formData = new FormData(form);
  const answered = Array.from(formData.keys()).length;
  if (answered < ITEMS.length) {
    alert(`Veuillez répondre à toutes les ${ITEMS.length} affirmations (vous en avez complété ${answered}).`);
    return;
  }
  const { means } = computeScores(formData);
  const ranked = rankModalities(means);
  renderChart(means);
  renderCards(means);
  document.getElementById("summaryText").textContent = summarize(ranked);
  document.getElementById("results").classList.remove("hidden");
  try {
    const payload = { ts: new Date().toISOString(), answers: Object.fromEntries(formData.entries()), means };
    localStorage.setItem("vakog_results", JSON.stringify(payload));
  } catch {}
}

function handleReset() {
  document.getElementById("quiz").reset();
  document.getElementById("results").classList.add("hidden");
  if (chart) chart.destroy();
}

function copyLink() {
  const url = location.origin + location.pathname;
  navigator.clipboard.writeText(url).then(() => alert("Lien copié ! Vous pouvez partager cette page (aucune donnée personnelle)."));
}

function exportPDF() { window.print(); }

function restoreFromLocal() {
  try {
    const raw = localStorage.getItem("vakog_results");
    if (!raw) return;
    const { answers } = JSON.parse(raw);
    if (!answers) return;
    Object.entries(answers).forEach(([qid, val]) => {
      const input = document.querySelector(`input[name="${qid}"][value="${val}"]`);
      if (input) input.checked = true;
    });
  } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  restoreFromLocal();
  document.getElementById("quiz").addEventListener("submit", handleSubmit);
  document.getElementById("resetBtn").addEventListener("click", handleReset);
  document.getElementById("exportPdfBtn").addEventListener("click", exportPDF);
  document.getElementById("copyLinkBtn").addEventListener("click", copyLink);
  document.getElementById("printLink").addEventListener("click", (e) => { e.preventDefault(); exportPDF(); });
});
