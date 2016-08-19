"use strict";

const QUESTIONS = [0, 6, 5, 4, 3];
const SELECTABLE = [".a", ".p"];

function DIV() {
  return document.createElement("div");
}

function CCDIV(cls, content) {
  const div = DIV();
  if (content) {
    div.textContent = content;
  }
  div.className = cls;
  return div;
}

function serializeRound() {
  const round = document.querySelector("#round");
}

function loadGame(data) {
  let [roundsSection, finalSection] = data.split("#final\n");
  const rounds = loadRounds(roundsSection);
  const roundControl = document.querySelector("#round-control");
  for (let round of rounds) {
    let [n, q, a] = round;
    const button = CCDIV("round-selector", `round ${n}`);
    button.addEventListener("click", e => {
      for (let d of document.querySelectorAll(".selected")) {
        d.classList.remove("selected");
      }
      const cls = e.target.classList;
      cls.add("selected");
      displayRound(n, q, a);
    });
    roundControl.appendChild(button);
  }
}

function loadRounds(roundsString) {
  let rounds = roundsString.split("#").slice(1);
  if (rounds.length != 4) {
    console.error("rounds != 4");
  }
  return rounds.map(r => r.trim()).map(r => {
    let [name, question, ...answers] = r.split("\n");
    const number = parseInt(name.charAt(5));
    return [number, question, answers];
  });
}

function populateRoundAnswer(number, line) {
  const setContent = (cls, content) => {
    document.querySelector(`.answers .a${number} .${cls}`).textContent = content;
  };
  let [answer, points] = line.split(";");
  setContent("l", number);
  setContent("a", answer);
  setContent("p", points);
}

function populateRoundAnswers(answers) {
  let i = 1;
  for (let answer of answers) {
   populateRoundAnswer(i++, answer);
  }
}

function makeRound() {
  let [prefix, round] = ROUND_FIELD;
  const div = CCDIV(prefix);
  createDivs(div, round, prefix);
  return div;
}

function displayRound(number, question, answers) {
  const oldRound = document.querySelector("#round");
  const newRound = DIV();
  newRound.setAttribute("id", "round");
  newRound.appendChild(CCDIV("q", `${number}: ${question}`));
  newRound.appendChild(makeRound());

  const parent = oldRound.parentNode;
  parent.replaceChild(newRound, oldRound);
  populateRoundAnswers(answers.slice(0, QUESTIONS[number]));
  update();
}

function clicky(selector) {
  const divs = document.querySelectorAll(selector);
  divs.forEach(d => d.addEventListener("click", e => {
    const cls = e.target.classList;
    if (cls.contains("marked")) {
      cls.remove("marked");
    } else {
      cls.add("marked");
    }
  }));
}

function update() {
  SELECTABLE.forEach(s => clicky(s));
}

loadGame(DATA);
