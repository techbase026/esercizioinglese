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
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("result");

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
}

checkBtn.addEventListener("click", () => {
  let correct = 0;

  for (const id of fields) {
    const el = document.getElementById(id);
    const value = normalize(el.value);
    const ok = answers[id].includes(value);
    markField(el, ok);
    if (ok) correct += 1;
  }

  const total = fields.length;
  const pct = Math.round((correct / total) * 100);
  resultBox.textContent = `Punteggio: ${correct}/${total} (${pct}%)`;
});

resetBtn.addEventListener("click", () => {
  for (const id of fields) {
    const el = document.getElementById(id);
    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
    el.classList.remove("correct", "wrong");
  }

  resultBox.textContent = "";
});
