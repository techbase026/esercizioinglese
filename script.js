const answers = {
  a1: ["was watching"],
  a2: ["were playing"],
  a3: ["was not studying", "wasn't studying"],
  a4: ["were having"],
  a5: ["were"],
  a6: ["sleeping"],
  b1: ["she wasn't reading a book", "she was not reading a book"],
  b2: ["were they playing football"],
  b3: ["i was working"],
  c1: ["was eating"],
  c2: ["were studying"],
};

const fields = Object.keys(answers);
const checkBtn = document.getElementById("checkBtn");
const checkA = document.getElementById("checkA");
const checkB = document.getElementById("checkB");
const checkC = document.getElementById("checkC");
const showBtn = document.getElementById("showBtn");
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("result");
const solutionsBox = document.getElementById("solutions");

const partTotals = { A: 6, B: 3, C: 2 };

function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.?!]+$/g, "")
    .replace(/\s+/g, " ");
}

function markField(el, ok) {
  el.classList.remove("correct", "wrong");
  el.classList.add(ok ? "correct" : "wrong");
  el.setAttribute("aria-invalid", ok ? "false" : "true");
}

function scoreLabel(pct) {
  if (pct === 100) return "Perfetto";
  if (pct >= 80) return "Ottimo lavoro";
  if (pct >= 60) return "Buon lavoro";
  return "Continua ad allenarti";
}

function checkAnswers(selectedPart = null) {
  let correct = 0;
  let total = 0;
  const partScores = { A: 0, B: 0, C: 0 };
  const currentPartTotal = selectedPart ? partTotals[selectedPart] : fields.length;

  for (const id of fields) {
    const el = document.getElementById(id);
    if (selectedPart && el.dataset.part !== selectedPart) {
      continue;
    }

    total += 1;
    const value = normalize(el.value);
    const ok = answers[id].includes(value);
    markField(el, ok);
    if (ok) {
      correct += 1;
      partScores[el.dataset.part] += 1;
    }
  }

  const pct = Math.round((correct / total) * 100);
  const summary = selectedPart
    ? `Parte ${selectedPart}: ${correct}/${currentPartTotal} (${pct}%) - ${scoreLabel(pct)}`
    : `Punteggio totale: ${correct}/${total} (${pct}%) - ${scoreLabel(pct)}. ` +
      `Parte A: ${partScores.A}/${partTotals.A} | ` +
      `Parte B: ${partScores.B}/${partTotals.B} | ` +
      `Parte C: ${partScores.C}/${partTotals.C}`;

  resultBox.textContent = summary;
  resultBox.classList.remove("result-good", "result-mid", "result-low");
  resultBox.classList.add(
    pct >= 80 ? "result-good" : pct >= 60 ? "result-mid" : "result-low"
  );
}

checkBtn.addEventListener("click", () => checkAnswers());
checkA.addEventListener("click", () => checkAnswers("A"));
checkB.addEventListener("click", () => checkAnswers("B"));
checkC.addEventListener("click", () => checkAnswers("C"));

resetBtn.addEventListener("click", () => {
  for (const id of fields) {
    const el = document.getElementById(id);
    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
    el.classList.remove("correct", "wrong");
    el.removeAttribute("aria-invalid");
  }

  resultBox.textContent = "";
  resultBox.classList.remove("result-good", "result-mid", "result-low");
});

showBtn.addEventListener("click", () => {
  const isHidden = solutionsBox.classList.toggle("hidden");
  showBtn.textContent = isHidden ? "Mostra soluzioni" : "Nascondi soluzioni";
  showBtn.setAttribute("aria-expanded", String(!isHidden));
});
